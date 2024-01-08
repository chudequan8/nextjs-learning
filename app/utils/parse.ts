import { generateRealSchema, generateTypes } from '@/app/utils/generate';
import { getRealSchema, isLinkSchema } from '@/app/utils';
import { SwaggerDocsInfo, SwaggerDocsResponse } from '../lib/definitions';

export const parseReqGetObject = async (
  reqObject: SwaggerDocsInfo,
  resObj: SwaggerDocsResponse,
) => {
  const { parameters, description, operationId } = reqObject;
  if (parameters) {
    const schemaList = parameters
      .map((item) => {
        if (isLinkSchema(item.schema)) {
          const [typeName, schema] = getRealSchema(item.schema['$ref'], resObj);
          return {
            ...generateRealSchema(schema, resObj),
            typeName,
          };
        }
        const { name, description } = item;
        return {
          typeName: name,
          description: description || name,
          ...item.schema,
        };
      })
      .filter(Boolean);
    console.log('schemaList', schemaList);
    if (schemaList.length) {
      const typeStringMap = await generateTypes(schemaList as any[]);
      console.log('typeStringMap', typeStringMap);
      const reqParamsTypeString = `
        /* ${description} ${operationId} */
        type RequestParams = ${Object.keys(typeStringMap).join(' & ')}
      `;
      return {
        RequestParams: reqParamsTypeString,
        ...typeStringMap,
      };
    }
  }
  return {};
};

export const parseReqPostObject = async (
  reqObject: SwaggerDocsInfo,
  resObj: SwaggerDocsResponse,
) => {
  const { requestBody } = reqObject;
  const schema = requestBody?.content?.['application/json']?.schema;
  if (schema && isLinkSchema(schema)) {
    const [typeName, targetSchema] = getRealSchema(schema['$ref'], resObj);
    const schemaMap = {
      ...generateRealSchema(targetSchema, resObj),
      typeName,
    };
    const resTypeMap = await generateTypes([schemaMap]);
    if (resTypeMap) {
      return resTypeMap;
    }
  }
  return {};
};

export const parseResObject = async (
  resObject: SwaggerDocsInfo['responses'],
  resObj: SwaggerDocsResponse,
) => {
  const resSchema = resObject?.['200']?.content?.['*/*']?.schema;
  if (resSchema && isLinkSchema(resSchema)) {
    const [typeName, targetSchema] = getRealSchema(resSchema['$ref'], resObj);
    console.log('typeName', typeName);
    const schemaMap = {
      ...generateRealSchema(targetSchema, resObj),
      typeName,
    };
    const resTypeMap = await generateTypes([schemaMap]);
    if (resTypeMap) {
      return resTypeMap;
    }
  }
  return {};
};

export const parseReqObject = {
  get: parseReqGetObject,
  post: parseReqPostObject,
};
