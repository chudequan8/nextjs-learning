import { JsonSchema } from './type';

type ParsedSchema = any

class JsonSchemaToTs {
  private schema: JsonSchema;
  public _todoSchemaMap: Map<string, ParsedSchema> = new Map();
  public completedSchemaMap: Map<string, string> = new Map();

  constructor(schema: JsonSchema) {
    this.schema = schema;
  }

  private _isObject(value: unknown): value is Record<string, any> {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  private _isRefSchema(schema?: any) {
    if (!schema) {
      return [false];
    }
    if (typeof schema.$ref === 'string') {
      return [true];
    }
    if (typeof schema.items?.$ref === 'string') {
      return [true, true];
    }
    return [false];
  }

  private _getRealSchema(path: string): [string, Schema.ParsedSchema] {
    const pathList = path.replace('#/', '').split('/');
    let curSchema: Record<string, any> = this.schema;
    let curPath: string | undefined = undefined;
    while (true) {
      curPath = pathList.shift() as string;
      if (!pathList.length) {
        if (!curPath) {
          throw new Error('path格式错误');
        }
        curSchema = curSchema[curPath];
        break;
      }
      curSchema = curSchema[curPath];
    }
    return [curPath.replaceAll('-', ''), curSchema as Schema.ParsedSchema];
  }

  private _generateTypeValue(
    value: Schema.ParsedSchema,
    addPrefix: boolean = false,
  ): string {
    const { type } = value;
    switch (type) {
      case 'generic': {
        return 'T';
      }
      case 'array': {
        const { items } = value;
        console.log('123123', value);
        // if (this._isParsedObjectSchema(items)) {
        //   const typeName = this._nameMap.get(items.name) || items.name;
        //   return `${
        //     addPrefix ? `${this.options.typePrefix}.` : ''
        //   }${typeName}[]`;
        // }
        return `${this._generateTypeValue(items, addPrefix)}[]`;
      }
      case 'object': {
        console.log('44444444', value);
        // if (this._isParsedObjectSchema(value)) {
        //   const typeName = this._nameMap.get(value.name) || value.name;
        //   return `${addPrefix ? `${this.options.typePrefix}.` : ''}${typeName}${
        //     returnType === 'List' ? '[]' : ''
        //   }`;
        // }
        return 'Record<string, any>';
      }
      case 'integer':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'void':
        return 'null';
      case 'string':
      default:
        return 'string';
    }
  }

  getResourceByName(name: string) {
    return this._getRealSchema(this.schema.discriminator.mapping[name]);
  }

  getTypeValue(definition: any) {
    if (definition.const) {
      return `'${definition.const}'`
    }
    if (Array.isArray(definition.enum) || Array.isArray(definition.items?.enum)) {
      // todo: 联合类型的数组
      const enumArr = definition.enum || definition.items?.enum;
      return `'${enumArr.join("' | '")}'`;
    }
    const [isRef, isArrayRef] = this._isRefSchema(definition);
    if (isRef) {
      const [schemaName, schema] = this._getRealSchema(
        isArrayRef ? definition.items.$ref : definition.$ref,
      );
      if (['string', 'number', 'boolean'].includes(schema.type || '')) {
        return schema.type
      }
      if (
        !this._todoSchemaMap.has(schemaName) &&
        !this.completedSchemaMap.has(schemaName)
      ) {
        this._todoSchemaMap.set(schemaName, {
          name: schemaName,
          ...schema,
        });
      }
      return `${schemaName}${isArrayRef ? '[]' : ''}`;
    }
    return this._generateTypeValue(definition)
  }

  generateSchemaByResource(resource: any) {
    const { properties, name, description, required = [] } = resource;
    if (!this._isObject(properties)) {
      return `
      /* ${description || name} */
      export type ${name.replaceAll('-', '')} = any
    `;
    }
    const typeBody = Object.entries(properties)
      .map(([key, def]) => {
        return `/* ${def.description || key} */
          ${key}${required.includes(key) ? '' : '?'}: ${this.getTypeValue(def)};`;
      })
      .join('\n');
    
    const typeString = `
      /* ${description || name} */
      export type ${name.replaceAll('-', '')} = {
        ${typeBody}
      }
    `;
    this.completedSchemaMap.set(name, typeString);
    return typeString;
  }

  generateSchemaLoop() {
    let arr = [];
    while (this._todoSchemaMap.size > 0) {
      const [name, schema] = this._todoSchemaMap.entries().next().value!;
      arr.push(this.generateSchemaByResource(schema));
      this._todoSchemaMap.delete(name);
    }
    return arr.join('\n');
  }

  generateSchemaByResourceName(name: string) {
    const [schemaName, schema] = this.getResourceByName(name);
    this._todoSchemaMap.set(schemaName, {
      name: schemaName,
      ...schema,
    });
    return this.generateSchemaLoop()
  }
}

export default JsonSchemaToTs;
