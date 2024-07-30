import request from "../lib/request";

export type SwaggerOptions = {
  id: number;
  baseUrl: string;
  module: string;
  extractType?: string;
}

export type ModuleReqParams = Pick<SwaggerOptions, "id" | "baseUrl">

export const getModuleListByBaseUrl = async (params: ModuleReqParams) => {
  return request<string[]>({
    url: '/swagger/moduleName',
    method: 'get',
    params,
  });
};

export const generateReqMethods = async (data: SwaggerOptions) => {
  return request<{
    reqMethods: string;
    typeString: string;
  }>({
    url: '/swagger/reqMethods',
    method: 'post',
    data,
  });
}