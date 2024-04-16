type ReqMethodTuple = ["get", "post", "put", "delete"];

type ParameterInTuple = ["path", "query", "body", "header"];

declare namespace SwaggerV2 {

  type Options = {
    // 要转化的api的根路径
    baseUrl: string;
    // 模块名，本工具是根据模块名生成对应请求方法和类型的，因此该字段必传
    moduleName?: string;
    // 生成的类型的前缀
    typePrefix?: string;
    // 给生成的ts类型字段加?用的，暂时先不加
    useRequired?: boolean;
    // 要提取的基础类型，一般为框架自带的全局通用返回，传入后该类型会被忽略
    extractType?: string;
  };

  type ReqMethod = ReqMethodTuple[number];

  type ParameterType = {
    in: ParameterInTuple[number];
    name: string;
    required?: boolean;
    schema?: Schema.AllSchemaWithRef;
  } & Schema.AllSchema;

  type ResponseType = {
    "200": {
      description?: "OK";
      schema?: Schema.AllSchemaWithRef;
    };
  };

  type ApiInfo = {
    /* API名称 */
    summary?: string;
    /* API所属模块 */
    tags?: string[];
    /* API描述 */
    description?: string;
    /* API操作ID（不知道） */
    operationId: string;
    /* 请求参数（2.0版本都用这个字段存请求参数） */
    parameters?: ParameterType[];
    responses: ResponseType;
    responsesObject: ResponseType;
  };

  type ReqMethodMap = Record<ReqMethod, ApiInfo>;

  type ApiDocument = {
    swagger: string;
    paths: Record<string, Partial<ReqMethodMap>>;
    definitions: Record<string, Schema.ObjectSchema>;
  };

  type ParsedReqApiInfo = Partial<
    Record<Exclude<ParameterType["in"], "header">, Schema.ParsedSchema[]>
  >;

  type ParsedApiInfo = {
    operationId: string;
    path: string;
    method: ReqMethod;
    description?: string;
    res: Schema.ParsedSchema[] | null;
    req: ParsedReqApiInfo | null;
  };

  type ReqPayload = {
    payload: string[];
    payloadTypeName: "data" | "params" | null;
    resTypeName: string | null;
    url: string;
  };
}
