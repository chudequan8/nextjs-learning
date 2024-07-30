import { readSwaggerDocs, getModuleNameListByBaseUrl } from "@/app/utils";

export async function GET(request: Request) {
  // we will use params to access the data passed to the dynamic route
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const baseUrl = searchParams.get('baseUrl')
  if (id && baseUrl) {
    try {
      const swaggerDocs = await readSwaggerDocs(Number(id))
      if (swaggerDocs) {
        const moduleNameList = getModuleNameListByBaseUrl(swaggerDocs.paths, baseUrl);
        return Response.json({
          status: 200,
          message: 'success',
          data: moduleNameList,
        });
      }
    } catch (err) {
      console.error(err);
    }

  }

  return Response.json({
    status: 0,
    message: '22222222.',
    data: null,
  });
}
