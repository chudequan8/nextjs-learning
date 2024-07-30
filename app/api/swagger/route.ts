import request from '@/app/lib/request';
import { writeFile } from 'node:fs/promises';
import { z } from 'zod';

const FormSchema = z.object({
  uploadType: z.enum(['1', '2'], {
    invalid_type_error: '请选择正确的上传方式',
  }),
  url: z.string().optional(),
  file: z.any().optional(),
});

const fetchSwaggerDocs = (swaggerUrl: string) =>
  request<Swagger.Response | SwaggerV2.ApiDocument>({
    url: swaggerUrl,
    method: 'GET',
  });

export async function POST(request: Request) {
  const formData = await request.formData();
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields =  FormSchema.safeParse(rawFormData);
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('errors', validatedFields.error.flatten().fieldErrors)
    return Response.json({
      status: 0,
      message: 'swagger保存失败.',
      data: null,
    });
  }
  const { uploadType, url, file } = validatedFields.data;
  let fileId: number | null = null;
  let content: string | Buffer | null = null;
  if (uploadType === '1') {
    // 本地上传
    // 确保获取到的文件对象是File类型
    // if (!(file instanceof File)) {
    //   throw new Error('Expected a valid JSON file in the form data.');
    // }
    // 将文件内容读取为 ArrayBuffer,arrayBuffer 是二进制文件数据的表示形式。
    const arrayBuffer = await file.arrayBuffer();
    // 文件保存路径
    fileId = Date.now();
    // 将 ArrayBuffer 转换为 Node.js 中的 Buffer 对象。Buffer 通常用于处理二进制数据。
    content = Buffer.from(arrayBuffer);
  } else {
    // 本地上传
    const docs = await fetchSwaggerDocs(url as string);
    if (docs) {
      fileId = Date.now();
      content = JSON.stringify(docs, null, 2);
    }
  }
  if (fileId && content) {
    const filePath = `./public/swagger/${fileId}.json`;
    //使用 writeFile 函数将文件的内容写入到指定的文件路径。这将把上传的文件保存到 public 目录中。
    await writeFile(filePath, content);
    return Response.json({
      status: 200,
      message: 'success',
      data: {
        id: fileId
      },
    });
  }
  return Response.json({
    status: 0,
    message: '文件保存失败',
    data: null
  });
}
