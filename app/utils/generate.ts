import { isLinkSchema, getRealSchema } from '.';
import {
  LinkSchema,
  NormalSchema,
  ReqMethodOptions,
  SwaggerDocsResponse,
} from '../lib/definitions';
import { formatTsString } from './format';

export const withTypeWrapper = (
  typeName: string,
  typeBody: string,
  description?: string,
) => {
  return `
    /* ${description || typeName} */
    type ${typeName} = {
      ${typeBody}
    }
  `;
};

export const generateTypeString = ({
  key,
  type,
  description,
  isArray,
  required,
}: {
  key: string;
  type: string;
  description?: string;
  isArray?: boolean;
  required?: boolean;
}) => {
  if (!['string', 'object', 'array', 'integer'].includes(type)) {
    console.log('type', type);
  }
  let trueType = '';

  switch (type) {
    case 'integer':
      trueType = 'number';
      break;
    case 'object':
      trueType = 'Record<string, any>';
      break;
    default:
      trueType = type;
  }

  return `
  /* ${description || key} */
  ${key}${required ? '' : '?'}: ${trueType}${isArray ? '[]' : ''};`;
};

export const generateArrayType = (key: string, arraySchema: any) => {
  const { description, items } = arraySchema;
  const childType = items.type;

  if (items.type === 'object') {
    const { typeName, description: childDescription } = items as any;
    return generateTypeString({
      key,
      type: typeName,
      description: childDescription,
      isArray: true,
    });
  }
  // 这里可能有嵌套数组的情况，暂未考虑
  return generateTypeString({
    key,
    type: childType,
    description,
    isArray: true,
  });
};

export const generateTypes = async (needToGenerateTypes: any[]) => {
  const generatedTypes: Record<string, string> = {};
  const todoTypes = needToGenerateTypes.slice();
  while (todoTypes.length > 0) {
    const curSchema = todoTypes.shift() as any;
    let target: string = '';
    if (curSchema.type === 'object') {
      const { properties, required = [] } = curSchema;

      const typeBodyString = Object.entries(properties)
        .map(([key, value]) => {
          const { type, description } = value as any;
          if (type === 'array') {
            todoTypes.push((value as any).items as any);
            return generateArrayType(key, value);
          }
          if (type === 'object' && (value as any).properties) {
            todoTypes.push(value as any);
            return generateTypeString({
              key,
              type: (value as any).typeName,
              description,
            });
          }
          return generateTypeString({
            key: (value as any).typeName,
            type,
            description,
            required: required.includes((value as any).typeName),
          });
        })
        .join('');
      target = withTypeWrapper(
        curSchema.typeName,
        typeBodyString,
        curSchema.description,
      );
    }
    if (!generatedTypes[curSchema.typeName]) {
      generatedTypes[curSchema.typeName] = await formatTsString(target);
    }
  }
  return generatedTypes;
};

export const generateRealSchema = (
  rootSchema: LinkSchema | NormalSchema,
  resObj: SwaggerDocsResponse,
): any => {
  return {
    ...Object.entries(rootSchema).reduce(
      (target, [key, value]) => {
        if (Object.prototype.toString.call(value) === '[object Object]') {
          const [typeName, schema] = isLinkSchema(value)
            ? getRealSchema(value['$ref'], resObj)
            : ([key, value as any] as const);
          return {
            ...target,
            [key]: {
              ...(key === 'properties' || schema.type === 'array'
                ? {}
                : {
                    typeName,
                  }),
              ...generateRealSchema(schema, resObj),
            },
          };
        }
        return {
          ...target,
          [key]: value,
        };
      },
      {} as unknown as any,
    ),
  };
};

const getReqMethodName = (
  options: Pick<ReqMethodOptions, 'method' | 'description' | 'operationId'>,
) => {
  const { method, description, operationId } = options;

  if (method === 'get') {
    return `fetch${operationId[0].toUpperCase()}${operationId.slice(1)}`;
  }
  if (description.includes('新增') || description.includes('编辑')) {
    return operationId;
  }
  return operationId;
};

export const generateReqMethod = (options: ReqMethodOptions) => {
  const { url, description, method, operationId, reqTypeName, resTypeName } =
    options;

  const baseUrl = '/api/bankEnter';

  const relativeUrl = baseUrl ? url.replace(baseUrl, '') : url;

  const reqPayload = reqTypeName
    ? {
        key: method === 'get' ? 'params' : 'data',
        value: reqTypeName,
      }
    : null;

  return `
  /** @description ${description} */
  export const ${getReqMethodName(options)} = (${
    reqPayload ? `${reqPayload.key}: ${reqPayload.value}` : undefined
  }) =>
    request<${resTypeName || null}>({
      url: "${relativeUrl}",
      method: "${method}",
      ${reqPayload ? reqPayload.key : undefined}
    });`;
};
