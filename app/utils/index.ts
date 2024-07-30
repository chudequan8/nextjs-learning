import { readFile } from 'node:fs/promises';

export const readSwaggerDocs = async (id: number) => {
  try {
    const filePath = `./public/swagger/${id}.json`;
    const contents = await readFile(filePath, { encoding: 'utf8' });
    const swaggerDocs = JSON.parse(contents) as SwaggerV2.ApiDocument;
    return swaggerDocs
  } catch (err) {
    console.error('读取swagger文件失败:', err);
    return null;
  }
}

export const getModuleNameListByBaseUrl = (paths: SwaggerV2.ApiDocument["paths"], baseUrl: string) => {

  const moduleNameList = Object.keys(paths || {}).reduce(
    (target, current) => {
      if (!current.startsWith(baseUrl)) {
        return target;
      }
      const pathNameList = current.replace(baseUrl, '').split('/');
      if (
        pathNameList[0] &&
        !target.includes(pathNameList[0]) &&
        pathNameList.length >= 2
      ) {
        return [...target, pathNameList[0]];
      }
      return target;
    },
    [] as string[],
  );
  
  return moduleNameList;
}
