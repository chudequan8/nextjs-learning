import { sql } from '@vercel/postgres';
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

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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'
});

export const fetchSwaggerDocs = (swaggerAddress: string) =>
  request<Swagger.Response | SwaggerV2.Response>({
    url: swaggerAddress,
    method: 'GET',
  });
// export const fetchSwaggerDocs = async (swaggerAddress: string) => {
//   // 发起服务端请求
//   // const response = await fetch('https://nextjs-learning-wns1-kvsewsota-chudequan8s-projects.vercel.app/data-report.json');
//   // const data = await response.json();
//   // console.log('ddd', data);
//   return {
//     swagger: '2.0',
//     info: {
//       description: 'swagger test app restful api',
//       version: '1.0',
//       title: 'Swagger Test App Restful API',
//       termsOfService: 'http://localhost:13579',
//       contact: {
//         name: '岛风',
//         url: 'https://shimakaze.baoquan.com',
//         email: '369824830@qq.com',
//       },
//     },
//     host: '192.168.251.82:10001',
//     basePath: '/',
//     tags: [
//       {
//         name: 'API相关接口',
//         description: 'Api Controller',
//       },
//       {
//         name: 'App版本管理',
//         description: 'App Version Controller',
//       },
//       {
//         name: 'easy-poi-convert-controller',
//         description: 'Easy Poi Convert Controller',
//       },
//       {
//         name: 'easy-poi-file-controller',
//         description: 'Easy Poi File Controller',
//       },
//       {
//         name: 'easy-poi-user-controller',
//         description: 'Easy Poi User Controller',
//       },
//       {
//         name: '业主产权管理',
//         description: 'Owner Equity Controller',
//       },
//       {
//         name: '公告相关',
//         description: 'Announcement Controller',
//       },
//       {
//         name: '公证处管理相关接口',
//         description: 'Notary Controller',
//       },
//       {
//         name: '内容管理相关',
//         description: 'Content Manager Controller',
//       },
//       {
//         name: '出证相关接口',
//         description: 'Notarization Controller',
//       },
//       {
//         name: '发票相关',
//         description: 'Invoice Controller',
//       },
//       {
//         name: '城市相关接口',
//         description: 'Region Controller',
//       },
//       {
//         name: '备案证明管理',
//         description: 'Park Controller',
//       },
//       {
//         name: '字典相关接口',
//         description: 'Dict Controller',
//       },
//       {
//         name: '存证相关',
//         description: 'Attestation Controller',
//       },
//       {
//         name: '小区管理',
//         description: 'Community Controller',
//       },
//       {
//         name: '执法记录仪相关接口',
//         description: 'Enforcer Attestation Controller',
//       },
//       {
//         name: '投票管理',
//         description: 'Vote Controller',
//       },
//       {
//         name: '数据登记相关',
//         description: 'Data Registration Controller',
//       },
//       {
//         name: '文件上传相关接口',
//         description: 'File Controller',
//       },
//       {
//         name: '消息通知管理相关',
//         description: 'News Controller',
//       },
//       {
//         name: '现场取证管理',
//         description: 'Site Controller',
//       },
//       {
//         name: '用户反馈接口相关',
//         description: 'Feedback Controller',
//       },
//       {
//         name: '用户相关接口',
//         description: 'User Controller',
//       },
//       {
//         name: '管理员相关',
//         description: 'Admin Controller',
//       },
//       {
//         name: '线下打款相关',
//         description: 'Offline Pay Statistics Controller',
//       },
//       {
//         name: '统计相关',
//         description: 'Statistics Controller',
//       },
//       {
//         name: '账户相关',
//         description: 'Account Controller',
//       },
//       {
//         name: '转让备案审批',
//         description: 'Park Approve Controller',
//       },
//       {
//         name: '链相关接口',
//         description: 'Chain Controller',
//       },
//     ],
//     paths: {
//       '/account': {
//         post: {
//           tags: ['账户相关'],
//           summary: '账户列表',
//           operationId: 'accountListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'accountListParam',
//               description: 'accountListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AccountListParam',
//                 originalRef: 'AccountListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«UserAccountDto»»',
//                 originalRef: '返回结果基类«PageInfo«UserAccountDto»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«UserAccountDto»»',
//                 originalRef: '返回结果基类«PageInfo«UserAccountDto»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/account/detail': {
//         post: {
//           tags: ['账户相关'],
//           summary: '账户详情',
//           operationId: 'accountDetailUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'userInfoParam',
//               description: 'userInfoParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/UserInfoParam',
//                 originalRef: 'UserInfoParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AccountDetailBean»',
//                 originalRef: '返回结果基类«AccountDetailBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AccountDetailBean»',
//                 originalRef: '返回结果基类«AccountDetailBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/account/freeze': {
//         post: {
//           tags: ['账户相关'],
//           summary: '冻结-解冻账户',
//           operationId: 'freezeAccountUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'idParam',
//               description: 'idParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/IdParam',
//                 originalRef: 'IdParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/active/day/detail': {
//         post: {
//           tags: ['统计相关'],
//           summary: '日活统计明细',
//           operationId: 'activeDayDetailStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'weekStatisticsParam',
//               description: 'weekStatisticsParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ActiveWeekStatisticsParam',
//                 originalRef: 'ActiveWeekStatisticsParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«ActiveStatisticsBean»»',
//                 originalRef: '返回结果基类«List«ActiveStatisticsBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«ActiveStatisticsBean»»',
//                 originalRef: '返回结果基类«List«ActiveStatisticsBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/active/day/{month}': {
//         get: {
//           tags: ['统计相关'],
//           summary: '日活统计',
//           operationId: 'activeDayStatisticsUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'month',
//               in: 'path',
//               description: '月,例子：2020-09',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ActiveDayStatisticsBean»',
//                 originalRef: '返回结果基类«ActiveDayStatisticsBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ActiveDayStatisticsBean»',
//                 originalRef: '返回结果基类«ActiveDayStatisticsBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/active/incr/{type}': {
//         post: {
//           tags: ['统计相关'],
//           summary: '首页-活跃用户--0近一周1 月 2年',
//           operationId: 'activeIncrStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'type',
//               in: 'path',
//               description: '0近一周1 月 2年',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ActiveIncrGroupStatisticsBean»',
//                 originalRef: '返回结果基类«ActiveIncrGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ActiveIncrGroupStatisticsBean»',
//                 originalRef: '返回结果基类«ActiveIncrGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/active/month/{year}': {
//         get: {
//           tags: ['统计相关'],
//           summary: '月活统计',
//           operationId: 'activeMonthStatisticsUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'year',
//               in: 'path',
//               description: '年',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ActiveMonthStatisticsBean»',
//                 originalRef: '返回结果基类«ActiveMonthStatisticsBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ActiveMonthStatisticsBean»',
//                 originalRef: '返回结果基类«ActiveMonthStatisticsBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/active/week': {
//         post: {
//           tags: ['统计相关'],
//           summary: '周活统计',
//           operationId: 'activeWeekStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'weekStatisticsParam',
//               description: 'weekStatisticsParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ActiveWeekStatisticsParam',
//                 originalRef: 'ActiveWeekStatisticsParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ActiveWeekStatisticsBean»',
//                 originalRef: '返回结果基类«ActiveWeekStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ActiveWeekStatisticsBean»',
//                 originalRef: '返回结果基类«ActiveWeekStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/admin': {
//         post: {
//           tags: ['管理员相关'],
//           summary: '管理员列表',
//           operationId: 'findAdminListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'adminListParam',
//               description: 'adminListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AdminListParam',
//                 originalRef: 'AdminListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AdminListBean»»',
//                 originalRef: '返回结果基类«PageInfo«AdminListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AdminListBean»»',
//                 originalRef: '返回结果基类«PageInfo«AdminListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/admin/info': {
//         post: {
//           tags: ['管理员相关'],
//           summary: '管理员添加',
//           operationId: 'insertAdminInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'adminInfoParam',
//               description: 'adminInfoParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AdminInfoParam',
//                 originalRef: 'AdminInfoParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         put: {
//           tags: ['管理员相关'],
//           summary: '管理员修改',
//           operationId: 'updateAdminInfoUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'adminInfoParam',
//               description: 'adminInfoParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AdminInfoParam',
//                 originalRef: 'AdminInfoParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         delete: {
//           tags: ['管理员相关'],
//           summary: '管理员删除',
//           operationId: 'deleteAdminInfoUsingDELETE',
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'adminIdParam',
//               description: 'adminIdParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AdminIdParam',
//                 originalRef: 'AdminIdParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//         },
//       },
//       '/admin/info/id': {
//         post: {
//           tags: ['管理员相关'],
//           summary: '管理员详情',
//           operationId: 'findAdminInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'adminIdParam',
//               description: 'adminIdParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AdminIdParam',
//                 originalRef: 'AdminIdParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AdminInfoBean»',
//                 originalRef: '返回结果基类«AdminInfoBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AdminInfoBean»',
//                 originalRef: '返回结果基类«AdminInfoBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/admin/permission': {
//         get: {
//           tags: ['管理员相关'],
//           summary: '用户权限列表',
//           operationId: 'adminPermissionListUsingGET',
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«PermissionListBean»»',
//                 originalRef: '返回结果基类«List«PermissionListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«PermissionListBean»»',
//                 originalRef: '返回结果基类«List«PermissionListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           deprecated: true,
//         },
//         put: {
//           tags: ['管理员相关'],
//           summary: '角色权限列表编辑',
//           operationId: 'updateAdminPermissionListUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'updateRolePermissionParam',
//               description: 'updateRolePermissionParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/UpdateRolePermissionParam',
//                 originalRef: 'UpdateRolePermissionParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/admin/permission/{id}': {
//         get: {
//           tags: ['管理员相关'],
//           summary: '角色权限列表查询',
//           operationId: 'fetchAdminPermissionListUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RolePermissionListBean»»',
//                 originalRef: '返回结果基类«List«RolePermissionListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RolePermissionListBean»»',
//                 originalRef: '返回结果基类«List«RolePermissionListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/adminList': {
//         post: {
//           tags: ['管理员相关'],
//           summary: '公证员列表',
//           operationId: 'findAdminListUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«AdminListBean»»',
//                 originalRef: '返回结果基类«List«AdminListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«AdminListBean»»',
//                 originalRef: '返回结果基类«List«AdminListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/announcement/create': {
//         post: {
//           tags: ['公告相关'],
//           summary: '创建公告',
//           operationId: 'createAnnouncementUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'announcementCreateParam',
//               description: 'announcementCreateParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AnnouncementCreateParam',
//                 originalRef: 'AnnouncementCreateParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AnnouncementCreateModifyBean»',
//                 originalRef: '返回结果基类«AnnouncementCreateModifyBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AnnouncementCreateModifyBean»',
//                 originalRef: '返回结果基类«AnnouncementCreateModifyBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/announcement/down': {
//         post: {
//           tags: ['公告相关'],
//           summary: '结束公告',
//           operationId: 'downAnnouncementUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'announcementModifyParam',
//               description: 'announcementModifyParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AnnouncementModifyParam',
//                 originalRef: 'AnnouncementModifyParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AnnouncementCreateModifyBean»',
//                 originalRef: '返回结果基类«AnnouncementCreateModifyBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AnnouncementCreateModifyBean»',
//                 originalRef: '返回结果基类«AnnouncementCreateModifyBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/announcement/list': {
//         post: {
//           tags: ['公告相关'],
//           summary: '公告列表',
//           operationId: 'announcementListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'announcementListParam',
//               description: 'announcementListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AnnouncementListParam',
//                 originalRef: 'AnnouncementListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AnnouncementBean»»',
//                 originalRef: '返回结果基类«PageInfo«AnnouncementBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AnnouncementBean»»',
//                 originalRef: '返回结果基类«PageInfo«AnnouncementBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/announcement/modify': {
//         post: {
//           tags: ['公告相关'],
//           summary: '修改公告',
//           operationId: 'modifyAnnouncementUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'announcementModifyParam',
//               description: 'announcementModifyParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AnnouncementModifyParam',
//                 originalRef: 'AnnouncementModifyParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AnnouncementCreateModifyBean»',
//                 originalRef: '返回结果基类«AnnouncementCreateModifyBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AnnouncementCreateModifyBean»',
//                 originalRef: '返回结果基类«AnnouncementCreateModifyBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/api/phone/check/{phone}': {
//         get: {
//           tags: ['API相关接口'],
//           summary: '检查用户名是否满足条件',
//           operationId: 'checkPhoneUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'phone',
//               in: 'path',
//               description: 'phone',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/api/price': {
//         post: {
//           tags: ['API相关接口'],
//           summary: '添加套餐',
//           operationId: 'addPriceUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ApiPriceAddParam',
//                 originalRef: 'ApiPriceAddParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         put: {
//           tags: ['API相关接口'],
//           summary: '修改套餐',
//           operationId: 'updatePriceUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ApiPriceModifyParam',
//                 originalRef: 'ApiPriceModifyParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/api/price/list': {
//         post: {
//           tags: ['API相关接口'],
//           summary: '获取API套餐列表',
//           operationId: 'getApiListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ApiListParam',
//                 originalRef: 'ApiListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ApiListBean»»',
//                 originalRef: '返回结果基类«PageInfo«ApiListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ApiListBean»»',
//                 originalRef: '返回结果基类«PageInfo«ApiListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/app/feedback/list': {
//         post: {
//           tags: ['用户反馈接口相关'],
//           summary: '获取现场存证详情',
//           operationId: 'getFeedbackListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['application/json;charset=utf-8'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'opinionFeedbackListParam',
//               description: 'opinionFeedbackListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OpinionFeedbackListParam',
//                 originalRef: 'OpinionFeedbackListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«OpinionFeedbackListBean»»',
//                 originalRef: '返回结果基类«List«OpinionFeedbackListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«OpinionFeedbackListBean»»',
//                 originalRef: '返回结果基类«List«OpinionFeedbackListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/app/feedback/memo/{id}': {
//         post: {
//           tags: ['用户反馈接口相关'],
//           summary: '获取现场存证详情',
//           operationId: 'modifyQuestionMemoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['application/json;charset=utf-8'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//             {
//               in: 'body',
//               name: 'opinionFeedbackMemoParam',
//               description: 'opinionFeedbackMemoParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OpinionFeedbackMemoParam',
//                 originalRef: 'OpinionFeedbackMemoParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/app/feedback/reply': {
//         post: {
//           tags: ['用户反馈接口相关'],
//           summary: '回复',
//           operationId: 'replyUsingPOST',
//           consumes: ['application/json'],
//           produces: ['application/json;charset=utf-8'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OpinionFeedbackReplyParam',
//                 originalRef: 'OpinionFeedbackReplyParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/app/version/list': {
//         post: {
//           tags: ['App版本管理'],
//           summary: '获取App版本列表',
//           operationId: 'appVersionListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'appVersionListParam',
//               description: 'appVersionListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AppVersionListParam',
//                 originalRef: 'AppVersionListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AppVersionListBean»»',
//                 originalRef: '返回结果基类«PageInfo«AppVersionListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AppVersionListBean»»',
//                 originalRef: '返回结果基类«PageInfo«AppVersionListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/app/version/new': {
//         get: {
//           tags: ['App版本管理'],
//           summary: '获取最新app版本',
//           operationId: 'appVersionNewUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'operateSystem',
//               in: 'query',
//               description: 'operateSystem',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AppVersionListBean»',
//                 originalRef: '返回结果基类«AppVersionListBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AppVersionListBean»',
//                 originalRef: '返回结果基类«AppVersionListBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/app/version/publish': {
//         post: {
//           tags: ['App版本管理'],
//           summary: '发布App版本更新',
//           operationId: 'appVersionPublishUsingPOST',
//           consumes: ['multipart/form-data'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'file',
//               description: 'file',
//               required: false,
//               schema: {
//                 type: 'string',
//                 format: 'binary',
//               },
//             },
//             {
//               name: 'memo',
//               in: 'query',
//               description: '内部备注',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'oldVersion',
//               in: 'query',
//               description: 'app上一版本号',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'operateSystem',
//               in: 'query',
//               description: '操作系统：1.安卓,2.ios',
//               required: false,
//               type: 'integer',
//               maximum: 9223372036854776000,
//               exclusiveMaximum: false,
//               minimum: 0,
//               exclusiveMinimum: false,
//               format: 'int32',
//             },
//             {
//               name: 'updateContent',
//               in: 'query',
//               description: '更新内容',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'version',
//               in: 'query',
//               description: 'app版本号',
//               required: true,
//               type: 'string',
//             },
//             {
//               name: 'versionName',
//               in: 'query',
//               description: '版本名称',
//               required: false,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/file/list': {
//         post: {
//           tags: ['存证相关'],
//           summary: '个人确权列表',
//           operationId: 'fileAttestationDetailUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'fileDetailParam',
//               description: 'fileDetailParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AttestationFileDetailParam',
//                 originalRef: 'AttestationFileDetailParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AttestationFileDetailBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«AttestationFileDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AttestationFileDetailBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«AttestationFileDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/pdf/{id}': {
//         post: {
//           tags: ['存证相关'],
//           summary: 'pdf下载',
//           operationId: 'fileAttestationDetailUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«JSONObject»',
//                 originalRef: '返回结果基类«JSONObject»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«JSONObject»',
//                 originalRef: '返回结果基类«JSONObject»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/process/list': {
//         post: {
//           tags: ['存证相关'],
//           summary: '过程取证查询',
//           operationId: 'processAttestationListExportUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'processDetailParam',
//               description: 'processDetailParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AttestationProcessDetailParam',
//                 originalRef: 'AttestationProcessDetailParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AttestationProcessDetailBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«AttestationProcessDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AttestationProcessDetailBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«AttestationProcessDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/process/list/export': {
//         post: {
//           tags: ['存证相关'],
//           summary: '过程取证列表导出',
//           operationId: 'processAttestationDetailUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'processDetailParam',
//               description: 'processDetailParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AttestationProcessDetailParam',
//                 originalRef: 'AttestationProcessDetailParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/trust/download/byte/{attestationNo}': {
//         get: {
//           tags: ['存证相关'],
//           summary: '通过文件流下载存证证据包',
//           operationId: 'downloadAttestationByteUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'attestationNo',
//               in: 'path',
//               description: 'attestationNo',
//               required: true,
//               type: 'string',
//             },
//             {
//               name: 'type',
//               in: 'query',
//               description:
//                 '产品类型: 0 存证确权；1 网页取证；2 过程取证；3 移动端取证',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/url/feedback': {
//         put: {
//           tags: ['存证相关'],
//           summary: '网页取证截图反馈列表',
//           operationId: 'urlAttestationFeedbackUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'urlFeedbackParam',
//               description: 'urlFeedbackParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/UrlFeedbackParam',
//                 originalRef: 'UrlFeedbackParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/url/feedback/list': {
//         post: {
//           tags: ['存证相关'],
//           summary: '网页取证截图反馈列表',
//           operationId: 'urlAttestationFeedbackUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'feedbackListParam',
//               description: 'feedbackListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/FeedbackListParam',
//                 originalRef: 'FeedbackListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«FeedbackListBean»»',
//                 originalRef: '返回结果基类«PageInfo«FeedbackListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«FeedbackListBean»»',
//                 originalRef: '返回结果基类«PageInfo«FeedbackListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/url/list': {
//         post: {
//           tags: ['存证相关'],
//           summary: '网页/电商/视频取证列表查询',
//           operationId: 'urlAttestationDetailUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'urlDetailParam',
//               description: 'urlDetailParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AttestationUrlDetailParam',
//                 originalRef: 'AttestationUrlDetailParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AttestationUrlDetailBean»»',
//                 originalRef: '返回结果基类«PageInfo«AttestationUrlDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AttestationUrlDetailBean»»',
//                 originalRef: '返回结果基类«PageInfo«AttestationUrlDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/url/list/export': {
//         post: {
//           tags: ['存证相关'],
//           summary: '网页/电商/视频取证列表导出',
//           operationId: 'urlAttestationListExportUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'urlDetailParam',
//               description: 'urlDetailParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AttestationUrlDetailParam',
//                 originalRef: 'AttestationUrlDetailParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/attestation/zip/{attestationNo}': {
//         get: {
//           tags: ['存证相关'],
//           summary: '下载证据包',
//           operationId: 'downloadZipUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'attestationNo',
//               in: 'path',
//               description: 'attestationNo',
//               required: true,
//               type: 'string',
//             },
//             {
//               name: 'type',
//               in: 'query',
//               description:
//                 '产品类型: 0-文件存证 1-网页取证 2-过程取证 3-移动端取证',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/chain/mode': {
//         post: {
//           tags: ['链相关接口'],
//           summary: '修改上链模式',
//           operationId: 'changeChainModeUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ChainModeParam',
//                 originalRef: 'ChainModeParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/community/add': {
//         post: {
//           tags: ['小区管理'],
//           summary: '新增小区',
//           operationId: 'addUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/CommunityAddParam',
//                 originalRef: 'CommunityAddParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/community/edit': {
//         post: {
//           tags: ['小区管理'],
//           summary: '编辑小区',
//           operationId: 'editUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/CommunityEditParam',
//                 originalRef: 'CommunityEditParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/community/list': {
//         post: {
//           tags: ['小区管理'],
//           summary: '列表',
//           operationId: 'getListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/CommunityQueryParam',
//                 originalRef: 'CommunityQueryParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«CommunityListVo»»',
//                 originalRef: '返回结果基类«PageInfo«CommunityListVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«CommunityListVo»»',
//                 originalRef: '返回结果基类«PageInfo«CommunityListVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/consumer/day': {
//         post: {
//           tags: ['统计相关'],
//           summary: '消费统计',
//           operationId: 'acmountStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'weekStatisticsParam',
//               description: 'weekStatisticsParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ActiveWeekStatisticsParam',
//                 originalRef: 'ActiveWeekStatisticsParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ConsumerStatisticsBean»',
//                 originalRef: '返回结果基类«ConsumerStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ConsumerStatisticsBean»',
//                 originalRef: '返回结果基类«ConsumerStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/consumer/{type}': {
//         post: {
//           tags: ['统计相关'],
//           summary: '消费统计--0近一周1 月 2年',
//           operationId: 'consumerStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'type',
//               in: 'path',
//               description: '0近一周1 月 2年',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ConsumerDayGroupStatisticsBean»',
//                 originalRef: '返回结果基类«ConsumerDayGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ConsumerDayGroupStatisticsBean»',
//                 originalRef: '返回结果基类«ConsumerDayGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/content/banner': {
//         post: {
//           tags: ['内容管理相关'],
//           summary: 'Banner 添加',
//           operationId: 'insertBannerUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'bannerAddParam',
//               description: 'bannerAddParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/BannerAddParam',
//                 originalRef: 'BannerAddParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         put: {
//           tags: ['内容管理相关'],
//           summary: 'Banner 修改',
//           operationId: 'updateBannerUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'bannerPutParam',
//               description: 'bannerPutParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/BannerPutParam',
//                 originalRef: 'BannerPutParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/content/banner/list/{type}': {
//         post: {
//           tags: ['内容管理相关'],
//           summary: 'Banner 管理',
//           operationId: 'findBannerListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'Banner类型：0.PC官网Banner 1.登录注册活动位 2.概览活动位 3.H5官网Banner',
//               in: 'path',
//               description: 'type',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«BannerListBean»»',
//                 originalRef: '返回结果基类«List«BannerListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«BannerListBean»»',
//                 originalRef: '返回结果基类«List«BannerListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/content/banner/number': {
//         put: {
//           tags: ['内容管理相关'],
//           summary: 'Banner 修改排序',
//           operationId: 'updateNumberBannerUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'bannerNumberUpdateParam',
//               description: 'bannerNumberUpdateParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/BannerNumberUpdateParam',
//                 originalRef: 'BannerNumberUpdateParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/content/banner/{id}': {
//         delete: {
//           tags: ['内容管理相关'],
//           summary: 'Banner 删除',
//           operationId: 'deletedBannerUsingDELETE',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//         },
//       },
//       '/content/img/upload': {
//         post: {
//           tags: ['内容管理相关'],
//           summary: '上传图片',
//           operationId: 'imgUploadUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'file',
//               in: 'query',
//               description: '文件',
//               required: true,
//               type: 'file',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UploadImgBean»',
//                 originalRef: '返回结果基类«UploadImgBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UploadImgBean»',
//                 originalRef: '返回结果基类«UploadImgBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/content/private/upload': {
//         post: {
//           tags: ['内容管理相关'],
//           summary: '上传图片',
//           operationId: 'filePrivateUploadUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'file',
//               in: 'query',
//               description: '文件',
//               required: true,
//               type: 'file',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UploadImgBean»',
//                 originalRef: '返回结果基类«UploadImgBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UploadImgBean»',
//                 originalRef: '返回结果基类«UploadImgBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/dataRegistration/review/audit': {
//         put: {
//           tags: ['数据登记相关'],
//           summary: '登记审核-审核接口',
//           operationId: 'reviewAuditUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'request',
//               description: 'request',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/登记审核-审核参数',
//                 originalRef: '登记审核-审核参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«boolean»',
//                 originalRef: '返回结果基类«boolean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«boolean»',
//                 originalRef: '返回结果基类«boolean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/dataRegistration/review/enums': {
//         get: {
//           tags: ['数据登记相关'],
//           summary: '登记审核-查询条件枚举项列表',
//           operationId: 'reviewEnumsUsingGET',
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«枚举数据响应类»»',
//                 originalRef: '返回结果基类«List«枚举数据响应类»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«枚举数据响应类»»',
//                 originalRef: '返回结果基类«List«枚举数据响应类»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/dataRegistration/review/handleObjection': {
//         put: {
//           tags: ['数据登记相关'],
//           summary: '登记审核-处理异议接口',
//           operationId: 'reviewHandleObjectionUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'request',
//               description: 'request',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/登记审核-处理异议参数',
//                 originalRef: '登记审核-处理异议参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«boolean»',
//                 originalRef: '返回结果基类«boolean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«boolean»',
//                 originalRef: '返回结果基类«boolean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/dataRegistration/review/object': {
//         put: {
//           tags: ['数据登记相关'],
//           summary: '登记审核-提出异议接口',
//           operationId: 'reviewObjectUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'request',
//               description: 'request',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/登记审核-异议参数',
//                 originalRef: '登记审核-异议参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«boolean»',
//                 originalRef: '返回结果基类«boolean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«boolean»',
//                 originalRef: '返回结果基类«boolean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/dataRegistration/review/page': {
//         post: {
//           tags: ['数据登记相关'],
//           summary: '登记审核-分页列表查询',
//           operationId: 'reviewPageUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'request',
//               description: 'request',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/登记审核-列表查询参数',
//                 originalRef: '登记审核-列表查询参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«登记审核列表查询响应»»',
//                 originalRef: '返回结果基类«PageInfo«登记审核列表查询响应»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«登记审核列表查询响应»»',
//                 originalRef: '返回结果基类«PageInfo«登记审核列表查询响应»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/dataRegistration/review/price': {
//         put: {
//           tags: ['数据登记相关'],
//           summary: '登记审核-定价接口',
//           operationId: 'reviewPriceUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'request',
//               description: 'request',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/登记审核-定价参数',
//                 originalRef: '登记审核-定价参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«boolean»',
//                 originalRef: '返回结果基类«boolean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«boolean»',
//                 originalRef: '返回结果基类«boolean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/dict': {
//         get: {
//           tags: ['字典相关接口'],
//           summary: '获取字典数据-字符串',
//           operationId: 'getDictUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'key',
//               in: 'query',
//               description: 'key',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'type1',
//               in: 'query',
//               description: 'type1',
//               required: true,
//               type: 'string',
//             },
//             {
//               name: 'type2',
//               in: 'query',
//               description: 'type2',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'type2List',
//               in: 'query',
//               description: 'type2列表',
//               required: false,
//               type: 'array',
//               items: {
//                 type: 'string',
//               },
//               collectionFormat: 'multi',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         post: {
//           tags: ['字典相关接口'],
//           summary: '添加字典数据',
//           operationId: 'addDictStrUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/DictInfoAddParam',
//                 originalRef: 'DictInfoAddParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/dict/array': {
//         get: {
//           tags: ['字典相关接口'],
//           summary: '获取字典数据-数组',
//           operationId: 'getDictArrayUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'key',
//               in: 'query',
//               description: 'key',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'type1',
//               in: 'query',
//               description: 'type1',
//               required: true,
//               type: 'string',
//             },
//             {
//               name: 'type2',
//               in: 'query',
//               description: 'type2',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'type2List',
//               in: 'query',
//               description: 'type2列表',
//               required: false,
//               type: 'array',
//               items: {
//                 type: 'string',
//               },
//               collectionFormat: 'multi',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/dict/obj': {
//         get: {
//           tags: ['字典相关接口'],
//           summary: '获取字典数据-对象',
//           operationId: 'getDictObjectUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'key',
//               in: 'query',
//               description: 'key',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'type1',
//               in: 'query',
//               description: 'type1',
//               required: true,
//               type: 'string',
//             },
//             {
//               name: 'type2',
//               in: 'query',
//               description: 'type2',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'type2List',
//               in: 'query',
//               description: 'type2列表',
//               required: false,
//               type: 'array',
//               items: {
//                 type: 'string',
//               },
//               collectionFormat: 'multi',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«JSONObject»',
//                 originalRef: '返回结果基类«JSONObject»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«JSONObject»',
//                 originalRef: '返回结果基类«JSONObject»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/3rd/file/getViewUrl': {
//         get: {
//           tags: ['easy-poi-file-controller'],
//           summary: 'getViewUrl',
//           operationId: 'getViewUrlUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'filePath',
//               in: 'query',
//               description: 'filePath',
//               required: false,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsToken',
//                 originalRef: 'WpsToken',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsToken',
//                 originalRef: 'WpsToken',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/3rd/file/history': {
//         post: {
//           tags: ['easy-poi-file-controller'],
//           summary: 'fileHistory',
//           operationId: 'fileHistoryUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'req',
//               description: 'req',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/WpsFileHistoryRequest',
//                 originalRef: 'WpsFileHistoryRequest',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsFileHistoryResponse',
//                 originalRef: 'WpsFileHistoryResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsFileHistoryResponse',
//                 originalRef: 'WpsFileHistoryResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/3rd/file/info': {
//         get: {
//           tags: ['easy-poi-file-controller'],
//           summary: 'getFileInfo',
//           operationId: 'getFileInfoUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: '_w_filepath',
//               in: 'query',
//               description: '_w_filepath',
//               required: true,
//               type: 'string',
//             },
//             {
//               name: '_w_userid',
//               in: 'query',
//               description: '_w_userid',
//               required: false,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsFileResponse',
//                 originalRef: 'WpsFileResponse',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsFileResponse',
//                 originalRef: 'WpsFileResponse',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         post: {
//           tags: ['easy-poi-user-controller'],
//           summary: 'userInfo',
//           operationId: 'userInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'list',
//               description: 'list',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/WpsUserRequest',
//                 originalRef: 'WpsUserRequest',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsUserResponse',
//                 originalRef: 'WpsUserResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsUserResponse',
//                 originalRef: 'WpsUserResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/3rd/file/new': {
//         post: {
//           tags: ['easy-poi-file-controller'],
//           summary: 'fileNew',
//           operationId: 'fileNewUsingPOST',
//           consumes: ['multipart/form-data'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: '_w_userid',
//               in: 'query',
//               description: '_w_userid',
//               required: false,
//               type: 'string',
//             },
//             {
//               in: 'body',
//               name: 'file',
//               description: 'file',
//               required: true,
//               schema: {
//                 type: 'string',
//                 format: 'binary',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsResponse',
//                 originalRef: 'WpsResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsResponse',
//                 originalRef: 'WpsResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/3rd/file/online': {
//         post: {
//           tags: ['easy-poi-file-controller'],
//           summary: 'fileOnline',
//           operationId: 'fileOnlineUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'list',
//               description: 'list',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/WpsUserRequest',
//                 originalRef: 'WpsUserRequest',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsResponse',
//                 originalRef: 'WpsResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsResponse',
//                 originalRef: 'WpsResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/3rd/file/onnotify': {
//         post: {
//           tags: ['easy-poi-file-controller'],
//           summary: 'onNotify',
//           operationId: 'onNotifyUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'obj',
//               description: 'obj',
//               required: true,
//               schema: {
//                 type: 'object',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsResponse',
//                 originalRef: 'WpsResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsResponse',
//                 originalRef: 'WpsResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/3rd/file/rename': {
//         put: {
//           tags: ['easy-poi-file-controller'],
//           summary: 'fileRename',
//           operationId: 'fileRenameUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: '_w_userid',
//               in: 'query',
//               description: '_w_userid',
//               required: false,
//               type: 'string',
//             },
//             {
//               in: 'body',
//               name: 'req',
//               description: 'req',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/WpsRenameRequest',
//                 originalRef: 'WpsRenameRequest',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsResponse',
//                 originalRef: 'WpsResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsResponse',
//                 originalRef: 'WpsResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/3rd/file/save': {
//         post: {
//           tags: ['easy-poi-file-controller'],
//           summary: 'fileSave',
//           operationId: 'fileSaveUsingPOST',
//           consumes: ['multipart/form-data'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: '_w_userid',
//               in: 'query',
//               description: '_w_userid',
//               required: false,
//               type: 'string',
//             },
//             {
//               in: 'body',
//               name: 'file',
//               description: 'file',
//               required: true,
//               schema: {
//                 type: 'string',
//                 format: 'binary',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsFileSaveResponse',
//                 originalRef: 'WpsFileSaveResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsFileSaveResponse',
//                 originalRef: 'WpsFileSaveResponse',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/3rd/file/version/{version}': {
//         get: {
//           tags: ['easy-poi-file-controller'],
//           summary: 'fileVersion',
//           operationId: 'fileVersionUsingGET_1',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: '_w_filepath',
//               in: 'query',
//               description: '_w_filepath',
//               required: true,
//               type: 'string',
//             },
//             {
//               name: 'version',
//               in: 'path',
//               description: 'version',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsFileSaveResponse',
//                 originalRef: 'WpsFileSaveResponse',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/WpsFileSaveResponse',
//                 originalRef: 'WpsFileSaveResponse',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/easypoi/wps/v1/file/convert/version/{version}': {
//         get: {
//           tags: ['easy-poi-convert-controller'],
//           summary: 'fileVersion',
//           operationId: 'fileVersionUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'appId',
//               in: 'query',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'appSecret',
//               in: 'query',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'exportType',
//               in: 'query',
//               description: 'exportType',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'fileName',
//               in: 'query',
//               description: 'fileName',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'srcUri',
//               in: 'query',
//               description: 'srcUri',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'taskId',
//               in: 'query',
//               description: 'taskId',
//               required: false,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 type: 'string',
//                 format: 'byte',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 type: 'string',
//                 format: 'byte',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/enforcer/attestation/list': {
//         post: {
//           tags: ['执法记录仪相关接口'],
//           summary: '获取执法记录仪列表',
//           operationId: 'getEnforcerRecordListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/EnforcerRecordListParam',
//                 originalRef: 'EnforcerRecordListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«EnforcerRecordListBean»»',
//                 originalRef: '返回结果基类«PageInfo«EnforcerRecordListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«EnforcerRecordListBean»»',
//                 originalRef: '返回结果基类«PageInfo«EnforcerRecordListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/enforcer/attestation/{attestationId}': {
//         get: {
//           tags: ['执法记录仪相关接口'],
//           summary: '获取执法记录仪详情',
//           operationId: 'getEnforcerRecordUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'attestationId',
//               in: 'path',
//               description: 'attestationId',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«EnforcerRecordBean»',
//                 originalRef: '返回结果基类«EnforcerRecordBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«EnforcerRecordBean»',
//                 originalRef: '返回结果基类«EnforcerRecordBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/enforcer/bind/list': {
//         post: {
//           tags: ['执法记录仪相关接口'],
//           summary: '获取绑定执法记录仪列表',
//           operationId: 'getBindDeviceListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/BindDeviceListParam',
//                 originalRef: 'BindDeviceListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«BindDeviceListBean»»',
//                 originalRef: '返回结果基类«PageInfo«BindDeviceListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«BindDeviceListBean»»',
//                 originalRef: '返回结果基类«PageInfo«BindDeviceListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/file/upload/batch': {
//         post: {
//           tags: ['文件上传相关接口'],
//           summary: '批量上传文件',
//           operationId: 'uploadFileUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'fileList',
//               in: 'query',
//               description: '文件列表',
//               required: false,
//               type: 'array',
//               items: {
//                 type: 'file',
//               },
//               collectionFormat: 'multi',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«文件上传返回类»»',
//                 originalRef: '返回结果基类«List«文件上传返回类»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«文件上传返回类»»',
//                 originalRef: '返回结果基类«List«文件上传返回类»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/file/upload/front': {
//         post: {
//           tags: ['文件上传相关接口'],
//           summary: '上传文件',
//           operationId: 'uploadFileUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'file',
//               in: 'query',
//               description: '文件',
//               required: true,
//               type: 'file',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«文件上传返回类»',
//                 originalRef: '返回结果基类«文件上传返回类»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«文件上传返回类»',
//                 originalRef: '返回结果基类«文件上传返回类»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/forensics/site/info/{attestationId}': {
//         get: {
//           tags: ['现场取证管理'],
//           summary: '获取现场存证详情',
//           operationId: 'getSiteAttestationInfoUsingGET',
//           produces: ['application/json;charset=utf-8'],
//           parameters: [
//             {
//               name: 'attestationId',
//               in: 'path',
//               description: 'attestationId',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«SiteAttestationInfoBean»',
//                 originalRef: '返回结果基类«SiteAttestationInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«SiteAttestationInfoBean»',
//                 originalRef: '返回结果基类«SiteAttestationInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/forensics/site/list': {
//         post: {
//           tags: ['现场取证管理'],
//           summary: '获取现场存证列表',
//           operationId: 'getSiteAttestationListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['application/json;charset=utf-8'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'siteListParam',
//               description: 'siteListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/SiteListParam',
//                 originalRef: 'SiteListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«SiteListBean»»',
//                 originalRef: '返回结果基类«List«SiteListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«SiteListBean»»',
//                 originalRef: '返回结果基类«List«SiteListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/home/page': {
//         post: {
//           tags: ['统计相关'],
//           summary: '首页统计',
//           operationId: 'homePageStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«HomePageGroupStatisticsBean»',
//                 originalRef: '返回结果基类«HomePageGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«HomePageGroupStatisticsBean»',
//                 originalRef: '返回结果基类«HomePageGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/homePage': {
//         post: {
//           tags: ['统计相关'],
//           summary: '运营管理首页',
//           operationId: 'homePageUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/StatisticHomePageParam',
//                 originalRef: 'StatisticHomePageParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«StatisticHomePageVo»',
//                 originalRef: '返回结果基类«StatisticHomePageVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«StatisticHomePageVo»',
//                 originalRef: '返回结果基类«StatisticHomePageVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/invitation': {
//         post: {
//           tags: ['统计相关'],
//           summary: '邀请注册统计',
//           operationId: 'invitationStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'invitationStatisticsParam',
//               description: 'invitationStatisticsParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/InvitationStatisticsParam',
//                 originalRef: 'InvitationStatisticsParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«InvitationUserDto»»',
//                 originalRef: '返回结果基类«PageInfo«InvitationUserDto»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«InvitationUserDto»»',
//                 originalRef: '返回结果基类«PageInfo«InvitationUserDto»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/invitation/info': {
//         post: {
//           tags: ['统计相关'],
//           summary: '邀请注册详情',
//           operationId: 'invitationDetailUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'invitationDetailParam',
//               description: 'invitationDetailParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/InvitationDetailParam',
//                 originalRef: 'InvitationDetailParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«InvitationDetailBean»»',
//                 originalRef: '返回结果基类«PageInfo«InvitationDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«InvitationDetailBean»»',
//                 originalRef: '返回结果基类«PageInfo«InvitationDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/invoice/order/check': {
//         post: {
//           tags: ['发票相关'],
//           summary: '第一次审核',
//           operationId: 'consumOrderCheckUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'checkParam',
//               description: 'checkParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/InvoiceOrderCheckParam',
//                 originalRef: 'InvoiceOrderCheckParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/invoice/order/check/result': {
//         post: {
//           tags: ['发票相关'],
//           summary: '第二次审核  + 信息',
//           operationId: 'consumOrderCheckDoubleUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'checkParam',
//               description: 'checkParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/InvoiceOrderDoubleCheckParam',
//                 originalRef: 'InvoiceOrderDoubleCheckParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/invoice/order/info/{id}': {
//         get: {
//           tags: ['发票相关'],
//           summary: '获取开票订单详情',
//           operationId: 'consumOrderInfoUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«InvoiceOrderBean»»',
//                 originalRef: '返回结果基类«List«InvoiceOrderBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«InvoiceOrderBean»»',
//                 originalRef: '返回结果基类«List«InvoiceOrderBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/invoice/order/{id}': {
//         get: {
//           tags: ['发票相关'],
//           summary: '获取开票订单详情--通过订单id',
//           operationId: 'consumOrderInvoiceUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«InvoiceOrderBean»»',
//                 originalRef: '返回结果基类«List«InvoiceOrderBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«InvoiceOrderBean»»',
//                 originalRef: '返回结果基类«List«InvoiceOrderBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/login': {
//         post: {
//           tags: ['管理员相关'],
//           summary: '登陆',
//           operationId: 'loginUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'loginParam',
//               description: 'loginParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/LoginParam',
//                 originalRef: 'LoginParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«LoginBean»',
//                 originalRef: '返回结果基类«LoginBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«LoginBean»',
//                 originalRef: '返回结果基类«LoginBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/login/captcha': {
//         get: {
//           tags: ['管理员相关'],
//           summary: '获取图形验证码',
//           operationId: 'getLoginCaptchaUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'username',
//               in: 'query',
//               description: 'username',
//               required: false,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/logout': {
//         get: {
//           tags: ['管理员相关'],
//           summary: '推出',
//           operationId: 'loginOutUsingGET',
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/news': {
//         post: {
//           tags: ['消息通知管理相关'],
//           summary: '新增发送消息',
//           operationId: 'addNewsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'newsParam',
//               description: 'newsParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NewsParam',
//                 originalRef: 'NewsParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/news/list': {
//         post: {
//           tags: ['消息通知管理相关'],
//           summary: '消息通知管理',
//           operationId: 'findNewsListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'newsListParam',
//               description: 'newsListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NewsListParam',
//                 originalRef: 'NewsListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NewsBean»»',
//                 originalRef: '返回结果基类«PageInfo«NewsBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NewsBean»»',
//                 originalRef: '返回结果基类«PageInfo«NewsBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/news/{id}': {
//         delete: {
//           tags: ['消息通知管理相关'],
//           summary: '删除消息',
//           operationId: 'deletedNewsUsingDELETE_1',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//         },
//       },
//       '/notarization/assignee/name/list': {
//         post: {
//           tags: ['出证相关接口'],
//           summary: '获取公证员列表',
//           operationId: 'getAssigneeNameListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«string»»',
//                 originalRef: '返回结果基类«List«string»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«string»»',
//                 originalRef: '返回结果基类«List«string»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notarization/attestation/order/list': {
//         post: {
//           tags: ['出证相关接口'],
//           summary: '查看指定订单的存证列表',
//           operationId: 'getOrderAttestationListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NotarizationOrderAttestationGetListParam',
//                 originalRef: 'NotarizationOrderAttestationGetListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NotarizationOrderAttestationGetListBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«NotarizationOrderAttestationGetListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NotarizationOrderAttestationGetListBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«NotarizationOrderAttestationGetListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notarization/audit': {
//         put: {
//           tags: ['出证相关接口'],
//           summary: '审核出征材料',
//           operationId: 'auditNotarizationUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NotarizationAuditParam',
//                 originalRef: 'NotarizationAuditParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notarization/download/task/list': {
//         post: {
//           tags: ['出证相关接口'],
//           summary: '获取下载证据包任务列表',
//           operationId: 'getDownloadTaskListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NotarizationGetDownloadTaskListParam',
//                 originalRef: 'NotarizationGetDownloadTaskListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notarization/download/task/submit': {
//         post: {
//           tags: ['出证相关接口'],
//           summary: '提交下载证据包任务',
//           operationId: 'submitDownloadTaskUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NotarizationDownloadTaskParam',
//                 originalRef: 'NotarizationDownloadTaskParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notarization/download/{id}': {
//         get: {
//           tags: ['出证相关接口'],
//           summary: '获取下载证据包的链接',
//           operationId: 'getDownloadNotarizationUrlUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notarization/info/{id}': {
//         get: {
//           tags: ['出证相关接口'],
//           summary: '查看出证详情',
//           operationId: 'getNotarizationInfoUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AdminNotarizationInfoBean»',
//                 originalRef: '返回结果基类«AdminNotarizationInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«AdminNotarizationInfoBean»',
//                 originalRef: '返回结果基类«AdminNotarizationInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notarization/list': {
//         post: {
//           tags: ['出证相关接口'],
//           summary: '获取出证列表',
//           operationId: 'getNotarizationListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AdminNotarizationGetListParam',
//                 originalRef: 'AdminNotarizationGetListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AdminNotarizationGetListBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«AdminNotarizationGetListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AdminNotarizationGetListBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«AdminNotarizationGetListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notarization/list/export': {
//         post: {
//           tags: ['出证相关接口'],
//           summary: '导出出证列表',
//           operationId: 'exportNotarizationListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AdminNotarizationGetListParam',
//                 originalRef: 'AdminNotarizationGetListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notarization/set/pay/fee': {
//         put: {
//           tags: ['出证相关接口'],
//           summary: '为出征定价',
//           operationId: 'setNotarizationPayFeeUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NotarizationSetPayParam',
//                 originalRef: 'NotarizationSetPayParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notary/info': {
//         post: {
//           tags: ['公证处管理相关接口'],
//           summary: '保存公证处信息',
//           operationId: 'saveNotaryInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NotaryInfoParam',
//                 originalRef: 'NotaryInfoParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         put: {
//           tags: ['公证处管理相关接口'],
//           summary: '修改公证处信息',
//           operationId: 'modifyNotaryInfoUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NotaryInfoParam',
//                 originalRef: 'NotaryInfoParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notary/info/{id}': {
//         get: {
//           tags: ['公证处管理相关接口'],
//           summary: '获取公证处详情',
//           operationId: 'getNotaryInfoUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«NotaryInfoBean»',
//                 originalRef: '返回结果基类«NotaryInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«NotaryInfoBean»',
//                 originalRef: '返回结果基类«NotaryInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notary/list': {
//         post: {
//           tags: ['公证处管理相关接口'],
//           summary: '获取公证处列表',
//           operationId: 'getNotaryListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NotaryListParam',
//                 originalRef: 'NotaryListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NotaryListBean»»',
//                 originalRef: '返回结果基类«PageInfo«NotaryListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NotaryListBean»»',
//                 originalRef: '返回结果基类«PageInfo«NotaryListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/notary/name': {
//         get: {
//           tags: ['公证处管理相关接口'],
//           summary: '获取当前公证处名称',
//           operationId: 'getNotaryNameUsingGET',
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«NotaryNameBean»',
//                 originalRef: '返回结果基类«NotaryNameBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«NotaryNameBean»',
//                 originalRef: '返回结果基类«NotaryNameBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/offline/pay': {
//         post: {
//           tags: ['线下打款相关'],
//           summary: '线下打款记录',
//           operationId: 'offlinePayUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'offlinePayParam',
//               description: 'offlinePayParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OfflinePayParam',
//                 originalRef: 'OfflinePayParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/offline/pay/edit': {
//         post: {
//           tags: ['线下打款相关'],
//           summary: '编辑线下打款',
//           operationId: 'offlinePayEditUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'offlinePayEditParam',
//               description: 'offlinePayEditParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OfflinePayEditParam',
//                 originalRef: 'OfflinePayEditParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/offline/pay/info/{id}': {
//         get: {
//           tags: ['线下打款相关'],
//           summary: '线下打款详情',
//           operationId: 'offlinePayInfoUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«OfflinePayInfoBean»',
//                 originalRef: '返回结果基类«OfflinePayInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«OfflinePayInfoBean»',
//                 originalRef: '返回结果基类«OfflinePayInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/offline/pay/invoice': {
//         post: {
//           tags: ['线下打款相关'],
//           summary: '开票',
//           operationId: 'offlinePayInvoiceUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'invoiceParam',
//               description: 'invoiceParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OfflinePayInvoiceParam',
//                 originalRef: 'OfflinePayInvoiceParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/offline/pay/invoice/{id}': {
//         get: {
//           tags: ['线下打款相关'],
//           summary: '开票详情',
//           operationId: 'offlinePayInvoiceInfoUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«OfflinePayInfoBean»',
//                 originalRef: '返回结果基类«OfflinePayInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«OfflinePayInfoBean»',
//                 originalRef: '返回结果基类«OfflinePayInfoBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/offline/pay/list': {
//         post: {
//           tags: ['线下打款相关'],
//           summary: '线下打款列表',
//           operationId: 'offlinePayListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'offlinePayListParam',
//               description: 'offlinePayListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OfflinePayListParam',
//                 originalRef: 'OfflinePayListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«OfflinePayListBean»»',
//                 originalRef: '返回结果基类«PageInfo«OfflinePayListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«OfflinePayListBean»»',
//                 originalRef: '返回结果基类«PageInfo«OfflinePayListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/offline/pay/query': {
//         post: {
//           tags: ['线下打款相关'],
//           summary: '查询手机号',
//           operationId: 'offlinePayQueryUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'offlinePayQueryParam',
//               description: 'offlinePayQueryParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OfflinePayQueryParam',
//                 originalRef: 'OfflinePayQueryParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UserInfoBean»',
//                 originalRef: '返回结果基类«UserInfoBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UserInfoBean»',
//                 originalRef: '返回结果基类«UserInfoBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           deprecated: true,
//         },
//       },
//       '/order/consumer/list': {
//         post: {
//           tags: ['账户相关'],
//           summary: '获取订单列表',
//           operationId: 'getOrderListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/获取订单列表-参数',
//                 originalRef: '获取订单列表-参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«OrderBean»»',
//                 originalRef: '返回结果基类«PageInfo«OrderBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«OrderBean»»',
//                 originalRef: '返回结果基类«PageInfo«OrderBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/exportUserConsumerList': {
//         post: {
//           tags: ['账户相关'],
//           summary: '导出账单明细',
//           operationId: 'exportUserConsumerListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/导出账单明细-参数',
//                 originalRef: '导出账单明细-参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/feedback': {
//         post: {
//           tags: ['账户相关'],
//           summary: '反馈',
//           operationId: 'orderFeedbackUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'feedbackParam',
//               description: 'feedbackParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/FeedbackParam',
//                 originalRef: 'FeedbackParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/feedback/detail/{id}/{type}': {
//         post: {
//           tags: ['账户相关'],
//           summary: '反馈详情',
//           operationId: 'orderFeedbackDetailUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//             {
//               name: 'type',
//               in: 'path',
//               description: '0网页取证 1过程取证',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/feedback/list/{type}': {
//         post: {
//           tags: ['账户相关'],
//           summary: '反馈列表',
//           operationId: 'orderFeedbackListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'feedbackListParam',
//               description: 'feedbackListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/FeedbackListParam',
//                 originalRef: 'FeedbackListParam',
//               },
//             },
//             {
//               name: 'type',
//               in: 'path',
//               description: '0-网页取证, 1-过程取证或移动端取证',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           deprecated: true,
//         },
//       },
//       '/order/getFeedBackList': {
//         post: {
//           tags: ['账户相关'],
//           summary: '网页&电商&视频反馈列表',
//           operationId: 'getFeedBackListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/反馈列表V2-参数',
//                 originalRef: '反馈列表V2-参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«FeedbackListBean»»',
//                 originalRef: '返回结果基类«PageInfo«FeedbackListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«FeedbackListBean»»',
//                 originalRef: '返回结果基类«PageInfo«FeedbackListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/invoice/info/{id}': {
//         get: {
//           tags: ['发票相关'],
//           summary: '获取开票信息',
//           operationId: 'consumOrderInvoiceInfoUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«InvoiceDescBean»',
//                 originalRef: '返回结果基类«InvoiceDescBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«InvoiceDescBean»',
//                 originalRef: '返回结果基类«InvoiceDescBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/invoice/list': {
//         post: {
//           tags: ['发票相关'],
//           summary: '获取开票信息',
//           operationId: 'accountConsumOrderInvoiceUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'invoiceListParam',
//               description: 'invoiceListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/InvoiceListParam',
//                 originalRef: 'InvoiceListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«InvioceListBean»»',
//                 originalRef: '返回结果基类«PageInfo«InvioceListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«InvioceListBean»»',
//                 originalRef: '返回结果基类«PageInfo«InvioceListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/list/export': {
//         post: {
//           tags: ['账户相关'],
//           summary: '导出订单列表',
//           operationId: 'exportOrderListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/获取订单列表-参数',
//                 originalRef: '获取订单列表-参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/manual': {
//         post: {
//           tags: ['账户相关'],
//           summary: '手动扣款',
//           description: '仅用于处理用户的，不管后台运维的',
//           operationId: 'manualDeductionUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'manualDeductionParam',
//               description: 'manualDeductionParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ManualDeductionParam',
//                 originalRef: 'ManualDeductionParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/manual/info': {
//         post: {
//           tags: ['账户相关'],
//           summary: '手动扣款-查询',
//           operationId: 'manualDeductionInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'manualDeductionParam',
//               description: 'manualDeductionParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ManualDeductionCheckParam',
//                 originalRef: 'ManualDeductionCheckParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/manual/list': {
//         post: {
//           tags: ['账户相关'],
//           summary: '手动扣款列表',
//           operationId: 'manualDeductionListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'accountDetailParam',
//               description: 'accountDetailParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/DeductionParam',
//                 originalRef: 'DeductionParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«DeductionBean»»',
//                 originalRef: '返回结果基类«PageInfo«DeductionBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«DeductionBean»»',
//                 originalRef: '返回结果基类«PageInfo«DeductionBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/manual/send': {
//         post: {
//           tags: ['账户相关'],
//           summary: '手动赠送',
//           operationId: 'manualDeductionSendUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'manualSendParam',
//               description: 'manualSendParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ManualSendParam',
//                 originalRef: 'ManualSendParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/recharge/detail/{orderId}': {
//         post: {
//           tags: ['账户相关'],
//           summary: '充值详情',
//           operationId: 'orderRechargeDetailUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'orderId',
//               in: 'path',
//               description: 'orderId订单id',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/order/user/consumer/list': {
//         post: {
//           tags: ['账户相关'],
//           summary: '获取个人消费列表',
//           operationId: 'accountConsumerDetailUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'accountDetailParam',
//               description: 'accountDetailParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/AccountDetailParam',
//                 originalRef: 'AccountDetailParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AccountConsumerDetailBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«AccountConsumerDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«AccountConsumerDetailBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«AccountConsumerDetailBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/approve/list': {
//         post: {
//           tags: ['转让备案审批'],
//           summary: '列表',
//           operationId: 'getListUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ParkApproveQueryParam',
//                 originalRef: 'ParkApproveQueryParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ParkApproveListVo»»',
//                 originalRef: '返回结果基类«PageInfo«ParkApproveListVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ParkApproveListVo»»',
//                 originalRef: '返回结果基类«PageInfo«ParkApproveListVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/approve/status/num': {
//         get: {
//           tags: ['转让备案审批'],
//           summary: '备案申请记录',
//           operationId: 'getStatusNumUsingGET',
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ParkApproveStatusVo»',
//                 originalRef: '返回结果基类«ParkApproveStatusVo»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ParkApproveStatusVo»',
//                 originalRef: '返回结果基类«ParkApproveStatusVo»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/approve/upd': {
//         post: {
//           tags: ['转让备案审批'],
//           summary: '通过、驳回',
//           operationId: 'updUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ParkApproveUpdParam',
//                 originalRef: 'ParkApproveUpdParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/batch': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '导入一手备案excel',
//           operationId: 'infoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'processTaskParam',
//               description: 'processTaskParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ProcessTaskParam',
//                 originalRef: 'ProcessTaskParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/batch/download': {
//         get: {
//           tags: ['备案证明管理'],
//           summary: '批量下载备案证明',
//           operationId: 'downLoadProveOssKeyUsingGET',
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/batch/list': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '导入文件列表',
//           operationId: 'batchListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ProcessTaskListParam',
//                 originalRef: 'ProcessTaskListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ProcessingTask»»',
//                 originalRef: '返回结果基类«PageInfo«ProcessingTask»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ProcessingTask»»',
//                 originalRef: '返回结果基类«PageInfo«ProcessingTask»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/download/task/list': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '下载任务管理-列表',
//           operationId: 'getDownloadTaskListUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NotarizationGetDownloadTaskListParam',
//                 originalRef: 'NotarizationGetDownloadTaskListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»',
//                 originalRef:
//                   '返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/download/task/submit': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '提交批量下载备案证明任务',
//           operationId: 'submitDownloadTaskUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ParkDownloadTaskParam',
//                 originalRef: 'ParkDownloadTaskParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/download/{id}': {
//         get: {
//           tags: ['备案证明管理'],
//           summary: '获取下载证据包的链接',
//           operationId: 'getDownloadNotarizationUrlUsingGET_1',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/first': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '新增一手备案',
//           operationId: 'addUsingPOST_2',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'parkParam',
//               description: 'parkParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ParkParam',
//                 originalRef: 'ParkParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         put: {
//           tags: ['备案证明管理'],
//           summary: '编辑一手备案',
//           operationId: 'editUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'parkParam',
//               description: 'parkParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ParkParam',
//                 originalRef: 'ParkParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/first/list': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '一手备案列表',
//           operationId: 'findFirstListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'firstPartListParam',
//               description: 'firstPartListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/FirstPartListParam',
//                 originalRef: 'FirstPartListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«FirstParkVo»»',
//                 originalRef: '返回结果基类«PageInfo«FirstParkVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«FirstParkVo»»',
//                 originalRef: '返回结果基类«PageInfo«FirstParkVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/info/{id}': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '一手备案详情',
//           operationId: 'infoUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«FirstParkVo»',
//                 originalRef: '返回结果基类«FirstParkVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«FirstParkVo»',
//                 originalRef: '返回结果基类«FirstParkVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/num': {
//         get: {
//           tags: ['备案证明管理'],
//           summary: 'tab页数据总量',
//           operationId: 'getTabCountUsingGET',
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«TabCountVo»',
//                 originalRef: '返回结果基类«TabCountVo»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«TabCountVo»',
//                 originalRef: '返回结果基类«TabCountVo»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/trans/apply': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '转让备案-批量',
//           operationId: 'transApplyUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 type: 'array',
//                 items: {
//                   $ref: '#/definitions/ParkTransApplyParam',
//                   originalRef: 'ParkTransApplyParam',
//                 },
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/trans/edit': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '转让备案-编辑',
//           operationId: 'transEditUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ParkTransEditParam',
//                 originalRef: 'ParkTransEditParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/trans/info': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '转让备案-详情',
//           operationId: 'getTransInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ParkTransInfoParam',
//                 originalRef: 'ParkTransInfoParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ParkTransInfoVo»',
//                 originalRef: '返回结果基类«ParkTransInfoVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ParkTransInfoVo»',
//                 originalRef: '返回结果基类«ParkTransInfoVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/trans/infos': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '转让备案-批量获取备案信息详情（一手、转让）',
//           operationId: 'getTransInfosUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ParkTransInfosParam',
//                 originalRef: 'ParkTransInfosParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«ParkTransInfoVo»»',
//                 originalRef: '返回结果基类«List«ParkTransInfoVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«ParkTransInfoVo»»',
//                 originalRef: '返回结果基类«List«ParkTransInfoVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/park/trans/list': {
//         post: {
//           tags: ['备案证明管理'],
//           summary: '转让备案证明-列表',
//           operationId: 'getListUsingPOST_2',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/FirstPartListParam',
//                 originalRef: 'FirstPartListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ParkTransListVo»»',
//                 originalRef: '返回结果基类«PageInfo«ParkTransListVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ParkTransListVo»»',
//                 originalRef: '返回结果基类«PageInfo«ParkTransListVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/permission': {
//         get: {
//           tags: ['管理员相关'],
//           summary: '权限列表',
//           operationId: 'permissionListUsingGET',
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«PermissionListBean»»',
//                 originalRef: '返回结果基类«List«PermissionListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«PermissionListBean»»',
//                 originalRef: '返回结果基类«List«PermissionListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/product': {
//         post: {
//           tags: ['内容管理相关'],
//           summary: '新增产品更新',
//           operationId: 'addProductUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'productInfoParam',
//               description: 'productInfoParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ProductInfoParam',
//                 originalRef: 'ProductInfoParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/product/info/{id}': {
//         get: {
//           tags: ['内容管理相关'],
//           summary: '产品更新详情',
//           operationId: 'selectProductInfoUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ProductListBean»',
//                 originalRef: '返回结果基类«ProductListBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«ProductListBean»',
//                 originalRef: '返回结果基类«ProductListBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/product/list': {
//         post: {
//           tags: ['内容管理相关'],
//           summary: '产品更新列表',
//           operationId: 'findProductListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'productListParam',
//               description: 'productListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ProductListParam',
//                 originalRef: 'ProductListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ProductListBean»»',
//                 originalRef: '返回结果基类«PageInfo«ProductListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ProductListBean»»',
//                 originalRef: '返回结果基类«PageInfo«ProductListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/product/news': {
//         post: {
//           tags: ['内容管理相关'],
//           summary: '添加新闻',
//           operationId: 'insertNewsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'newsAddParam',
//               description: 'newsAddParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NewsAddParam',
//                 originalRef: 'NewsAddParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         put: {
//           tags: ['内容管理相关'],
//           summary: '修改新闻',
//           operationId: 'updateNewsUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'newsUpdateParam',
//               description: 'newsUpdateParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/NewsUpdateParam',
//                 originalRef: 'NewsUpdateParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/product/news/list': {
//         post: {
//           tags: ['内容管理相关'],
//           summary: '新闻列表',
//           operationId: 'findProductNewsListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'productListParam',
//               description: 'productListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/ProductListParam',
//                 originalRef: 'ProductListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ProductNewsListBean»»',
//                 originalRef: '返回结果基类«PageInfo«ProductNewsListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«ProductNewsListBean»»',
//                 originalRef: '返回结果基类«PageInfo«ProductNewsListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/product/news/publish/{id}': {
//         put: {
//           tags: ['内容管理相关'],
//           summary: '发布新闻',
//           operationId: 'updateNewsStatusUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/product/news/{id}': {
//         get: {
//           tags: ['内容管理相关'],
//           summary: '预览新闻',
//           operationId: 'previewNewsUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PreviewNewsBean»',
//                 originalRef: '返回结果基类«PreviewNewsBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PreviewNewsBean»',
//                 originalRef: '返回结果基类«PreviewNewsBean»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         delete: {
//           tags: ['内容管理相关'],
//           summary: '删除新闻',
//           operationId: 'deletedNewsUsingDELETE',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//         },
//       },
//       '/product/{id}': {
//         delete: {
//           tags: ['内容管理相关'],
//           summary: '产品更新删除',
//           operationId: 'deletedProductUsingDELETE',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//         },
//       },
//       '/property/add': {
//         post: {
//           tags: ['业主产权管理'],
//           summary: '添加产权信息',
//           operationId: 'addUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OwnerEquityAddParam',
//                 originalRef: 'OwnerEquityAddParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/property/edit': {
//         post: {
//           tags: ['业主产权管理'],
//           summary: '编辑',
//           operationId: 'editUsingPOST_1',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OwnerEquityEditParam',
//                 originalRef: 'OwnerEquityEditParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/property/export': {
//         post: {
//           tags: ['业主产权管理'],
//           summary: '导出',
//           operationId: 'exportUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OwnerEquityQueryPageParam',
//                 originalRef: 'OwnerEquityQueryPageParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«string»',
//                 originalRef: '返回结果基类«string»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/property/info': {
//         get: {
//           tags: ['业主产权管理'],
//           summary: '详情',
//           operationId: 'infoUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'communityId',
//               in: 'query',
//               description: '小区id',
//               required: false,
//               type: 'integer',
//               format: 'int64',
//             },
//             {
//               name: 'houseCode',
//               in: 'query',
//               description: '户号',
//               required: false,
//               type: 'string',
//             },
//             {
//               name: 'notaryId',
//               in: 'query',
//               required: false,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«OwnerEquityDetailVo»',
//                 originalRef: '返回结果基类«OwnerEquityDetailVo»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«OwnerEquityDetailVo»',
//                 originalRef: '返回结果基类«OwnerEquityDetailVo»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/property/list': {
//         post: {
//           tags: ['业主产权管理'],
//           summary: '列表',
//           operationId: 'getListPageUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OwnerEquityQueryPageParam',
//                 originalRef: 'OwnerEquityQueryPageParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«OwnerEquityPageVo»»',
//                 originalRef: '返回结果基类«PageInfo«OwnerEquityPageVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«OwnerEquityPageVo»»',
//                 originalRef: '返回结果基类«PageInfo«OwnerEquityPageVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/property/upd': {
//         post: {
//           tags: ['业主产权管理'],
//           summary: '启用、停用',
//           operationId: 'updUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/OwnerEquityUpdParam',
//                 originalRef: 'OwnerEquityUpdParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/region/city/{name}': {
//         get: {
//           tags: ['城市相关接口'],
//           summary: '查询市接口',
//           operationId: 'findCityOrRegionUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'name',
//               in: 'path',
//               description: 'name',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RegionDTO»»',
//                 originalRef: '返回结果基类«List«RegionDTO»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RegionDTO»»',
//                 originalRef: '返回结果基类«List«RegionDTO»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/region/province': {
//         get: {
//           tags: ['城市相关接口'],
//           summary: '查询省接口',
//           operationId: 'findProvinceUsingGET',
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RegionDTO»»',
//                 originalRef: '返回结果基类«List«RegionDTO»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RegionDTO»»',
//                 originalRef: '返回结果基类«List«RegionDTO»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/region/region/{id}': {
//         get: {
//           tags: ['城市相关接口'],
//           summary: '查询区接口',
//           operationId: 'findCityNameUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RegionDTO»»',
//                 originalRef: '返回结果基类«List«RegionDTO»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RegionDTO»»',
//                 originalRef: '返回结果基类«List«RegionDTO»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/role': {
//         get: {
//           tags: ['管理员相关'],
//           summary: '角色列表',
//           operationId: 'findRoleListUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'adminPhoneNumbers',
//               in: 'query',
//               required: false,
//               type: 'array',
//               items: {
//                 type: 'string',
//               },
//               collectionFormat: 'multi',
//             },
//             {
//               name: 'adminStatus',
//               in: 'query',
//               required: false,
//               type: 'integer',
//               format: 'int32',
//             },
//             {
//               name: 'current',
//               in: 'query',
//               required: false,
//               type: 'integer',
//               format: 'int32',
//             },
//             {
//               name: 'notaryId',
//               in: 'query',
//               required: false,
//               type: 'integer',
//               format: 'int64',
//             },
//             {
//               name: 'pageSize',
//               in: 'query',
//               required: false,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RoleListBean»»',
//                 originalRef: '返回结果基类«List«RoleListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«RoleListBean»»',
//                 originalRef: '返回结果基类«List«RoleListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         post: {
//           tags: ['管理员相关'],
//           summary: '角色添加',
//           operationId: 'insertRoleUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'roleNameParam',
//               description: 'roleNameParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/RoleNameParam',
//                 originalRef: 'RoleNameParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/role/{id}': {
//         put: {
//           tags: ['管理员相关'],
//           summary: '角色编辑',
//           operationId: 'updateRoleNameUsingPUT',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//             {
//               in: 'body',
//               name: 'roleNameParam',
//               description: 'roleNameParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/RoleNameParam',
//                 originalRef: 'RoleNameParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//         delete: {
//           tags: ['管理员相关'],
//           summary: '角色删除',
//           operationId: 'deletedRoleUsingDELETE',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'path',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '204': {
//               description: 'No Content',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//           },
//         },
//       },
//       '/user/bind/admin': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '绑定公证员',
//           operationId: 'userBindAdminUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/UserBindAdminParam',
//                 originalRef: 'UserBindAdminParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/child/list': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '查询子用户信息',
//           operationId: 'userChildListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'userIdParam',
//               description: 'userIdParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/UserIdParam',
//                 originalRef: 'UserIdParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«UserEntity»»',
//                 originalRef: '返回结果基类«List«UserEntity»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«List«UserEntity»»',
//                 originalRef: '返回结果基类«List«UserEntity»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/enterprise/list': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '用户列表接口',
//           operationId: 'userEnterpriseListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'userListParam',
//               description: 'userListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/UserListParam',
//                 originalRef: 'UserListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«UserListBean»»',
//                 originalRef: '返回结果基类«PageInfo«UserListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«UserListBean»»',
//                 originalRef: '返回结果基类«PageInfo«UserListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/enterprise/openApi': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '开通API',
//           operationId: 'openApiUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/企业开通API-参数',
//                 originalRef: '企业开通API-参数',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/exportEnterpriseInfo': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '导出企业用户列表',
//           operationId: 'exportEnterpriseInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/EnterpriseListExportParam',
//                 originalRef: 'EnterpriseListExportParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/exportUserInfo': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '导出个人用户列表',
//           operationId: 'exportUserInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/UserListExportParam',
//                 originalRef: 'UserListExportParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/feature': {
//         post: {
//           tags: ['统计相关'],
//           summary: '用户特征',
//           operationId: 'userFeatureStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UserFeatureGroupStatisticsBean»',
//                 originalRef: '返回结果基类«UserFeatureGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UserFeatureGroupStatisticsBean»',
//                 originalRef: '返回结果基类«UserFeatureGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/getUserLoginLog': {
//         get: {
//           tags: ['用户相关接口'],
//           summary: '获取登录日志',
//           operationId: 'getUserLoginLogUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'count',
//               in: 'query',
//               required: false,
//               type: 'integer',
//               format: 'int32',
//             },
//             {
//               name: 'current',
//               in: 'query',
//               required: false,
//               type: 'integer',
//               format: 'int32',
//             },
//             {
//               name: 'limit',
//               in: 'query',
//               description: '多少条',
//               required: false,
//               type: 'integer',
//               format: 'int32',
//             },
//             {
//               name: 'offset',
//               in: 'query',
//               description: '起始下标',
//               required: false,
//               type: 'integer',
//               format: 'int32',
//             },
//             {
//               name: 'pageNum',
//               in: 'query',
//               required: false,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«UserLoginLogListBean»»',
//                 originalRef: '返回结果基类«PageInfo«UserLoginLogListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«UserLoginLogListBean»»',
//                 originalRef: '返回结果基类«PageInfo«UserLoginLogListBean»»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/incr/{type}': {
//         post: {
//           tags: ['统计相关'],
//           summary: '用户增长--0近一周1 月 2年',
//           operationId: 'userIncrStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'type',
//               in: 'path',
//               description: '0近一周1 月 2年',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UserIncrGroupStatisticsBean»',
//                 originalRef: '返回结果基类«UserIncrGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UserIncrGroupStatisticsBean»',
//                 originalRef: '返回结果基类«UserIncrGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/list': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '用户列表接口',
//           operationId: 'userListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'userListParam',
//               description: 'userListParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/UserListParam',
//                 originalRef: 'UserListParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«UserListBean»»',
//                 originalRef: '返回结果基类«PageInfo«UserListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«UserListBean»»',
//                 originalRef: '返回结果基类«PageInfo«UserListBean»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/online/attestation/{type}': {
//         post: {
//           tags: ['统计相关'],
//           summary: '在线取证----业务增长-0近一周1 月 2年',
//           operationId: 'olineAttStatisticsUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'type',
//               in: 'path',
//               description: '0近一周1 月 2年',
//               required: true,
//               type: 'integer',
//               format: 'int32',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«OlineAttGroupStatisticsBean»',
//                 originalRef: '返回结果基类«OlineAttGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«OlineAttGroupStatisticsBean»',
//                 originalRef: '返回结果基类«OlineAttGroupStatisticsBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/phone': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '通过手机号查询用户信息',
//           operationId: 'userPhoneUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'userPhoneParam',
//               description: 'userPhoneParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/UserPhoneParam',
//                 originalRef: 'UserPhoneParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UserInfoBean»',
//                 originalRef: '返回结果基类«UserInfoBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«UserInfoBean»',
//                 originalRef: '返回结果基类«UserInfoBean»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/real': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '用户实名信息接口',
//           operationId: 'realInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'realRestultParam',
//               description: 'realRestultParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/RealRestultParam',
//                 originalRef: 'RealRestultParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«RealDetailParam»',
//                 originalRef: '返回结果基类«RealDetailParam»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«RealDetailParam»',
//                 originalRef: '返回结果基类«RealDetailParam»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/user/real/check': {
//         post: {
//           tags: ['用户相关接口'],
//           summary: '用户实名审核接口',
//           operationId: 'realCheckUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'realRestultParam',
//               description: 'realRestultParam',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/RealRestultParam',
//                 originalRef: 'RealRestultParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/vote/del': {
//         post: {
//           tags: ['投票管理'],
//           summary: '删除投票',
//           operationId: 'delUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/VoteDelParam',
//                 originalRef: 'VoteDelParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/vote/download/attestation/{attestationNo}': {
//         get: {
//           tags: ['投票管理'],
//           summary: '下载证据',
//           operationId: 'downloadAttestationUsingGET',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'attestationNo',
//               in: 'path',
//               description: 'attestationNo',
//               required: true,
//               type: 'string',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/vote/edit': {
//         post: {
//           tags: ['投票管理'],
//           summary: '编辑投票',
//           operationId: 'editUsingPOST_2',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/VoteEditParam',
//                 originalRef: 'VoteEditParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/vote/getInfo': {
//         post: {
//           tags: ['投票管理'],
//           summary: '查看详情',
//           operationId: 'getInfoUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/VoteDetailParam',
//                 originalRef: 'VoteDetailParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«VoteQueryDetailVo»',
//                 originalRef: '返回结果基类«VoteQueryDetailVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«VoteQueryDetailVo»',
//                 originalRef: '返回结果基类«VoteQueryDetailVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/vote/getList': {
//         post: {
//           tags: ['投票管理'],
//           summary: '投票列表',
//           operationId: 'getPageListUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/VoteQueryPageParam',
//                 originalRef: 'VoteQueryPageParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«VoteQueryPageVo»»',
//                 originalRef: '返回结果基类«PageInfo«VoteQueryPageVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«PageInfo«VoteQueryPageVo»»',
//                 originalRef: '返回结果基类«PageInfo«VoteQueryPageVo»»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/vote/getVoteResult': {
//         post: {
//           tags: ['投票管理'],
//           summary: '查看-投票结果',
//           operationId: 'getVoteResultUsingPOST',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/VoteResultParam',
//                 originalRef: 'VoteResultParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«VoteResultVo»',
//                 originalRef: '返回结果基类«VoteResultVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«VoteResultVo»',
//                 originalRef: '返回结果基类«VoteResultVo»',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/vote/info': {
//         get: {
//           tags: ['投票管理'],
//           summary: '查看详情-编辑用',
//           operationId: 'infoUsingGET_1',
//           produces: ['*/*'],
//           parameters: [
//             {
//               name: 'id',
//               in: 'query',
//               description: 'id',
//               required: true,
//               type: 'integer',
//               format: 'int64',
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«VoteInfoVo»',
//                 originalRef: '返回结果基类«VoteInfoVo»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类«VoteInfoVo»',
//                 originalRef: '返回结果基类«VoteInfoVo»',
//               },
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//       '/vote/save': {
//         post: {
//           tags: ['投票管理'],
//           summary: '新增投票信息',
//           operationId: 'addUsingPOST_3',
//           consumes: ['application/json'],
//           produces: ['*/*'],
//           parameters: [
//             {
//               in: 'body',
//               name: 'param',
//               description: 'param',
//               required: true,
//               schema: {
//                 $ref: '#/definitions/VoteAddParam',
//                 originalRef: 'VoteAddParam',
//               },
//             },
//           ],
//           responses: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//           responsesObject: {
//             '200': {
//               description: 'OK',
//               schema: {
//                 $ref: '#/definitions/返回结果基类',
//                 originalRef: '返回结果基类',
//               },
//             },
//             '201': {
//               description: 'Created',
//             },
//             '401': {
//               description: 'Unauthorized',
//             },
//             '403': {
//               description: 'Forbidden',
//             },
//             '404': {
//               description: 'Not Found',
//             },
//           },
//         },
//       },
//     },
//     definitions: {
//       AccountConsumerDetailBean: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//             description: '订单金额',
//           },
//           amountDesc: {
//             type: 'string',
//             description: '订单金额',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '时间',
//           },
//           isDoublePay: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否即扣套餐又扣余额 0只余额1只扣套餐2都扣',
//           },
//           isInvoice: {
//             type: 'integer',
//             format: 'int32',
//             description: '开票状态',
//           },
//           operatorName: {
//             type: 'string',
//             description: '操作人',
//           },
//           orderConNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '订单包含',
//           },
//           orderId: {
//             type: 'string',
//             description: '订单id',
//           },
//           orderInfo: {
//             type: 'string',
//             description: '订单详情',
//           },
//           orderType: {
//             type: 'integer',
//             format: 'int32',
//             description: '订单类型',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//         },
//         title: 'AccountConsumerDetailBean',
//       },
//       AccountDetailBean: {
//         type: 'object',
//         properties: {
//           attestationNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '存证条数',
//           },
//           childNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '成员账号数',
//           },
//           enterpriseAddress: {
//             type: 'string',
//             description: '企业地址',
//           },
//           enterpriseCode: {
//             type: 'string',
//             description: '统一信用码',
//           },
//           enterpriseName: {
//             type: 'string',
//             description: '企业名称',
//           },
//           idCard: {
//             type: 'string',
//             description: '身份证',
//           },
//           invitedNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '邀请好友数',
//           },
//           lastLoginTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '最近登录时间',
//           },
//           mobileEvidenceNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '移动端取证条数',
//           },
//           monitorNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '监测条目',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '手机号',
//           },
//           processEvidenceNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '过程取证条数',
//           },
//           realTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '实名时间',
//           },
//           rechargeAmount: {
//             type: 'number',
//             description: '充值金额',
//           },
//           registerTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '注册时间',
//           },
//           userName: {
//             type: 'string',
//             description: '姓名',
//           },
//           webAttestationNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '网页取证条数',
//           },
//         },
//         title: 'AccountDetailBean',
//       },
//       AccountDetailParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           orderStatus: {
//             type: 'string',
//           },
//           orderType: {
//             type: 'integer',
//             format: 'int32',
//             description: '1：充值 2：消费 3：赠送',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//         },
//         title: 'AccountDetailParam',
//       },
//       AccountListParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           name: {
//             type: 'string',
//             description: '名称',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户类型0个人 1企业',
//           },
//         },
//         title: 'AccountListParam',
//       },
//       ActiveDayStatisticsBean: {
//         type: 'object',
//         properties: {
//           days: {
//             type: 'array',
//             description: '日数据',
//             items: {
//               $ref: '#/definitions/DayStatisticsBean',
//               originalRef: 'DayStatisticsBean',
//             },
//           },
//           month: {
//             type: 'string',
//             description: '月份',
//           },
//         },
//         title: 'ActiveDayStatisticsBean',
//       },
//       ActiveIncrGroupStatisticsBean: {
//         type: 'object',
//         properties: {
//           activeUserNum: {
//             type: 'array',
//             description: '活跃用户',
//             items: {
//               $ref: '#/definitions/UserIncrDayStatisticsBean',
//               originalRef: 'UserIncrDayStatisticsBean',
//             },
//           },
//         },
//         title: 'ActiveIncrGroupStatisticsBean',
//       },
//       ActiveMonthStatisticsBean: {
//         type: 'object',
//         properties: {
//           months: {
//             type: 'array',
//             description: '月数据',
//             items: {
//               $ref: '#/definitions/MonthStatisticsBean',
//               originalRef: 'MonthStatisticsBean',
//             },
//           },
//           year: {
//             type: 'string',
//             description: '年份',
//           },
//         },
//         title: 'ActiveMonthStatisticsBean',
//       },
//       ActiveStatisticsBean: {
//         type: 'object',
//         properties: {
//           attTimes: {
//             type: 'integer',
//             format: 'int32',
//             description: '存证次数',
//           },
//           certTimes: {
//             type: 'integer',
//             format: 'int32',
//             description: '出证次数',
//           },
//           evidenceMonth: {
//             type: 'string',
//             description: '时间',
//           },
//           inMoney: {
//             type: 'number',
//             description: '充值金额',
//           },
//           inTimes: {
//             type: 'integer',
//             format: 'int32',
//             description: '充值次数',
//           },
//           invitedTimes: {
//             type: 'integer',
//             format: 'int32',
//             description: '邀请认数',
//           },
//           loginTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '最近登录时间',
//           },
//           loginTimes: {
//             type: 'integer',
//             format: 'int32',
//             description: '登陆次数',
//           },
//           monitorTimes: {
//             type: 'integer',
//             format: 'int32',
//             description: '监测数量',
//           },
//           parentUserId: {
//             type: 'integer',
//             format: 'int64',
//             description: '父用户id',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '用户手机号',
//           },
//           processPhoneTimes: {
//             type: 'integer',
//             format: 'int32',
//             description: '手机过程取证次数',
//           },
//           processTimes: {
//             type: 'integer',
//             format: 'int32',
//             description: '过程取证次数',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           webTimes: {
//             type: 'integer',
//             format: 'int32',
//             description: '网页取证次数',
//           },
//         },
//         title: 'ActiveStatisticsBean',
//       },
//       ActiveWeekStatisticsBean: {
//         type: 'object',
//         properties: {
//           endTime: {
//             type: 'string',
//             description: '结束时间',
//           },
//           nums: {
//             type: 'integer',
//             format: 'int32',
//             description: '周统计',
//           },
//           startTime: {
//             type: 'string',
//             description: '开始时间',
//           },
//         },
//         title: 'ActiveWeekStatisticsBean',
//       },
//       ActiveWeekStatisticsParam: {
//         type: 'object',
//         properties: {
//           endTime: {
//             type: 'string',
//             description: '结束时间',
//           },
//           startTime: {
//             type: 'string',
//             description: '开始时间',
//           },
//         },
//         title: 'ActiveWeekStatisticsParam',
//       },
//       AddressBean: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '地址',
//           },
//           cityName: {
//             type: 'string',
//             description: '城市名',
//           },
//           email: {
//             type: 'string',
//             description: '邮箱',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           isDefault: {
//             type: 'boolean',
//             description: '是否默认',
//           },
//           isDeleted: {
//             type: 'boolean',
//             description: '是否删除',
//           },
//           name: {
//             type: 'string',
//             description: '姓名',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           provinceName: {
//             type: 'string',
//             description: '省名称',
//           },
//           regionId: {
//             type: 'string',
//             description: '区域id',
//           },
//           regionName: {
//             type: 'string',
//             description: '区域名',
//           },
//         },
//         title: 'AddressBean',
//       },
//       AdminIdParam: {
//         type: 'object',
//         properties: {
//           adminId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//         },
//         title: 'AdminIdParam',
//       },
//       AdminInfoBean: {
//         type: 'object',
//         properties: {
//           acceptCertStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否受理出征  1 受理  0不受理',
//           },
//           adminName: {
//             type: 'string',
//             description: '姓名',
//           },
//           adminPhone: {
//             type: 'string',
//             description: '账号',
//           },
//           enableStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否启用管理员 1启用 0禁用',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           roleName: {
//             type: 'string',
//             description: '角色',
//           },
//         },
//         title: 'AdminInfoBean',
//       },
//       AdminInfoParam: {
//         type: 'object',
//         properties: {
//           acceptCertStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否受理出征  1 受理  0不受理',
//           },
//           adminId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           adminName: {
//             type: 'string',
//             description: '姓名',
//           },
//           adminPhone: {
//             type: 'string',
//             description: '账号',
//           },
//           enableStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否启用管理员 1启用 0禁用',
//           },
//           pwd: {
//             type: 'string',
//             description: '密码',
//           },
//           roleId: {
//             type: 'integer',
//             format: 'int64',
//             description: '角色id',
//           },
//         },
//         title: 'AdminInfoParam',
//       },
//       AdminListBean: {
//         type: 'object',
//         properties: {
//           acceptCertStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否受理出征  1 受理  0不受理',
//           },
//           adminName: {
//             type: 'string',
//             description: '姓名',
//           },
//           adminPhone: {
//             type: 'string',
//             description: '账号',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '加入时间',
//           },
//           enableStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否启用管理员 1启用 0禁用',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           roleName: {
//             type: 'string',
//             description: '角色',
//           },
//         },
//         title: 'AdminListBean',
//       },
//       AdminListParam: {
//         type: 'object',
//         properties: {
//           acceptCertStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否受理出征  1 受理  0不受理',
//           },
//           adminName: {
//             type: 'string',
//             description: '姓名',
//           },
//           adminPhone: {
//             type: 'string',
//             description: '手机号',
//           },
//           adminPhoneNumbers: {
//             type: 'array',
//             items: {
//               type: 'string',
//             },
//           },
//           adminStatus: {
//             type: 'integer',
//             format: 'int32',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           enableStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否启用',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           roleId: {
//             type: 'integer',
//             format: 'int64',
//             description: '角色id',
//           },
//         },
//         title: 'AdminListParam',
//       },
//       AdminNotarizationGetListBean: {
//         type: 'object',
//         properties: {
//           assigneeName: {
//             type: 'string',
//             description: '公证人姓名',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '创建时间',
//           },
//           fee: {
//             type: 'number',
//             description: '支付金额',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           notarizationAdminId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证人',
//           },
//           notarizationName: {
//             type: 'string',
//             description: '出证名称',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           num: {
//             type: 'integer',
//             format: 'int32',
//             description: '存证数量',
//           },
//           orderId: {
//             type: 'string',
//             description: '订单id',
//           },
//           payStatus: {
//             type: 'string',
//             description:
//               '订单状态 SUCCESS 成功，WAITPAY 待支付，INIT 处理中，FAILPAY:失败 CLOSED 关闭, REFUND 退款',
//           },
//           payStatusMemo: {
//             type: 'string',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '手机号',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '出征状态 0默认状态  1出证中  2出证成功 3出证终止  4.放弃出证',
//           },
//           statusMemo: {
//             type: 'string',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'AdminNotarizationGetListBean',
//       },
//       AdminNotarizationGetListParam: {
//         type: 'object',
//         properties: {
//           assigneeName: {
//             type: 'string',
//             description: '公证员姓名',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           keyWord: {
//             type: 'string',
//             description: '关键字',
//           },
//           notarizationAdminId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证员ID',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证员id',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '当前页',
//             minimum: 1,
//             exclusiveMinimum: false,
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示数量',
//             minimum: 0,
//             exclusiveMinimum: false,
//           },
//           payStatus: {
//             type: 'string',
//             description:
//               '订单状态 SUCCESS 成功，WAITPAY 待支付，INIT 处理中，FAILPAY:失败 CLOSED关闭, REFUND 退款',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '出征状态 0默认状态  1出证中  2出证成功 3出证终止  4.放弃出证',
//           },
//         },
//         title: 'AdminNotarizationGetListParam',
//       },
//       AdminNotarizationInfoBean: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '详细地址',
//           },
//           auditTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '审核时间',
//           },
//           backPhotoUrl: {
//             type: 'string',
//             description: '用户身份证背面',
//           },
//           city: {
//             type: 'string',
//             description: '市',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '创建时间',
//           },
//           eBackPhotoUrl: {
//             type: 'string',
//             description: '企业用户身份证背面',
//           },
//           eFrontPhotoUrl: {
//             type: 'string',
//             description: '企业用户身份证正面',
//           },
//           eHandPhotoUrl: {
//             type: 'string',
//             description: '企业用户手持身份证',
//           },
//           eIdCard: {
//             type: 'string',
//             description: '企业用户身份证',
//           },
//           eUserName: {
//             type: 'string',
//             description: '企业用户名称',
//           },
//           email: {
//             type: 'string',
//             description: '电子邮件',
//           },
//           fee: {
//             type: 'number',
//             description: '支付费用',
//           },
//           frontPhotoUrl: {
//             type: 'string',
//             description: '用户身份证正面',
//           },
//           handPhotoUrl: {
//             type: 'string',
//             description: '用户手持身份证',
//           },
//           handleType: {
//             type: 'integer',
//             format: 'int32',
//             description: '公证业务办理对象   1:本人  2:他人',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           idCard: {
//             type: 'string',
//             description: '用户身份证',
//           },
//           litigantCard: {
//             type: 'string',
//             description: '当事人身份证',
//           },
//           litigantCardBackUrl: {
//             type: 'string',
//             description: '当事人身份证背面url',
//           },
//           litigantCardFrontUrl: {
//             type: 'string',
//             description: '当事人身份证正面url',
//           },
//           litigantEnterpriseAddress: {
//             type: 'string',
//             description: '营业执照住所',
//           },
//           litigantEnterpriseCard: {
//             type: 'string',
//             description: '统一社会信用代码',
//           },
//           litigantEnterpriseLicenseUrl: {
//             type: 'string',
//             description: '企业营业执照url',
//           },
//           litigantEnterpriseName: {
//             type: 'string',
//             description: '企业名称',
//           },
//           litigantName: {
//             type: 'string',
//             description: '当事人姓名',
//           },
//           litigantPhoneNumber: {
//             type: 'string',
//             description: '当事人联系电话',
//           },
//           litigantPowerOfAttorneyUrl: {
//             type: 'string',
//             description: '授权委托书',
//           },
//           litigantType: {
//             type: 'integer',
//             format: 'int32',
//             description: '当事人类型  1:个人  2:企业/组织',
//           },
//           name: {
//             type: 'string',
//             description: '姓名',
//           },
//           notarialCertificateGetType: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '公证书领取方式  1电子邮件  2.纸质公证书邮寄  3.纸质公证书本人领取',
//           },
//           notarizationAcceptanceNoticeUrl: {
//             type: 'string',
//             description: '公证受理通知书',
//           },
//           notarizationApplicationFormUrl: {
//             type: 'string',
//             description: '公证申请表',
//           },
//           notarizationApplicationNoticeUrl: {
//             type: 'string',
//             description: '公证申请告知书',
//           },
//           notarizationAskRecordUrl: {
//             type: 'string',
//             description: '询问笔录',
//           },
//           orderId: {
//             type: 'string',
//             description: '订单id',
//           },
//           payStatus: {
//             type: 'string',
//             description:
//               '订单状态 SUCCESS 成功，WAITPAY 待支付，INIT 处理中，FAILPAY:失败 CLOSED关闭, REFUND 退款',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '用户手机号',
//           },
//           province: {
//             type: 'string',
//             description: '省',
//           },
//           region: {
//             type: 'string',
//             description: '区',
//           },
//           remark: {
//             type: 'string',
//             description: '审核备注',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '出征状态 0默认状态  1出证中  2出证成功 3出证终止  4.放弃出证',
//           },
//           tradeRemark: {
//             type: 'string',
//             description: '交易备注',
//           },
//           transferUrl: {
//             type: 'string',
//             description: '线下转账url',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名称',
//           },
//           userType: {
//             type: 'string',
//             description: '用户类型 0 个人 1 企业',
//           },
//         },
//         title: 'AdminNotarizationInfoBean',
//       },
//       AmountRankVo: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//           },
//           name: {
//             type: 'string',
//           },
//         },
//         title: 'AmountRankVo',
//       },
//       AnnouncementBean: {
//         type: 'object',
//         properties: {
//           audience: {
//             type: 'string',
//             description: '阅读对象',
//           },
//           content: {
//             type: 'string',
//             description: '公告内容',
//           },
//           createdAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告提交时间',
//           },
//           expireAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告结束时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '公告ID',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           sender: {
//             type: 'string',
//             description: '提交人',
//           },
//           startAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '公告状态',
//           },
//           title: {
//             type: 'string',
//             description: '公告标题',
//           },
//         },
//         title: 'AnnouncementBean',
//       },
//       AnnouncementCreateModifyBean: {
//         type: 'object',
//         properties: {
//           audience: {
//             type: 'string',
//             description: '阅读对象',
//           },
//           content: {
//             type: 'string',
//             description: '公告内容',
//           },
//           createdAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告提交时间',
//           },
//           expireAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告结束时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '公告ID',
//           },
//           startAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告开始时间',
//           },
//           title: {
//             type: 'string',
//             description: '公告标题',
//           },
//         },
//         title: 'AnnouncementCreateModifyBean',
//       },
//       AnnouncementCreateParam: {
//         type: 'object',
//         properties: {
//           audience: {
//             type: 'string',
//             description: '阅读对象',
//           },
//           content: {
//             type: 'string',
//             description: '公告内容',
//           },
//           expireAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告结束时间',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           startAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告开始时间',
//           },
//           title: {
//             type: 'string',
//             description: '公告标题',
//           },
//         },
//         title: 'AnnouncementCreateParam',
//       },
//       AnnouncementListParam: {
//         type: 'object',
//         properties: {
//           audience: {
//             type: 'string',
//             description: '阅读对象',
//           },
//           content: {
//             type: 'string',
//             description: '公告内容',
//           },
//           createdAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告提交时间',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           expireAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告结束时间',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           sender: {
//             type: 'string',
//             description: '提交人',
//           },
//           startAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告开始时间',
//           },
//           title: {
//             type: 'string',
//             description: '公告标题',
//           },
//         },
//         title: 'AnnouncementListParam',
//       },
//       AnnouncementModifyParam: {
//         type: 'object',
//         properties: {
//           audience: {
//             type: 'string',
//             description: '阅读对象',
//           },
//           content: {
//             type: 'string',
//             description: '公告内容',
//           },
//           expireAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告结束时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '公告ID',
//           },
//           startAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '公告开始时间',
//           },
//           title: {
//             type: 'string',
//             description: '公告标题',
//           },
//         },
//         title: 'AnnouncementModifyParam',
//       },
//       ApiListBean: {
//         type: 'object',
//         properties: {
//           appId: {
//             type: 'string',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//           },
//           meshLimitTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           meshNumber: {
//             type: 'integer',
//             format: 'int64',
//           },
//           meshNumberLimit: {
//             type: 'integer',
//             format: 'int64',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           securityKey: {
//             type: 'string',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//           },
//           stopTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           time: {
//             type: 'integer',
//             format: 'int64',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//           },
//           userName: {
//             type: 'string',
//           },
//         },
//         title: 'ApiListBean',
//       },
//       ApiListParam: {
//         type: 'object',
//         properties: {
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '当前页',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示条数',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态 0停用  1使用中 2使用完毕',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'ApiListParam',
//       },
//       ApiPriceAddParam: {
//         type: 'object',
//         required: ['evidenceType', 'phone', 'type'],
//         properties: {
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '存证类型  0:文件存证 1:网页取证 8:HASH存证',
//           },
//           num: {
//             type: 'integer',
//             format: 'int64',
//             description: '数量',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '套餐类型 1按数量 2按时间',
//           },
//         },
//         title: 'ApiPriceAddParam',
//       },
//       ApiPriceModifyParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '套餐id',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态 0停用  1启用',
//           },
//         },
//         title: 'ApiPriceModifyParam',
//       },
//       AppVersionListBean: {
//         type: 'object',
//         properties: {
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '添加时间',
//           },
//           downloadUrl: {
//             type: 'string',
//             description: '下载地址',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           memo: {
//             type: 'string',
//             description: '内部备注',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           oldVersion: {
//             type: 'string',
//             description: 'app上一版本号',
//           },
//           operateSystem: {
//             type: 'integer',
//             format: 'int32',
//             description: '操作系统：1.安卓,2.ios',
//           },
//           operateUserId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'operateUserId',
//           },
//           operateUserName: {
//             type: 'string',
//             description: '操作人',
//           },
//           updateContent: {
//             type: 'string',
//             description: '更新内容',
//           },
//           version: {
//             type: 'string',
//             description: 'app版本号',
//           },
//           versionName: {
//             type: 'string',
//             description: '版本名称',
//           },
//         },
//         title: 'AppVersionListBean',
//       },
//       AppVersionListParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//             minimum: 1,
//             exclusiveMinimum: false,
//           },
//           limit: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示条数',
//             minimum: 1,
//             exclusiveMinimum: false,
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           operateSystem: {
//             type: 'integer',
//             format: 'int32',
//             description: '操作系统：1.安卓,2.ios',
//             minimum: 0,
//             maximum: 9223372036854776000,
//             exclusiveMinimum: false,
//             exclusiveMaximum: false,
//           },
//         },
//         title: 'AppVersionListParam',
//       },
//       AttestationFileDetailBean: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           channel: {
//             type: 'integer',
//             format: 'int32',
//             description: '存证渠道：1.自助存证  2.api存证',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '保全时间',
//           },
//           fileHash: {
//             type: 'string',
//             description: 'hash值',
//           },
//           fileLabel: {
//             type: 'string',
//             description: '备注',
//           },
//           fileName: {
//             type: 'string',
//             description: '文件名称',
//           },
//           fileSize: {
//             type: 'string',
//             description: '文件大小',
//           },
//           fileType: {
//             type: 'string',
//             description: '文件类型',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           parentUserId: {
//             type: 'integer',
//             format: 'int64',
//             description: '主用户ID',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户ID',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '个人/企业',
//           },
//         },
//         title: 'AttestationFileDetailBean',
//       },
//       AttestationFileDetailParam: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           attestationType: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '存证类型  0:文件存证 1:网页取证  2:过程取证  3:移动端取证，4:音乐取证  5.电商取证   6电商取证（视频）  7.现场取证,8,hash存证',
//           },
//           channel: {
//             type: 'integer',
//             format: 'int32',
//             description: '存证渠道：1.自助存证  2.api存证',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           fileLabel: {
//             type: 'string',
//             description: '备注',
//           },
//           fileName: {
//             type: 'string',
//             description: '文件名称',
//           },
//           fileType: {
//             type: 'string',
//             description: '文件类型',
//             enum: ['AUDIO', 'DOC', 'IMAGE', 'OTHER', 'VIDEO'],
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           phone: {
//             type: 'string',
//             description: '手机',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '存证状态 1-上链中 2-上链失败 3-上链成功',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户ID',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userNameOrderBy: {
//             type: 'boolean',
//             description: '是否按照姓名排序',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户类型 （0: 个人，1: 企业）',
//           },
//         },
//         title: 'AttestationFileDetailParam',
//       },
//       AttestationFileDownloadBean: {
//         type: 'object',
//         properties: {
//           fileData: {
//             type: 'string',
//             description: '文件的base64数据',
//           },
//           fileName: {
//             type: 'string',
//             description: '文件名称,如 test.jpg',
//           },
//           is: {
//             description: '文件流',
//             $ref: '#/definitions/InputStream',
//             originalRef: 'InputStream',
//           },
//           size: {
//             type: 'integer',
//             format: 'int64',
//             description: '文件流',
//           },
//         },
//         title: 'AttestationFileDownloadBean',
//       },
//       AttestationProcessDetailBean: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           consumeBalance: {
//             type: 'number',
//           },
//           consumeSendBalance: {
//             type: 'number',
//           },
//           consumeTotalBalance: {
//             type: 'number',
//           },
//           duration: {
//             type: 'string',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           endTimeStr: {
//             type: 'string',
//           },
//           enterpriseName: {
//             type: 'string',
//             description: '企业名称',
//           },
//           errorMessage: {
//             type: 'string',
//           },
//           evidenceLabel: {
//             type: 'string',
//             description: '取证标签',
//           },
//           evidenceName: {
//             type: 'string',
//             description: '取证名称',
//           },
//           evidenceNode: {
//             type: 'string',
//             description: '取证机器',
//           },
//           evidenceTimeLen: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证时长',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '0：过程取证 1：移动端取证',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           isReal: {
//             type: 'boolean',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           startTimeStr: {
//             type: 'string',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态',
//           },
//           statusText: {
//             type: 'string',
//           },
//           transactionId: {
//             type: 'string',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户ID',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户类型 0：个人， 1：企业',
//           },
//           videoOssKey: {
//             type: 'string',
//             description: '视频查看地址',
//           },
//         },
//         title: 'AttestationProcessDetailBean',
//       },
//       AttestationProcessDetailParam: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           evidenceLabel: {
//             type: 'string',
//             description: '取证标签',
//           },
//           evidenceName: {
//             type: 'string',
//             description: '取证名称',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '0：过程取证 1：移动端取证',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           phone: {
//             type: 'string',
//             description: '用户名',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '状态：0：初始化 1:取证中 6：取证成功 3：取证失败 4：取证取消',
//           },
//           statusList: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'userIds',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'AttestationProcessDetailParam',
//       },
//       AttestationUrlDetailBean: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           consumeBalance: {
//             type: 'number',
//           },
//           consumeSendBalance: {
//             type: 'number',
//           },
//           errorMsg: {
//             type: 'string',
//             description: '开放平台返回的错误信息',
//           },
//           errorType: {
//             type: 'string',
//             description: '开放平台返回的错误码 1开头的可以重试',
//           },
//           evidenceLabel: {
//             type: 'string',
//             description: '取证标签',
//           },
//           evidenceName: {
//             type: 'string',
//             description: '取证名称',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证平台：0.网页 1.拼多多 2.1688 3.淘宝 4.抖音',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           imgFileOssKey: {
//             type: 'string',
//             description: '截图图片地址',
//           },
//           isReal: {
//             type: 'boolean',
//           },
//           isSingle: {
//             type: 'boolean',
//             description: '单个还是批量提交',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           publisher: {
//             type: 'string',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           startTimeStr: {
//             type: 'string',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态',
//           },
//           statusText: {
//             type: 'string',
//           },
//           transactionId: {
//             type: 'string',
//           },
//           url: {
//             type: 'string',
//             description: '取证链接',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户类型',
//           },
//         },
//         title: 'AttestationUrlDetailBean',
//       },
//       AttestationUrlDetailParam: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           evidenceKind: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证种类：0.网页 1.电商 2.视频',
//           },
//           evidenceLabel: {
//             type: 'string',
//             description: '取证标签',
//           },
//           evidenceName: {
//             type: 'string',
//             description: '取证名称',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '取证类型：0.网页取证类型 1.拼多多电商取证 2.1688电商取证 3.淘宝电商取证 4.抖音电商取证 5.抖音视频取证 6快手视频取证 7.微信视频号 8.微视 9.腾讯视频 10.企鹅FM',
//           },
//           isSingle: {
//             type: 'integer',
//             format: 'int32',
//             description: '单个-1  批量-0',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           phone: {
//             type: 'string',
//             description: '用户名',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '状态： 3：取证结果处理中 4: 取证成功，5：取证失败 6：取证取消',
//           },
//           userId: {
//             type: 'string',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'AttestationUrlDetailParam',
//       },
//       AuthRateVo: {
//         type: 'object',
//         properties: {
//           dateTime: {
//             type: 'string',
//           },
//           enterpriseRate: {
//             type: 'number',
//           },
//           personalRate: {
//             type: 'number',
//           },
//           totalRate: {
//             type: 'number',
//           },
//         },
//         title: 'AuthRateVo',
//       },
//       BQNumberStatisticsBean: {
//         type: 'object',
//         properties: {
//           attNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '确权条目',
//           },
//           onlineNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证条目',
//           },
//         },
//         title: 'BQNumberStatisticsBean',
//       },
//       BannerAddParam: {
//         type: 'object',
//         properties: {
//           buttonAlign: {
//             type: 'integer',
//             format: 'int32',
//             description: '按钮对齐：0.无 1.居中 2.居左 3.居右',
//           },
//           buttonText: {
//             type: 'string',
//             description: '按钮文案',
//           },
//           color: {
//             type: 'integer',
//             format: 'int32',
//             description: 'banner色系：1.浅色  2.深色',
//           },
//           imgLink: {
//             type: 'string',
//             description: '图片',
//           },
//           link: {
//             type: 'string',
//             description: '连接',
//           },
//           newsDesc: {
//             type: 'string',
//             description: 'banner描述',
//           },
//           newsType: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               'Banner类型：0.PC官网Banner 1.登录注册活动位 2.概览活动位 3.H5官网Banner',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           onlineTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '上线时间',
//           },
//           srialNumber: {
//             type: 'integer',
//             format: 'int32',
//             description: '排号',
//           },
//         },
//         title: 'BannerAddParam',
//       },
//       BannerListBean: {
//         type: 'object',
//         properties: {
//           buttonAlign: {
//             type: 'integer',
//             format: 'int32',
//             description: '按钮对齐：1.居中 2.居左 3.居右',
//           },
//           buttonText: {
//             type: 'string',
//             description: '按钮文案',
//           },
//           color: {
//             type: 'integer',
//             format: 'int32',
//             description: 'banner色系：1.浅色  2.深色',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '创建时间',
//           },
//           desc: {
//             type: 'string',
//             description: '描述',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           imgUrl: {
//             type: 'string',
//             description: '图片',
//           },
//           isDeleted: {
//             type: 'boolean',
//             description: '是否删除',
//           },
//           linkUrl: {
//             type: 'string',
//             description: '跳转链接',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           number: {
//             type: 'integer',
//             format: 'int32',
//             description: '序号',
//           },
//           onlineTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '上线时间',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               'Banner类型：0.PC官网Banner 1.登录注册活动位 2.概览活动位 3.H5官网Banner',
//           },
//         },
//         title: 'BannerListBean',
//       },
//       BannerNumberUpdateParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           number: {
//             type: 'integer',
//             format: 'int32',
//             description: '序号',
//           },
//         },
//         title: 'BannerNumberUpdateParam',
//       },
//       BannerPutParam: {
//         type: 'object',
//         properties: {
//           buttonAlign: {
//             type: 'integer',
//             format: 'int32',
//             description: '按钮对齐：0.无 1.居中 2.居左 3.居右',
//           },
//           buttonText: {
//             type: 'string',
//             description: '按钮文案',
//           },
//           color: {
//             type: 'integer',
//             format: 'int32',
//             description: 'banner色系：1.浅色  2.深色',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           imgLink: {
//             type: 'string',
//             description: '图片',
//           },
//           link: {
//             type: 'string',
//             description: '连接',
//           },
//           newsDesc: {
//             type: 'string',
//             description: 'banner描述',
//           },
//           newsType: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               'Banner类型：0.PC官网Banner 1.登录注册活动位 2.概览活动位 3.H5官网Banner',
//           },
//           onlineTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '上线时间',
//           },
//           srialNumber: {
//             type: 'integer',
//             format: 'int32',
//             description: '排号',
//           },
//         },
//         title: 'BannerPutParam',
//       },
//       BindDeviceListBean: {
//         type: 'object',
//         properties: {
//           bindTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '绑定时间',
//           },
//           deviceId: {
//             type: 'string',
//             description: '执法记录仪编号',
//           },
//           notaryName: {
//             type: 'string',
//             description: '公证处名称',
//           },
//           operatePhoneNumber: {
//             type: 'string',
//             description: '子账号手机号',
//           },
//           operateUserName: {
//             type: 'string',
//             description: '子账号名',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '手机号',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '绑定状态 0未绑定 1绑定',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'BindDeviceListBean',
//       },
//       BindDeviceListParam: {
//         type: 'object',
//         properties: {
//           keyword: {
//             type: 'string',
//             description: '关键字',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '当前页',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示数量',
//           },
//           parentUserId: {
//             type: 'integer',
//             format: 'int64',
//             description: '主账号用户id',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '手机号',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '绑定状态 0未绑定 1绑定',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'BindDeviceListParam',
//       },
//       CertificatesBaseVo: {
//         type: 'object',
//         properties: {
//           name: {
//             type: 'string',
//           },
//           percentage: {
//             type: 'number',
//           },
//           rate: {
//             type: 'number',
//           },
//         },
//         title: 'CertificatesBaseVo',
//       },
//       CertificatesTotalVo: {
//         type: 'object',
//         properties: {
//           certificatesBaseVos: {
//             type: 'array',
//             items: {
//               $ref: '#/definitions/CertificatesBaseVo',
//               originalRef: 'CertificatesBaseVo',
//             },
//           },
//           totalCert: {
//             type: 'number',
//           },
//         },
//         title: 'CertificatesTotalVo',
//       },
//       CertificatesVo: {
//         type: 'object',
//         properties: {
//           enterpriseCertVo: {
//             $ref: '#/definitions/CertificatesTotalVo',
//             originalRef: 'CertificatesTotalVo',
//           },
//           personalCertVo: {
//             $ref: '#/definitions/CertificatesTotalVo',
//             originalRef: 'CertificatesTotalVo',
//           },
//           totalCertVo: {
//             $ref: '#/definitions/CertificatesTotalVo',
//             originalRef: 'CertificatesTotalVo',
//           },
//         },
//         title: 'CertificatesVo',
//       },
//       ChainModeParam: {
//         type: 'object',
//         properties: {
//           chainMode: {
//             type: 'integer',
//             format: 'int32',
//             description: '链模式 0.保全链 1.cap',
//             minimum: 0,
//             maximum: 1,
//             exclusiveMinimum: false,
//             exclusiveMaximum: false,
//           },
//           chainTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '切链时间',
//           },
//           explorerUrl: {
//             type: 'string',
//             description: 'cap浏览器url',
//           },
//         },
//         title: 'ChainModeParam',
//       },
//       CommonUser: {
//         type: 'object',
//         properties: {
//           proprietorCard: {
//             type: 'string',
//             description: '共同使用权人证件号',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位共同使用权人',
//           },
//         },
//         title: 'CommonUser',
//       },
//       CommunityAddParam: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '省市区地址,类似：xx/xx/xx',
//           },
//           name: {
//             type: 'string',
//             description: '小区名称',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'CommunityAddParam',
//       },
//       CommunityEditParam: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '省市区地址,类似：xx/xx/xx',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           name: {
//             type: 'string',
//             description: '小区名称',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'CommunityEditParam',
//       },
//       CommunityListVo: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '省市区地址',
//           },
//           certified: {
//             type: 'integer',
//             format: 'int64',
//             description: '已认证业主数',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '创建时间',
//           },
//           equityTotal: {
//             type: 'integer',
//             format: 'int64',
//             description: '房屋产权总数',
//           },
//           id: {
//             type: 'string',
//             description: '小区ID',
//           },
//           name: {
//             type: 'string',
//             description: '小区名称',
//           },
//           ownerTotal: {
//             type: 'integer',
//             format: 'int64',
//             description: '业主总数',
//           },
//           totalCount: {
//             type: 'integer',
//             format: 'int64',
//             description: '车位备案总数',
//           },
//           transCount: {
//             type: 'integer',
//             format: 'int64',
//             description: '已转让备案数',
//           },
//         },
//         title: 'CommunityListVo',
//       },
//       CommunityQueryParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           name: {
//             type: 'string',
//             description: '小区名称',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           operationType: {
//             type: 'integer',
//             format: 'int32',
//             description: '1-投票',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//         },
//         title: 'CommunityQueryParam',
//       },
//       ConsumerDayGroupStatisticsBean: {
//         type: 'object',
//         properties: {
//           consumerDayStatisticsBeans: {
//             type: 'array',
//             description: '消费统计数据',
//             items: {
//               $ref: '#/definitions/ConsumerDayStatisticsBean',
//               originalRef: 'ConsumerDayStatisticsBean',
//             },
//           },
//           inDayStatisticsBeans: {
//             type: 'array',
//             description: '收入统计数据',
//             items: {
//               $ref: '#/definitions/ConsumerDayStatisticsBean',
//               originalRef: 'ConsumerDayStatisticsBean',
//             },
//           },
//           sendDayStatisticsBeans: {
//             type: 'array',
//             description: '赠送统计数据',
//             items: {
//               $ref: '#/definitions/ConsumerDayStatisticsBean',
//               originalRef: 'ConsumerDayStatisticsBean',
//             },
//           },
//         },
//         title: 'ConsumerDayGroupStatisticsBean',
//       },
//       ConsumerDayStatisticsBean: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           time: {
//             type: 'string',
//             description: '时间',
//           },
//         },
//         title: 'ConsumerDayStatisticsBean',
//       },
//       ConsumerStatisticsBean: {
//         type: 'object',
//         properties: {
//           attBackSendMoney: {
//             type: 'number',
//             description: '取证退回金额',
//           },
//           attMoney: {
//             type: 'number',
//             description: '存证确权消费金额',
//           },
//           certMoney: {
//             type: 'number',
//             description: '出证费用消费金额',
//           },
//           consumerMoney: {
//             type: 'number',
//             description: '消费金额',
//           },
//           handMoney: {
//             type: 'number',
//             description: '手动扣款消费金额',
//           },
//           handSendMoney: {
//             type: 'number',
//             description: '手动赠送金额',
//           },
//           inMoney: {
//             type: 'number',
//             description: '充值金额',
//           },
//           monitorMoney: {
//             type: 'number',
//             description: '站点监测消费金额',
//           },
//           offlineMoney: {
//             type: 'number',
//             description: '线下金额',
//           },
//           onlineMoney: {
//             type: 'number',
//             description: '在线取证消费金额',
//           },
//           onlineSendMoney: {
//             type: 'number',
//             description: '线上赠送金额',
//           },
//           sendMoney: {
//             type: 'number',
//             description: '赠送金额',
//           },
//         },
//         title: 'ConsumerStatisticsBean',
//       },
//       DayStatisticsBean: {
//         type: 'object',
//         properties: {
//           day: {
//             type: 'string',
//             description: '日',
//           },
//           nums: {
//             type: 'integer',
//             format: 'int32',
//             description: '日统计',
//           },
//         },
//         title: 'DayStatisticsBean',
//       },
//       DeductionBean: {
//         type: 'object',
//         properties: {
//           adminName: {
//             type: 'string',
//             description: '操作人',
//           },
//           amount: {
//             type: 'number',
//             description: '扣款金额',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '扣款类型: 8.充值积分 16.赠送积分',
//           },
//           isReal: {
//             type: 'boolean',
//             description: '是否实名',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           orderId: {
//             type: 'string',
//             description: '订单号',
//           },
//           outOrderNo: {
//             type: 'string',
//             description: '外部消费订单号',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           reason: {
//             type: 'string',
//             description: '扣款原因',
//           },
//           time: {
//             type: 'string',
//             format: 'date-time',
//             description: '扣款时间',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'userId',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户类型',
//           },
//         },
//         title: 'DeductionBean',
//       },
//       DeductionParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           orderId: {
//             type: 'string',
//             description: '订单号',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '扣款类型0手机号1订单号',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'DeductionParam',
//       },
//       DictInfoAddParam: {
//         type: 'object',
//         properties: {
//           key: {
//             type: 'string',
//           },
//           type1: {
//             type: 'string',
//           },
//           type2: {
//             type: 'string',
//           },
//           value: {
//             type: 'string',
//           },
//         },
//         title: 'DictInfoAddParam',
//       },
//       EnforcerRecordBean: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '保全id',
//           },
//           attestationType: {
//             type: 'integer',
//             format: 'int32',
//             description: '存证类型:19.录音取证',
//           },
//           chainHash: {
//             type: 'string',
//             description: '保全链唯一标识',
//           },
//           completedAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '上链时间',
//           },
//           deviceId: {
//             type: 'string',
//             description: '执法记录仪编号',
//           },
//           evidenceEndTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '取证结束时间',
//           },
//           evidenceExtCode: {
//             type: 'string',
//             description: '证据提取码',
//           },
//           evidenceExtUrl: {
//             type: 'string',
//             description: '证据提取链接',
//           },
//           evidenceLocation: {
//             type: 'string',
//             description: '取证地址',
//           },
//           evidenceStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '取证开始时间',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证类型:1.拍照取证，2.录像取证，3.录音取证',
//           },
//           fileHash: {
//             type: 'string',
//             description: '文件hash',
//           },
//           fileLabel: {
//             type: 'string',
//             description: '取证标签',
//           },
//           fileName: {
//             type: 'string',
//             description: '取证文件名称',
//           },
//           fileSize: {
//             type: 'integer',
//             format: 'int64',
//             description: '取证文件大小(byte)',
//           },
//           fileUrl: {
//             type: 'string',
//             description: '证据下载url',
//           },
//           hhfNumber: {
//             type: 'string',
//             description: '杭互证据编号',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           idCard: {
//             type: 'string',
//             description: '身份证号',
//           },
//           pdfUrl: {
//             type: 'string',
//             description: '证书url',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           photoUrl: {
//             type: 'string',
//             description: '证书图片url',
//           },
//           qrUrl: {
//             type: 'string',
//             description: '证书上的链接',
//           },
//           submitTime: {
//             type: 'string',
//             description: '提交时间',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'EnforcerRecordBean',
//       },
//       EnforcerRecordListBean: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           attestationType: {
//             type: 'integer',
//             format: 'int32',
//             description: '存证类型',
//           },
//           completedAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '保全时间',
//           },
//           evidenceName: {
//             type: 'string',
//             description: '取证名称',
//           },
//           evidenceStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证状态1,取证正常,2.证据缺失',
//           },
//           evidenceTimeLen: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证时长(秒)',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '1.图片 2.录音 3.视频',
//           },
//           fileName: {
//             type: 'string',
//             description: '文件名',
//           },
//           fileUrl: {
//             type: 'string',
//             description: '文件url',
//           },
//           label: {
//             type: 'string',
//             description: '标签',
//           },
//           locationName: {
//             type: 'string',
//             description: '取证地址',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           operateUserName: {
//             type: 'string',
//             description: '操作人',
//           },
//           payMoney: {
//             type: 'number',
//             format: 'double',
//             description: '支付金额',
//           },
//           payStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '文件url',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名称',
//           },
//         },
//         title: 'EnforcerRecordListBean',
//       },
//       EnforcerRecordListParam: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证id',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束日期',
//           },
//           evidenceName: {
//             type: 'string',
//             description: '存证名',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '1.图片 2.录像 3.录音',
//           },
//           fileType: {
//             type: 'string',
//             description: '文件类型',
//           },
//           keyword: {
//             type: 'string',
//             description: '关键字',
//           },
//           label: {
//             type: 'string',
//             description: '标签',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           operateUserName: {
//             type: 'string',
//             description: '操作人名',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '当前页',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示数量',
//           },
//           parentUserId: {
//             type: 'integer',
//             format: 'int64',
//             description: '主账号id',
//           },
//           payStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否支付 1支付完成 0未支付',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '手机号',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始日期',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'EnforcerRecordListParam',
//       },
//       EnterpriseListExportParam: {
//         type: 'object',
//         properties: {
//           adminId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证员id',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '注册结束时间',
//           },
//           industry: {
//             type: 'integer',
//             format: 'int32',
//             description: '行业',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           realEndTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '实名结束时间',
//           },
//           realStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '实名开始时间',
//           },
//           realStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态：0 未实名  1：待审核 2：审核被拒 3：审核通过',
//           },
//           sourceId: {
//             type: 'integer',
//             format: 'int32',
//             description: '注册来源',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '注册开始时间',
//           },
//         },
//         title: 'EnterpriseListExportParam',
//       },
//       FeedbackListBean: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           evidenceType: {
//             type: 'string',
//             description: '取证方式0：过程取证 1：移动端取证',
//           },
//           feedback: {
//             type: 'string',
//             description: '反馈内容',
//           },
//           feedbackRemark: {
//             type: 'string',
//             description: '反馈备注',
//           },
//           feedbackTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '回复时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           imgFileOssKey: {
//             type: 'string',
//             description: '图片',
//           },
//           isReal: {
//             type: 'boolean',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           reFeedback: {
//             type: 'string',
//             description: '处理结果',
//           },
//           remark: {
//             type: 'string',
//             description: '备注',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '处理状态 1通过0未通过 2待回复',
//           },
//           url: {
//             type: 'string',
//             description: '反馈链接',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户Id',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户类型',
//           },
//         },
//         title: 'FeedbackListBean',
//       },
//       FeedbackListParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '0-过程取证， 1-移动端取证',
//           },
//           feedbackType: {
//             type: 'string',
//             description: '反馈类型， 取证结果反馈：0，截图反馈：1',
//             enum: ['ATTEST_RESULT', 'SCREENSHOT'],
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '处理状态 1通过0未通过 2待回复',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userPhone: {
//             type: 'string',
//             description: '用户手机号',
//           },
//         },
//         title: 'FeedbackListParam',
//       },
//       FeedbackParam: {
//         type: 'object',
//         required: ['feedback', 'feedbackRemark', 'no'],
//         properties: {
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: ' 1：网页/电商/视频取证 2：过程取证',
//           },
//           feedback: {
//             type: 'string',
//             description: '反馈信息',
//           },
//           feedbackRemark: {
//             type: 'string',
//             description: '反馈备注',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           no: {
//             type: 'string',
//             description: '存证编号',
//           },
//           reason: {
//             type: 'string',
//             description: '扣款原因',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否通过1通过0未通过',
//           },
//         },
//         title: 'FeedbackParam',
//       },
//       FirstParkVo: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '省市区',
//           },
//           availableYears: {
//             type: 'integer',
//             format: 'int32',
//             description: '车位使用年限',
//           },
//           commonUsers: {
//             type: 'array',
//             description: '共同使用权人',
//             items: {
//               $ref: '#/definitions/CommonUser',
//               originalRef: 'CommonUser',
//             },
//           },
//           communityAddress: {
//             type: 'string',
//             description: '小区地址',
//           },
//           communityId: {
//             type: 'string',
//             description: '小区id',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           contractFileNames: {
//             type: 'string',
//             description: '合同文件名',
//           },
//           contractOssKeys: {
//             type: 'string',
//             description: '合同oss keys地址',
//           },
//           id: {
//             type: 'string',
//           },
//           parkNumber: {
//             type: 'string',
//             description: '车位号码',
//           },
//           parkProperty: {
//             type: 'string',
//             description: '车位属性',
//           },
//           parkStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '车位使用开始时间',
//           },
//           propLocation: {
//             type: 'string',
//             description: '楼盘坐落',
//           },
//           proprietorCard: {
//             type: 'string',
//             description: '使用权人证件号',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位使用权人',
//           },
//           proveAttestationId: {
//             type: 'string',
//             description: '使用权备案号',
//           },
//           proveHash: {
//             type: 'string',
//           },
//           proveOssKey: {
//             type: 'string',
//             description: '备案证明文件',
//           },
//           recordTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '备案时间',
//           },
//           sharedStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: ' 是否有共同使用权人：0，否；1，是',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '备案状态：-1转让申请；0，生效中；1，已失效/已转让',
//           },
//           storageAttestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           storageHash: {
//             type: 'string',
//             description: '上链hash',
//           },
//           storageOssKey: {
//             type: 'string',
//             description: '保管单OSS KEY',
//           },
//           transferTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '转让时间',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '车位使用权人用户id',
//           },
//         },
//         title: 'FirstParkVo',
//       },
//       FirstPartListParam: {
//         type: 'object',
//         properties: {
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           isFirst: {
//             type: 'integer',
//             format: 'int32',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           parkNumber: {
//             type: 'string',
//             description: '车位号码',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位使用权人',
//           },
//           proveAttestationId: {
//             type: 'string',
//             description: '使用权备案号',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '备案状态：-1转让申请；0，生效中；1，已失效/已转让',
//           },
//           storageAttestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//         },
//         title: 'FirstPartListParam',
//       },
//       HomePageGroupStatisticsBean: {
//         type: 'object',
//         properties: {
//           bqNumberStatisticsBean: {
//             description: '保全条目',
//             $ref: '#/definitions/BQNumberStatisticsBean',
//             originalRef: 'BQNumberStatisticsBean',
//           },
//           inMoneyTotalStatisticsBean: {
//             description: '总收入',
//             $ref: '#/definitions/InMoneyTotalStatisticsBean',
//             originalRef: 'InMoneyTotalStatisticsBean',
//           },
//           userNumberStatisticsBean: {
//             description: '用户数',
//             $ref: '#/definitions/UserNumberStatisticsBean',
//             originalRef: 'UserNumberStatisticsBean',
//           },
//           waitHandleStatisticsBean: {
//             description: '待处理',
//             $ref: '#/definitions/WaitHandleStatisticsBean',
//             originalRef: 'WaitHandleStatisticsBean',
//           },
//         },
//         title: 'HomePageGroupStatisticsBean',
//       },
//       IdParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//         },
//         title: 'IdParam',
//       },
//       InMoneyTotalStatisticsBean: {
//         type: 'object',
//         properties: {
//           inMoney: {
//             type: 'number',
//             description: '平台充值',
//           },
//           offlinePay: {
//             type: 'number',
//             description: '线下打款',
//           },
//         },
//         title: 'InMoneyTotalStatisticsBean',
//       },
//       InputStream: {
//         type: 'object',
//         title: 'InputStream',
//       },
//       InvioceListBean: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//             description: '订单金额',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '时间',
//           },
//           headName: {
//             type: 'string',
//             description: '发票抬头',
//           },
//           id: {
//             type: 'string',
//             description: 'id',
//           },
//           isInvoice: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态:1已开票 2审核中3审核未通过',
//           },
//           name: {
//             type: 'string',
//             description: '用户名称',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           taxNum: {
//             type: 'string',
//             description: '税号或身份证号',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '开票类型(0：个人/非企业增值税普票，1：企业增值税普票,2：企业增值税专票)',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//         },
//         title: 'InvioceListBean',
//       },
//       InvitationDetailBean: {
//         type: 'object',
//         properties: {
//           activityId: {
//             type: 'integer',
//             format: 'int32',
//             description: '活动id',
//           },
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '注册时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '手机号',
//           },
//           isReal: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否实名 1：已实名 0：未实名',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '手机号',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'userId',
//           },
//           userName: {
//             type: 'string',
//             description: '名称',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '好友类型',
//           },
//         },
//         title: 'InvitationDetailBean',
//       },
//       InvitationDetailParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//         },
//         title: 'InvitationDetailParam',
//       },
//       InvitationStatisticsParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           name: {
//             type: 'string',
//             description: '名称',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//         },
//         title: 'InvitationStatisticsParam',
//       },
//       InvitationUserDto: {
//         type: 'object',
//         properties: {
//           invitedCount: {
//             type: 'integer',
//             format: 'int32',
//             description: '邀请人数',
//           },
//           realCount: {
//             type: 'integer',
//             format: 'int32',
//             description: '实名人数',
//           },
//           refPhoneNumber: {
//             type: 'string',
//             description: '邀请人手机号',
//           },
//           refUseId: {
//             type: 'integer',
//             format: 'int64',
//             description: '邀请人id',
//           },
//           refUserName: {
//             type: 'string',
//             description: '邀请人姓名',
//           },
//         },
//         title: 'InvitationUserDto',
//       },
//       InvoiceDescBean: {
//         type: 'object',
//         properties: {
//           account: {
//             type: 'string',
//             description: '开户行账户',
//           },
//           addressBean: {
//             description: '地址信息',
//             $ref: '#/definitions/AddressBean',
//             originalRef: 'AddressBean',
//           },
//           amount: {
//             type: 'number',
//             description: '开具金额',
//           },
//           auditReason: {
//             type: 'string',
//             description: '审核原因',
//           },
//           bankName: {
//             type: 'string',
//             description: '开户行名称',
//           },
//           courierNumber: {
//             type: 'string',
//             description: '快递单号',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '时间',
//           },
//           dealTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开票时间',
//           },
//           headName: {
//             type: 'string',
//             description: '发票抬头',
//           },
//           id: {
//             type: 'string',
//             description: 'id',
//           },
//           invoiceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '发票类型 0纸质  1电子',
//           },
//           name: {
//             type: 'string',
//             description: '开具人',
//           },
//           no: {
//             type: 'string',
//             description: '发票代码',
//           },
//           number: {
//             type: 'string',
//             description: '发票号码',
//           },
//           phone: {
//             type: 'string',
//             description: '开具人手机',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '注册固定电话',
//           },
//           remark: {
//             type: 'string',
//             description: '原因',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态:1已开票 2审核中3审核未通过4已提交',
//           },
//           street: {
//             type: 'string',
//             description: '注册场所地址',
//           },
//           taxNum: {
//             type: 'string',
//             description: '税务登记证号',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '开具类型(0：个人/非企业增值税普票，1：企业增值税普票,2：企业增值税专票)',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//           userInvoiceDetailedEntityList: {
//             type: 'array',
//             items: {
//               $ref: '#/definitions/UserInvoiceDetailedEntity',
//               originalRef: 'UserInvoiceDetailedEntity',
//             },
//           },
//           userName: {
//             type: 'string',
//             description: '开票人',
//           },
//         },
//         title: 'InvoiceDescBean',
//       },
//       InvoiceListParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           headName: {
//             type: 'string',
//             description: '发票抬头',
//           },
//           name: {
//             type: 'string',
//             description: '名称',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '名称',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态:1已开票 2审核中3审核未通过',
//           },
//         },
//         title: 'InvoiceListParam',
//       },
//       InvoiceOrderBean: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           head: {
//             type: 'string',
//             description: '发票抬头',
//           },
//           id: {
//             type: 'string',
//             description: 'id',
//           },
//           invoiceNo: {
//             type: 'string',
//             description: '发票代码',
//           },
//           invoiceNumber: {
//             type: 'string',
//             description: '发票号码',
//           },
//           orderCreateTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '时间',
//           },
//           orderId: {
//             type: 'string',
//             description: '订单号',
//           },
//           orderInfo: {
//             type: 'string',
//             description: '订单详情',
//           },
//           outerId: {
//             type: 'string',
//             description: '外部流水',
//           },
//           payAccount: {
//             type: 'string',
//             description: '支付账户',
//           },
//           payType: {
//             type: 'integer',
//             format: 'int32',
//             description: '支付渠道 1.微信支付0.支付宝支付',
//           },
//           taxNum: {
//             type: 'string',
//             description: '纳税人识别码',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '开票类型(0：个人/非企业增值税普票，1：企业增值税普票,2：企业增值税专票)',
//           },
//         },
//         title: 'InvoiceOrderBean',
//       },
//       InvoiceOrderCheckParam: {
//         type: 'object',
//         properties: {
//           auditReason: {
//             type: 'string',
//             description: '原因',
//           },
//           dealUser: {
//             type: 'string',
//             description: '开票人',
//           },
//           id: {
//             type: 'string',
//             description: '发票id',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态:1已开票 2审核中3审核未通过4已提交',
//           },
//         },
//         title: 'InvoiceOrderCheckParam',
//       },
//       InvoiceOrderDoubleCheckParam: {
//         type: 'object',
//         properties: {
//           courierNumber: {
//             type: 'string',
//             description: '快递单号',
//           },
//           dealTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开票时间',
//           },
//           id: {
//             type: 'string',
//             description: '发票id',
//           },
//           invoiceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '发票类型 0纸质  1电子',
//           },
//           no: {
//             type: 'string',
//             description: '发票代码',
//           },
//           number: {
//             type: 'string',
//             description: '发票号码',
//           },
//           remark: {
//             type: 'string',
//             description: '原因',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态:1已开票 3审核未通过',
//           },
//           userName: {
//             type: 'string',
//             description: '开票人',
//           },
//         },
//         title: 'InvoiceOrderDoubleCheckParam',
//       },
//       LoginBean: {
//         type: 'object',
//         properties: {
//           acceptCertStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否受理出证',
//           },
//           havePassword: {
//             type: 'boolean',
//             description: '是否已设置密码',
//           },
//           isMain: {
//             type: 'boolean',
//             description: '是否主账号',
//           },
//           isReal: {
//             type: 'boolean',
//             description: '是否认证',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '手机号',
//           },
//           realName: {
//             type: 'string',
//             description: '名字',
//           },
//           rolePermissionList: {
//             type: 'array',
//             description: '角色权限列表',
//             items: {
//               $ref: '#/definitions/RolePermissionListBean',
//               originalRef: 'RolePermissionListBean',
//             },
//           },
//           sourceId: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户来源',
//           },
//           token: {
//             type: 'string',
//             description: 'token',
//           },
//           tokenExpTime: {
//             type: 'string',
//             description: '过期时间',
//           },
//           tokenType: {
//             type: 'string',
//             description: '类型',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'userId',
//           },
//         },
//         title: 'LoginBean',
//       },
//       LoginParam: {
//         type: 'object',
//         required: ['loginType', 'phone'],
//         properties: {
//           adminPhone: {
//             type: 'string',
//             description: '手机号',
//           },
//           code: {
//             type: 'string',
//             description: '验证码',
//           },
//           csrfToken: {
//             type: 'string',
//           },
//           ip: {
//             type: 'string',
//           },
//           loginProgram: {
//             type: 'string',
//             enum: ['API', 'APP', 'PC', 'WECHAT'],
//           },
//           loginType: {
//             type: 'integer',
//             format: 'int32',
//             description: '登陆类型 0 密码登陆  1验证码登陆',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           pwd: {
//             type: 'string',
//             description: '密码',
//           },
//         },
//         title: 'LoginParam',
//       },
//       ManualDeductionCheckParam: {
//         type: 'object',
//         properties: {
//           orderId: {
//             type: 'string',
//             description: '订单号',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '扣款类型0手机号1订单号',
//           },
//         },
//         title: 'ManualDeductionCheckParam',
//       },
//       ManualDeductionParam: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           buyNotarizationId: {
//             type: 'integer',
//             format: 'int64',
//             description: '购买公证id',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '扣款类型：8.充值积分 16.赠送积分',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           reason: {
//             type: 'string',
//             description: '扣款原因',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '扣款方式0手机号1订单号',
//           },
//         },
//         title: 'ManualDeductionParam',
//       },
//       ManualSendParam: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           operationType: {
//             type: 'string',
//             description: '添加类型,0: 赠送几份,1: 充值几份',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           reason: {
//             type: 'string',
//             description: '扣款原因',
//           },
//         },
//         title: 'ManualSendParam',
//       },
//       MonthStatisticsBean: {
//         type: 'object',
//         properties: {
//           month: {
//             type: 'string',
//             description: '月份',
//           },
//           nums: {
//             type: 'integer',
//             format: 'int32',
//             description: '月统计',
//           },
//         },
//         title: 'MonthStatisticsBean',
//       },
//       NewsAddParam: {
//         type: 'object',
//         properties: {
//           category: {
//             type: 'integer',
//             format: 'int32',
//             description: '新闻分类',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '添加时间',
//           },
//           imgLink: {
//             type: 'string',
//             description: '封面图片',
//           },
//           isOriginal: {
//             type: 'boolean',
//             description: '是否原创',
//           },
//           newOrigin: {
//             type: 'string',
//             description: '新闻来源',
//           },
//           newsDesc: {
//             type: 'string',
//             description: '消息内容',
//           },
//           newsOutline: {
//             type: 'string',
//             description: '新闻概述',
//           },
//           newsTitle: {
//             type: 'string',
//             description: '标题',
//           },
//         },
//         title: 'NewsAddParam',
//       },
//       NewsBean: {
//         type: 'object',
//         properties: {
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '发送时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           isNavBar: {
//             type: 'integer',
//             format: 'int32',
//             description: '导航公告0否1是',
//           },
//           link: {
//             type: 'string',
//             description: '连接',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           title: {
//             type: 'string',
//             description: '标题',
//           },
//           type: {
//             type: 'string',
//             description: '消息类型  1：活动 2：公告',
//           },
//           userGroup: {
//             type: 'string',
//             description: '用户群体0指定用户1个人用户2企业用户3全站',
//           },
//           userName: {
//             type: 'string',
//             description: '姓名',
//           },
//         },
//         title: 'NewsBean',
//       },
//       NewsListParam: {
//         type: 'object',
//         properties: {
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '1：活动 2：公告',
//           },
//         },
//         title: 'NewsListParam',
//       },
//       NewsParam: {
//         type: 'object',
//         properties: {
//           isNavBar: {
//             type: 'boolean',
//             description: '导航公告false否true是',
//           },
//           link: {
//             type: 'string',
//             description: '连接',
//           },
//           title: {
//             type: 'string',
//             description: '标题',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '消息类型  1：活动 2：公告',
//           },
//           userGroup: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户群体0指定用户1个人用户2企业用户3全站',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'userIds',
//           },
//         },
//         title: 'NewsParam',
//       },
//       NewsUpdateParam: {
//         type: 'object',
//         properties: {
//           category: {
//             type: 'integer',
//             format: 'int32',
//             description: '分类',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '添加时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           imgLink: {
//             type: 'string',
//             description: '封面图片',
//           },
//           isOriginal: {
//             type: 'boolean',
//             description: '是否原创',
//           },
//           newOrigin: {
//             type: 'string',
//             description: '新闻来源',
//           },
//           newsDesc: {
//             type: 'string',
//             description: '消息内容',
//           },
//           newsOutline: {
//             type: 'string',
//             description: '新闻概述',
//           },
//           newsTitle: {
//             type: 'string',
//             description: '标题',
//           },
//         },
//         title: 'NewsUpdateParam',
//       },
//       NotarizationAuditParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           remark: {
//             type: 'string',
//             description: '反馈',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '2通过 3不通过',
//           },
//         },
//         title: 'NotarizationAuditParam',
//       },
//       NotarizationDownloadTaskParam: {
//         type: 'object',
//         properties: {
//           notarizationId: {
//             type: 'integer',
//             format: 'int64',
//             description: '出证id',
//           },
//           taskName: {
//             type: 'string',
//             description: '任务名称',
//           },
//         },
//         title: 'NotarizationDownloadTaskParam',
//       },
//       NotarizationGetDownloadTaskListBean: {
//         type: 'object',
//         properties: {
//           attestationNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '证据数量',
//           },
//           downloadUrl: {
//             type: 'string',
//             description: '下载地址',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '打包结束时间',
//           },
//           notarizationId: {
//             type: 'integer',
//             format: 'int64',
//             description: '出证id',
//           },
//           operateName: {
//             type: 'string',
//             description: '操作人姓名',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '打包开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '任务状态',
//           },
//           taskName: {
//             type: 'string',
//             description: '任务名称',
//           },
//         },
//         title: 'NotarizationGetDownloadTaskListBean',
//       },
//       NotarizationGetDownloadTaskListParam: {
//         type: 'object',
//         properties: {
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '当前页',
//             minimum: 1,
//             exclusiveMinimum: false,
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示数量',
//             minimum: 0,
//             exclusiveMinimum: false,
//           },
//         },
//         title: 'NotarizationGetDownloadTaskListParam',
//       },
//       NotarizationOrderAttestationGetListBean: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           attestationType: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '存证类型  0：文件存证-视频\n1：文件存证-图片\n2：文件存证-其他\n3：文件存证-文档\n4：文件存证-音频\n5：hash存证\n6：网页取证\n7：移动端取证\n8：过程取证\n9：app取证-拍照取证\n10：app取证-录像取证\n11：app取证-录音取证\n12：app取证-录屏取证',
//           },
//           completedTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '保全时间',
//           },
//           fileLabel: {
//             type: 'string',
//             description: '文件标签',
//           },
//           fileName: {
//             type: 'string',
//             description: '文件名称',
//           },
//           fileType: {
//             type: 'string',
//             description: '文件类型',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           notarizationId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           serialNumber: {
//             type: 'integer',
//             format: 'int32',
//             description: '序号',
//           },
//         },
//         title: 'NotarizationOrderAttestationGetListBean',
//       },
//       NotarizationOrderAttestationGetListParam: {
//         type: 'object',
//         properties: {
//           notarizationId: {
//             type: 'integer',
//             format: 'int64',
//             description: '出证id',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '当前页',
//             minimum: 1,
//             exclusiveMinimum: false,
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示数量',
//             minimum: 0,
//             exclusiveMinimum: false,
//           },
//         },
//         title: 'NotarizationOrderAttestationGetListParam',
//       },
//       NotarizationSetPayParam: {
//         type: 'object',
//         properties: {
//           fee: {
//             type: 'number',
//             description: '出证金额',
//             minimum: 0,
//             exclusiveMinimum: false,
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//         },
//         title: 'NotarizationSetPayParam',
//       },
//       NotaryInfoBean: {
//         type: 'object',
//         properties: {
//           adminFrontUrl: {
//             type: 'string',
//             description: '后端地址',
//           },
//           app: {
//             type: 'string',
//             description: 'app取证',
//           },
//           blackBottomLogoUrl: {
//             type: 'string',
//             description: '黑底LOGO',
//           },
//           consultationPhone: {
//             type: 'string',
//             description: '咨询电话（商务合作）',
//           },
//           cwba: {
//             type: 'string',
//             description: '车位备案',
//           },
//           email: {
//             type: 'string',
//             description: '商务邮箱',
//           },
//           enforcer: {
//             type: 'string',
//             description: '执法记录仪取证（企业）',
//           },
//           enforcerPersonal: {
//             type: 'string',
//             description: '执法记录仪取证（个人）',
//           },
//           file: {
//             type: 'string',
//             description: '文件存证',
//           },
//           frontUrl: {
//             type: 'string',
//             description: '前端地址',
//           },
//           fullName: {
//             type: 'string',
//             description: '平台全称',
//           },
//           gr: {
//             type: 'string',
//           },
//           hash: {
//             type: 'string',
//             description: 'hash存证',
//           },
//           helpHomePageUrl: {
//             type: 'string',
//             description: '帮助中心-首页',
//           },
//           helpLoginUrl: {
//             type: 'string',
//             description: '帮助中心-登录',
//           },
//           helpRegisterUrl: {
//             type: 'string',
//             description: '帮助中心-注册',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           jg: {
//             type: 'string',
//           },
//           labelUrl: {
//             type: 'string',
//             description: '浏览器标签图',
//           },
//           name: {
//             type: 'string',
//             description: '公证处名称',
//           },
//           officePlace: {
//             type: 'string',
//             description: '办公地址',
//           },
//           officeTime: {
//             type: 'string',
//             description: '办公时间',
//           },
//           parkQrCode: {
//             type: 'string',
//             description: '车位备案-小程序二维码',
//           },
//           parkSpecialComment: {
//             type: 'string',
//             description: '车位备案-特别说明',
//           },
//           password: {
//             type: 'string',
//             description: '密码',
//           },
//           process: {
//             type: 'string',
//             description: '过程取证',
//           },
//           qrCodeUrl: {
//             type: 'string',
//             description: '首页-公众号二维码',
//           },
//           techSupportPhone: {
//             type: 'string',
//             description: '技术咨询（软件使用）',
//           },
//           userName: {
//             type: 'string',
//             description: '账号',
//           },
//           web: {
//             type: 'string',
//             description: '网页取证',
//           },
//           whiteBottomLogoUrl: {
//             type: 'string',
//             description: '白底LOGO',
//           },
//         },
//         title: 'NotaryInfoBean',
//       },
//       NotaryInfoParam: {
//         type: 'object',
//         properties: {
//           adminFrontUrl: {
//             type: 'string',
//             description: '后端地址',
//           },
//           app: {
//             type: 'string',
//             description: 'app取证',
//           },
//           blackBottomLogoUrl: {
//             type: 'string',
//             description: '黑底LOGO',
//           },
//           consultationPhone: {
//             type: 'string',
//             description: '咨询电话（商务合作）',
//           },
//           cwba: {
//             type: 'string',
//             description: '车位备案',
//           },
//           email: {
//             type: 'string',
//             description: '商务邮箱',
//           },
//           enforcer: {
//             type: 'string',
//             description: ' 执法记录仪取证（企业）',
//           },
//           enforcerPersonal: {
//             type: 'string',
//             description: '执法记录仪取证（个人）',
//           },
//           file: {
//             type: 'string',
//             description: '文件存证',
//           },
//           frontUrl: {
//             type: 'string',
//             description: '前端地址',
//           },
//           fullName: {
//             type: 'string',
//             description: '平台全称',
//           },
//           gr: {
//             type: 'string',
//           },
//           hash: {
//             type: 'string',
//             description: 'hash存证',
//           },
//           helpHomePageUrl: {
//             type: 'string',
//             description: '帮助中心-首页',
//           },
//           helpLoginUrl: {
//             type: 'string',
//             description: '帮助中心-登录',
//           },
//           helpRegisterUrl: {
//             type: 'string',
//             description: '帮助中心-注册',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           jg: {
//             type: 'string',
//           },
//           labelUrl: {
//             type: 'string',
//             description: '浏览器标签图',
//           },
//           name: {
//             type: 'string',
//             description: '公证处名称',
//           },
//           officePlace: {
//             type: 'string',
//             description: '办公地址',
//           },
//           officeTime: {
//             type: 'string',
//             description: '办公时间',
//           },
//           parkQrCode: {
//             type: 'string',
//             description: '车位备案-小程序二维码',
//           },
//           parkSpecialComment: {
//             type: 'string',
//             description: '车位备案-特别说明',
//           },
//           password: {
//             type: 'string',
//             description: '密码',
//           },
//           process: {
//             type: 'string',
//             description: '过程取证',
//           },
//           qrCodeUrl: {
//             type: 'string',
//             description: '首页-公众号二维码',
//           },
//           techSupportPhone: {
//             type: 'string',
//             description: '技术咨询（软件使用）',
//           },
//           userName: {
//             type: 'string',
//             description: '账号',
//           },
//           web: {
//             type: 'string',
//             description: '网页取证',
//           },
//           whiteBottomLogoUrl: {
//             type: 'string',
//             description: '白底LOGO',
//           },
//         },
//         title: 'NotaryInfoParam',
//       },
//       NotaryListBean: {
//         type: 'object',
//         properties: {
//           adminFrontUrl: {
//             type: 'string',
//             description: '管理后端地址',
//           },
//           adminName: {
//             type: 'string',
//             description: '创建人',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '创建时间',
//           },
//           frontUrl: {
//             type: 'string',
//             description: '用户端地址',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           name: {
//             type: 'string',
//             description: '公证处名称',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态  0.待配置  1.已配置',
//           },
//         },
//         title: 'NotaryListBean',
//       },
//       NotaryListParam: {
//         type: 'object',
//         properties: {
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '当前页',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示数量',
//           },
//         },
//         title: 'NotaryListParam',
//       },
//       NotaryNameBean: {
//         type: 'object',
//         properties: {
//           fullName: {
//             type: 'string',
//             description: '公证处全称',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           name: {
//             type: 'string',
//             description: '公证处名称',
//           },
//         },
//         title: 'NotaryNameBean',
//       },
//       OfflinePayEditParam: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           bankName: {
//             type: 'string',
//             description: '对方开户银行',
//           },
//           bankNo: {
//             type: 'string',
//             description: '对方银行账户',
//           },
//           bussName: {
//             type: 'string',
//             description: '商务姓名',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           imgLink: {
//             type: 'string',
//             description: '图片',
//           },
//           payTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '时间',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           reason: {
//             type: 'string',
//             description: '原因',
//           },
//           seriNumber: {
//             type: 'string',
//             description: '流水号',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '类型 0支付宝1微信2银行账户',
//           },
//         },
//         title: 'OfflinePayEditParam',
//       },
//       OfflinePayInfoBean: {
//         type: 'object',
//         properties: {
//           adminName: {
//             type: 'string',
//             description: '管理员',
//           },
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           bankName: {
//             type: 'string',
//             description: '银行名称',
//           },
//           bankNo: {
//             type: 'string',
//             description: '银行账户',
//           },
//           bussName: {
//             type: 'string',
//             description: '商务姓名',
//           },
//           courierNumber: {
//             type: 'string',
//             description: '快递单号',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '类型 0支付宝1微信2银行账户',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           imgLink: {
//             type: 'string',
//             description: '图片',
//           },
//           invoiceHead: {
//             type: 'string',
//             description: '发票抬头',
//           },
//           invoiceNo: {
//             type: 'string',
//             description: '发票代码',
//           },
//           invoiceNumber: {
//             type: 'string',
//             description: '发票号码',
//           },
//           invoiceTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开票时间',
//           },
//           invoiceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '发票类型0纸质  1电子',
//           },
//           isInvoice: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否开票 0否 1是 ',
//           },
//           payTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '付款时间',
//           },
//           reason: {
//             type: 'string',
//             description: '原因',
//           },
//           seriNumber: {
//             type: 'string',
//             description: '流水号',
//           },
//           serialNumber: {
//             type: 'string',
//             description: '商户流水号',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '开票类型(0：个人/非企业增值税普票，1：企业增值税普票,2：企业增值税专票',
//           },
//           userName: {
//             type: 'string',
//             description: '姓名',
//           },
//           userPhone: {
//             type: 'string',
//             description: '手机号',
//           },
//         },
//         title: 'OfflinePayInfoBean',
//       },
//       OfflinePayInvoiceParam: {
//         type: 'object',
//         properties: {
//           courierNumber: {
//             type: 'string',
//             description: '快递单号',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           invoiceNo: {
//             type: 'string',
//             description: '发票代码',
//           },
//           invoiceNumber: {
//             type: 'string',
//             description: '发票号码',
//           },
//           invoiceTitle: {
//             type: 'string',
//             description: '发票抬头',
//           },
//           invoiceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '发票类型0纸质  1电子',
//           },
//           time: {
//             type: 'string',
//             format: 'date-time',
//             description: '时间',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '开票类型(0：个人/非企业增值税普票，1：企业增值税普票,2：企业增值税专票)',
//           },
//           userName: {
//             type: 'string',
//             description: '姓名',
//           },
//         },
//         title: 'OfflinePayInvoiceParam',
//       },
//       OfflinePayListBean: {
//         type: 'object',
//         properties: {
//           adminName: {
//             type: 'string',
//             description: '管理员',
//           },
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           bankName: {
//             type: 'string',
//             description: '银行名称',
//           },
//           bussName: {
//             type: 'string',
//             description: '商务姓名',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           isInvoice: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否开票 0否 1是 ',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           payTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '时间',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           reason: {
//             type: 'string',
//             description: '原因',
//           },
//           seriNumber: {
//             type: 'string',
//             description: '流水号',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '类型 0支付宝1微信2银行账户',
//           },
//           userName: {
//             type: 'string',
//             description: '姓名',
//           },
//         },
//         title: 'OfflinePayListBean',
//       },
//       OfflinePayListParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '用户手机号',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'OfflinePayListParam',
//       },
//       OfflinePayParam: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//             description: '金额',
//           },
//           bankName: {
//             type: 'string',
//             description: '银行名称',
//           },
//           bankNo: {
//             type: 'string',
//             description: '银行账户',
//           },
//           bussName: {
//             type: 'string',
//             description: '商务姓名',
//           },
//           imgLink: {
//             type: 'string',
//             description: '图片',
//           },
//           payTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '时间',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           reason: {
//             type: 'string',
//             description: '原因',
//           },
//           seriNumber: {
//             type: 'string',
//             description: '流水号',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '类型 0支付宝1微信2银行账户',
//           },
//           userName: {
//             type: 'string',
//             description: '姓名',
//           },
//         },
//         title: 'OfflinePayParam',
//       },
//       OfflinePayQueryParam: {
//         type: 'object',
//         properties: {
//           phone: {
//             type: 'string',
//             description: '手机',
//           },
//         },
//         title: 'OfflinePayQueryParam',
//       },
//       OlineAttGroupStatisticsBean: {
//         type: 'object',
//         properties: {
//           attNum: {
//             type: 'array',
//             description: '存证确权',
//             items: {
//               $ref: '#/definitions/UserIncrDayStatisticsBean',
//               originalRef: 'UserIncrDayStatisticsBean',
//             },
//           },
//           monitorNum: {
//             type: 'array',
//             description: '站点监测',
//             items: {
//               $ref: '#/definitions/UserIncrDayStatisticsBean',
//               originalRef: 'UserIncrDayStatisticsBean',
//             },
//           },
//           pcNum: {
//             type: 'array',
//             description: '过程取证',
//             items: {
//               $ref: '#/definitions/UserIncrDayStatisticsBean',
//               originalRef: 'UserIncrDayStatisticsBean',
//             },
//           },
//           phoneNum: {
//             type: 'array',
//             description: '移动端',
//             items: {
//               $ref: '#/definitions/UserIncrDayStatisticsBean',
//               originalRef: 'UserIncrDayStatisticsBean',
//             },
//           },
//           urlAtt: {
//             type: 'array',
//             description: '网页取证',
//             items: {
//               $ref: '#/definitions/UserIncrDayStatisticsBean',
//               originalRef: 'UserIncrDayStatisticsBean',
//             },
//           },
//         },
//         title: 'OlineAttGroupStatisticsBean',
//       },
//       OpinionFeedbackListBean: {
//         type: 'object',
//         properties: {
//           appVersion: {
//             type: 'string',
//             description: 'app版本',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '创建时间',
//           },
//           deviceModel: {
//             type: 'string',
//             description: '手机型号',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '唯一标识id',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           operateSystemName: {
//             type: 'string',
//             description: '操作系统名称',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           questionContent: {
//             type: 'string',
//             description: '问题描述',
//           },
//           questionMemo: {
//             type: 'string',
//             description: '问题备注',
//           },
//           questionType: {
//             type: 'integer',
//             format: 'int32',
//             description: '问题类型：1.软件使用,2.实名认证,3.证据保全',
//           },
//           recoveryTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '恢复时间',
//           },
//           reply: {
//             type: 'string',
//             description: '回复',
//           },
//           replyStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态',
//           },
//           respondent: {
//             type: 'string',
//             description: '回复人',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名称',
//           },
//           verifiedStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '实名状态',
//           },
//         },
//         title: 'OpinionFeedbackListBean',
//       },
//       OpinionFeedbackListParam: {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '当前页',
//           },
//           endTime: {
//             type: 'string',
//             description: '结束时间',
//           },
//           limit: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示条数',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           questionType: {
//             type: 'integer',
//             format: 'int32',
//             description: '问题类型：1.软件使用,2.实名认证,3.证据保全',
//           },
//           replyStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态',
//           },
//           startTime: {
//             type: 'string',
//             description: '起始时间',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名称',
//           },
//         },
//         title: 'OpinionFeedbackListParam',
//       },
//       OpinionFeedbackMemoParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//           },
//           questionMemo: {
//             type: 'string',
//             description: '问题备注',
//           },
//         },
//         title: 'OpinionFeedbackMemoParam',
//       },
//       OpinionFeedbackReplyParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '唯一标识id',
//           },
//           reply: {
//             type: 'string',
//             description: '回复',
//             minLength: 0,
//             maxLength: 50,
//           },
//           respondent: {
//             type: 'string',
//             description: '回复人',
//           },
//         },
//         title: 'OpinionFeedbackReplyParam',
//       },
//       OrderBean: {
//         type: 'object',
//         properties: {
//           adminName: {
//             type: 'string',
//             description: '关联公证员',
//           },
//           amount: {
//             type: 'number',
//             description: '订单金额',
//           },
//           amountDesc: {
//             type: 'string',
//             description: '订单金额',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '时间',
//           },
//           createTimeStr: {
//             type: 'string',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//           },
//           isDoublePay: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否即扣套餐又扣余额 0只余额1只扣套餐2都扣',
//           },
//           isInvoice: {
//             type: 'integer',
//             format: 'int32',
//             description: '开票状态',
//           },
//           isInvoiceText: {
//             type: 'string',
//           },
//           isReal: {
//             type: 'boolean',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           operateAdminName: {
//             type: 'string',
//             description: '操作人姓名',
//           },
//           operatorName: {
//             type: 'string',
//             description: '操作人',
//           },
//           orderConNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '订单包含',
//           },
//           orderId: {
//             type: 'string',
//             description: '订单id',
//           },
//           orderInfo: {
//             type: 'string',
//             description: '订单详情(或赠送原因)',
//           },
//           orderStatus: {
//             type: 'string',
//             description: '订单状态',
//           },
//           orderType: {
//             type: 'integer',
//             format: 'int32',
//             description: '订单类型',
//           },
//           orderTypeText: {
//             type: 'string',
//           },
//           outerOrderRequestNo: {
//             type: 'string',
//             description: '外部订单请求流水号',
//           },
//           payType: {
//             type: 'integer',
//             format: 'int32',
//             description: '付款渠道 0-支付宝 1-微信 2-积分支付 3-线下转账',
//           },
//           payTypeText: {
//             type: 'string',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           transactionId: {
//             type: 'string',
//             description: '外部交易号',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userType: {
//             type: 'string',
//             description: '用户类型',
//           },
//         },
//         title: 'OrderBean',
//       },
//       OwnerEquityAddParam: {
//         type: 'object',
//         properties: {
//           communityAddress: {
//             type: 'string',
//             description: '小区的省市区',
//           },
//           communityId: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           houseCode: {
//             type: 'string',
//             description: '户号',
//           },
//           label: {
//             type: 'string',
//             description: '备注',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           proprietorParams: {
//             type: 'array',
//             description: '业主信息',
//             items: {
//               $ref: '#/definitions/ProprietorParam',
//               originalRef: 'ProprietorParam',
//             },
//           },
//           realEstateNumber: {
//             type: 'string',
//             description: '不动产权编号',
//           },
//         },
//         title: 'OwnerEquityAddParam',
//       },
//       OwnerEquityDetailVo: {
//         type: 'object',
//         properties: {
//           communityAddress: {
//             type: 'string',
//             description: '小区的省市区',
//           },
//           communityId: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           houseCode: {
//             type: 'string',
//             description: '户号',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '主键',
//           },
//           label: {
//             type: 'string',
//             description: '备注',
//           },
//           modifyTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           proprietorList: {
//             type: 'array',
//             description: '业主信息',
//             items: {
//               $ref: '#/definitions/OwnerEquityProprietorVo',
//               originalRef: 'OwnerEquityProprietorVo',
//             },
//           },
//           realEstateNumber: {
//             type: 'string',
//             description: '不动产权编号',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '产权状态 0停用 1启用',
//           },
//           statusTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '启用/停用时间',
//           },
//         },
//         title: 'OwnerEquityDetailVo',
//       },
//       OwnerEquityEditParam: {
//         type: 'object',
//         properties: {
//           communityAddress: {
//             type: 'string',
//             description: '小区的省市区',
//           },
//           communityId: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           houseCode: {
//             type: 'string',
//             description: '户号',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           label: {
//             type: 'string',
//             description: '备注',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           proprietorParams: {
//             type: 'array',
//             description: '业主信息',
//             items: {
//               $ref: '#/definitions/ProprietorParam',
//               originalRef: 'ProprietorParam',
//             },
//           },
//           realEstateNumber: {
//             type: 'string',
//             description: '不动产权编号',
//           },
//         },
//         title: 'OwnerEquityEditParam',
//       },
//       OwnerEquityPageVo: {
//         type: 'object',
//         properties: {
//           communityAddress: {
//             type: 'string',
//             description: '小区的省市区',
//           },
//           communityId: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           houseCode: {
//             type: 'string',
//             description: '户号',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '主键',
//           },
//           label: {
//             type: 'string',
//             description: '备注',
//           },
//           modifyTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           proprietorList: {
//             type: 'array',
//             description: '业主信息',
//             items: {
//               $ref: '#/definitions/OwnerEquityProprietorVo',
//               originalRef: 'OwnerEquityProprietorVo',
//             },
//           },
//           realEstateNumber: {
//             type: 'string',
//             description: '不动产权编号',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '产权状态 0停用 1启用',
//           },
//           statusTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '启用/停用时间',
//           },
//         },
//         title: 'OwnerEquityPageVo',
//       },
//       OwnerEquityProprietorVo: {
//         type: 'object',
//         properties: {
//           proprietorCard: {
//             type: 'string',
//             description: '身份证信息',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '业主姓名',
//           },
//           proprietorPhoneNumber: {
//             type: 'string',
//             description: '手机号',
//           },
//           realStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '实名状态 0未实名1实名',
//           },
//           userId: {
//             type: 'string',
//           },
//         },
//         title: 'OwnerEquityProprietorVo',
//       },
//       OwnerEquityQueryPageParam: {
//         type: 'object',
//         properties: {
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           houseCode: {
//             type: 'string',
//             description: '户号',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           proprietorCard: {
//             type: 'string',
//             description: '身份证信息',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '业主姓名',
//           },
//           realEstateNumber: {
//             type: 'string',
//             description: '不动产权编号',
//           },
//           realStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '实名状态 0未实名1实名',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '产权状态 0停用 1启用',
//           },
//         },
//         title: 'OwnerEquityQueryPageParam',
//       },
//       OwnerEquityUpdParam: {
//         type: 'object',
//         properties: {
//           communityId: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           houseCode: {
//             type: 'string',
//             description: '户号',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '产权状态 0停用 1启用',
//           },
//           statusTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//         },
//         title: 'OwnerEquityUpdParam',
//       },
//       'PageInfo«AccountConsumerDetailBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«AccountConsumerDetailBean»',
//       },
//       'PageInfo«AdminListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«AdminListBean»',
//       },
//       'PageInfo«AdminNotarizationGetListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«AdminNotarizationGetListBean»',
//       },
//       'PageInfo«AnnouncementBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«AnnouncementBean»',
//       },
//       'PageInfo«ApiListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«ApiListBean»',
//       },
//       'PageInfo«AppVersionListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«AppVersionListBean»',
//       },
//       'PageInfo«AttestationFileDetailBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«AttestationFileDetailBean»',
//       },
//       'PageInfo«AttestationProcessDetailBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«AttestationProcessDetailBean»',
//       },
//       'PageInfo«AttestationUrlDetailBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«AttestationUrlDetailBean»',
//       },
//       'PageInfo«BindDeviceListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«BindDeviceListBean»',
//       },
//       'PageInfo«CommunityListVo»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«CommunityListVo»',
//       },
//       'PageInfo«DeductionBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«DeductionBean»',
//       },
//       'PageInfo«EnforcerRecordListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«EnforcerRecordListBean»',
//       },
//       'PageInfo«FeedbackListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«FeedbackListBean»',
//       },
//       'PageInfo«FirstParkVo»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«FirstParkVo»',
//       },
//       'PageInfo«InvioceListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«InvioceListBean»',
//       },
//       'PageInfo«InvitationDetailBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«InvitationDetailBean»',
//       },
//       'PageInfo«InvitationUserDto»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«InvitationUserDto»',
//       },
//       'PageInfo«NewsBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«NewsBean»',
//       },
//       'PageInfo«NotarizationGetDownloadTaskListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«NotarizationGetDownloadTaskListBean»',
//       },
//       'PageInfo«NotarizationOrderAttestationGetListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«NotarizationOrderAttestationGetListBean»',
//       },
//       'PageInfo«NotaryListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«NotaryListBean»',
//       },
//       'PageInfo«OfflinePayListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«OfflinePayListBean»',
//       },
//       'PageInfo«OrderBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«OrderBean»',
//       },
//       'PageInfo«OwnerEquityPageVo»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«OwnerEquityPageVo»',
//       },
//       'PageInfo«ParkApproveListVo»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«ParkApproveListVo»',
//       },
//       'PageInfo«ParkTransListVo»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«ParkTransListVo»',
//       },
//       'PageInfo«ProcessingTask»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«ProcessingTask»',
//       },
//       'PageInfo«ProductListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«ProductListBean»',
//       },
//       'PageInfo«ProductNewsListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«ProductNewsListBean»',
//       },
//       'PageInfo«UserAccountDto»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«UserAccountDto»',
//       },
//       'PageInfo«UserListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«UserListBean»',
//       },
//       'PageInfo«UserLoginLogListBean»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«UserLoginLogListBean»',
//       },
//       'PageInfo«UserVotePageVo»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«UserVotePageVo»',
//       },
//       'PageInfo«VoteQueryPageVo»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«VoteQueryPageVo»',
//       },
//       'PageInfo«登记审核列表查询响应»': {
//         type: 'object',
//         properties: {
//           endRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           hasNextPage: {
//             type: 'boolean',
//           },
//           hasPreviousPage: {
//             type: 'boolean',
//           },
//           isFirstPage: {
//             type: 'boolean',
//           },
//           isLastPage: {
//             type: 'boolean',
//           },
//           list: {
//             type: 'array',
//             items: {
//               type: 'object',
//             },
//           },
//           navigateFirstPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigateLastPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatePages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           navigatepageNums: {
//             type: 'array',
//             items: {
//               type: 'integer',
//               format: 'int32',
//             },
//           },
//           nextPage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pages: {
//             type: 'integer',
//             format: 'int32',
//           },
//           prePage: {
//             type: 'integer',
//             format: 'int32',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           startRow: {
//             type: 'integer',
//             format: 'int64',
//           },
//           total: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'PageInfo«登记审核列表查询响应»',
//       },
//       ParkApproveListVo: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '省市区地址',
//           },
//           applyRemark: {
//             type: 'string',
//             description: '驳回原因',
//           },
//           applyTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '审批通过、驳回时间',
//           },
//           assigneeCard: {
//             type: 'string',
//             description: '受让人证件号',
//           },
//           assigneeName: {
//             type: 'string',
//             description: '受让人姓名',
//           },
//           assignorCard: {
//             type: 'string',
//             description: '转让人证件号',
//           },
//           assignorName: {
//             type: 'string',
//             description: '转让人姓名',
//           },
//           contractFileNames: {
//             type: 'string',
//             description: '合同文件名',
//           },
//           contractOssKeys: {
//             type: 'string',
//             description: '合同oss地址',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '发起时间',
//           },
//           id: {
//             type: 'string',
//             description: 'id',
//           },
//           name: {
//             type: 'string',
//             description: '小区名称',
//           },
//           parkNumber: {
//             type: 'string',
//             description: '车位号码',
//           },
//         },
//         title: 'ParkApproveListVo',
//       },
//       ParkApproveQueryParam: {
//         type: 'object',
//         properties: {
//           applyStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '审批状态：0，待审批；1，审批通过；2，审批驳回',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           name: {
//             type: 'string',
//             description: '小区名称',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           parkNumber: {
//             type: 'string',
//             description: '车位号码',
//           },
//         },
//         title: 'ParkApproveQueryParam',
//       },
//       ParkApproveStatusVo: {
//         type: 'object',
//         properties: {
//           passed: {
//             type: 'number',
//             description: '已通过',
//           },
//           pending: {
//             type: 'number',
//             description: '待审核',
//           },
//           rejected: {
//             type: 'number',
//             description: '已驳回',
//           },
//         },
//         title: 'ParkApproveStatusVo',
//       },
//       ParkApproveUpdParam: {
//         type: 'object',
//         properties: {
//           applyRemark: {
//             type: 'string',
//             description: '驳回原因',
//           },
//           applyStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '审批状态：1，审批通过；2，审批驳回',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//         },
//         title: 'ParkApproveUpdParam',
//       },
//       ParkDownloadTaskParam: {
//         type: 'object',
//         properties: {
//           ids: {
//             type: 'array',
//             description: '待下载备案id',
//             items: {
//               type: 'integer',
//               format: 'int64',
//             },
//           },
//           operationType: {
//             type: 'integer',
//             format: 'int32',
//             description: '1-一手备案 0-转让备案',
//           },
//           taskName: {
//             type: 'string',
//             description: '任务名称',
//           },
//         },
//         title: 'ParkDownloadTaskParam',
//       },
//       ParkParam: {
//         type: 'object',
//         properties: {
//           availableYears: {
//             type: 'integer',
//             format: 'int32',
//             description: '车位使用年限',
//             maximum: 9999,
//             exclusiveMaximum: false,
//           },
//           communityId: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           contractFileNames: {
//             type: 'string',
//             description: '合同fileNames',
//           },
//           contractOssKeys: {
//             type: 'string',
//             description: '合同oss keys地址',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//           },
//           isFirst: {
//             type: 'integer',
//             format: 'int32',
//           },
//           label: {
//             type: 'string',
//           },
//           parkNumber: {
//             type: 'string',
//             description: '车位号码',
//           },
//           parkProperty: {
//             type: 'string',
//             description: '车位属性',
//             minLength: 0,
//             maxLength: 100,
//           },
//           parkShareUserParams: {
//             type: 'array',
//             items: {
//               $ref: '#/definitions/ParkShareUserParam',
//               originalRef: 'ParkShareUserParam',
//             },
//           },
//           parkStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '车位使用开始时间',
//           },
//           propLocation: {
//             type: 'string',
//             description: '楼盘坐落',
//             minLength: 0,
//             maxLength: 100,
//           },
//           proprietorCard: {
//             type: 'string',
//             description: '使用权人证件号',
//             minLength: 0,
//             maxLength: 18,
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位使用权人',
//           },
//           proveAttestationId: {
//             type: 'string',
//           },
//           proveHash: {
//             type: 'string',
//           },
//           proveOssKey: {
//             type: 'string',
//           },
//           recordTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '备案时间',
//           },
//           sharedStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否有共同使用权人',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//           },
//           storageAttestationId: {
//             type: 'string',
//           },
//           storageOssKey: {
//             type: 'string',
//           },
//         },
//         title: 'ParkParam',
//       },
//       ParkShareUserParam: {
//         type: 'object',
//         properties: {
//           proprietorCard: {
//             type: 'string',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位共同使用权人',
//           },
//         },
//         title: 'ParkShareUserParam',
//       },
//       ParkTransApplyParam: {
//         type: 'object',
//         properties: {
//           contractFileNames: {
//             type: 'string',
//             description: '合同fileNames',
//           },
//           contractOssKeys: {
//             type: 'string',
//             description: '合同oss keys地址',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           parkShareUserParams: {
//             type: 'array',
//             description: '共同使用权人',
//             items: {
//               $ref: '#/definitions/ParkShareUserParam',
//               originalRef: 'ParkShareUserParam',
//             },
//           },
//           proprietorCard: {
//             type: 'string',
//             description: '使用权人证件号',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位使用权人',
//           },
//           purchaseTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '车位购买时间',
//           },
//           recordTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '备案时间',
//           },
//           sharedStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否有共同使用权人：0，否；1，是',
//           },
//         },
//         title: 'ParkTransApplyParam',
//       },
//       ParkTransEditParam: {
//         type: 'object',
//         properties: {
//           contractFileNames: {
//             type: 'string',
//             description: '合同fileNames',
//           },
//           contractOssKeys: {
//             type: 'string',
//             description: '合同oss keys地址',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '主键',
//           },
//           parkShareUserParams: {
//             type: 'array',
//             items: {
//               $ref: '#/definitions/ParkShareUserParam',
//               originalRef: 'ParkShareUserParam',
//             },
//           },
//           proprietorCard: {
//             type: 'string',
//             description: '使用权人证件号',
//             minLength: 0,
//             maxLength: 18,
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位使用权人',
//           },
//           purchaseTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '车位购买时间',
//           },
//           recordTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '备案时间',
//           },
//           sharedStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否有共同使用权人',
//           },
//         },
//         title: 'ParkTransEditParam',
//       },
//       ParkTransInfoParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '类型 1-详情 2-编辑 3-转让',
//           },
//         },
//         title: 'ParkTransInfoParam',
//       },
//       ParkTransInfoVo: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'string',
//             description: '车位id',
//           },
//           transferee: {
//             description: '受让方信息',
//             $ref: '#/definitions/Transferee',
//             originalRef: 'Transferee',
//           },
//           transferorList: {
//             type: 'array',
//             description: '转让方信息',
//             items: {
//               $ref: '#/definitions/Transferor',
//               originalRef: 'Transferor',
//             },
//           },
//         },
//         title: 'ParkTransInfoVo',
//       },
//       ParkTransInfosParam: {
//         type: 'object',
//         properties: {
//           isFirst: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否是首次（一手）备案：0，否；1，是',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '类型 1-详情 2-编辑 3-转让',
//           },
//         },
//         title: 'ParkTransInfosParam',
//       },
//       ParkTransListVo: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '省市区地址',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           id: {
//             type: 'string',
//             description: 'id',
//           },
//           parkNumber: {
//             type: 'string',
//             description: '车位号码',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位使用权人',
//           },
//           proveAttestationId: {
//             type: 'string',
//             description: '使用权备案号',
//           },
//           proveHash: {
//             type: 'string',
//             description: 'hash',
//           },
//           proveOssKey: {
//             type: 'string',
//             description: '备案证明文件',
//           },
//           recordTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '备案时间',
//           },
//           storageAttestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           storageHash: {
//             type: 'string',
//             description: '上链hash',
//           },
//           storageOssKey: {
//             type: 'string',
//             description: '保管单OSS KEY',
//           },
//         },
//         title: 'ParkTransListVo',
//       },
//       PermissionListBean: {
//         type: 'object',
//         properties: {
//           children: {
//             type: 'array',
//             description: '第二级',
//             items: {
//               $ref: '#/definitions/PermissionListBean',
//               originalRef: 'PermissionListBean',
//             },
//           },
//           key: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           title: {
//             type: 'string',
//             description: '姓名',
//           },
//         },
//         title: 'PermissionListBean',
//       },
//       PreviewNewsBean: {
//         type: 'object',
//         properties: {
//           category: {
//             type: 'integer',
//             format: 'int32',
//             description: '分类',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '添加时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           imgLink: {
//             type: 'string',
//             description: '封面图片',
//           },
//           isOriginal: {
//             type: 'boolean',
//             description: '是否原创',
//           },
//           newsDesc: {
//             type: 'string',
//             description: '消息内容',
//           },
//           newsOutline: {
//             type: 'string',
//             description: '新闻概述',
//           },
//           newsTitle: {
//             type: 'string',
//             description: '标题',
//           },
//         },
//         title: 'PreviewNewsBean',
//       },
//       ProcessTaskListParam: {
//         type: 'object',
//         properties: {
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//           },
//         },
//         title: 'ProcessTaskListParam',
//       },
//       ProcessTaskParam: {
//         type: 'object',
//         properties: {
//           fileAme: {
//             type: 'string',
//             description: '文件名称',
//           },
//           ossKey: {
//             type: 'string',
//             description: '文件路径',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '类型 1、业主产权 2、车未备案',
//           },
//         },
//         title: 'ProcessTaskParam',
//       },
//       ProcessingTask: {
//         type: 'object',
//         properties: {
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           errorOssKey: {
//             type: 'string',
//           },
//           fileAme: {
//             type: 'string',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//           },
//           modifyTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           ossKey: {
//             type: 'string',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//           },
//         },
//         title: 'ProcessingTask',
//       },
//       ProductInfoParam: {
//         type: 'object',
//         properties: {
//           currentVersion: {
//             type: 'string',
//             description: '当前版本',
//           },
//           oldVersion: {
//             type: 'string',
//             description: '上一个版本',
//           },
//           productUpdateTime: {
//             type: 'string',
//             description: '更新时间',
//           },
//           updateContent: {
//             type: 'string',
//             description: '更新内容',
//           },
//           updateDetail: {
//             type: 'string',
//             description: '更新描述',
//           },
//         },
//         title: 'ProductInfoParam',
//       },
//       ProductListBean: {
//         type: 'object',
//         properties: {
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '添加时间',
//           },
//           currentVersion: {
//             type: 'string',
//             description: '当前版本',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           oldVersion: {
//             type: 'string',
//             description: '上一个版本',
//           },
//           productUpdateTime: {
//             type: 'string',
//             description: '更新时间',
//           },
//           updateDetail: {
//             type: 'string',
//             description: '更新描述',
//           },
//         },
//         title: 'ProductListBean',
//       },
//       ProductListParam: {
//         type: 'object',
//         properties: {
//           category: {
//             type: 'integer',
//             format: 'int32',
//             description: '分类',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//         },
//         title: 'ProductListParam',
//       },
//       ProductNewsListBean: {
//         type: 'object',
//         properties: {
//           category: {
//             type: 'integer',
//             format: 'int32',
//             description: '1 行业动态 2 维权解读 3 保全合作',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '添加时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           imgUrl: {
//             type: 'string',
//             description: '图片',
//           },
//           newsOutline: {
//             type: 'string',
//             description: '新闻概述',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '0未发布1已发布',
//           },
//           title: {
//             type: 'string',
//             description: '标题',
//           },
//         },
//         title: 'ProductNewsListBean',
//       },
//       ProprietorParam: {
//         type: 'object',
//         properties: {
//           proprietorCard: {
//             type: 'string',
//             description: '身份证信息',
//             minLength: 0,
//             maxLength: 18,
//           },
//           proprietorName: {
//             type: 'string',
//             description: '业主姓名',
//             minLength: 0,
//             maxLength: 30,
//           },
//           proprietorPhoneNumber: {
//             type: 'string',
//             description: '手机号',
//           },
//         },
//         title: 'ProprietorParam',
//       },
//       RealDetailParam: {
//         type: 'object',
//         properties: {
//           backPhoto: {
//             type: 'string',
//             description: '身份证反面',
//           },
//           cardAddress: {
//             type: 'string',
//             description: '身份证地址',
//           },
//           corporateCertificate: {
//             type: 'string',
//             description: '法人身份证明',
//           },
//           enterpriseAddress: {
//             type: 'string',
//             description: '企业地址',
//           },
//           enterpriseCode: {
//             type: 'string',
//             description: '企业统一信用代码',
//           },
//           enterpriseLetter: {
//             type: 'string',
//             description: '企业授权公函',
//           },
//           enterpriseLicense: {
//             type: 'string',
//             description: '企业营业执照',
//           },
//           enterpriseName: {
//             type: 'string',
//             description: '企业名称',
//           },
//           frontPhoto: {
//             type: 'string',
//             description: '身份证正面',
//           },
//           handPhoto: {
//             type: 'string',
//             description: '手持身份证',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           idcard: {
//             type: 'string',
//             description: '身份证',
//           },
//           industry: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '所属行业: 0：法律服务 1：代理维权 2： 原创机构 3：金融科技  5：电商行业  6: 其他',
//           },
//           job: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '职业（0：律师 1：法务 2：原创作者 3：知识产权代理 4：其他）',
//           },
//           openApi: {
//             type: 'boolean',
//             description: '是否开通API',
//           },
//           openApiRemark: {
//             type: 'string',
//             description: '开通API备注',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           realStatus2: {
//             type: 'integer',
//             format: 'int32',
//             description: '信息是否完善 ',
//           },
//           remark: {
//             type: 'string',
//             description: '备注',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'RealDetailParam',
//       },
//       RealRestultParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           remark: {
//             type: 'string',
//             description: '备注',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '2拒绝3通过',
//             minimum: 2,
//             maximum: 3,
//             exclusiveMinimum: false,
//             exclusiveMaximum: false,
//           },
//           status2: {
//             type: 'integer',
//             format: 'int32',
//             description: '二次审核2拒绝3通过',
//             minimum: 2,
//             maximum: 3,
//             exclusiveMinimum: false,
//             exclusiveMaximum: false,
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户类型0个人1企业',
//           },
//         },
//         title: 'RealRestultParam',
//       },
//       RechargeDetailBean: {
//         type: 'object',
//         properties: {
//           head: {
//             type: 'string',
//             description: '发票抬头',
//           },
//           invoiceNo: {
//             type: 'string',
//             description: '发票代码',
//           },
//           invoiceNumber: {
//             type: 'string',
//             description: '发票号码',
//           },
//           orderCreateTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '订单时间',
//           },
//           orderId: {
//             type: 'string',
//             description: '订单号',
//           },
//           outerOrderNo: {
//             type: 'string',
//             description: '外部订单流水号',
//           },
//           payAccount: {
//             type: 'string',
//             description: '支付账户',
//           },
//           payType: {
//             type: 'integer',
//             format: 'int32',
//             description: '付款渠道 1.微信支付 0.支付宝支付',
//           },
//           taxNum: {
//             type: 'string',
//             description: '纳税人识别码',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '开票类型(0：个人/非企业增值税普票，1：企业增值税普票,2：企业增值税专票)',
//           },
//         },
//         title: 'RechargeDetailBean',
//       },
//       RechargeRateVo: {
//         type: 'object',
//         properties: {
//           dateTime: {
//             type: 'string',
//           },
//           enterpriseRate: {
//             type: 'number',
//           },
//           personalRate: {
//             type: 'number',
//           },
//           totalRate: {
//             type: 'number',
//           },
//         },
//         title: 'RechargeRateVo',
//       },
//       RegionDTO: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int32',
//           },
//           name: {
//             type: 'string',
//           },
//           pid: {
//             type: 'integer',
//             format: 'int32',
//           },
//         },
//         title: 'RegionDTO',
//       },
//       RoleListBean: {
//         type: 'object',
//         properties: {
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '加入时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           num: {
//             type: 'integer',
//             format: 'int32',
//             description: '认数',
//           },
//           roleName: {
//             type: 'string',
//             description: '角色名',
//           },
//         },
//         title: 'RoleListBean',
//       },
//       RoleNameParam: {
//         type: 'object',
//         properties: {
//           name: {
//             type: 'string',
//             description: '角色名称',
//           },
//         },
//         title: 'RoleNameParam',
//       },
//       RolePermissionListBean: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: 'id',
//           },
//           permissionId: {
//             type: 'integer',
//             format: 'int64',
//             description: '权限id',
//           },
//           roleId: {
//             type: 'integer',
//             format: 'int64',
//             description: '角色id',
//           },
//         },
//         title: 'RolePermissionListBean',
//       },
//       SiteAttestationInfoBean: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '保全id',
//           },
//           chainHash: {
//             type: 'string',
//             description: '保全链唯一标识',
//           },
//           completedAt: {
//             type: 'string',
//             format: 'date-time',
//             description: '上链时间',
//           },
//           evidenceDeviceKernelVersion: {
//             type: 'string',
//             description: '取证设备内核版本',
//           },
//           evidenceDeviceModel: {
//             type: 'string',
//             description: '取证设备型号',
//           },
//           evidenceDeviceName: {
//             type: 'string',
//             description: '取证设备名称',
//           },
//           evidenceDeviceProcessor: {
//             type: 'string',
//             description: '取证设备处理器',
//           },
//           evidenceDeviceSystemVersion: {
//             type: 'string',
//             description: '取证设备系统版本号',
//           },
//           evidenceEndTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '取证结束时间',
//           },
//           evidenceExtCode: {
//             type: 'string',
//             description: '证据提取码',
//           },
//           evidenceExtUrl: {
//             type: 'string',
//             description: '证据提取链接',
//           },
//           evidenceGpsLatitude: {
//             type: 'string',
//             description: '取证gps维度',
//           },
//           evidenceGpsLongitude: {
//             type: 'string',
//             description: '取证gps经度',
//           },
//           evidenceLocation: {
//             type: 'string',
//             description: '取证地址',
//           },
//           evidenceStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '取证开始时间',
//           },
//           evidenceTimeLen: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证时长(秒)',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '取证类型:1.拍照取证，2.录像取证，3.录音取证，4.录屏取证',
//           },
//           fileHash: {
//             type: 'string',
//             description: '文件hash',
//           },
//           fileLabel: {
//             type: 'string',
//             description: '取证标签',
//           },
//           fileName: {
//             type: 'string',
//             description: '取证文件名称',
//           },
//           fileSize: {
//             type: 'integer',
//             format: 'int64',
//             description: '取证文件大小(byte)',
//           },
//           fileStatus: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '现场取证证据状态 0:证据缺失 1:证据处理中 2:处理完成 3:处理失败',
//           },
//           fileUrl: {
//             type: 'string',
//             description: '证据下载url',
//           },
//           ghfNumber: {
//             type: 'string',
//             description: '广互证据编号',
//           },
//           hhfNumber: {
//             type: 'string',
//             description: '杭互证据编号',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '现场取证id',
//           },
//           imageUrls: {
//             type: 'array',
//             description: '录屏取证图片文件集',
//             items: {
//               type: 'string',
//             },
//           },
//           mappingId: {
//             type: 'string',
//             description: '生成二维码使用的映射id',
//           },
//           pdfUrl: {
//             type: 'string',
//             description: '证书url',
//           },
//           photoUrl: {
//             type: 'string',
//             description: '证书图片url',
//           },
//           qrUrl: {
//             type: 'string',
//             description: '证书上的链接',
//           },
//           submitTime: {
//             type: 'string',
//             description: '提交时间',
//           },
//           transcodeFileUrl: {
//             type: 'string',
//             description:
//               '文件oss地址，但可能是经过转码后的视频文件，用于跨平台播放',
//           },
//           videoUrl: {
//             type: 'string',
//             description: '录屏取证视频文件',
//           },
//         },
//         title: 'SiteAttestationInfoBean',
//       },
//       SiteListBean: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           dirType: {
//             type: 'integer',
//             format: 'int32',
//             description: '目录类型0：无子文件 1：有子文件',
//           },
//           evidenceLocation: {
//             type: 'string',
//             description: '存证地址',
//           },
//           evidenceStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证状态1,取证正常,2.证据缺失',
//           },
//           evidenceTimeLen: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证时长(秒)',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '取证类型:1.拍照取证，2.录像取证，3.录音取证，4.录屏取证',
//           },
//           fileLabel: {
//             type: 'string',
//             description: '存证标签',
//           },
//           fileName: {
//             type: 'string',
//             description: '取证文件名称',
//           },
//           fileSize: {
//             type: 'integer',
//             format: 'int64',
//             description: '取证文件大小(byte)',
//           },
//           fileStatus: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '现场取证证据状态 0:证据缺失 1:证据处理中 2:处理完成 3:处理失败',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '取证id',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           payMoney: {
//             type: 'number',
//             format: 'double',
//             description: '支付金额',
//           },
//           payStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '支付状态0.待支付,1.已支付',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           submitTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '提交时间',
//           },
//           sum: {
//             type: 'integer',
//             format: 'int32',
//             description: '子集总数',
//           },
//           thumbnailOssKey: {
//             type: 'string',
//           },
//           thumbnailOssUrl: {
//             type: 'string',
//             description: '缩略图oss地址',
//           },
//           userName: {
//             type: 'string',
//             description: '操作人',
//           },
//           waitPayNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '待支付数量',
//           },
//         },
//         title: 'SiteListBean',
//       },
//       SiteListParam: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '当前页',
//           },
//           endTime: {
//             type: 'string',
//             description: '结束时间',
//           },
//           evidenceLocation: {
//             type: 'string',
//             description: '取证地址',
//           },
//           evidenceStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '取证状态1,取证成功,2.证据缺失,3.待支付',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '取证类型:1.拍照取证，2.录像取证，3.录音取证，4.录屏取证',
//           },
//           fileLabel: {
//             type: 'string',
//             description: '取证标签',
//           },
//           fileName: {
//             type: 'string',
//             description: '取证文件名称',
//           },
//           labelOrLocation: {
//             type: 'string',
//             description: '取证地址或取证标签',
//           },
//           limit: {
//             type: 'integer',
//             format: 'int32',
//             description: '每页显示条数',
//           },
//           parentId: {
//             type: 'integer',
//             format: 'int64',
//             description: '上级目录id',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           startTime: {
//             type: 'string',
//             description: '开始时间',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '1.已完成,2.未上传',
//           },
//           userName: {
//             type: 'string',
//             description: '操作人',
//           },
//         },
//         title: 'SiteListParam',
//       },
//       StatisticHomePageParam: {
//         type: 'object',
//         properties: {
//           certEndTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '取证结束时间',
//           },
//           certStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '取证开始时间',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '存证结束时间',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证处id',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '存证开始时间',
//           },
//         },
//         title: 'StatisticHomePageParam',
//       },
//       StatisticHomePageVo: {
//         type: 'object',
//         properties: {
//           amountRanks: {
//             type: 'array',
//             description: '充值金额排名',
//             items: {
//               $ref: '#/definitions/AmountRankVo',
//               originalRef: 'AmountRankVo',
//             },
//           },
//           authRateVos: {
//             type: 'array',
//             description: '认证用户数',
//             items: {
//               $ref: '#/definitions/AuthRateVo',
//               originalRef: 'AuthRateVo',
//             },
//           },
//           certificatesVo: {
//             description: '存证数量',
//             $ref: '#/definitions/CertificatesVo',
//             originalRef: 'CertificatesVo',
//           },
//           evidenceVo: {
//             description: '取证数量',
//             $ref: '#/definitions/CertificatesVo',
//             originalRef: 'CertificatesVo',
//           },
//           rechargeRateVos: {
//             type: 'array',
//             description: '充值金额',
//             items: {
//               $ref: '#/definitions/RechargeRateVo',
//               originalRef: 'RechargeRateVo',
//             },
//           },
//           todoVo: {
//             description: '待办',
//             $ref: '#/definitions/TodoVo',
//             originalRef: 'TodoVo',
//           },
//           totalVo: {
//             description: '总览',
//             $ref: '#/definitions/TotalVo',
//             originalRef: 'TotalVo',
//           },
//         },
//         title: 'StatisticHomePageVo',
//       },
//       TabCountVo: {
//         type: 'object',
//         properties: {
//           first: {
//             type: 'number',
//             description: '一手备案证明',
//           },
//           second: {
//             type: 'number',
//             description: '转让备案证明',
//           },
//         },
//         title: 'TabCountVo',
//       },
//       TodoVo: {
//         type: 'object',
//         properties: {
//           certs: {
//             type: 'number',
//           },
//           enterprises: {
//             type: 'number',
//           },
//           feedbacks: {
//             type: 'number',
//           },
//           invoices: {
//             type: 'number',
//           },
//           personals: {
//             type: 'number',
//           },
//           prices: {
//             type: 'number',
//           },
//         },
//         title: 'TodoVo',
//       },
//       TotalVo: {
//         type: 'object',
//         properties: {
//           authUsers: {
//             type: 'number',
//           },
//           certs: {
//             type: 'number',
//           },
//           issuingCerts: {
//             type: 'number',
//           },
//           rechargeAmounts: {
//             type: 'number',
//           },
//         },
//         title: 'TotalVo',
//       },
//       Transferee: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '省市区',
//           },
//           applyRemark: {
//             type: 'string',
//             description: '驳回原因',
//           },
//           availableYears: {
//             type: 'integer',
//             format: 'int32',
//             description: '车位使用年限',
//           },
//           commonUsers: {
//             type: 'array',
//             description: '共同使用权人',
//             items: {
//               $ref: '#/definitions/CommonUser',
//               originalRef: 'CommonUser',
//             },
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           contractFileNames: {
//             type: 'string',
//             description: '合同fileNames',
//           },
//           contractOssKeys: {
//             type: 'string',
//             description: '合同oss keys地址',
//           },
//           id: {
//             type: 'string',
//           },
//           parkNumber: {
//             type: 'string',
//             description: '车位号码',
//           },
//           parkProperty: {
//             type: 'string',
//             description: '车位属性',
//           },
//           parkStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '车位使用开始时间',
//           },
//           proprietorCard: {
//             type: 'string',
//             description: '使用权人证件号',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位使用权人',
//           },
//           proveHash: {
//             type: 'string',
//             description: 'hash',
//           },
//           proveOssKey: {
//             type: 'string',
//             description: '备案证明文件',
//           },
//           purchaseTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '车位购买时间',
//           },
//           recordTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '备案时间',
//           },
//           sharedStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: ' 是否有共同使用权人：0，否；1，是',
//           },
//           storageAttestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           storageHash: {
//             type: 'string',
//             description: '上链hash',
//           },
//           storageOssKey: {
//             type: 'string',
//             description: '保管单OSS KEY',
//           },
//         },
//         title: 'Transferee',
//       },
//       Transferor: {
//         type: 'object',
//         properties: {
//           address: {
//             type: 'string',
//             description: '省市区',
//           },
//           applyRemark: {
//             type: 'string',
//             description: '驳回原因',
//           },
//           availableYears: {
//             type: 'integer',
//             format: 'int32',
//             description: '车位使用年限',
//           },
//           commonUsers: {
//             type: 'array',
//             description: '共同使用权人',
//             items: {
//               $ref: '#/definitions/CommonUser',
//               originalRef: 'CommonUser',
//             },
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           contractFileNames: {
//             type: 'string',
//             description: '合同fileNames',
//           },
//           contractOssKeys: {
//             type: 'string',
//             description: '合同oss keys地址',
//           },
//           id: {
//             type: 'string',
//           },
//           parkNumber: {
//             type: 'string',
//             description: '车位号码',
//           },
//           parkProperty: {
//             type: 'string',
//             description: '车位属性',
//           },
//           parkStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '车位使用开始时间',
//           },
//           proprietorCard: {
//             type: 'string',
//             description: '使用权人证件号',
//           },
//           proprietorName: {
//             type: 'string',
//             description: '车位使用权人',
//           },
//           proveHash: {
//             type: 'string',
//             description: 'hash',
//           },
//           proveOssKey: {
//             type: 'string',
//             description: '备案证明文件',
//           },
//           purchaseTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '车位购买时间',
//           },
//           recordTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '备案时间',
//           },
//           sharedStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: ' 是否有共同使用权人：0，否；1，是',
//           },
//           storageAttestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           storageHash: {
//             type: 'string',
//             description: '上链hash',
//           },
//           storageOssKey: {
//             type: 'string',
//             description: '保管单OSS KEY',
//           },
//           transferTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '转让时间',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '车位使用权人用户id',
//           },
//         },
//         title: 'Transferor',
//       },
//       UpdateRolePermissionParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '角色id',
//           },
//           permissionList: {
//             type: 'array',
//             description: '权限id列表',
//             items: {
//               type: 'integer',
//               format: 'int64',
//             },
//           },
//         },
//         title: 'UpdateRolePermissionParam',
//       },
//       UploadImgBean: {
//         type: 'object',
//         properties: {
//           fileKey: {
//             type: 'string',
//             description: '文件key',
//           },
//           imgName: {
//             type: 'string',
//             description: '名称',
//           },
//           imgUrl: {
//             type: 'string',
//             description: '路径',
//           },
//         },
//         title: 'UploadImgBean',
//       },
//       UrlFeedbackParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '网页取证id',
//           },
//           remark: {
//             type: 'string',
//             description: '备注',
//           },
//         },
//         title: 'UrlFeedbackParam',
//       },
//       UserAccountDto: {
//         type: 'object',
//         properties: {
//           balance: {
//             type: 'number',
//             description: '余额(分)',
//           },
//           consumeBalance: {
//             type: 'number',
//             description: '总共消耗的充值金额(分)',
//           },
//           consumeSendBalance: {
//             type: 'number',
//             description: '共消耗的赠送金额(分)',
//           },
//           freeze: {
//             type: 'number',
//             description: '冻结金额(分)',
//           },
//           freezeSendBalance: {
//             type: 'number',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '账号id',
//           },
//           inBalance: {
//             type: 'number',
//           },
//           invoiceAmount: {
//             type: 'number',
//             description: '可开票金额',
//           },
//           isReal: {
//             type: 'boolean',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           phoneNumber: {
//             type: 'string',
//           },
//           remark: {
//             type: 'string',
//             description: '备注',
//           },
//           sendBalance: {
//             type: 'number',
//             description: '赠送金额(分)',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '0冻结 1正常',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//           userName: {
//             type: 'string',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//           },
//           waitPayCount: {
//             type: 'integer',
//             format: 'int64',
//             description: '待支付订单数量',
//           },
//         },
//         title: 'UserAccountDto',
//       },
//       UserBindAdminParam: {
//         type: 'object',
//         properties: {
//           adminId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//           },
//         },
//         title: 'UserBindAdminParam',
//       },
//       UserEntity: {
//         type: 'object',
//         properties: {
//           adminId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           adminName: {
//             type: 'string',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//           },
//           isMain: {
//             type: 'boolean',
//           },
//           isReal: {
//             type: 'boolean',
//           },
//           isUpgrade: {
//             type: 'boolean',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           parentUserId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           password: {
//             type: 'string',
//           },
//           phoneNumber: {
//             type: 'string',
//           },
//           realTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           remark: {
//             type: 'string',
//           },
//           sourceId: {
//             type: 'integer',
//             format: 'int32',
//           },
//           status: {
//             type: 'boolean',
//           },
//           updateTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           userName: {
//             type: 'string',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//           },
//         },
//         title: 'UserEntity',
//       },
//       UserFeatureGroupStatisticsBean: {
//         type: 'object',
//         properties: {
//           industryNum: {
//             description: '行业',
//             $ref: '#/definitions/UserFeatureIndustryStatisticsBean',
//             originalRef: 'UserFeatureIndustryStatisticsBean',
//           },
//           jobNum: {
//             description: '职业',
//             $ref: '#/definitions/UserFeatureJobStatisticsBean',
//             originalRef: 'UserFeatureJobStatisticsBean',
//           },
//           sexNum: {
//             description: '性别',
//             $ref: '#/definitions/UserFeatureSexStatisticsBean',
//             originalRef: 'UserFeatureSexStatisticsBean',
//           },
//         },
//         title: 'UserFeatureGroupStatisticsBean',
//       },
//       UserFeatureIndustryStatisticsBean: {
//         type: 'object',
//         properties: {
//           sum0: {
//             type: 'integer',
//             format: 'int32',
//             description: '法律服务',
//           },
//           sum1: {
//             type: 'integer',
//             format: 'int32',
//             description: '代理维权',
//           },
//           sum2: {
//             type: 'integer',
//             format: 'int32',
//             description: '原创机构',
//           },
//           sum3: {
//             type: 'integer',
//             format: 'int32',
//             description: '金融科技',
//           },
//           sum5: {
//             type: 'integer',
//             format: 'int32',
//             description: '电商行业',
//           },
//           sum6: {
//             type: 'integer',
//             format: 'int32',
//             description: '其他',
//           },
//         },
//         title: 'UserFeatureIndustryStatisticsBean',
//       },
//       UserFeatureJobStatisticsBean: {
//         type: 'object',
//         properties: {
//           sum0: {
//             type: 'integer',
//             format: 'int32',
//             description: '律师',
//           },
//           sum1: {
//             type: 'integer',
//             format: 'int32',
//             description: '法务',
//           },
//           sum2: {
//             type: 'integer',
//             format: 'int32',
//             description: '摄影师',
//           },
//           sum3: {
//             type: 'integer',
//             format: 'int32',
//             description: '自媒体作者',
//           },
//           sum4: {
//             type: 'integer',
//             format: 'int32',
//             description: '其他',
//           },
//         },
//         title: 'UserFeatureJobStatisticsBean',
//       },
//       UserFeatureSexStatisticsBean: {
//         type: 'object',
//         properties: {
//           sum0: {
//             type: 'integer',
//             format: 'int64',
//             description: '男',
//           },
//           sum1: {
//             type: 'integer',
//             format: 'int64',
//             description: '女',
//           },
//           sum2: {
//             type: 'integer',
//             format: 'int64',
//             description: '未知',
//           },
//         },
//         title: 'UserFeatureSexStatisticsBean',
//       },
//       UserIdParam: {
//         type: 'object',
//         required: ['userId'],
//         properties: {
//           code: {
//             type: 'string',
//             description: '验证码',
//           },
//           name: {
//             type: 'string',
//             description: '子账户名称',
//           },
//           pwd: {
//             type: 'string',
//             description: '新密码',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: 'userId',
//           },
//         },
//         title: 'UserIdParam',
//       },
//       UserIncrDayStatisticsBean: {
//         type: 'object',
//         properties: {
//           sum: {
//             type: 'integer',
//             format: 'int32',
//             description: '数量',
//           },
//           time: {
//             type: 'string',
//             description: '时间',
//           },
//         },
//         title: 'UserIncrDayStatisticsBean',
//       },
//       UserIncrGroupStatisticsBean: {
//         type: 'object',
//         properties: {
//           registerEnterpriseNum: {
//             type: 'array',
//             description: '企业用户',
//             items: {
//               $ref: '#/definitions/UserIncrDayStatisticsBean',
//               originalRef: 'UserIncrDayStatisticsBean',
//             },
//           },
//           registerNum: {
//             type: 'array',
//             description: '注册用户',
//             items: {
//               $ref: '#/definitions/UserIncrDayStatisticsBean',
//               originalRef: 'UserIncrDayStatisticsBean',
//             },
//           },
//           registerPersonalNum: {
//             type: 'array',
//             description: '个人用户',
//             items: {
//               $ref: '#/definitions/UserIncrDayStatisticsBean',
//               originalRef: 'UserIncrDayStatisticsBean',
//             },
//           },
//         },
//         title: 'UserIncrGroupStatisticsBean',
//       },
//       UserInfoBean: {
//         type: 'object',
//         properties: {
//           alipayName: {
//             type: 'string',
//             description: '支付宝昵称',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//           userName: {
//             type: 'string',
//             description: '用户姓名',
//           },
//           wechatName: {
//             type: 'string',
//             description: '微信昵称',
//           },
//         },
//         title: 'UserInfoBean',
//       },
//       UserInfoParam: {
//         type: 'object',
//         properties: {
//           userId: {
//             type: 'object',
//             description: 'userIds',
//           },
//         },
//         title: 'UserInfoParam',
//       },
//       UserInvoiceDetailedEntity: {
//         type: 'object',
//         properties: {
//           amount: {
//             type: 'number',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//           },
//           invoiceId: {
//             type: 'string',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           orderCreateTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           orderId: {
//             type: 'string',
//           },
//           orderInfo: {
//             type: 'string',
//           },
//           outerId: {
//             type: 'string',
//           },
//           payAccount: {
//             type: 'string',
//           },
//           payType: {
//             type: 'integer',
//             format: 'int32',
//           },
//           remark: {
//             type: 'string',
//           },
//           transferUrl: {
//             type: 'string',
//           },
//           updateTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//         },
//         title: 'UserInvoiceDetailedEntity',
//       },
//       UserListBean: {
//         type: 'object',
//         properties: {
//           adminId: {
//             type: 'integer',
//             format: 'int64',
//             description: '公证员id',
//           },
//           adminName: {
//             type: 'string',
//             description: '公证员姓名',
//           },
//           createTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '注册时间',
//           },
//           enterpriseName: {
//             type: 'string',
//             description: '企业名字',
//           },
//           enterpriseRealStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '升级状态：0 未实名 1：待审核 2：审核被拒 3：审核通过',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '实名id',
//           },
//           industry: {
//             type: 'string',
//             description: '行业',
//           },
//           isReal: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否实名',
//           },
//           isUpgrade: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否升级',
//           },
//           job: {
//             type: 'string',
//             description: '职业',
//           },
//           loginTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '最近登录',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             description: '所属公证处id',
//           },
//           notaryName: {
//             type: 'string',
//             description: '所属公证处',
//           },
//           openApi: {
//             type: 'boolean',
//             description: '是否开通API',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           realName: {
//             type: 'string',
//             description: '用户实名',
//           },
//           realStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态：0 未实名 1：待审核 2：审核被拒 3：审核通过',
//           },
//           realStatus2: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态：0 未实名 1：待审核 2：审核被拒 3：审核通过',
//           },
//           realTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '实名时间',
//           },
//           realType: {
//             type: 'integer',
//             format: 'int32',
//             description: '认证方式 （0：支付宝认证，1：证件拍照上传）',
//           },
//           sex: {
//             type: 'boolean',
//             description: '性别',
//           },
//           sourceId: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户来源',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户类型 （0: 个人，1: 企业）',
//           },
//         },
//         title: 'UserListBean',
//       },
//       UserListExportParam: {
//         type: 'object',
//         properties: {
//           adminId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '注册结束时间',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           realEndTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '实名结束时间',
//           },
//           realStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '实名开始时间',
//           },
//           realStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态：0 未实名  1：待审核 2：审核被拒 3：审核通过',
//           },
//           sourceId: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户来源',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '注册开始时间',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'UserListExportParam',
//       },
//       UserListParam: {
//         type: 'object',
//         properties: {
//           adminId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '注册结束时间',
//           },
//           industry: {
//             type: 'integer',
//             format: 'int32',
//           },
//           job: {
//             type: 'integer',
//             format: 'int32',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           realEndTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '实名结束时间',
//           },
//           realStartTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '实名开始时间',
//           },
//           realStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '状态：0 未实名  1：待审核 2：审核被拒 3：审核通过',
//           },
//           sourceId: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户来源',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '注册开始时间',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//         },
//         title: 'UserListParam',
//       },
//       UserLoginLogListBean: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//           },
//           loginIp: {
//             type: 'string',
//           },
//           loginTime: {
//             type: 'string',
//             format: 'date-time',
//           },
//           notaryName: {
//             type: 'string',
//           },
//           phoneNumber: {
//             type: 'string',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           userName: {
//             type: 'string',
//           },
//         },
//         title: 'UserLoginLogListBean',
//       },
//       UserNumberStatisticsBean: {
//         type: 'object',
//         properties: {
//           enterpriseNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '企业',
//           },
//           personalNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '个人',
//           },
//           realNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '实名',
//           },
//           unRealNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '未实名',
//           },
//         },
//         title: 'UserNumberStatisticsBean',
//       },
//       UserPhoneParam: {
//         type: 'object',
//         properties: {
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//         },
//         title: 'UserPhoneParam',
//       },
//       UserVotePageVo: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           cardNumber: {
//             type: 'string',
//             description: '业主身份证号',
//           },
//           houseCode: {
//             type: 'string',
//             description: '户号',
//           },
//           id: {
//             type: 'string',
//             description: '用户投票信息id',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '业主手机号',
//           },
//           userName: {
//             type: 'string',
//             description: '业主姓名',
//           },
//           voteTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '投票时间',
//           },
//         },
//         title: 'UserVotePageVo',
//       },
//       VoteAddParam: {
//         type: 'object',
//         properties: {
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           voteBasicParam: {
//             description: '基本信息',
//             $ref: '#/definitions/VoteBasicParam',
//             originalRef: 'VoteBasicParam',
//           },
//           voteQuestionParams: {
//             type: 'array',
//             description: '投票问题',
//             items: {
//               $ref: '#/definitions/VoteQuestionParam',
//               originalRef: 'VoteQuestionParam',
//             },
//           },
//         },
//         title: 'VoteAddParam',
//       },
//       VoteBasicEditParam: {
//         type: 'object',
//         properties: {
//           communityAddress: {
//             type: 'string',
//             description: '小区所在省市区',
//           },
//           communityId: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '主键',
//           },
//           memo: {
//             type: 'string',
//             description: '投票说明',
//           },
//           name: {
//             type: 'string',
//             description: '投票名称',
//           },
//           smsSendTimeList: {
//             type: 'array',
//             description: '免责短信发送时间',
//             items: {
//               $ref: "Error-ModelName{namespace='java.time', name='LocalDateTime'}",
//               originalRef:
//                 "Error-ModelName{namespace='java.time', name='LocalDateTime'}",
//             },
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票类型1.一户一票 2.一人一票',
//           },
//         },
//         title: 'VoteBasicEditParam',
//       },
//       VoteBasicInfoVo: {
//         type: 'object',
//         properties: {
//           communityAddress: {
//             type: 'string',
//             description: '小区所在省市区',
//           },
//           communityId: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           id: {
//             type: 'string',
//             description: '投票id',
//           },
//           memo: {
//             type: 'string',
//             description: '投票说明',
//           },
//           name: {
//             type: 'string',
//             description: '投票名称',
//           },
//           smsSendTimeList: {
//             type: 'array',
//             description: '免责短信发送时间',
//             items: {
//               $ref: "Error-ModelName{namespace='java.time', name='LocalDateTime'}",
//               originalRef:
//                 "Error-ModelName{namespace='java.time', name='LocalDateTime'}",
//             },
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票类型1.一户一票 2.一人一票',
//           },
//         },
//         title: 'VoteBasicInfoVo',
//       },
//       VoteBasicParam: {
//         type: 'object',
//         properties: {
//           communityAddress: {
//             type: 'string',
//             description: '小区所在省市区',
//           },
//           communityId: {
//             type: 'integer',
//             format: 'int64',
//             description: '小区id',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           memo: {
//             type: 'string',
//             description: '投票说明',
//           },
//           name: {
//             type: 'string',
//             description: '投票名称',
//           },
//           smsSendTimeList: {
//             type: 'array',
//             description: '免责短信发送时间',
//             items: {
//               $ref: "Error-ModelName{namespace='java.time', name='LocalDateTime'}",
//               originalRef:
//                 "Error-ModelName{namespace='java.time', name='LocalDateTime'}",
//             },
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票类型1.一户一票 2.一人一票',
//           },
//         },
//         title: 'VoteBasicParam',
//       },
//       VoteDelParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '投票id',
//           },
//         },
//         title: 'VoteDelParam',
//       },
//       VoteDetailParam: {
//         type: 'object',
//         properties: {
//           cardNumber: {
//             type: 'string',
//             description: '业主身份证号',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '主键',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           userName: {
//             type: 'string',
//             description: '业主姓名',
//           },
//         },
//         title: 'VoteDetailParam',
//       },
//       VoteEditParam: {
//         type: 'object',
//         properties: {
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           voteBasicEditParam: {
//             description: '基本信息',
//             $ref: '#/definitions/VoteBasicEditParam',
//             originalRef: 'VoteBasicEditParam',
//           },
//           voteQuestionParams: {
//             type: 'array',
//             description: '投票问题',
//             items: {
//               $ref: '#/definitions/VoteQuestionParam',
//               originalRef: 'VoteQuestionParam',
//             },
//           },
//         },
//         title: 'VoteEditParam',
//       },
//       VoteInfoVo: {
//         type: 'object',
//         properties: {
//           basicInfo: {
//             description: '投票基本信息',
//             $ref: '#/definitions/VoteBasicInfoVo',
//             originalRef: 'VoteBasicInfoVo',
//           },
//           questionVoList: {
//             type: 'array',
//             description: '投票问题',
//             items: {
//               $ref: '#/definitions/VoteQuestionVo',
//               originalRef: 'VoteQuestionVo',
//             },
//           },
//         },
//         title: 'VoteInfoVo',
//       },
//       VoteQueryDetailVo: {
//         type: 'object',
//         properties: {
//           pageInfo: {
//             description: '投票业主信息列表',
//             $ref: '#/definitions/PageInfo«UserVotePageVo»',
//             originalRef: 'PageInfo«UserVotePageVo»',
//           },
//           voteBasicInfo: {
//             description: '投票基本信息',
//             $ref: '#/definitions/VoteQueryPageVo',
//             originalRef: 'VoteQueryPageVo',
//           },
//         },
//         title: 'VoteQueryDetailVo',
//       },
//       VoteQueryPageParam: {
//         type: 'object',
//         properties: {
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           name: {
//             type: 'string',
//             description: '投票名称',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           now: {
//             type: 'string',
//             format: 'date-time',
//           },
//           pageNum: {
//             type: 'integer',
//             format: 'int32',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票状态 0-待开始 1-投票中 2-已结束',
//           },
//         },
//         title: 'VoteQueryPageParam',
//       },
//       VoteQueryPageVo: {
//         type: 'object',
//         properties: {
//           attestationId: {
//             type: 'string',
//             description: '存证编号',
//           },
//           communityAddress: {
//             type: 'string',
//             description: '小区所在省市区',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '投票截止时间',
//           },
//           id: {
//             type: 'string',
//             description: '投票编号',
//           },
//           name: {
//             type: 'string',
//             description: '投票名称',
//           },
//           num: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票人数',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '投票开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票状态 0-待开始 1-投票中 2-已结束',
//           },
//           total: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票总数',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票类型1.一户一票 2.一人一票',
//           },
//         },
//         title: 'VoteQueryPageVo',
//       },
//       VoteQuestionOptionParam: {
//         type: 'object',
//         properties: {
//           imageOssKey: {
//             type: 'string',
//             description: '图片ossKey',
//           },
//           memo: {
//             type: 'string',
//             description: '选项文字描述',
//           },
//           optionNo: {
//             type: 'integer',
//             format: 'int32',
//             description: '选项序号',
//           },
//         },
//         title: 'VoteQuestionOptionParam',
//       },
//       VoteQuestionOptionVo: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'string',
//             description: '选项id',
//           },
//           imageOssKey: {
//             type: 'string',
//             description: '图片ossKey',
//           },
//           memo: {
//             type: 'string',
//             description: '选项文字藐视',
//           },
//           optionNo: {
//             type: 'integer',
//             format: 'int32',
//             description: ' 选项序号',
//           },
//         },
//         title: 'VoteQuestionOptionVo',
//       },
//       VoteQuestionParam: {
//         type: 'object',
//         properties: {
//           questionNo: {
//             type: 'integer',
//             format: 'int32',
//             description: '问题序号',
//           },
//           questionOptionParams: {
//             type: 'array',
//             description: '投票问题选项',
//             items: {
//               $ref: '#/definitions/VoteQuestionOptionParam',
//               originalRef: 'VoteQuestionOptionParam',
//             },
//           },
//           requiredStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否必填 0非必填,1必填',
//           },
//           title: {
//             type: 'string',
//             description: '标题',
//             minLength: 0,
//             maxLength: 300,
//           },
//         },
//         title: 'VoteQuestionParam',
//       },
//       VoteQuestionVo: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'string',
//             description: '问题id',
//           },
//           questionNo: {
//             type: 'integer',
//             format: 'int32',
//             description: '问题序号',
//           },
//           questionOptionVoList: {
//             type: 'array',
//             description: '问题选项',
//             items: {
//               $ref: '#/definitions/VoteQuestionOptionVo',
//               originalRef: 'VoteQuestionOptionVo',
//             },
//           },
//           requiredStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否必填 0非必填,1必填',
//           },
//           title: {
//             type: 'string',
//             description: '标题',
//           },
//         },
//         title: 'VoteQuestionVo',
//       },
//       VoteResultBasicInfoVo: {
//         type: 'object',
//         properties: {
//           communityAddress: {
//             type: 'string',
//           },
//           communityName: {
//             type: 'string',
//             description: '小区名称',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '投票截止时间',
//           },
//           endTimeStr: {
//             type: 'string',
//             description: '投票截止时间',
//           },
//           houseCode: {
//             type: 'string',
//             description: '户号',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//           },
//           memo: {
//             type: 'string',
//             description: '投票说明',
//           },
//           name: {
//             type: 'string',
//             description: '投票名称',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           num: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票人数',
//           },
//           phoneNumber: {
//             type: 'string',
//             description: '业主手机号',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '投票开始时间',
//           },
//           startTimeStr: {
//             type: 'string',
//             description: '投票开始时间',
//           },
//           total: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票总数',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//             description: '投票类型1.一户一票 2.一人一票',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           userName: {
//             type: 'string',
//             description: '业主姓名',
//           },
//           voteTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '投票时间',
//           },
//           voteTimeStr: {
//             type: 'string',
//             description: '投票时间',
//           },
//         },
//         title: 'VoteResultBasicInfoVo',
//       },
//       VoteResultOptionInfoVo: {
//         type: 'object',
//         properties: {
//           imageOssKey: {
//             type: 'string',
//             description: '图片ossKey',
//           },
//           memo: {
//             type: 'string',
//             description: '选项文字藐视',
//           },
//           num: {
//             type: 'integer',
//             format: 'int64',
//             description: '票数',
//           },
//           optionId: {
//             type: 'integer',
//             format: 'int64',
//             description: '选项id',
//           },
//           optionNo: {
//             type: 'integer',
//             format: 'int32',
//             description: ' 选项序号',
//           },
//           selected: {
//             type: 'boolean',
//             description: '是否选中 true-选中，false-未选中',
//           },
//         },
//         title: 'VoteResultOptionInfoVo',
//       },
//       VoteResultParam: {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description:
//               '主键 operationType = 1 取投票列表的id,operationType = 2 取业主信息列表的id',
//           },
//           operationType: {
//             type: 'integer',
//             format: 'int32',
//             description: '1-查看结果 2-查看详情里的查看结果',
//           },
//         },
//         title: 'VoteResultParam',
//       },
//       VoteResultQuestionInfoVo: {
//         type: 'object',
//         properties: {
//           questionId: {
//             type: 'integer',
//             format: 'int64',
//             description: '问题id',
//           },
//           questionNo: {
//             type: 'integer',
//             format: 'int32',
//             description: '问题序号',
//           },
//           requiredStatus: {
//             type: 'integer',
//             format: 'int32',
//             description: '是否必填 0非必填,1必填',
//           },
//           title: {
//             type: 'string',
//             description: '标题',
//           },
//           voteResultOptionInfos: {
//             type: 'array',
//             description: '选项',
//             items: {
//               $ref: '#/definitions/VoteResultOptionInfoVo',
//               originalRef: 'VoteResultOptionInfoVo',
//             },
//           },
//         },
//         title: 'VoteResultQuestionInfoVo',
//       },
//       VoteResultVo: {
//         type: 'object',
//         properties: {
//           voteResultBasicInfo: {
//             description: '基本信息',
//             $ref: '#/definitions/VoteResultBasicInfoVo',
//             originalRef: 'VoteResultBasicInfoVo',
//           },
//           voteResultQuestionInfos: {
//             type: 'array',
//             description: '问题列表',
//             items: {
//               $ref: '#/definitions/VoteResultQuestionInfoVo',
//               originalRef: 'VoteResultQuestionInfoVo',
//             },
//           },
//         },
//         title: 'VoteResultVo',
//       },
//       WaitHandleStatisticsBean: {
//         type: 'object',
//         properties: {
//           bqCert: {
//             type: 'integer',
//             format: 'int32',
//             description: '保全公证',
//           },
//           buyCert: {
//             type: 'integer',
//             format: 'int32',
//             description: '购买公证',
//           },
//           enterpriseReal: {
//             type: 'integer',
//             format: 'int32',
//             description: '企业认证',
//           },
//           invoiceNum: {
//             type: 'integer',
//             format: 'int32',
//             description: '发票索取',
//           },
//           judicialCert: {
//             type: 'integer',
//             format: 'int32',
//             description: '司法鉴定',
//           },
//           personalReal: {
//             type: 'integer',
//             format: 'int32',
//             description: '个人认证',
//           },
//           processFeeback: {
//             type: 'integer',
//             format: 'int32',
//             description: '过程&移反馈',
//           },
//           urlFeeback: {
//             type: 'integer',
//             format: 'int32',
//             description: '网页取证反馈',
//           },
//         },
//         title: 'WaitHandleStatisticsBean',
//       },
//       WpsFileEntity: {
//         type: 'object',
//         properties: {
//           create_time: {
//             type: 'integer',
//             format: 'int64',
//           },
//           creator: {
//             type: 'string',
//           },
//           download_url: {
//             type: 'string',
//           },
//           id: {
//             type: 'string',
//           },
//           modifier: {
//             type: 'string',
//           },
//           modify_time: {
//             type: 'integer',
//             format: 'int64',
//           },
//           name: {
//             type: 'string',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           user_acl: {
//             $ref: '#/definitions/WpsUserAclEntity',
//             originalRef: 'WpsUserAclEntity',
//           },
//           version: {
//             type: 'integer',
//             format: 'int32',
//           },
//           watermark: {
//             $ref: '#/definitions/WpsWatermarkEntity',
//             originalRef: 'WpsWatermarkEntity',
//           },
//         },
//         title: 'WpsFileEntity',
//       },
//       WpsFileHistoryEntity: {
//         type: 'object',
//         properties: {
//           create_time: {
//             type: 'integer',
//             format: 'int64',
//           },
//           creator: {
//             $ref: '#/definitions/WpsUserEntity',
//             originalRef: 'WpsUserEntity',
//           },
//           id: {
//             type: 'string',
//           },
//           modifier: {
//             $ref: '#/definitions/WpsUserEntity',
//             originalRef: 'WpsUserEntity',
//           },
//           modify_time: {
//             type: 'integer',
//             format: 'int64',
//           },
//           name: {
//             type: 'string',
//           },
//           size: {
//             type: 'integer',
//             format: 'int32',
//           },
//           version: {
//             type: 'integer',
//             format: 'int32',
//           },
//         },
//         title: 'WpsFileHistoryEntity',
//       },
//       WpsFileHistoryRequest: {
//         type: 'object',
//         properties: {
//           code: {
//             type: 'integer',
//             format: 'int32',
//           },
//           count: {
//             type: 'integer',
//             format: 'int32',
//           },
//           id: {
//             type: 'string',
//           },
//           msg: {
//             type: 'string',
//           },
//           offset: {
//             type: 'integer',
//             format: 'int32',
//           },
//           status: {
//             type: 'string',
//           },
//         },
//         title: 'WpsFileHistoryRequest',
//       },
//       WpsFileHistoryResponse: {
//         type: 'object',
//         properties: {
//           code: {
//             type: 'integer',
//             format: 'int32',
//           },
//           histories: {
//             type: 'array',
//             items: {
//               $ref: '#/definitions/WpsFileHistoryEntity',
//               originalRef: 'WpsFileHistoryEntity',
//             },
//           },
//           msg: {
//             type: 'string',
//           },
//           status: {
//             type: 'string',
//           },
//         },
//         title: 'WpsFileHistoryResponse',
//       },
//       WpsFileResponse: {
//         type: 'object',
//         properties: {
//           code: {
//             type: 'integer',
//             format: 'int32',
//           },
//           file: {
//             $ref: '#/definitions/WpsFileEntity',
//             originalRef: 'WpsFileEntity',
//           },
//           msg: {
//             type: 'string',
//           },
//           status: {
//             type: 'string',
//           },
//           user: {
//             $ref: '#/definitions/WpsUserEntity',
//             originalRef: 'WpsUserEntity',
//           },
//         },
//         title: 'WpsFileResponse',
//       },
//       WpsFileSaveResponse: {
//         type: 'object',
//         properties: {
//           code: {
//             type: 'integer',
//             format: 'int32',
//           },
//           file: {
//             $ref: '#/definitions/WpsFileEntity',
//             originalRef: 'WpsFileEntity',
//           },
//           msg: {
//             type: 'string',
//           },
//           status: {
//             type: 'string',
//           },
//         },
//         title: 'WpsFileSaveResponse',
//       },
//       WpsRenameRequest: {
//         type: 'object',
//         properties: {
//           code: {
//             type: 'integer',
//             format: 'int32',
//           },
//           msg: {
//             type: 'string',
//           },
//           name: {
//             type: 'string',
//           },
//           status: {
//             type: 'string',
//           },
//         },
//         title: 'WpsRenameRequest',
//       },
//       WpsResponse: {
//         type: 'object',
//         properties: {
//           code: {
//             type: 'integer',
//             format: 'int32',
//           },
//           msg: {
//             type: 'string',
//           },
//           status: {
//             type: 'string',
//           },
//         },
//         title: 'WpsResponse',
//       },
//       WpsToken: {
//         type: 'object',
//         properties: {
//           code: {
//             type: 'integer',
//             format: 'int32',
//           },
//           expires_in: {
//             type: 'integer',
//             format: 'int32',
//           },
//           msg: {
//             type: 'string',
//           },
//           status: {
//             type: 'string',
//           },
//           token: {
//             type: 'string',
//           },
//           wpsUrl: {
//             type: 'string',
//           },
//         },
//         title: 'WpsToken',
//       },
//       WpsUserAclEntity: {
//         type: 'object',
//         properties: {
//           copy: {
//             type: 'integer',
//             format: 'int32',
//           },
//           export: {
//             type: 'integer',
//             format: 'int32',
//           },
//           history: {
//             type: 'integer',
//             format: 'int32',
//           },
//           print: {
//             type: 'integer',
//             format: 'int32',
//           },
//           rename: {
//             type: 'integer',
//             format: 'int32',
//           },
//         },
//         title: 'WpsUserAclEntity',
//       },
//       WpsUserEntity: {
//         type: 'object',
//         properties: {
//           avatar_url: {
//             type: 'string',
//           },
//           id: {
//             type: 'string',
//           },
//           name: {
//             type: 'string',
//           },
//           permission: {
//             type: 'string',
//           },
//         },
//         title: 'WpsUserEntity',
//       },
//       WpsUserRequest: {
//         type: 'object',
//         properties: {
//           ids: {
//             type: 'array',
//             items: {
//               type: 'string',
//             },
//           },
//         },
//         title: 'WpsUserRequest',
//       },
//       WpsUserResponse: {
//         type: 'object',
//         properties: {
//           code: {
//             type: 'integer',
//             format: 'int32',
//           },
//           msg: {
//             type: 'string',
//           },
//           status: {
//             type: 'string',
//           },
//           users: {
//             type: 'array',
//             items: {
//               $ref: '#/definitions/WpsUserEntity',
//               originalRef: 'WpsUserEntity',
//             },
//           },
//         },
//         title: 'WpsUserResponse',
//       },
//       WpsWatermarkEntity: {
//         type: 'object',
//         properties: {
//           fillstyle: {
//             type: 'integer',
//             format: 'int32',
//           },
//           font: {
//             type: 'integer',
//             format: 'int32',
//           },
//           horizontal: {
//             type: 'integer',
//             format: 'int32',
//           },
//           rotate: {
//             type: 'string',
//           },
//           type: {
//             type: 'integer',
//             format: 'int32',
//           },
//           value: {
//             type: 'integer',
//             format: 'int32',
//           },
//           vertical: {
//             type: 'integer',
//             format: 'int32',
//           },
//         },
//         title: 'WpsWatermarkEntity',
//       },
//       '企业开通API-参数': {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '企业id',
//           },
//           remark: {
//             type: 'string',
//             description: '开通API备注',
//           },
//         },
//         title: '企业开通API-参数',
//       },
//       '反馈列表V2-参数': {
//         type: 'object',
//         properties: {
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           evidenceKind: {
//             type: 'integer',
//             format: 'int32',
//             description:
//               '取证种类: 0.网页取证 1.电商取证 2.视频取证 3.过程取证',
//           },
//           feedbackType: {
//             type: 'string',
//             description: '反馈类型：取证结果反馈：0，截图反馈：1',
//             enum: ['ATTEST_RESULT', 'SCREENSHOT'],
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             description: '处理状态：0.未通过 1.通过 2.待回复',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userPhone: {
//             type: 'string',
//             description: '用户手机号',
//           },
//         },
//         title: '反馈列表V2-参数',
//       },
//       '存证信息查询出参-pdf': {
//         type: 'object',
//         properties: {
//           imgBase: {
//             type: 'string',
//           },
//           no: {
//             type: 'string',
//           },
//           pdfUrl: {
//             type: 'string',
//           },
//         },
//         title: '存证信息查询出参-pdf',
//         description: '存证信息查询出参',
//       },
//       '导出账单明细-参数': {
//         type: 'object',
//         required: ['userId'],
//         properties: {
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           orderType: {
//             type: 'integer',
//             format: 'int32',
//             description: '1充值 2消费 3赠送',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           userId: {
//             type: 'integer',
//             format: 'int64',
//             description: '用户id',
//           },
//         },
//         title: '导出账单明细-参数',
//       },
//       文件上传返回类: {
//         type: 'object',
//         properties: {
//           fileName: {
//             type: 'string',
//             description: '文件名称',
//           },
//           fileOssKey: {
//             type: 'string',
//             description: '文件ossKey',
//           },
//           fileUrl: {
//             type: 'string',
//             description: '文件访问url',
//           },
//         },
//         title: '文件上传返回类',
//       },
//       枚举数据响应类: {
//         type: 'object',
//         properties: {
//           children: {
//             type: 'array',
//             description: '子节点',
//             items: {
//               $ref: '#/definitions/枚举数据响应类',
//               originalRef: '枚举数据响应类',
//             },
//           },
//           key: {
//             type: 'object',
//             description: 'key，一般为主键/英文/数字等可唯一识别的字段',
//           },
//           value: {
//             type: 'object',
//             description: '值',
//           },
//         },
//         title: '枚举数据响应类',
//       },
//       '登记审核-列表查询参数': {
//         type: 'object',
//         properties: {
//           dataEquityType: {
//             type: 'integer',
//             format: 'int32',
//             example: 1,
//             description:
//               '数据权益类型 (-1：无，1:数据资源持有权,2:数据加工使用权,3:数据产品经营权,4:数据知识产权)',
//           },
//           dataFeatureType: {
//             type: 'integer',
//             format: 'int32',
//             example: 1,
//             description:
//               '数据要素类型（null:全部，1：数据集，2：数据API，3：数据模型，4：数据报告，5：其他要素类型）',
//           },
//           enterpriseName: {
//             type: 'string',
//             example: '*******公司',
//             description: '登记主体',
//           },
//           pageNo: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//             minimum: 1,
//             exclusiveMinimum: false,
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页尺',
//             minimum: 0,
//             maximum: 9223372036854776000,
//             exclusiveMinimum: false,
//             exclusiveMaximum: false,
//           },
//           paymentStatus: {
//             type: 'integer',
//             format: 'int32',
//             example: 1,
//             description:
//               '支付状态（null:全部，0：待定价，1：待支付，3：支付失败，4：取消支付，5：已支付）',
//           },
//           registrationType: {
//             type: 'integer',
//             format: 'int32',
//             example: 1,
//             description:
//               '登记类型（1：首次登记，2：许可登记，3：转移登记，4：变更登记，5：注销登记，6：撤销登记请求，7：异议登记）',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             example: 7,
//             description:
//               '登记状态（null:全部，6:待审核，7:审核驳回，8:审核不通过，10:公示中，11:有异议，12:已撤销，13:已发证）',
//           },
//           title: {
//             type: 'string',
//             example: 'XX部门开放数据',
//             description: '数据名称',
//           },
//         },
//         title: '登记审核-列表查询参数',
//       },
//       '登记审核-处理异议参数': {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '登记数据id',
//           },
//           isValid: {
//             type: 'boolean',
//             description: '是否有效',
//           },
//         },
//         title: '登记审核-处理异议参数',
//       },
//       '登记审核-定价参数': {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '登记数据id',
//           },
//           orderAmount: {
//             type: 'number',
//             description: '订单金额（元）',
//           },
//           paymentExplanationFileIds: {
//             type: 'string',
//             description: '收费说明文件id，英文逗号分隔',
//           },
//         },
//         title: '登记审核-定价参数',
//       },
//       '登记审核-审核参数': {
//         type: 'object',
//         properties: {
//           attachFiles: {
//             type: 'string',
//             description: '附件ID，英文逗号分隔',
//           },
//           auditComment: {
//             type: 'string',
//             description: '审核意见',
//             minLength: 0,
//             maxLength: 200,
//           },
//           auditResult: {
//             type: 'integer',
//             format: 'int32',
//             description: '审核结果，1：通过，2：不通过，3：驳回',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '登记数据id',
//           },
//         },
//         title: '登记审核-审核参数',
//       },
//       '登记审核-异议参数': {
//         type: 'object',
//         properties: {
//           id: {
//             type: 'integer',
//             format: 'int64',
//             description: '登记数据id',
//           },
//         },
//         title: '登记审核-异议参数',
//       },
//       登记审核列表查询响应: {
//         type: 'object',
//         properties: {
//           assetsCode: {
//             type: 'string',
//             example: 12346579,
//             description: '登记编号',
//           },
//           assetsVersion: {
//             type: 'string',
//             example: 'V1.0',
//             description: '版本',
//           },
//           dataEquityType: {
//             type: 'integer',
//             format: 'int32',
//             example: 1,
//             description:
//               '数据权益类型 (1:数据资源持有权,2:数据加工使用权,3:数据产品经营权,4:数据知识产权)',
//           },
//           dataFeatureType: {
//             type: 'integer',
//             format: 'int32',
//             example: 1,
//             description:
//               '数据要素类型（null:全部，1：数据集，2：数据API，3：数据模型，4：数据报告，5：其他要素类型）',
//           },
//           enterpriseId: {
//             type: 'integer',
//             format: 'int64',
//             example: 10,
//             description: '登记主体Id',
//           },
//           enterpriseName: {
//             type: 'string',
//             example: '*******公司',
//             description: '登记主体',
//           },
//           id: {
//             type: 'integer',
//             format: 'int64',
//             example: 1,
//             description: '主键',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//             example: 1,
//             description: '所属公证处id',
//           },
//           notaryName: {
//             type: 'string',
//             example: 'AAA公证处',
//             description: '所属公证处',
//           },
//           orderAmount: {
//             type: 'number',
//             description: '订单金额（元）',
//           },
//           paymentStatus: {
//             type: 'integer',
//             format: 'int32',
//             example: 1,
//             description:
//               '支付状态（null:全部，0：待定价，1：待支付，3：支付失败，4：取消支付，5：已支付）',
//           },
//           registrationType: {
//             type: 'integer',
//             format: 'int32',
//             example: 1,
//             description:
//               '登记类型（1：首次登记，2：许可登记，3：转移登记，4：变更登记，5：注销登记，6：撤销登记请求，7：异议登记）',
//           },
//           status: {
//             type: 'integer',
//             format: 'int32',
//             example: 7,
//             description:
//               '登记状态（null:全部，6:待审核，7:审核驳回，8:审核不通过，9:审核通过，10:公示中，11:有异议，12:已撤销，13:已发证）',
//           },
//           submitAt: {
//             type: 'string',
//             format: 'date-time',
//             example: '2024-03-06 10:00:23',
//             description: '提交日期',
//           },
//           title: {
//             type: 'string',
//             example: '水电站信息',
//             description: '数据名称',
//           },
//         },
//         title: '登记审核列表查询响应',
//       },
//       '获取订单列表-参数': {
//         type: 'object',
//         properties: {
//           adminId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           current: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码',
//           },
//           endTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '结束时间',
//           },
//           evidenceType: {
//             type: 'integer',
//             format: 'int32',
//             description: '9添加赠送积分 15添加充值积分',
//           },
//           notaryId: {
//             type: 'integer',
//             format: 'int64',
//           },
//           operatorName: {
//             type: 'string',
//             description: '用户名',
//           },
//           orderId: {
//             type: 'string',
//             description: '订单号',
//           },
//           orderStatus: {
//             type: 'string',
//             description: '订单状态 SUCCESS 成功，WAITPAY 待支付 CLOSED关闭',
//           },
//           orderType: {
//             type: 'integer',
//             format: 'int32',
//             description: '1充值 2消费 3赠送',
//           },
//           pageSize: {
//             type: 'integer',
//             format: 'int32',
//             description: '页码大小',
//           },
//           payType: {
//             type: 'integer',
//             format: 'int32',
//             description: '付款渠道 0-支付宝 1-微信 2-积分支付 3-线下支付',
//           },
//           phone: {
//             type: 'string',
//             description: '手机号',
//           },
//           startTime: {
//             type: 'string',
//             format: 'date-time',
//             description: '开始时间',
//           },
//           transactionId: {
//             type: 'string',
//             description: '支付订单号',
//           },
//           userName: {
//             type: 'string',
//             description: '用户名',
//           },
//           userType: {
//             type: 'integer',
//             format: 'int32',
//             description: '用户类型 （0: 个人，1: 企业）',
//           },
//         },
//         title: '获取订单列表-参数',
//       },
//       返回结果基类: {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类',
//       },
//       '返回结果基类«AccountDetailBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«AccountDetailBean»',
//       },
//       '返回结果基类«ActiveDayStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«ActiveDayStatisticsBean»',
//       },
//       '返回结果基类«ActiveIncrGroupStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«ActiveIncrGroupStatisticsBean»',
//       },
//       '返回结果基类«ActiveMonthStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«ActiveMonthStatisticsBean»',
//       },
//       '返回结果基类«ActiveWeekStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«ActiveWeekStatisticsBean»',
//       },
//       '返回结果基类«AdminInfoBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«AdminInfoBean»',
//       },
//       '返回结果基类«AdminNotarizationInfoBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«AdminNotarizationInfoBean»',
//       },
//       '返回结果基类«AnnouncementCreateModifyBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«AnnouncementCreateModifyBean»',
//       },
//       '返回结果基类«AppVersionListBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«AppVersionListBean»',
//       },
//       '返回结果基类«ConsumerDayGroupStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«ConsumerDayGroupStatisticsBean»',
//       },
//       '返回结果基类«ConsumerStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«ConsumerStatisticsBean»',
//       },
//       '返回结果基类«EnforcerRecordBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«EnforcerRecordBean»',
//       },
//       '返回结果基类«FirstParkVo»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«FirstParkVo»',
//       },
//       '返回结果基类«HomePageGroupStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«HomePageGroupStatisticsBean»',
//       },
//       '返回结果基类«InvoiceDescBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«InvoiceDescBean»',
//       },
//       '返回结果基类«JSONObject»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«JSONObject»',
//       },
//       '返回结果基类«List«ActiveStatisticsBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«ActiveStatisticsBean»»',
//       },
//       '返回结果基类«List«AdminListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«AdminListBean»»',
//       },
//       '返回结果基类«List«BannerListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«BannerListBean»»',
//       },
//       '返回结果基类«List«InvoiceOrderBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«InvoiceOrderBean»»',
//       },
//       '返回结果基类«List«OpinionFeedbackListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«OpinionFeedbackListBean»»',
//       },
//       '返回结果基类«List«ParkTransInfoVo»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«ParkTransInfoVo»»',
//       },
//       '返回结果基类«List«PermissionListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«PermissionListBean»»',
//       },
//       '返回结果基类«List«RegionDTO»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«RegionDTO»»',
//       },
//       '返回结果基类«List«RoleListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«RoleListBean»»',
//       },
//       '返回结果基类«List«RolePermissionListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«RolePermissionListBean»»',
//       },
//       '返回结果基类«List«SiteListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«SiteListBean»»',
//       },
//       '返回结果基类«List«UserEntity»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«UserEntity»»',
//       },
//       '返回结果基类«List«string»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«string»»',
//       },
//       '返回结果基类«List«文件上传返回类»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«文件上传返回类»»',
//       },
//       '返回结果基类«List«枚举数据响应类»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«List«枚举数据响应类»»',
//       },
//       '返回结果基类«LoginBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«LoginBean»',
//       },
//       '返回结果基类«NotaryInfoBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«NotaryInfoBean»',
//       },
//       '返回结果基类«NotaryNameBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«NotaryNameBean»',
//       },
//       '返回结果基类«OfflinePayInfoBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«OfflinePayInfoBean»',
//       },
//       '返回结果基类«OlineAttGroupStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«OlineAttGroupStatisticsBean»',
//       },
//       '返回结果基类«OwnerEquityDetailVo»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«OwnerEquityDetailVo»',
//       },
//       '返回结果基类«PageInfo«AccountConsumerDetailBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«AccountConsumerDetailBean»»',
//       },
//       '返回结果基类«PageInfo«AdminListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«AdminListBean»»',
//       },
//       '返回结果基类«PageInfo«AdminNotarizationGetListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«AdminNotarizationGetListBean»»',
//       },
//       '返回结果基类«PageInfo«AnnouncementBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«AnnouncementBean»»',
//       },
//       '返回结果基类«PageInfo«ApiListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«ApiListBean»»',
//       },
//       '返回结果基类«PageInfo«AppVersionListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«AppVersionListBean»»',
//       },
//       '返回结果基类«PageInfo«AttestationFileDetailBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«AttestationFileDetailBean»»',
//       },
//       '返回结果基类«PageInfo«AttestationProcessDetailBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«AttestationProcessDetailBean»»',
//       },
//       '返回结果基类«PageInfo«AttestationUrlDetailBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«AttestationUrlDetailBean»»',
//       },
//       '返回结果基类«PageInfo«BindDeviceListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«BindDeviceListBean»»',
//       },
//       '返回结果基类«PageInfo«CommunityListVo»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«CommunityListVo»»',
//       },
//       '返回结果基类«PageInfo«DeductionBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«DeductionBean»»',
//       },
//       '返回结果基类«PageInfo«EnforcerRecordListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«EnforcerRecordListBean»»',
//       },
//       '返回结果基类«PageInfo«FeedbackListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«FeedbackListBean»»',
//       },
//       '返回结果基类«PageInfo«FirstParkVo»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«FirstParkVo»»',
//       },
//       '返回结果基类«PageInfo«InvioceListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«InvioceListBean»»',
//       },
//       '返回结果基类«PageInfo«InvitationDetailBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«InvitationDetailBean»»',
//       },
//       '返回结果基类«PageInfo«InvitationUserDto»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«InvitationUserDto»»',
//       },
//       '返回结果基类«PageInfo«NewsBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«NewsBean»»',
//       },
//       '返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«NotarizationGetDownloadTaskListBean»»',
//       },
//       '返回结果基类«PageInfo«NotarizationOrderAttestationGetListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title:
//           '返回结果基类«PageInfo«NotarizationOrderAttestationGetListBean»»',
//       },
//       '返回结果基类«PageInfo«NotaryListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«NotaryListBean»»',
//       },
//       '返回结果基类«PageInfo«OfflinePayListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«OfflinePayListBean»»',
//       },
//       '返回结果基类«PageInfo«OrderBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«OrderBean»»',
//       },
//       '返回结果基类«PageInfo«OwnerEquityPageVo»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«OwnerEquityPageVo»»',
//       },
//       '返回结果基类«PageInfo«ParkApproveListVo»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«ParkApproveListVo»»',
//       },
//       '返回结果基类«PageInfo«ParkTransListVo»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«ParkTransListVo»»',
//       },
//       '返回结果基类«PageInfo«ProcessingTask»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«ProcessingTask»»',
//       },
//       '返回结果基类«PageInfo«ProductListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«ProductListBean»»',
//       },
//       '返回结果基类«PageInfo«ProductNewsListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«ProductNewsListBean»»',
//       },
//       '返回结果基类«PageInfo«UserAccountDto»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«UserAccountDto»»',
//       },
//       '返回结果基类«PageInfo«UserListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«UserListBean»»',
//       },
//       '返回结果基类«PageInfo«UserLoginLogListBean»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«UserLoginLogListBean»»',
//       },
//       '返回结果基类«PageInfo«VoteQueryPageVo»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«VoteQueryPageVo»»',
//       },
//       '返回结果基类«PageInfo«登记审核列表查询响应»»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PageInfo«登记审核列表查询响应»»',
//       },
//       '返回结果基类«ParkApproveStatusVo»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«ParkApproveStatusVo»',
//       },
//       '返回结果基类«ParkTransInfoVo»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«ParkTransInfoVo»',
//       },
//       '返回结果基类«PreviewNewsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«PreviewNewsBean»',
//       },
//       '返回结果基类«ProductListBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«ProductListBean»',
//       },
//       '返回结果基类«RealDetailParam»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«RealDetailParam»',
//       },
//       '返回结果基类«SiteAttestationInfoBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«SiteAttestationInfoBean»',
//       },
//       '返回结果基类«StatisticHomePageVo»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«StatisticHomePageVo»',
//       },
//       '返回结果基类«TabCountVo»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«TabCountVo»',
//       },
//       '返回结果基类«UploadImgBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«UploadImgBean»',
//       },
//       '返回结果基类«UserFeatureGroupStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«UserFeatureGroupStatisticsBean»',
//       },
//       '返回结果基类«UserIncrGroupStatisticsBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«UserIncrGroupStatisticsBean»',
//       },
//       '返回结果基类«UserInfoBean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«UserInfoBean»',
//       },
//       '返回结果基类«VoteInfoVo»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«VoteInfoVo»',
//       },
//       '返回结果基类«VoteQueryDetailVo»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«VoteQueryDetailVo»',
//       },
//       '返回结果基类«VoteResultVo»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«VoteResultVo»',
//       },
//       '返回结果基类«boolean»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«boolean»',
//       },
//       '返回结果基类«string»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«string»',
//       },
//       '返回结果基类«文件上传返回类»': {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             description: '数据',
//           },
//           errorMessage: {
//             type: 'string',
//             description: '错误信息',
//           },
//           flag: {
//             type: 'boolean',
//             description: '成功标识',
//           },
//           statusCode: {
//             type: 'string',
//             description: '状态码',
//           },
//         },
//         title: '返回结果基类«文件上传返回类»',
//       },
//     },
//   };
// };

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

export async function startChat() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0]
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
