// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

type ReqMethodTuple = ['get', 'post'];
type ReqMethod = ReqMethodTuple[number];

export type ReqMethodMap = Record<ReqMethod, SwaggerDocsInfo | undefined>;
export type PathMap = Record<string, ReqMethodMap>;

export type LinkSchema = {
  $ref: string;
};

export type ComponentsMap = {
  schemas: {
    [key: string]: any;
  };
};

export type SwaggerDocsResponse = {
  paths: PathMap;
  components: ComponentsMap;
  [key: string]: any;
};

export type ReqParametersInfo = {
  name: string;
  in: string;
  description?: string;
  required: boolean;
  schema: any;
};

export type SwaggerDocsInfo = {
  /* API名称 */
  summary: string;
  /* API所属模块 */
  tags: string[];
  /* API描述 */
  description: string;
  /* API操作ID（不知道） */
  operationId: string;
  /* 请求参数（get请求） */
  parameters?: ReqParametersInfo[];
  /* 请求体（post请求） */
  requestBody?: {
    content: {
      'application/json': {
        schema: {
          /* 真实schema引用路径，例：#/components/schemas/点赞作品请求参数对象 */
          $ref: string;
        };
      };
    };
  };
  responses: {
    200: {
      description?: string;
      content: {
        '*/*': {
          schema: any;
        };
      };
    };
  };
};

export type ReqMethodOptions = {
  url: string;
  description: string;
  method: ReqMethod;
  operationId: string;
  reqTypeName?: string;
  resTypeName?: string;
};
