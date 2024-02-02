'use client';

import Editor from '@monaco-editor/react';
import { FC, useEffect, useState } from 'react';
import SwaggerToTs from '../swagger';
import { formatTsString } from '@/app/utils/format';

type Step2PageProps = {
  swaggerDocs: Swagger.Response;
  moduleName: string;
  baseUrl: string;
};

const Step2Page: FC<Step2PageProps> = ({
  swaggerDocs,
  moduleName,
  baseUrl,
}) => {
  const [reqMethods, setReqMethods] = useState<string>();
  const [resTypeList, setResTypeList] = useState<string>();

  const init = async () => {
    const swaggerToTs = new SwaggerToTs(swaggerDocs, baseUrl);
    const swaggerDocsByModule = swaggerToTs.getSwaggerDocsByModule(moduleName);
    const reqMethodPromiseList = swaggerDocsByModule.map((swaggerDoc) => {
      return formatTsString(swaggerToTs.generateReqMethod(swaggerDoc));
    });
    const reqMethodList = await Promise.all(reqMethodPromiseList);
    setReqMethods(reqMethodList.join('\n'));

    const todoSchemas = swaggerDocsByModule
      .flatMap((swaggerDoc) => {
        const { req, res } = swaggerDoc;
        return [...Object.values(req?.query || {}), req?.body, res];
      })
      .filter(Boolean) as Swagger.ParsedSchema[];

    const typeString = swaggerToTs.generateTypeList(todoSchemas);

    const formatTypeString = await formatTsString(typeString);
    setResTypeList(formatTypeString);
  };
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-4 flex">
      <div className="flex-1">
        {reqMethods ? (
          <Editor
            theme="vs-dark"
            height="800px"
            defaultLanguage="typescript"
            value={['import request from "@/utils/request";', reqMethods].join(
              '\n',
            )}
          />
        ) : null}
      </div>
      <div className="flex-1">
        {resTypeList ? (
          <Editor theme="vs-dark" height="800px" defaultLanguage="typescript" value={resTypeList} />
        ) : null}
      </div>
    </div>
  );
};

export default Step2Page;
