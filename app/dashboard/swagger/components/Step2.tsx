
// import { FC, useEffect, useState } from 'react';
// import SwaggerToTs from '../swagger';
import SwaggerV2ToTs from '../SwaggerV2';
import CodeEditor from './CodeEditor';

const isV2 = (
  swaggerDocs: Swagger.Response | SwaggerV2.ApiDocument,
): swaggerDocs is SwaggerV2.ApiDocument => {
  return swaggerDocs.swagger === '2.0';
};

type Step2Props = {
  swaggerDocs: Swagger.Response | SwaggerV2.ApiDocument;
  moduleName: string;
  baseUrl: string;
  extractType?: string;
};

// const Step2Page: FC<Step2PageProps> = ({
//   swaggerDocs,
//   moduleName,
//   baseUrl,
// }) => {
//   // const [reqMethods, setReqMethods] = useState<string>();
//   // const [resTypeList, setResTypeList] = useState<string>();

//   // const init = async () => {
//   //   if (isV2(swaggerDocs)) {
//   //     const swaggerToTs = new SwaggerV2ToTs(
//   //       swaggerDocs as unknown as SwaggerV2.ApiDocument,
//   //       {
//   //         baseUrl,
//   //         moduleName
//   //       },
//   //     );
//   //     const swaggerDocsByModule = swaggerToTs.getSwaggerDocsByModule();

//   //     const reqMethods1 =
//   //       swaggerToTs.generateReqMethodList(swaggerDocsByModule);
//   //     setReqMethods(reqMethods1.join('\n'));

//   //     const todoSchemas = swaggerDocsByModule
//   //       .flatMap((swaggerDoc) => {
//   //         const { req, res } = swaggerDoc;
//   //         const todoResSchemas = res ? [res] : [];
//   //         if (!req) {
//   //           return todoResSchemas;
//   //         }
//   //         const { query = [], path = [], body = [] } = req;
//   //         const todoReqSchemas = [...query, ...path, ...body];
//   //         return [...todoReqSchemas, ...todoResSchemas];
//   //       })
//   //       .filter(
//   //         (n) => n.type === 'object' && n.properties,
//   //       ) as Schema.ParsedObjectSchema[];

//   //     const typeString = swaggerToTs.generateTypeList(todoSchemas);
//   //     // const formatTypeString = await formatTsString(typeString);
//   //     setResTypeList(typeString);
//   //     // const swaggerToTs = new SwaggerV2ToTs(swaggerDocs, baseUrl);
//   //     // const swaggerDocsByModule =
//   //     //   swaggerToTs.getSwaggerDocsByModule(moduleName);
//   //     //   console.log('swaggerDocsByModule', swaggerDocsByModule)
//   //     // const reqMethodPromiseList = swaggerDocsByModule.map((swaggerDoc) => {
//   //     //   return formatTsString(swaggerToTs.generateReqMethod(swaggerDoc));
//   //     // });
//   //     // const reqMethodList = await Promise.all(reqMethodPromiseList);
//   //     // setReqMethods(reqMethodList.join('\n'));

//   //     // const todoSchemas = swaggerDocsByModule
//   //     //   .flatMap((swaggerDoc) => {
//   //     //     const { req, res } = swaggerDoc;
//   //     //     return [...Object.values(req?.body || {}), res];
//   //     //   })
//   //     //   .filter(Boolean) as Swagger.ParsedSchema[];

//   //     //   console.log('todoSchemas', todoSchemas)
//   //     // const typeString = swaggerToTs.generateTypeList(todoSchemas);
//   //     // const formatTypeString = await formatTsString(typeString);
//   //     // setResTypeList(formatTypeString);
//   //   } else {
//   //     const swaggerToTs = new SwaggerToTs(swaggerDocs, baseUrl);
//   //     const swaggerDocsByModule =
//   //       swaggerToTs.getSwaggerDocsByModule(moduleName);
//   //     const reqMethodPromiseList = swaggerDocsByModule.map((swaggerDoc) => {
//   //       return formatTsString(swaggerToTs.generateReqMethod(swaggerDoc));
//   //     });
//   //     const reqMethodList = await Promise.all(reqMethodPromiseList);
//   //     setReqMethods(reqMethodList.join('\n'));

//   //     const todoSchemas = swaggerDocsByModule
//   //       .flatMap((swaggerDoc) => {
//   //         const { req, res } = swaggerDoc;
//   //         return [...Object.values(req?.query || {}), req?.body, res];
//   //       })
//   //       .filter(Boolean) as Swagger.ParsedSchema[];

//   //     const typeString = swaggerToTs.generateTypeList(todoSchemas);

//   //     const formatTypeString = await formatTsString(typeString);
//   //     setResTypeList(formatTypeString);
//   //   }
//   // };
//   // useEffect(() => {
//   //   init();
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   return (
//     <div className="mt-4 flex">
//       <div className="flex-1">
//         2222
//         {/* {reqMethods ? (
//           <Editor
//             theme="vs-dark"
//             height="800px"
//             defaultLanguage="typescript"
//             value={['import request from "@/utils/request";', reqMethods].join(
//               '\n',
//             )}
//           />
//         ) : null} */}
//       </div>
//       <div className="flex-1">
//         33333
//         {/* {resTypeList ? (
//           <Editor
//             theme="vs-dark"
//             height="800px"
//             defaultLanguage="typescript"
//             value={resTypeList}
//           />
//         ) : null} */}
//       </div>
//     </div>
//   );
// };

export default async function Step2Page(props: Step2Props) {
  const { swaggerDocs, moduleName, baseUrl, extractType } = props;

  let reqMethods: string = '';
  let typeString: string = "";
  let transformNames: any = [];
  let transformContent: any[] = [];
  if (isV2(swaggerDocs)) {
    const swaggerToTs = new SwaggerV2ToTs(swaggerDocs, {
      baseUrl,
      moduleName,
      extractType
    });
    const swaggerDocsByModule = swaggerToTs.getSwaggerDocsByModule();
    reqMethods = await swaggerToTs.generateReqMethodList(swaggerDocsByModule);
    transformNames = Array.from(swaggerToTs._nameMap);

    const todoSchemas = swaggerDocsByModule
      .flatMap((swaggerDoc) => {
        const { req, res } = swaggerDoc;
        const todoResSchemas = res || [];
        if (!req) {
          return todoResSchemas;
        }
        const { query = [], path = [], body = [] } = req;
        const todoReqSchemas = [...query, ...path, ...body];
        return [...todoReqSchemas, ...todoResSchemas];
      })
      .filter(
        (n) => {
          // 原先的逻辑是这样的，如果是arrarschema的话可能会漏掉
          // (schema.type === "object" && schema.properties) || Boolean(n.generic)
          return swaggerToTs._isParsedObjectSchema(n)
        }
      );
      typeString = await swaggerToTs.generateTypeList(todoSchemas);
      transformContent = todoSchemas;
  }

  return (
    <>
      <div className="mt-4 flex">
        <div className="flex-1">
          <CodeEditor
            value={['import request from "@/utils/request";', reqMethods].join(
              '\n',
            )}
          />
          {/* {reqMethods ? (
            <Editor
              theme="vs-dark"
              height="800px"
              defaultLanguage="typescript"
              value={['import request from "@/utils/request";', reqMethods].join(
                '\n',
              )}
            />
          ) : null} */}
        </div>
        <div className="flex-1">
          <CodeEditor value={typeString} />
        </div>
      </div>
    </>
  );
}
