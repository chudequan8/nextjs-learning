import {
  generateRealSchema,
  generateTypeString,
  generateTypes,
} from '@/app/utils/generate';
import { getRealSchema, isLinkSchema } from '@/app/utils';
import {
  LinkSchema,
  NormalSchema,
  SwaggerDocsInfo,
  SwaggerDocsResponse,
} from '../lib/definitions';
import { formatTsString } from './format';

type Ddd = [any[], any[]];

export const parseReqGetObject = async (
  reqObject: SwaggerDocsInfo,
  resObj: SwaggerDocsResponse,
) => {
  const { parameters, description, operationId } = reqObject;
  if (parameters) {
    const [nomalSchemaList, linkSchemaList] = parameters.reduce(
      (target, current) => {
        if (isLinkSchema(current.schema)) {
          const [typeName, schema] = getRealSchema(
            current.schema['$ref'],
            resObj,
          );
          return [
            target[0],
            [
              ...target[1],
              {
                ...generateRealSchema(schema, resObj),
                typeName,
              },
            ],
          ];
        } else {
          return [
            [
              ...target[0],
              {
                typeName: current.name,
                description: current.description || current.name,
                required: current.required,
                ...current.schema,
              },
            ],
            target[1],
          ];
        }
      },
      [[], []] as Ddd,
    );

    const normalTypeBodyString = nomalSchemaList
      .map((item) => {
        const { type, typeName, description, required } = item as any;
        return generateTypeString({
          key: typeName,
          type,
          description,
          required,
        });
      })
      .join('');
    const typeStringMap = await generateTypes(linkSchemaList as any[]);

    const reqParamsTypeString = `
      /* ${description} ${operationId} */
      type RequestParams = ${[
        ...(normalTypeBodyString
          ? [
              `{
        ${normalTypeBodyString}
      }`,
            ]
          : []),
        ...Object.keys(typeStringMap),
      ].join(' & ')}
    `;
    return {
      RequestParams: await formatTsString(reqParamsTypeString),
      ...typeStringMap,
    };
  }
  return {};
};

export const parseReqPostObject = async (
  reqObject: SwaggerDocsInfo,
  resObj: SwaggerDocsResponse,
) => {
  const { requestBody } = reqObject;
  const schema = requestBody?.content?.['application/json']?.schema;

  const [typeName, targetSchema] =
    schema && isLinkSchema(schema)
      ? getRealSchema(schema['$ref'], resObj)
      : ['RequestParams', schema];
  const schemaMap = {
    ...generateRealSchema(targetSchema, resObj),
    typeName,
  };
  const resTypeMap = await generateTypes([schemaMap]);
  return resTypeMap || {};
};

export const parseResObject = async (
  resObject: SwaggerDocsInfo['responses'],
  resObj: SwaggerDocsResponse,
) => {
  const resSchema = resObject?.['200']?.content?.['*/*']?.schema;
  if (resSchema && isLinkSchema(resSchema)) {
    const [typeName, targetSchema] = getRealSchema(resSchema['$ref'], resObj);
    // console.log('typeName', typeName);
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

export const toSchemaMap = async (schema: LinkSchema | NormalSchema) => {};

export const parseReqObject = {
  get: parseReqGetObject,
  post: parseReqPostObject,
  put: parseReqPostObject,
};
