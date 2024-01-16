import {
  SwaggerDocsResponse,
  LinkSchema,
  ReqMethodMap,
  SwaggerDocsInfo,
} from '../lib/definitions';

export const isLinkSchema = (schema: any): schema is LinkSchema => {
  return schema.hasOwnProperty('$ref');
};

export const getRealSchema = (path: string, resObj: SwaggerDocsResponse) => {
  const pathList = path.replace('#/', '').split('/');
  let curSchema: Record<string, any> = resObj;
  let curPath: string | undefined = undefined;
  while (pathList.length && !!curSchema) {
    curPath = pathList.shift() as string;
    curSchema = curSchema[curPath];
  }

  return [replaceType(curPath as string), curSchema as any] as const;
};

export const getReq = (reqMethodObj: ReqMethodMap) => {
  return Object.entries(reqMethodObj)
    .filter(([key]) => ['get', 'post', 'put'].includes(key))
    .flatMap(([key, val]) => [key, val]) as [
    keyof ReqMethodMap,
    SwaggerDocsInfo,
  ];
};

export const replaceType = (typeString: string) => {
  const typeReg = new RegExp(/«([^«»]*)»/g);
  let targetString = typeString;

  while (typeReg.test(targetString)) {
    targetString = targetString.replace(typeReg, '');
  }

  return targetString;
};
