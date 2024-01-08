import { isLinkSchema, getRealSchema } from '.';
import { ReqMethodOptions, SwaggerDocsResponse } from '../lib/definitions';
import { formatWithWrapper } from './format';

export const generateTypeString = (
  key: string,
  type: string,
  description?: string,
  isArray?: boolean,
) => {
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
  ${key}: ${trueType}${isArray ? '[]' : ''};`;
};

export const generateArrayType = (key: string, arraySchema: any) => {
  const { description, items } = arraySchema;
  const childType = items.type;

  if (items.type === 'object') {
    const { typeName, description: childDescription } = items as any;
    return generateTypeString(key, typeName, childDescription, true);
  }
  // 这里可能有嵌套数组的情况，暂未考虑
  return generateTypeString(key, childType, description, true);
};

export const generateTypes = async (needToGenerateTypes: any[]) => {
  const generatedTypes: Record<string, string> = {};
  const todoTypes = needToGenerateTypes.slice();
  while (todoTypes.length > 0) {
    const curSchema = todoTypes.shift() as any;
    let target: string = '';
    if (curSchema.type === 'object') {
      const { properties } = curSchema;

      const typeBodyString = Object.entries(properties)
        .map(([key, value]) => {
          const { type, description } = value as any;
          if (type === 'array') {
            todoTypes.push((value as any).items as any);
            return generateArrayType(key, value);
          }
          if (type === 'object' && (value as any).properties) {
            todoTypes.push(value as any);
            return generateTypeString(
              key,
              (value as any).typeName,
              description,
            );
          }
          return generateTypeString((value as any).typeName, type, description);
        })
        .join('');
      target = await formatWithWrapper(
        curSchema.typeName,
        typeBodyString,
        curSchema.description,
      );
    } else {
      const { type, typeName, description } = curSchema as any;
      const fff = generateTypeString(typeName, type, description);
      // console.log('fff', fff);
    }
    if (!generatedTypes[curSchema.typeName]) {
      generatedTypes[curSchema.typeName] = target;
    }
  }
  return generatedTypes;
};

export const generateRealSchema = (
  rootSchema: any,
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
    return;
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
