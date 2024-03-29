import pascalcase from 'pascalcase';

class SwaggerToTs {
  swaggerDocs: Swagger.Response;
  baseUrl: string = '/';
  moduleName: string | undefined;
  generatedTypes: Record<string, string> = {};
  _getedSchemaMap: Record<string, any> = {};
  constructor(swaggerDocs: Swagger.Response, baseUrl?: string) {
    this.swaggerDocs = swaggerDocs;
    this.baseUrl = baseUrl || '/';
  }

  isObject(value: unknown) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  isLinkSchema(
    schema?: Swagger.ParameterType['schema'],
  ): schema is Swagger.LinkSchema {
    if (!schema) {
      return false;
    }
    return schema.hasOwnProperty('$ref');
  }

  private _camelToPascal(str?: string) {
    if (!str) {
      return '';
    }
    return pascalcase(str);
  }

  private _replaceType(typeString: string) {
    const typeReg = new RegExp(/«([^«»]*)»/g);
    let targetString = typeString;
    while (typeReg.test(targetString)) {
      targetString = targetString.replace(typeReg, '');
    }

    return targetString;
  }

  getRealSchema(path: string) {
    const pathList = path.replace('#/', '').split('/');
    let curSchema: Record<string, any> = this.swaggerDocs;
    let curPath: string | undefined = undefined;
    while (pathList.length && !!curSchema) {
      curPath = pathList.shift() as string;
      curSchema = curSchema[curPath];
    }
    return [
      this._replaceType(curPath as string),
      curSchema as Swagger.ObjectSchema,
    ] as const;
  }

  generateSchemaLoop(root: Swagger.UnparseSchema): Swagger.ParsedSchema {
    if (this.isLinkSchema(root)) {
      const [name, schema] = this.getRealSchema(root['$ref']);
      // 保存下获取过的，有的话直接取，避免死循环
      // 代码可能还有问题，没测试过
      if (this._getedSchemaMap[name]) {
        return {
          name,
          ...this._getedSchemaMap[name],
        } as Swagger.NamedSchema;
      }
      this._getedSchemaMap[name] = schema;
      return {
        name,
        ...this.generateSchemaLoop(schema),
      } as Swagger.NamedSchema;
    }
    return Object.entries(root).reduce((target, [key, value]) => {
      if (this.isObject(value)) {
        return {
          ...target,
          [key]: this.generateSchemaLoop(value),
        };
      }
      return {
        ...target,
        [key]: value,
      };
    }, {}) as Swagger.ParsedSchema;
  }

  generateReqSchema(apiInfo: Swagger.ApiInfo) {
    const { requestBody, parameters } = apiInfo;
    if (requestBody) {
      const reqSchema = requestBody?.content?.['application/json']?.schema;
      return this.isObject(reqSchema)
        ? {
            body: this.generateSchemaLoop(reqSchema),
          }
        : null;
    }
    if (parameters?.length) {
      // 先把header和name不符合规范的过滤掉，防止报错
      return parameters
        .filter((item) => {
          if (!/^[a-zA-Z][a-zA-Z_]*$/.test(item.name)) {
            console.warn(
              'parameters name 不符合规范',
              apiInfo.operationId,
              item.name,
            );
            return false;
          }
          return item.in !== 'header';
        })
        .reduce((target, item) => {
          const { name, in: parametersIn, schema } = item;
          const parseName = name.replace('[0].', '');
          return {
            ...target,
            [parametersIn]: {
              ...(target[parametersIn] || {}),
              [parseName]: this.generateSchemaLoop(schema),
            },
          };
        }, {} as Swagger.ReqParsedSchema);
    }
    return null;
  }

  generateResSchema(apiInfo: Swagger.ApiInfo) {
    const resSchema = apiInfo.responses?.['200']?.content?.['*/*']?.schema;
    return this.isObject(resSchema) ? this.generateSchemaLoop(resSchema) : null;
  }

  /**
   * @description 获取所提供参数对应模块下的所有接口
   * @param moduleName 模块名
   *  */
  getSwaggerDocsByModule(moduleName: string) {
    this.moduleName = moduleName;
    const startPath = `${this.baseUrl}${moduleName}`;

    const swaggerDocsByModule = Object.entries(this.swaggerDocs.paths)
      .map(([path, reqMethodMap]) => {
        if (path.includes(startPath)) {
          const [reqMethod, apiInfo] = Object.entries(reqMethodMap).flatMap(
            (n) => n,
          ) as [Swagger.ReqMethod, Swagger.ApiInfo];

          const { description, summary, operationId } = apiInfo;
          return {
            path: path.replace(this.baseUrl, '/'),
            method: reqMethod,
            description,
            summary,
            operationId,
            res: this.generateResSchema(apiInfo),
            req: this.generateReqSchema(apiInfo),
          };
        }
        return undefined;
      })
      .filter(Boolean) as Swagger.ParsedSchemaOptions[];
    return swaggerDocsByModule;
  }

  _getReqMethodName(options: Swagger.ParsedSchemaOptions) {
    const { method, description = '', operationId } = options;
    if (method === 'get') {
      
      return `fetch${this._camelToPascal(operationId)}`;
    }
    if (description.includes('新增') || description.includes('编辑')) {
      return operationId;
    }
    return operationId;
  }

  generateTypeValue(value: Swagger.ParsedSchema): string {
    const { type } = value;
    switch (type) {
      case 'array': {
        const { items } = value;
        if (this._isNameSchema(items)) {
          return `${items.name}[]`;
        }
        return `${this.generateTypeValue(items)}[]`;
      }
      case 'object': {
        if (this._isNameSchema(value)) {
          return value.name;
        }
        return 'Record<string, any>';
      }
      case 'integer':
        return 'number';
      case 'string':
      default:
        return 'string';
    }
  }

  _getReqPayload(
    options: Swagger.ParsedSchemaOptions,
    typePrefix: string,
  ): Swagger.ReqPayload | null {
    const { operationId, method, req, path } = options;

    if (!req?.path && !req?.body && !req?.query) {
      return null;
    }

    if (req?.path) {
      const { key, url, value } = Object.entries(req.path).reduce(
        (target, [key, value]) => {
          if (target.url.includes(`{${key}}`)) {
            return {
              key,
              url: `\`${target.url.replace(`{${key}}`, `\${${key}}`)}\``,
              value: this.generateTypeValue(value),
            };
          }
          return target;
        },
        {
          key: '',
          url: path,
          value: '',
        } as Required<Swagger.ReqPayload>,
      );
      return key && value
        ? {
            key,
            value,
            url,
          }
        : null;
    }

    let reqTypeName: string;
    if (req?.body) {
      if (this._isNameSchema(req.body)) {
        reqTypeName = `${typePrefix}${req.body.name}`;
      } else {
        // 因为没有 key，所以无法转换，只能用 any
        reqTypeName = 'any';
      }
    } else if (req?.query) {
      const {normalType, namedType} = Object.entries(req.query).reduce(
        (target, [key, value]) => {
          const { normalType, namedType } = target;
          if (this._isNameSchema(value)) {
            return {
              normalType,
              namedType: [...namedType, `${typePrefix}${value.name}`],
            };
          }
          return {
            normalType: [
              ...normalType,
              `${key}: ${this.generateTypeValue(value)};`,
            ],
            namedType,
          };
        },
        {
          normalType: [],
          namedType: [],
        } as {
          normalType: string[];
          namedType: string[];
        },
      );
      const normalTypeStringList = normalType?.length ? [`{
        ${normalType.join('\n')}
      }`] : []
      reqTypeName = [...normalTypeStringList, ...namedType].join(" & ")
    } else {
      reqTypeName = `${typePrefix}${this._camelToPascal(operationId)}ReqParams`;
    }

    return reqTypeName
      ? {
          key: method === 'get' ? 'params' : 'data',
          value: reqTypeName,
        }
      : null;
  }

  generateReqMethod(options: Swagger.ParsedSchemaOptions) {
    const { description, summary, res, path, method } = options;
    const typePrefix = `API.${this._camelToPascal(this.moduleName)}.`;
    const reqPayload = this._getReqPayload(options, typePrefix);

    const resTypeName =
      res?.type === 'object' && res.name ? `${typePrefix}${res.name}` : null;
    return `
    /** @description ${description || summary} */
    export const ${this._getReqMethodName(options)} = (${
      reqPayload ? `${reqPayload.key}: ${reqPayload.value}` : ''
    }) =>
      request<${resTypeName}>({
        url: ${reqPayload?.url || `"${path}"`},
        method: "${method}",
        ${reqPayload && !reqPayload.url ? reqPayload.key : ''}
      });`;
  }

  _isNameSchema(schema?: Swagger.ParsedSchema): schema is Swagger.NamedSchema {
    if (!schema) {
      return false;
    }
    return schema.type === 'object' && !!schema.name;
  }

  generateTypeList(schemas: Swagger.ParsedSchema[]) {
    const todoTypes = schemas.slice();
    const finishedTypes: Record<string, string> = {};

    while (todoTypes.length) {
      const { name, properties, description } =
        todoTypes.shift() as Swagger.NamedSchema;
      if (finishedTypes[name]) {
        continue;
      }
      if (this.generatedTypes[name]) {
        finishedTypes[name] = this.generatedTypes[name];
      } else {
        if (properties) {
          const typeBody = Object.entries(properties)
            .map(([key, childSchema]) => {
              if (this._isNameSchema(childSchema)) {
                todoTypes.push(childSchema);
              }
              if (
                childSchema.type === 'array' &&
                this._isNameSchema(childSchema.items)
              ) {
                todoTypes.push(childSchema.items);
              }
              return `
                /* ${childSchema.description || key} */
                ${key}: ${this.generateTypeValue(childSchema)};`;
            })
            .join('');
          const typeString = `
            /* ${description || name} */
            export type ${name} = {
              ${typeBody}
            }
          `;
          this.generatedTypes[name] = typeString;
          finishedTypes[name] = this.generatedTypes[name];
        }
      }
    }

    const typePrefix = `API.${this._camelToPascal(this.moduleName)}`;
    return `
    declare namespace ${typePrefix} {
      ${Object.values(finishedTypes).join('\n')}
    }
    `;
  }
}

export default SwaggerToTs;
