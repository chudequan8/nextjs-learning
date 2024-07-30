import SwaggerV2ToTs from '@/app/dashboard/swagger/SwaggerV2';
import { SwaggerOptions } from '@/app/request';
import { readSwaggerDocs } from '@/app/utils';

export async function POST(request: Request) {
  // we will use params to access the data passed to the dynamic route
  const reqJson: SwaggerOptions = await request.json();
  try {
    const { id, baseUrl, module, extractType } = reqJson;
    const swaggerDocs = await readSwaggerDocs(id);
    if (swaggerDocs) {
      const swaggerToTs = new SwaggerV2ToTs(swaggerDocs, {
        baseUrl,
        moduleName: module,
        extractType,
      });
      const swaggerDocsByModule = swaggerToTs.getSwaggerDocsByModule();
      const reqMethods = await swaggerToTs.generateReqMethodList(swaggerDocsByModule);
      const typeString = await swaggerToTs.generateTypeList(swaggerDocsByModule);
      return Response.json({
        status: 200,
        message: 'success',
        data: {
          reqMethods,
          typeString
        },
      });
    }
  } catch (err) {
    console.error(err);
  }

  return Response.json({
    status: 0,
    message: '22222222.',
    data: null,
  });
}
