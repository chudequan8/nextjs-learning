'use client';

import Editor from '@monaco-editor/react';
import { SwaggerDocsResponse } from '@/app/lib/definitions';
import { getReq } from '@/app/utils';
import { parseReqObject, parseResObject } from '@/app/utils/parse';
import { FC, useEffect, useState } from 'react';
import { generateReqMethod } from '@/app/utils/generate';

type Step2PageProps = {
  swaggerDocs: SwaggerDocsResponse;
  path: string;
};

const Step2Page: FC<Step2PageProps> = ({ swaggerDocs, path }) => {
  const [reqType, setReqType] = useState<Record<string, string>>({});
  const [resType, setResType] = useState<Record<string, string>>({});
  const [reqMethods, setReqMethods] = useState<string>();

  const generate = async () => {
    const reqMethodMap = swaggerDocs.paths[path];
    const [reqMethod, reqObject] = getReq(reqMethodMap);
    if (reqMethod && reqObject) {
      const reqParamsTypeMap = await parseReqObject[reqMethod](
        reqObject,
        swaggerDocs,
      );
      setReqType(reqParamsTypeMap);
      const resParamsTypeMap = await parseResObject(
        reqObject.responses,
        swaggerDocs,
      );
      setResType(resParamsTypeMap);

      const { description, operationId } = reqObject;
      const reqMethodString = generateReqMethod({
        url: path,
        description,
        method: reqMethod,
        operationId,
        reqTypeName: Object.keys(reqParamsTypeMap)[0],
        resTypeName: Object.keys(resParamsTypeMap)[0],
      });
      if (reqMethodString) {
        setReqMethods(reqMethodString);
      }
    }
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Step2Page
      <div className="mt-4 flex">
        <div className="flex-1">
          {Object.keys(reqType).length ? (
            <Editor
              theme="vs-dark"
              height="400px"
              defaultLanguage="typescript"
              value={Object.values(reqType).join('\n')}
            />
          ) : null}
        </div>
        <div className="flex-1">
          {Object.keys(resType).length ? (
            <Editor
              theme="vs-dark"
              height="400px"
              defaultLanguage="typescript"
              value={Object.values(resType).join('\n')}
            />
          ) : null}
        </div>
      </div>
      <div className="mt-4 flex">
        <div className="flex-1">
          {reqMethods ? (
            <Editor
              theme="vs-dark"
              height="400px"
              defaultLanguage="typescript"
              value={[
                'import request from "@/utils/request";',
                reqMethods,
              ].join('\n')}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Step2Page;
