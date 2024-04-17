import { translateTypeNames} from '@/app/lib/data';
import { formatTsString } from '@/app/utils/format';
import pascalcase from 'pascalcase';

const defaultOptions = {
  baseUrl: '/',
  useRequired: false,
};
const baseTypeToSchema: Record<string, Schema.ParsedSchema['type']> = {
  string: 'string',
  integer: 'integer',
  int: 'integer',
  long: 'integer',
  boolean: 'boolean',
  array: 'array',
  object: 'object',
};

const chineseCharRegex = /[\u4e00-\u9fff]/g;
const genericTypeReg = new RegExp(/(?<=«)[^》]+(?=»)/g);

class SwaggerV2ToTs {
  private swaggerApi: SwaggerV2.ApiDocument;
  private options: SwaggerV2.Options;
  private _curGenericType: string | null = null;
  _nameMap: Map<string, string | null> = new Map();
  _enumMap: Map<string, string | null> = new Map();
  private _getedSchemaMap: Record<
    string,
    Schema.ParsedObjectSchema
  > = {};
  private _generatedTypes: Record<string, string> = {};

  constructor(
    swagger: SwaggerV2.ApiDocument,
    options?: Partial<SwaggerV2.Options>,
  ) {
    this.swaggerApi = swagger;
    this.options = { ...defaultOptions, ...options };
    if (this.options.moduleName) {
      this.options.typePrefix = `API.${pascalcase(this.options.moduleName)}`;
    }
  }

  private _isObject(value: unknown): value is Schema.AllSchemaWithRef {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  _isParsedObjectSchema(
    schema?: unknown,
  ): schema is Schema.ParsedObjectSchema {
    if (!schema) {
      return false;
    }
    return schema.hasOwnProperty('properties');
  }

  private _isParsedArraySchema(
    schema?: unknown,
  ): schema is Schema.ArraySchema<'parsed'> {
    if (!schema) {
      return false;
    }
    return schema.hasOwnProperty('items');
  }

  private _isRefSchema(
    schema?: Schema.AllSchemaWithRef,
  ): schema is Schema.RefSchema {
    if (!schema) {
      return false;
    }
    return schema.hasOwnProperty('$ref');
  }

  // private async _transformName() {
  //   const toTransformNameList = Array.from(this._nameMap.keys());
  //   // console.log('toTransformNameList', toTransformNameList)
  //   const res = await startChat(toTransformNameList);
  //   if (res.message.content) {
  //     try {
  //       const transformedList = res.message.content.split(",").map(n => n.trim());
  //       if (transformedList.length === toTransformNameList.length) {
  //         // 所有中文都翻译完了，塞回Map里面去
  //         toTransformNameList.forEach((name, index) => {
  //           this._nameMap.set(name, transformedList[index]);
  //         })
  //       } else {
  //         console.log('gpt transform error', res.message);
  //       }
  //     } catch (error) {
  //       console.log('gpt transform error', res.message);
  //     }
  //   }
  // }

  private async _transformNameByYouDao() {
    const toTransformNameList = Array.from(this._nameMap.keys());
    console.log('_transformNameByYouDao', toTransformNameList);
    const res = await translateTypeNames(toTransformNameList);
    if (res.translateResults?.length) {
      try {
        if (res.translateResults.length === toTransformNameList.length) {
          // 所有中文都翻译完了，塞回Map里面去
          toTransformNameList.forEach((name, index) => {
            const translationText = res.translateResults?.[index]?.translation as string;
            const pascalcaseName = translationText.split(" ").map(n => pascalcase(n)).join("");
            this._nameMap.set(name, pascalcaseName);
          })
        } else {
          console.log('youdao transform error', res.errorCode);
        }
      } catch (error) {
        console.log('youdao transform error', res.errorCode);
      }
    }
  }

  // async _transformEnumType() {
  //   const toTransformEnumList = Array.from(this._enumMap.keys());
  //   const res = await toTranformEnumChat(toTransformEnumList);
  //   return [JSON.stringify(toTransformEnumList, undefined, 2), JSON.stringify(res, undefined, 2)];
  // }

  /**
   * 替换类型字符串中的特定字符并分割处理，此处没有考虑书名号是否成对出现
   * @param typeString 待处理的类型字符串
   * @returns 返回一个字符串数组，包含去掉类型括号的所有类型名称
   * @example _replaceType("ddd«string»") => ["ddd", "string"]
   */
  // private _replaceType(typeString: string) {
  //   return typeString
  //     .replace(/«|»/g, ',')
  //     .split(',')
  //     .filter((str) => !!str);
  // }

  private _getRealSchema(path: string): [string, Schema.ParsedSchema] {
    const pathList = path.replace('#/', '').split('/');
    let curSchema: Record<string, any> = this.swaggerApi;
    let curPath: string | undefined = undefined;
    while (true) {
      curPath = pathList.shift() as string;
      if (!pathList.length) {
        if (!curPath) {
          throw new Error('path格式错误');
        }
        // 这里会出现curPath等于一些基础类型的情况，做下映射
        if (baseTypeToSchema[curPath]) {
          return [
            '',
            {
              type: baseTypeToSchema[curPath] as any,
            },
          ];
        } else {
          curSchema = curSchema[curPath];
        }
        break;
      }
      curSchema = curSchema[curPath];
    }
    return [curPath.replaceAll("-", ""), curSchema as Schema.ParsedObjectSchema] as const;
  }

  generateSchemaLoop(rootSchema: Schema.AllSchemaWithRef): Schema.ParsedSchema | null {
    if (this._isParsedArraySchema(rootSchema) && this._isRefSchema(rootSchema.items)) {
      // 添加泛型标识，后续要转成'T'
      if (this._curGenericType && rootSchema.items["originalRef"] === this._curGenericType) {
        const { items, type, ...other } = rootSchema;
        return {
          ...other,
          type: "generic",
        };
      }
    }
    if (this._isRefSchema(rootSchema)) {
      // 添加泛型标识，后续要转成'T'
      if (this._curGenericType && rootSchema["originalRef"] === this._curGenericType) {
        const { originalRef, $ref, ...other } = rootSchema;
        return {
          ...other,
          type: "generic",
        };
      }
      const [schemaName, schema] = this._getRealSchema(rootSchema['$ref']);

      const name = ((rootSchema as any).name || schemaName)?.replaceAll("-", "");

      if (this._getedSchemaMap[name]) {
        return {
          ...this._getedSchemaMap[name],
          name,
        };
      }

      // 比如一些Void类型，直接设为null就行
      if (!schema) {
        return null;
      }
      if (!name) {
        // console.warn('rootSchema', rootSchema);
        return schema;
      }

      // 如果schema的name是中文或者包含中文，先存起来，后面统一用gpt翻译一下，最后生成的时候做个映射
      if (name.match(chineseCharRegex)?.length) {
        this._nameMap.set(name, null);
      }
      const parsedSchema = {
        name,
        ...this.generateSchemaLoop(schema),
      } as Schema.ParsedObjectSchema;
      this._getedSchemaMap[name] = parsedSchema;
      return parsedSchema;
    }

    return Object.entries(rootSchema || {}).reduce((target, [key, value]) => {
      if (this._isObject(value)) {
        if (key.toLowerCase().includes("status") && value.hasOwnProperty("description")) {
          this._enumMap.set((value as Schema.ParsedSchema).description as string, null);
        }
        return {
          ...target,
          [key]: this.generateSchemaLoop(value),
        };
      }
      return {
        ...target,
        [key]: value,
      };
    }, {}) as Schema.ParsedSchema;
  }

  _generateReqSchema(
    apiInfo: SwaggerV2.ApiInfo,
  ): SwaggerV2.ParsedReqApiInfo | null {
    const { parameters, operationId, summary, description } = apiInfo;
    if (!parameters || !parameters.length) {
      return null;
    }
    return (
      parameters.filter((item) => {
        if (!/^[a-zA-Z][a-zA-Z_]*$/.test(item.name) || item.in === 'header') {
          console.warn(
            'parameters name 不符合规范',
            apiInfo.operationId,
            item.name,
          );
          return false;
        }
        return true;
      }) as (Omit<SwaggerV2.ParameterType, 'in'> & {
        in: Exclude<SwaggerV2.ParameterType['in'], 'header'>;
      })[]
    ).reduce((target, item) => {
      const { in: parametersIn, schema, required = false, ...other } = item;
      // 都是普通类型的schema，用一个object来装
      if (this._isRefSchema(schema)) {
        const schemaObj = this.generateSchemaLoop(schema);
        return {
          ...target,
          [parametersIn]: [...(target[parametersIn] || []), schemaObj],
        };
      }
      const mergedSchema = {
        ...item.schema,
        ...other,
      } as Schema.ParsedSchema & {
        name: string;
      };
      if (['object', 'array'].includes(mergedSchema.type)) {
        // console.warn('暂时没有考虑object和array的情况', mergedSchema);
        // return target;
      }
      if (parametersIn === 'path') {
        return {
          ...target,
          [parametersIn]: [...(target[parametersIn] || []), mergedSchema],
        };
      } else {
        if (!target[parametersIn]) {
          target[parametersIn] = [
            {
              name: pascalcase(operationId),
              type: 'object',
              properties: {},
              required: [],
              description: summary || description,
            },
          ];
        }
        const current = (
          target[parametersIn] as Schema.ParsedObjectSchema[]
        )[0];
        current?.properties &&
          (current.properties[mergedSchema.name] = mergedSchema);
        current &&
          required &&
          (current.required as string[]).push(mergedSchema.name);
        return target;
      }
    }, {} as SwaggerV2.ParsedReqApiInfo);
  }

  _generateGenericTypeList(ref: string, originalRef: string) {
    let matchStr = originalRef;

    if (
      this.options.extractType &&
      new RegExp(`^${this.options.extractType}«.*»$`).test(matchStr)
    ) {
      matchStr = matchStr.match(genericTypeReg)?.[0] || "";
    }
    const typeArr: any[] = [];
    while (matchStr.length) {
      if (matchStr) {
        if (["Void", "string"].includes(matchStr)) {
          typeArr.push({
            name: matchStr,
            type: matchStr.toLowerCase(),
          });
          break;
        }
        // Map类型的先不处理了
        if (/^Map«.*»$/.test(matchStr)) {
          matchStr = matchStr.match(genericTypeReg)?.[0] || "";
          typeArr.push({
            name: matchStr,
            type: "object",
            returnType: "Map",
          });
          break;
        }
        let returnType: string | null = null;
        if (/^List«.*»$/.test(matchStr)) {
          matchStr = matchStr.match(genericTypeReg)?.[0] || "";
          returnType = "List";
        }
        typeArr.push({
          name: matchStr,
          $ref: ref.replace(originalRef, matchStr),
          ...(returnType
            ? {
                returnType,
              }
            : {}),
        });
      }
      matchStr = matchStr.match(genericTypeReg)?.[0] || "";
    }
    // console.log("typeArr", typeArr);
    const typeWithGenericList = typeArr.map((item, index) => {
      if (item.$ref) {
        const { name, $ref, ...other } = item;
        const next = typeArr[index + 1];
        let extendItem = item;
        if (next) {
          const nextName = next.returnType ? `${next.returnType}«${next.name}»` : next.name;
          extendItem = {
            name: name.replace(`«${nextName}»`, ""),
            $ref,
          };
          this._curGenericType = next.name;
        }
        const parsedSchema = this.generateSchemaLoop(extendItem);
        this._curGenericType = null;
        if (!!next && parsedSchema === null) {
          console.log("parsedSchema", extendItem);
        }
        const genericSchema = {
          ...other,
          // 只要还有下一个元素，当前项一定是泛型
          generic: !!next,
          ...parsedSchema,
        };
        if (genericSchema.name) {
          this._getedSchemaMap[genericSchema.name] = genericSchema;
        }
        return genericSchema;
      }
      return item;
    });
    return typeWithGenericList;
  }

  _generateResSchema(apiInfo: SwaggerV2.ApiInfo) {
    const resSchema = apiInfo.responses?.['200']?.schema;
    if (!resSchema) {
      return null;
    }
    // 如果是泛型，需要对每一个类型都生成一个schema
    if (this._isRefSchema(resSchema) && genericTypeReg.test(resSchema.originalRef)) {
      return this._generateGenericTypeList(resSchema.$ref, resSchema.originalRef);
    }
    const parsedResSchema = this.generateSchemaLoop(resSchema);
    return parsedResSchema ? [parsedResSchema] : null;
  }

  _getResTypeName(resSchemaList: Schema.ParsedSchema[] | null) {
    const resTypeNameList = (resSchemaList || []).map((item) => this.generateTypeValue(item, true));
    let resTypeName: string | null = null;
    while (resTypeNameList.length > 0) {
      const currentType = resTypeNameList.pop() as string;
      resTypeName = resTypeName ? `${currentType}<${resTypeName}>` : currentType;
    }
    return resTypeName
  }

  _getReqPayload(parsedApi: SwaggerV2.ParsedApiInfo) {
    const { req, res, path: apiPath } = parsedApi;

    const defaultPayload: SwaggerV2.ReqPayload = {
      url: apiPath,
      // 参数：id, data
      payload: [],
      payloadTypeName: null,
      resTypeName: this._getResTypeName(res)
    };

    if (!req || (!req.path && !req.body && !req.query)) {
      // 有 formData 的情况，暂时不支持
      return {
        ...defaultPayload,
        url: `"${defaultPayload.url}"`,
      };
    }

    const { path = [], body = [], query = [] } = req;
    let returnPayload = { ...defaultPayload };
    if (path.length > 0) {
      // 暂时考虑单个情况，后面再考虑组合情况
      if (path.length > 1) {
        // console.warn('path: 暂时没考虑多个schema', parsedApi);
      }
      returnPayload = path.reduce((target, parsedSchema) => {
        const { name } = parsedSchema as any;
        return name && target.url.includes(`{${name}}`)
          ? {
              ...target,
              payload: [
                ...target.payload,
                `${name}: ${this.generateTypeValue(parsedSchema, true)}`,
              ],
              url: `\`${target.url.replace(`{${name}}`, `\${${name}}`)}\``,
            }
          : target;
      }, returnPayload);
    }
    if (body.length > 0) {
      // 暂时考虑单个情况，后面再考虑多个情况
      if (body.length > 1) {
        // console.warn('body: 暂时没考虑多个schema', parsedApi);
      }
      returnPayload = body.reduce((target, parsedSchema) => {
        return {
          ...target,
          payload: [
            ...target.payload,
            `data: ${this.generateTypeValue(parsedSchema, true)}`,
          ],
          payloadTypeName: 'data',
        };
      }, returnPayload);
    }
    if (query.length > 0) {
      // console.log('query', query);
      if (query.length > 1) {
        // console.warn('query: 暂时没考虑多个schema', parsedApi);
      }
      returnPayload = query.reduce((target, parsedSchema) => {
        return {
          ...target,
          payload: [
            ...target.payload,
            `params: ${this.generateTypeValue(parsedSchema, true)}`,
          ],
          payloadTypeName: 'params',
        };
      }, returnPayload);
    }

    return {
      ...returnPayload,
      url:
        returnPayload.url.startsWith('`') && returnPayload.url.endsWith('`')
          ? returnPayload.url
          : `"${returnPayload.url}"`,
    };
  }

  /**
   * @description 获取所提供参数对应模块下的所有接口
   * @param moduleName 模块名
   *  */
  getSwaggerDocsByModule() {
    const { baseUrl, moduleName } = this.options;
    if (!moduleName) {
      throw new Error('请提供模块名');
    }
    const startPath = `${baseUrl}${moduleName}`;

    const swaggerDocsByModule = Object.entries(this.swaggerApi.paths)
      .map(([path, reqMethodMap]) => {
        if (path.includes(startPath)) {
          const [reqMethod, apiInfo] = Object.entries(reqMethodMap).flatMap(
            (n) => n,
          ) as [SwaggerV2.ReqMethod, SwaggerV2.ApiInfo];

          const { description, summary, operationId } = apiInfo;

          return {
            path: path.replace(baseUrl, '/'),
            method: reqMethod,
            description: description || summary,
            operationId,
            req: this._generateReqSchema(apiInfo),
            res: this._generateResSchema(apiInfo),
          };
        }
        return undefined;
      })
      .filter(Boolean) as SwaggerV2.ParsedApiInfo[];
    return swaggerDocsByModule;
  }

  async generateReqMethodList(parsedApis: SwaggerV2.ParsedApiInfo[]) {
    // 先放这边吧，没找到合适的地方翻译中文
    await this._transformNameByYouDao();
    const reqMethodStr = parsedApis
      .map((parsedApi) => {
        const { operationId, description, method } = parsedApi;
        const { url, payload, payloadTypeName, resTypeName } =
          this._getReqPayload(parsedApi);
        // console.log("payload", payload);
        return `
      /** @description ${description} */
      export const ${operationId} = (${payload.join(',')}) => 
        request<${resTypeName}>({
          url: ${url},
          method: "${method}",
          ${payloadTypeName || ''}
        });`;
      })
      .join('\n');
    const formatedStr = await formatTsString(reqMethodStr);
    return formatedStr;
  }

  generateTypeValue(
    value: Schema.ParsedSchema,
    addPrefix: boolean = false,
  ): string {
    const { type, returnType } = value;
    switch (type) {
      case "generic": {
        return "T";
      }
      case 'array': {
        const { items } = value;
        if (this._isParsedObjectSchema(items)) {
          const typeName = this._nameMap.get(items.name) || items.name;
          return `${
            addPrefix ? `${this.options.typePrefix}.` : ''
          }${typeName}[]`;
        }
        return `${this.generateTypeValue(items, addPrefix)}[]`;
      }
      case 'object': {
        if (this._isParsedObjectSchema(value)) {
          const typeName = this._nameMap.get(value.name) || value.name;
          return `${addPrefix ? `${this.options.typePrefix}.` : ""}${typeName}${
            returnType === "List" ? "[]" : ""
          }`;
        }
        return 'Record<string, any>';
      }
      case 'integer':
        return 'number';
      case 'boolean':
        return 'boolean';
      case "void":
        return "null";
      case 'string':
      default:
        return 'string';
    }
  }

  async generateTypeList(schemas: Schema.ParsedSchema[]) {
    const todoTypes = schemas.slice();
    const finishedTypes: Record<string, string> = {};

    while (todoTypes.length) {
      const curSchema = todoTypes.shift() as Schema.ParsedSchema;
      if (this._isParsedObjectSchema(curSchema)) {
        const { name, properties = {}, description, generic = false } = curSchema;
        const typeName = this._nameMap.get(name) || name;
        if (!typeName || finishedTypes[typeName]) {
          continue;
        }
        if (this._generatedTypes[typeName]) {
          finishedTypes[typeName] = this._generatedTypes[typeName];
        } else {
          const typeBody = Object.entries(properties)
            .map(([key, childSchema]) => {
              if (this._isParsedObjectSchema(childSchema)) {
                todoTypes.push(childSchema);
              }
              if (
                this._isParsedArraySchema(childSchema) &&
                this._isParsedObjectSchema(childSchema.items)
              ) {
                todoTypes.push(childSchema.items);
              }
              // if (childSchema.description && this._enumMap.get(childSchema.description) === null) {
              //   console.log("childSchema", key, childSchema);
              // }
              return `
                /* ${childSchema.description || key} */
                ${key}: ${this.generateTypeValue(childSchema)};`;
            })
            .join('');

            const typeString = `
              /* ${description || typeName} */
              export type ${typeName.replaceAll("-", "")}${generic ? "<T>" : ""} = {
                ${typeBody}
              }
            `;
          this._generatedTypes[typeName] = typeString;
          finishedTypes[typeName] = this._generatedTypes[typeName];
        }
      }
    }

    const formatedStr = await formatTsString(`
    declare namespace ${this.options.typePrefix} {
      ${Object.values(finishedTypes).join('\n')}
    }
    `);
    return formatedStr;
  }
}

export default SwaggerV2ToTs;
