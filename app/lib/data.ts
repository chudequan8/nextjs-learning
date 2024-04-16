import { sql } from '@vercel/postgres';
import CryptoJS from 'crypto-js';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import request from './request';

import OpenAI from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent';

const openAiConfig =
  process.env.NODE_ENV === 'development' && process.env.PROXY_URL
    ? {
        httpAgent: new HttpsProxyAgent(process.env.PROXY_URL),
      }
    : {};

const openai = new OpenAI(openAiConfig);

export const fetchSwaggerDocs = (swaggerUrl: string) =>
  request<Swagger.Response | SwaggerV2.ApiDocument>({
    url: swaggerUrl,
    method: 'GET',
  });

function truncate(q: string) {
  var len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

type YoudaoTranslateInfo = {
  query: string;
  translation: string;
  type: string;
};
type YoudaoTranslateAPI = {
  errorCode: string;
  translateResults?: YoudaoTranslateInfo[];
};

export const translateTypeNames = async (typeNames: string[]) => {
  const salt = (new Date).getTime();
  const curtime = Math.round(salt / 1000)
  const str1 = process.env.APP_KEY + truncate(typeNames.join("")) + salt + curtime + process.env.APP_SECRET;
  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
  const res = await request<YoudaoTranslateAPI>({
    url: 'https://openapi.youdao.com/v2/api',
    method: 'GET',
    params: {
      q: typeNames,
      appKey: process.env.APP_KEY,
      salt,
      from: 'zh-CHS',
      to: 'en',
      sign,
      signType: 'v3',
      curtime,
      // vocabId: "您的用户词表ID",
    },
  });
  return res;
};

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // const res = await fetch('http://192.168.9.70/v3/api-docs');
    // const ddd = await res.json();
    // console.log('fff', ddd?.openapi);

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function startChat(content: string[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      // { role: "user", content: `把后面这段内容翻译成英文，有两点要求，第一：翻译成大驼峰的形式，不要有'-'、'_'或空格，第二：返回格式为以中文为key，结果为value的JSON。    ${content}` },
      {
        role: 'user',
        content: `把后面这段内容翻译成大驼峰形式的英文，不要有'-'、'_'或空格，只要返回结果就行。    ${content}`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return completion.choices[0];
}

export async function toTranformEnumChat(content: string[]) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content:
          "将后面这段数组内容的description字段转换成Typescript的联合类型。例如数组内容是'['绑定状态', '是否启用管理员 1启用 0禁用', '付款渠道 1.微信支付 0.支付宝支付  2.几份']'，返回'[{ typeName: 'BindStatus', value: 'null' }, { typeName: 'AdminStatus', value: '0 | 1' }, { typeName: 'PaymentChannelStatus', value: '0 | 1 | 2' }]'。",
      },
      // 如果数组里面某一项不符合枚举类型的，该项返回null
      // { role: "user", content: '根据给出的例子转化下面的这段内容，举例说明如下：输入"是否启用管理员 1启用 0禁用"，返回"{typeName:"AdminStatus",value:0|1}，输入"是否启用管理"，返回"null"' },
      {
        role: 'user',
        content: `${content}`,
      },
      // ...(content.map((item) => ({ role: "user", content: item })) as ChatCompletionUserMessageParam[]),
    ],
    model: 'gpt-3.5-turbo',
  });
  const res = completion.choices[0];
  console.log('res.message.content', res.message.content);
  return res.message.content || '';
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    console.log(invoice);
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
