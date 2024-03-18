type ReqMethodTuple = ['get', 'post', 'put', 'delete'];

declare namespace Swagger {
  type ReqMethod = ReqMethodTuple[number];
  type ReqMethodMap = Record<ReqMethod, ApiInfo>;
  type PathMap = Record<string, ReqMethodMap>;

  type LinkSchema = {
    $ref: string;
  };

  type StringSchema = {
    type: 'string';
    format?: 'binary' | 'date-time';
    description?: string;
  };
  type IntSchema = {
    type: 'integer';
    format: 'int32' | 'int64';
    description?: string;
  };
  type ArraySchema = {
    type: 'array';
    items: ParsedSchema;
    description?: string;
  };

  type ObjectSchema = {
    type: 'object';
    properties: Record<string, ParsedSchema>;
    name?: string;
    description?: string;
    required?: string[];
  };

  type NamedSchema = Omit<ObjectSchema, 'name'> & {
    name: string;
  };

  type SchemaType = any;

  type UnparseSchema = LinkSchema | SchemaType;

  type ParsedSchema = StringSchema | IntSchema | ArraySchema | ObjectSchema;

  type ComponentsMap = {
    schemas: Record<string, ObjectSchemaType>;
  };

  type ParameterType = {
    in: 'path' | 'query' | 'body' | 'header';
    name: string;
    required?: boolean;
    schema: UnparseSchema;
  };

  export type ApiInfo = {
    /* API名称 */
    summary: string;
    /* API所属模块 */
    tags: string[];
    /* API描述 */
    description: string;
    /* API操作ID（不知道） */
    operationId: string;
    /* 请求参数（get请求） */
    parameters?: ParameterType[];
    /* 请求体（post请求） */
    requestBody?: {
      content: {
        'application/json': {
          schema: UnparseSchema;
        };
      };
    };
    responses: {
      200: {
        description?: string;
        content: {
          '*/*': {
            schema: UnparseSchema;
          };
        };
      };
    };
  };

  type ReqParsedSchema = {
    body?: Swagger.ParsedSchema;
    query?: Record<string, Swagger.ParsedSchema>;
    path?: Record<string, Swagger.ParsedSchema>;
    header?: any;
  };

  type ParsedSchemaOptions = Pick<
    ApiInfo,
    'description' | 'summary' | 'operationId'
  > & {
    path: string;
    method: ReqMethod;
    res: ParsedSchema | null;
    req: ReqParsedSchema | null;
  };

  type ReqPayload = {
    key: string;
    value: string;
    url?: string;
  };

  type Response = {
    paths: PathMap;
    components: ComponentsMap;
    [key: string]: any;
  };
}

declare namespace SwaggerV2 {
  type ReqMethod = Swagger.ReqMethod;
  type Response = {
    paths: Swagger.PathMap;
    definitions: Swagger.ComponentsMap;
    swagger: '2.0';
  };

  type ApiInfo = Omit<Swagger.ApiInfo, 'requestBody' | 'responses'> & {
    responses: {
      200: {
        description?: string;
        schema: UnparseSchema;
      };
    };
  }
}
