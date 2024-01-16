import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  SwaggerDocsResponse,
} from './definitions';
import { formatCurrency } from './utils';
import request from './request';

// request<SwaggerDocsResponse>({
//   url: swaggerAddress,
//   method: 'GET',
// });
export const fetchSwaggerDocs = (swaggerAddress: string) =>
  Promise.resolve({
    openapi: '3.0.1',
    info: {
      title: '标题：bank-enter后台管理系统_接口文档',
      description:
        '描述：用于管理集团旗下公司的人员信息,具体包括XXX,XXX模块...',
      version: '版本号: ${dataqin-vue-plus.version}',
    },
    servers: [
      {
        url: 'http://192.168.9.70',
        description: 'Generated server url',
      },
    ],
    security: [
      {
        apiKey: [],
      },
    ],
    tags: [
      {
        name: '测试树表Controller',
        description: '测试树表Controller',
      },
      {
        name: '测试单表Controller',
        description: '测试单表Controller',
      },
      {
        name: '系统-用户信息管理',
        description: '系统-用户信息管理',
      },
      {
        name: '系统-角色信息管理',
        description: '系统-角色信息管理',
      },
      {
        name: '系统-OSS对象存储',
        description: '系统-OSS对象存储',
      },
      {
        name: '系统-融资担保机构',
        description: '系统-融资担保机构',
      },
      {
        name: '系统-银行机构',
        description: '系统-银行机构',
      },
      {
        name: '管理银行用户',
        description: '管理银行用户',
      },
      {
        name: '借据录入',
        description: '借据录入',
      },
      {
        name: '代偿方案',
        description: '代偿方案',
      },
      {
        name: 'swagger3 用法示例',
        description: 'swagger3 用法示例',
      },
      {
        name: '测试批量方法',
        description: '测试批量方法',
      },
      {
        name: '任务信息',
        description: '任务信息',
      },
      {
        name: '审批流程配置',
        description: '审批流程配置',
      },
      {
        name: '政策信息',
        description: '政策信息',
      },
      {
        name: '文档管理信息',
        description: '文档管理信息',
      },
      {
        name: '管理-登录验证',
        description: '管理-登录验证',
      },
      {
        name: '操作日志记录',
        description: '操作日志记录',
      },
      {
        name: '系统访问记录',
        description: '系统访问记录',
      },
      {
        name: '业务录入',
        description: '业务录入',
      },
      {
        name: '解保录入',
        description: '解保录入',
      },
      {
        name: '测试数据脱敏控制器',
        description:
          '测试数据脱敏控制器\n <p>\n 默认管理员不过滤\n 需自行根据业务重写实现',
      },
      {
        name: '测试分布式锁的样例',
        description: '测试分布式锁的样例',
      },
      {
        name: 'Redis 发布订阅 演示案例',
        description: 'Redis 发布订阅 演示案例',
      },
      {
        name: '测试分布式限流样例',
        description: '测试分布式限流样例',
      },
      {
        name: '优先队列 演示案例',
        description:
          '优先队列 演示案例\n <p>\n 轻量级队列 重量级数据量 请使用 MQ\n <p>\n 集群测试通过 同一个消息只会被消费一次 做好事务补偿\n 集群测试流程 在其中一台发送数据 两端分别调用获取接口 一次获取一条',
      },
      {
        name: '延迟队列 演示案例',
        description:
          '延迟队列 演示案例\n <p>\n 轻量级队列 重量级数据量 请使用 MQ\n 例如: 创建订单30分钟后过期处理\n <p>\n 集群测试通过 同一个数据只会被消费一次 做好事务补偿\n 集群测试流程 两台集群分别开启订阅 在其中一台发送数据 观察接收消息的规律',
      },
      {
        name: '有界队列 演示案例',
        description:
          '有界队列 演示案例\n <p>\n 轻量级队列 重量级数据量 请使用 MQ\n <p>\n 集群测试通过 同一个数据只会被消费一次 做好事务补偿\n 集群测试流程 在其中一台发送数据 两端分别调用获取接口 一次获取一条',
      },
      {
        name: '邮件发送案例',
        description: '邮件发送案例',
      },
      {
        name: '测试国际化',
        description: '测试国际化',
      },
      {
        name: '测试Excel功能',
        description: '测试Excel功能',
      },
      {
        name: '测试数据库加解密功能',
        description: '测试数据库加解密功能',
      },
      {
        name: 'spring-cache 演示案例',
        description: 'spring-cache 演示案例',
      },
      {
        name: '转发数智平台字典接口',
        description: '转发数智平台字典接口',
      },
      {
        name: '首页展示接口',
        description: '首页展示接口',
      },
      {
        name: '产品方案相关接口',
        description: '产品方案相关接口',
      },
      {
        name: '业务录入-授信相关接口',
        description: '业务录入-授信相关接口',
      },
    ],
    paths: {
      '/demo/tree': {
        put: {
          tags: ['测试树表Controller'],
          summary: '修改测试树表',
          description: '修改测试树表',
          operationId: 'edit',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TestTreeBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['测试树表Controller'],
          summary: '新增测试树表',
          description: '新增测试树表',
          operationId: 'add',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TestTreeBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/demo': {
        put: {
          tags: ['测试单表Controller'],
          summary: '修改测试单表',
          description: '修改测试单表',
          operationId: 'edit_1',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TestDemoBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['测试单表Controller'],
          summary: '新增测试单表',
          description: '新增测试单表',
          operationId: 'add_1',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TestDemoBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user': {
        put: {
          tags: ['系统-用户信息管理'],
          summary: '修改用户',
          description: '修改用户',
          operationId: 'edit_2',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EditUserBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['系统-用户信息管理'],
          summary: '新增用户',
          description: '新增用户',
          operationId: 'add_4',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EditUserBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/updatePwd': {
        put: {
          tags: ['系统-用户信息管理'],
          summary: '修改密码',
          description: '修改密码',
          operationId: 'updatePwd',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdatePwdBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/updatePhone': {
        put: {
          tags: ['系统-用户信息管理'],
          summary: '修改手机号，第二步，校验新手机号验证码',
          description: '修改手机号，第二步，校验新手机号验证码',
          operationId: 'updatePhone',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    newPhone: {
                      type: 'string',
                    },
                    smsCode: {
                      type: 'string',
                    },
                  },
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/unlock': {
        put: {
          tags: ['系统-用户信息管理'],
          summary: '解锁',
          description: '解锁',
          operationId: 'unlock',
          parameters: [
            {
              name: 'userId',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/resetPwd': {
        put: {
          tags: ['系统-用户信息管理'],
          summary: '重置密码',
          description: '重置密码',
          operationId: 'resetPwd',
          parameters: [
            {
              name: 'userId',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/checkUserPhoneCode': {
        put: {
          tags: ['系统-用户信息管理'],
          summary: '修改手机号，第一步，校验原手机号接受到的验证码',
          description: '修改手机号，第一步，校验原手机号接受到的验证码',
          operationId: 'checkUserPhoneCode',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/role': {
        put: {
          tags: ['系统-角色信息管理'],
          summary: '修改保存角色',
          description: '修改保存角色',
          operationId: 'edit_3',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EditRoleBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['系统-角色信息管理'],
          summary: '新增角色',
          description: '新增角色',
          operationId: 'add_5',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EditRoleBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/oss': {
        put: {
          tags: ['系统-OSS对象存储'],
          summary: '修改系统-OSS对象存储',
          description: '修改系统-OSS对象存储',
          operationId: 'edit_4',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SysOssBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['系统-OSS对象存储'],
          summary: '新增系统-OSS对象存储',
          description: '新增系统-OSS对象存储',
          operationId: 'add_7',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SysOssBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/organization': {
        put: {
          tags: ['系统-融资担保机构'],
          summary: '设置担保机构管理员、担保机构关联的银行',
          description: '设置担保机构管理员、担保机构关联的银行',
          operationId: 'edit_5',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EditOrgAdminBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/bank': {
        put: {
          tags: ['系统-银行机构'],
          summary: '修改系统-银行机构',
          description: '修改系统-银行机构',
          operationId: 'edit_6',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/EditBankAdminBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/bank/user': {
        put: {
          tags: ['管理银行用户'],
          summary:
            '担保机构管理员更改关联银行机构用户非管理员用户状态（启用、停用）',
          description:
            '担保机构管理员更改关联银行机构用户非管理员用户状态（启用、停用）',
          operationId: 'updateStatus',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdateStatusBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt': {
        // put: {
        //   tags: ["借据录入"],
        //   summary: "修改借据录入",
        //   description: "修改借据录入",
        //   operationId: "edit_7",
        //   requestBody: {
        //     content: {
        //       "application/json": {
        //         schema: {
        //           $ref: "#/components/schemas/PrjLoanReceiptBo",
        //         },
        //       },
        //     },
        //     required: true,
        //   },
        //   responses: {
        //     "200": {
        //       description: "OK",
        //       content: {
        //         "*/*": {
        //           schema: {
        //             $ref: "#/components/schemas/RVoid",
        //           },
        //         },
        //       },
        //     },
        //   },
        // },
        post: {
          tags: ['借据录入'],
          summary: '新增/编辑借据录入',
          description: '新增/编辑借据录入',
          operationId: 'add_10',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PrjLoanReceiptBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RPrjLoanReceipt',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjReplace': {
        put: {
          tags: ['代偿方案'],
          summary: '修改代偿方案',
          description: '修改代偿方案',
          operationId: 'edit_8',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BuxPrjReplaceBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['代偿方案'],
          summary: '新增代偿方案',
          description: '新增代偿方案',
          operationId: 'add_11',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BuxPrjReplaceBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/swagger/demo/upload': {
        post: {
          tags: ['swagger3 用法示例'],
          summary: '上传请求\n 必须使用 @RequestPart 注解标注为文件',
          description: '上传请求\n 必须使用 @RequestPart 注解标注为文件',
          operationId: 'upload',
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  required: ['file'],
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      description: '文件',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/demo/importData': {
        post: {
          tags: ['测试单表Controller'],
          summary: '导入数据',
          description: '导入数据',
          operationId: 'importData',
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  required: ['file'],
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      description: '导入文件',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/demo/export': {
        post: {
          tags: ['测试单表Controller'],
          summary: '导出测试单表列表',
          description: '导出测试单表列表',
          operationId: 'export',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TestDemoBo',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/demo/batch/add': {
        post: {
          tags: ['测试批量方法'],
          summary:
            '新增批量方法 可完美替代 saveBatch 秒级插入上万数据 (对mysql负荷较大)\n ',
          description:
            '新增批量方法 可完美替代 saveBatch 秒级插入上万数据 (对mysql负荷较大)\n <p>\n 3.5.0 版本 增加 rewriteBatchedStatements=true 批处理参数 使 MP 原生批处理可以达到同样的速度',
          operationId: 'add_2',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/batch/addOrUpdate': {
        post: {
          tags: ['测试批量方法'],
          summary: '新增或更新 可完美替代 saveOrUpdateBatch 高性能\n ',
          description:
            '新增或更新 可完美替代 saveOrUpdateBatch 高性能\n <p>\n 3.5.0 版本 增加 rewriteBatchedStatements=true 批处理参数 使 MP 原生批处理可以达到同样的速度',
          operationId: 'addOrUpdate',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/status/sync': {
        post: {
          tags: ['任务信息'],
          summary: '接收直保状态变更接口',
          description: '接收直保状态变更接口',
          operationId: 'statusSync',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/StatusSyncVo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/revoke': {
        post: {
          tags: ['任务信息'],
          summary: '撤销',
          description: '撤销',
          operationId: 'revoke',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TaskApprovalBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/return': {
        post: {
          tags: ['任务信息'],
          summary: '退回',
          description: '退回',
          operationId: 'returnTask',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TaskApprovalBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/refuse': {
        post: {
          tags: ['任务信息'],
          summary: '否决',
          description: '否决',
          operationId: 'refuse',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TaskApprovalBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/batchResultExport': {
        post: {
          tags: ['任务信息'],
          summary: '导出 批量同意执行失败数据',
          description: '导出 批量同意执行失败数据',
          operationId: 'batchResultExport',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/api/bankEnter/task/approve': {
        post: {
          tags: ['任务信息'],
          summary: '同意',
          description: '同意',
          operationId: 'approve',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TaskApprovalBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/approveBatch': {
        post: {
          tags: ['任务信息'],
          summary: '批量同意',
          description: '批量同意',
          operationId: 'approveBatch',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  maxItems: 50,
                  minItems: 1,
                  type: 'array',
                  items: {
                    type: 'integer',
                    format: 'int64',
                  },
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RLong',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/workflow/save': {
        post: {
          tags: ['审批流程配置'],
          summary: '新增或修改流程配置',
          description: '新增或修改流程配置',
          operationId: 'add_3',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WorkflowConfigSaveBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/policy': {
        get: {
          tags: ['政策信息'],
          summary: '分页查询政策列表',
          description: '分页查询政策列表',
          operationId: 'pageList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysPolicyBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysPolicy',
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['政策信息'],
          summary: '新增政策',
          description: '新增政策',
          operationId: 'add_6',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SysPolicy',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/policy/update': {
        post: {
          tags: ['政策信息'],
          summary: '编辑政策',
          description: '编辑政策',
          operationId: 'update',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SysPolicy',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/policy/publish/{id}': {
        post: {
          tags: ['政策信息'],
          summary: '政策发布',
          description: '政策发布',
          operationId: 'chooseOnline',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/policy/offline/{id}': {
        post: {
          tags: ['政策信息'],
          summary: '政策下线',
          description: '政策下线',
          operationId: 'chooseOffline',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/oss/upload': {
        post: {
          tags: ['系统-OSS对象存储'],
          summary: '文件上传',
          description: '文件上传',
          operationId: 'uploadFile',
          parameters: [
            {
              name: 'file',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
                format: 'binary',
              },
            },
            {
              name: 'content-type',
              in: 'header',
              schema: {
                type: 'string',
                enum: ['multipart/form-data'],
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RSysOss',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/organization/syncOrg': {
        post: {
          tags: ['系统-融资担保机构'],
          summary: '同步担保机构信息',
          description: '同步担保机构信息',
          operationId: 'syncOrg',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/document': {
        get: {
          tags: ['文档管理信息'],
          summary: '分页查询文档列表',
          description: '分页查询文档列表',
          operationId: 'list_8',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysDocumentBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysDocumentVo',
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['文档管理信息'],
          summary: '新增文档',
          description: '新增文档',
          operationId: 'add_8',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SysDocument',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/document/publish/{id}': {
        post: {
          tags: ['文档管理信息'],
          summary: '根据id发布文档',
          description: '根据id发布文档',
          operationId: 'publish',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/document/offline/{id}': {
        post: {
          tags: ['文档管理信息'],
          summary: '根据id下线文档',
          description: '根据id下线文档',
          operationId: 'offline',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/bank/syncBank': {
        post: {
          tags: ['系统-银行机构'],
          summary: '同步银行信息',
          description: '同步银行信息',
          operationId: 'syncBank',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/smsLogin': {
        post: {
          tags: ['管理-登录验证'],
          summary: '短信登录',
          description: '短信登录',
          operationId: 'smsLogin',
          requestBody: {
            description: '登录信息',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SmsLoginBody',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: '结果',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RMapStringObject',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/monitor/operlog/export': {
        post: {
          tags: ['操作日志记录'],
          summary: '导出操作日志记录列表',
          description: '导出操作日志记录列表',
          operationId: 'export_1',
          parameters: [
            {
              name: 'operLog',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysOperLog',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/api/bankEnter/monitor/logininfor/export': {
        post: {
          tags: ['系统访问记录'],
          summary: '导出系统访问记录列表',
          description: '导出系统访问记录列表',
          operationId: 'export_2',
          parameters: [
            {
              name: 'logininfor',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysLoginLog',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/api/bankEnter/logout': {
        post: {
          tags: ['管理-登录验证'],
          summary: '退出登录',
          description: '退出登录',
          operationId: 'logout',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/login': {
        post: {
          tags: ['管理-登录验证'],
          summary: '登录方法',
          description: '登录方法',
          operationId: 'login',
          requestBody: {
            description: '登录信息',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginBody',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: '结果',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RMapStringObject',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/save': {
        post: {
          tags: ['业务录入'],
          summary: '业务录入（保存/提交/审批时修改）',
          description: '业务录入（保存/提交/审批时修改）',
          operationId: 'add_9',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InfoBuxPrjApplyBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListString',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/importExcel': {
        post: {
          tags: ['业务录入'],
          summary: '导入业务录入数据',
          description: '导入业务录入数据',
          operationId: 'importData_1',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RLong',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt/submit': {
        post: {
          tags: ['借据录入'],
          summary: '借据录入提交',
          description: '借据录入提交',
          operationId: 'submit',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PrjLoanReceiptSubmitBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt/importReceiptData': {
        post: {
          tags: ['借据录入'],
          summary: '导入借据录入',
          description: '导入借据录入',
          operationId: 'importReceiptData',
          parameters: [
            {
              name: 'resource',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PrjLoanReceiptBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RObject',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt/export': {
        post: {
          tags: ['借据录入'],
          summary: '导出借据录入列表',
          description: '导出借据录入列表',
          operationId: 'export_3',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PrjLoanReceiptBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt/batchSubmit': {
        post: {
          tags: ['借据录入'],
          summary: '借据录入批量提交',
          description: '借据录入批量提交',
          operationId: 'batchSubmit',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PrjLoanReceiptSubmitBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjReplace/export': {
        post: {
          tags: ['代偿方案'],
          summary: '导出代偿方案列表',
          description: '导出代偿方案列表',
          operationId: 'export_4',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/BuxPrjReplaceBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/submit': {
        post: {
          tags: ['解保录入'],
          summary: '提交解保录入（单个提交携带解保信息）',
          description: '提交解保录入（单个提交携带解保信息）',
          operationId: 'submit_1',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BuxPrjInsuredSubmitBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RBuxPrjInsuredSubmitVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/save': {
        post: {
          tags: ['解保录入'],
          summary: '保存解保录入',
          description: '保存解保录入',
          operationId: 'save',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BuxPrjInsuredSaveBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/remove': {
        post: {
          tags: ['解保录入'],
          summary: '删除解保录入',
          description: '删除解保录入',
          operationId: 'remove',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BuxPrjInsuredBatchSubmitBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/pushInsuredToBux': {
        post: {
          tags: ['解保录入'],
          summary: '模拟推送解保信息到直保系统',
          description: '模拟推送解保信息到直保系统',
          operationId: 'pushInsuredToBux',
          parameters: [
            {
              name: 'id',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/insuredCheck': {
        post: {
          tags: ['解保录入'],
          summary: '解保前置查询',
          description: '解保前置查询',
          operationId: 'insuredCheck',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BuxPrjInsuredCheckBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RPrjInsuredBuxResultVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/imp': {
        post: {
          tags: ['解保录入'],
          summary: '导入解保录入列表',
          description: '导入解保录入列表',
          operationId: 'imp',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  required: ['file'],
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RBuxPrjInsuredImpVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/batchSubmit': {
        post: {
          tags: ['解保录入'],
          summary: '批量提交解保录入',
          description: '批量提交解保录入',
          operationId: 'batchSubmit_1',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BuxPrjInsuredBatchSubmitBo',
                },
              },
            },
            required: true,
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RBuxPrjInsuredSubmitVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/bindOrgId/{organizationId}': {
        post: {
          tags: ['管理-登录验证'],
          summary: '绑定用户选择业务合作担保机构id',
          description: '绑定用户选择业务合作担保机构id',
          operationId: 'bindOrgId',
          parameters: [
            {
              name: 'organizationId',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: '用户信息',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/tree/{id}': {
        get: {
          tags: ['测试树表Controller'],
          summary: '获取测试树表详细信息',
          description: '获取测试树表详细信息',
          operationId: 'getInfo',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: '测试树ID',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RTestTreeVo',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/tree/list': {
        get: {
          tags: ['测试树表Controller'],
          summary: '查询测试树表列表',
          description: '查询测试树表列表',
          operationId: 'list',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TestTreeBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListTestTreeVo',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/tree/export': {
        get: {
          tags: ['测试树表Controller'],
          summary: '导出测试树表列表',
          description: '导出测试树表列表',
          operationId: 'export_5',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TestTreeBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/demo/sensitive/test': {
        get: {
          tags: ['测试数据脱敏控制器'],
          summary: '测试数据脱敏',
          description: '测试数据脱敏',
          operationId: 'test',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RTestSensitive',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/redisLock/testLock4j': {
        get: {
          tags: ['测试分布式锁的样例'],
          summary: '测试lock4j 注解',
          description: '测试lock4j 注解',
          operationId: 'testLock4j',
          parameters: [
            {
              name: 'key',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/redisLock/testLock4jLockTemplate': {
        get: {
          tags: ['测试分布式锁的样例'],
          summary: '测试lock4j 工具',
          description: '测试lock4j 工具',
          operationId: 'testLock4jLockTemplate',
          parameters: [
            {
              name: 'key',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/redis/pubsub/sub': {
        get: {
          tags: ['Redis 发布订阅 演示案例'],
          summary: '订阅消息',
          description: '订阅消息',
          operationId: 'sub',
          parameters: [
            {
              name: 'key',
              in: 'query',
              description: '通道Key',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/redis/pubsub/pub': {
        get: {
          tags: ['Redis 发布订阅 演示案例'],
          summary: '发布消息',
          description: '发布消息',
          operationId: 'pub',
          parameters: [
            {
              name: 'key',
              in: 'query',
              description: '通道Key',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'value',
              in: 'query',
              description: '发送内容',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/rateLimiter/testip': {
        get: {
          tags: ['测试分布式限流样例'],
          summary: '测试请求IP限流\n 同一IP请求受影响',
          description: '测试请求IP限流\n 同一IP请求受影响',
          operationId: 'testip',
          parameters: [
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/rateLimiter/testcluster': {
        get: {
          tags: ['测试分布式限流样例'],
          summary: '测试集群实例限流\n 启动两个后端服务互不影响',
          description: '测试集群实例限流\n 启动两个后端服务互不影响',
          operationId: 'testcluster',
          parameters: [
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/rateLimiter/test': {
        get: {
          tags: ['测试分布式限流样例'],
          summary: '测试全局限流\n 全局影响',
          description: '测试全局限流\n 全局影响',
          operationId: 'test_1',
          parameters: [
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/rateLimiter/testObj': {
        get: {
          tags: ['测试分布式限流样例'],
          summary:
            '测试请求IP限流(key基于参数获取)\n 同一IP请求受影响\n\n 简单变量获取 #变量 复杂表达式 #{#变量 != 1 ? 1 : 0}',
          description:
            '测试请求IP限流(key基于参数获取)\n 同一IP请求受影响\n\n 简单变量获取 #变量 复杂表达式 #{#变量 != 1 ? 1 : 0}',
          operationId: 'testObj',
          parameters: [
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/priority/remove': {
        get: {
          tags: ['优先队列 演示案例'],
          summary: '删除队列数据',
          description: '删除队列数据',
          operationId: 'remove_1',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'name',
              in: 'query',
              description: '对象名',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'orderNum',
              in: 'query',
              description: '排序号',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/priority/get': {
        get: {
          tags: ['优先队列 演示案例'],
          summary: '获取队列数据',
          description: '获取队列数据',
          operationId: 'get',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/priority/add': {
        get: {
          tags: ['优先队列 演示案例'],
          summary: '添加队列数据',
          description: '添加队列数据',
          operationId: 'add_12',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/delayed/subscribe': {
        get: {
          tags: ['延迟队列 演示案例'],
          summary: '订阅队列',
          description: '订阅队列',
          operationId: 'subscribe',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/delayed/remove': {
        get: {
          tags: ['延迟队列 演示案例'],
          summary: '删除队列数据',
          description: '删除队列数据',
          operationId: 'remove_2',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'orderNum',
              in: 'query',
              description: '订单号',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/delayed/destroy': {
        get: {
          tags: ['延迟队列 演示案例'],
          summary: '销毁队列',
          description: '销毁队列',
          operationId: 'destroy',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/delayed/add': {
        get: {
          tags: ['延迟队列 演示案例'],
          summary: '添加队列数据',
          description: '添加队列数据',
          operationId: 'add_13',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'orderNum',
              in: 'query',
              description: '订单号',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'time',
              in: 'query',
              description: '延迟时间(秒)',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/bounded/remove': {
        get: {
          tags: ['有界队列 演示案例'],
          summary: '删除队列数据',
          description: '删除队列数据',
          operationId: 'remove_3',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/bounded/get': {
        get: {
          tags: ['有界队列 演示案例'],
          summary: '获取队列数据',
          description: '获取队列数据',
          operationId: 'get_1',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/queue/bounded/add': {
        get: {
          tags: ['有界队列 演示案例'],
          summary: '添加队列数据',
          description: '添加队列数据',
          operationId: 'add_14',
          parameters: [
            {
              name: 'queueName',
              in: 'query',
              description: '队列名',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'capacity',
              in: 'query',
              description: '容量',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/mail/sendSimpleMessage': {
        get: {
          tags: ['邮件发送案例'],
          summary: '发送邮件',
          description: '发送邮件',
          operationId: 'sendSimpleMessage',
          parameters: [
            {
              name: 'to',
              in: 'query',
              description: '接收人',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'subject',
              in: 'query',
              description: '标题',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'text',
              in: 'query',
              description: '内容',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/mail/sendMessageWithAttachment': {
        get: {
          tags: ['邮件发送案例'],
          summary: '发送邮件（带附件）',
          description: '发送邮件（带附件）',
          operationId: 'sendMessageWithAttachment',
          parameters: [
            {
              name: 'to',
              in: 'query',
              description: '接收人',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'subject',
              in: 'query',
              description: '标题',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'text',
              in: 'query',
              description: '内容',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'filePath',
              in: 'query',
              description: '附件路径',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/i18n': {
        get: {
          tags: ['测试国际化'],
          summary: '通过code获取国际化内容\n code为 messages',
          description:
            '通过code获取国际化内容\n code为 messages.properties 中的 key\n <p>\n 测试使用 user.register.success',
          operationId: 'get_2',
          parameters: [
            {
              name: 'code',
              in: 'query',
              description: '国际化code',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/i18n/test2': {
        get: {
          tags: ['测试国际化'],
          summary: 'Bean 校验国际化\n 不传值 分别查看异常返回\n ',
          description:
            'Bean 校验国际化\n 不传值 分别查看异常返回\n <p>\n 测试使用 not.null',
          operationId: 'test2',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TestI18nBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RTestI18nBo',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/i18n/test1': {
        get: {
          tags: ['测试国际化'],
          summary: 'Validator 校验国际化\n 不传值 分别查看异常返回\n ',
          description:
            'Validator 校验国际化\n 不传值 分别查看异常返回\n <p>\n 测试使用 not.null',
          operationId: 'test1',
          parameters: [
            {
              name: 'str',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/excel/exportTemplateOne': {
        get: {
          tags: ['测试Excel功能'],
          summary: '单列表多数据',
          description: '单列表多数据',
          operationId: 'exportTemplateOne',
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/demo/excel/exportTemplateMuliti': {
        get: {
          tags: ['测试Excel功能'],
          summary: '多列表多数据',
          description: '多列表多数据',
          operationId: 'exportTemplateMuliti',
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/demo/encrypt': {
        get: {
          tags: ['测试数据库加解密功能'],
          summary: '测试数据库加解密',
          description: '测试数据库加解密',
          operationId: 'test_2',
          parameters: [
            {
              name: 'key',
              in: 'query',
              description: '测试key',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'value',
              in: 'query',
              description: '测试value',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RMapStringTestDemoEncrypt',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/demo/{id}': {
        get: {
          tags: ['测试单表Controller'],
          summary: '获取测试单表详细信息',
          description: '获取测试单表详细信息',
          operationId: 'getInfo_1',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: '测试ID',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RTestDemoVo',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/demo/page': {
        get: {
          tags: ['测试单表Controller'],
          summary: '自定义分页查询',
          description: '自定义分页查询',
          operationId: 'page',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TestDemoBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoTestDemoVo',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/demo/list': {
        get: {
          tags: ['测试单表Controller'],
          summary: '查询测试单表列表',
          description: '查询测试单表列表',
          operationId: 'list_1',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TestDemoBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoTestDemoVo',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/cache/test6': {
        get: {
          tags: ['spring-cache 演示案例'],
          summary:
            '测试设置过期时间\n 手动设置过期时间10秒\n 11秒后获取 判断是否相等',
          description:
            '测试设置过期时间\n 手动设置过期时间10秒\n 11秒后获取 判断是否相等',
          operationId: 'test6',
          parameters: [
            {
              name: 'key',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RBoolean',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/cache/test3': {
        get: {
          tags: ['spring-cache 演示案例'],
          summary: '测试 @CacheEvict\n ',
          description:
            '测试 @CacheEvict\n <p>\n 使用了CacheEvict注解的方法,会清空指定缓存\n 「一般用在删除的方法上」\n <p>\n cacheNames 命名规则 查看 {@link CacheNames CacheNames} 注释 支持多参数',
          operationId: 'test3',
          parameters: [
            {
              name: 'key',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/cache/test2': {
        get: {
          tags: ['spring-cache 演示案例'],
          summary: '测试 @CachePut\n ',
          description:
            '测试 @CachePut\n <p>\n 加了@CachePut注解的方法,会把方法的返回值put到缓存里面缓存起来,供其它地方使用\n 它「通常用在新增或者实时更新方法上」\n <p>\n cacheNames 命名规则 查看 {@link CacheNames CacheNames} 注释 支持多参数',
          operationId: 'test2_1',
          parameters: [
            {
              name: 'key',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/cache/test1': {
        get: {
          tags: ['spring-cache 演示案例'],
          summary: '测试 @Cacheable\n ',
          description:
            '测试 @Cacheable\n <p>\n 表示这个方法有了缓存的功能,方法的返回值会被缓存下来\n 下一次调用该方法前,会去检查是否缓存中已经有值\n 如果有就直接返回,不调用方法\n 如果没有,就调用方法,然后把结果缓存起来\n 这个注解「一般用在查询方法上」\n <p>\n 重点说明: 缓存注解严谨与其他筛选数据功能一起使用\n 例如: 数据权限注解 会造成 缓存击穿 与 数据不一致问题\n <p>\n cacheNames 命名规则 查看 {@link CacheNames CacheNames} 注释 支持多参数',
          operationId: 'test1_1',
          parameters: [
            {
              name: 'key',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'value',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RString',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/toDoPageList': {
        get: {
          tags: ['任务信息'],
          summary: '查询待办任务信息列表',
          description: '查询待办任务信息列表',
          operationId: 'toDoPageList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TaskInfoQueryBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoTaskInfoListVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/initiatePageList': {
        get: {
          tags: ['任务信息'],
          summary: '查询本人发起任务信息列表',
          description: '查询本人发起任务信息列表',
          operationId: 'initiatePageList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TaskInfoQueryBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoTaskInfoListVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/check/info': {
        get: {
          tags: ['任务信息'],
          summary: '查询业务检验信息',
          description: '查询业务检验信息',
          operationId: 'checkInfo',
          parameters: [
            {
              name: 'taskCheckInfoBo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TaskCheckInfoBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RTaskCheckInfo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/batchResult': {
        get: {
          tags: ['任务信息'],
          summary: '批量同意结果查询',
          description: '批量同意结果查询',
          operationId: 'approveBatch_1',
          parameters: [
            {
              name: 'id',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RBatchResultVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/approvedPageList': {
        get: {
          tags: ['任务信息'],
          summary: '查询已办任务信息列表',
          description: '查询已办任务信息列表',
          operationId: 'approvedPageList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TaskInfoQueryBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoTaskInfoListVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/task/approvalRecordPageList': {
        get: {
          tags: ['任务信息'],
          summary: '查询任务审批记录列表',
          description: '查询任务审批记录列表',
          operationId: 'approvalRecordPageList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/TaskApprovalRecordBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoTaskApprovalRecordVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/workflow/nodeList': {
        get: {
          tags: ['审批流程配置'],
          summary: '查询流程节点列表接口',
          description: '查询流程节点列表接口',
          operationId: 'nodeList',
          parameters: [
            {
              name: 'workflowConfigId',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListWorkflowNodeConfigVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/workflow/list': {
        get: {
          tags: ['审批流程配置'],
          summary: '查询审批流程列表接口（分页）',
          description: '查询审批流程列表接口（分页）',
          operationId: 'list_2',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/WorkflowConfigGetBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoWorkflowConfigVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/{userId}': {
        get: {
          tags: ['系统-用户信息管理'],
          summary: '根据用户编号获取详细信息',
          description: '根据用户编号获取详细信息',
          operationId: 'getInfo_2',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              description: '用户ID',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RSysUser',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/roleList': {
        get: {
          tags: ['系统-用户信息管理'],
          summary: '获取用户角色列表',
          description: '获取用户角色列表',
          operationId: 'roleList',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListSysRole',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/list': {
        get: {
          tags: ['系统-用户信息管理'],
          summary: '获取用户列表',
          description: '获取用户列表',
          operationId: 'list_3',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              description: '列表页查询信息',
              required: true,
              schema: {
                $ref: '#/components/schemas/QuerySysUserBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysUserVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/bankList': {
        get: {
          tags: ['系统-用户信息管理'],
          summary: '获取用户银行机构列表',
          description: '获取用户银行机构列表',
          operationId: 'bankList',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListSysBank',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/adminList': {
        get: {
          tags: ['系统-用户信息管理'],
          summary: '获取管理员用户列表',
          description: '获取管理员用户列表',
          operationId: 'adminList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              description: '列表页查询信息',
              required: true,
              schema: {
                $ref: '#/components/schemas/QuerySysUserBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysUser',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/role/{roleId}': {
        get: {
          tags: ['系统-角色信息管理'],
          summary: '根据角色编号获取详细信息',
          description: '根据角色编号获取详细信息',
          operationId: 'getInfo_3',
          parameters: [
            {
              name: 'roleId',
              in: 'path',
              description: '角色ID',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RSysRole',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/role/list': {
        get: {
          tags: ['系统-角色信息管理'],
          summary: '获取角色信息列表',
          description: '获取角色信息列表',
          operationId: 'list_4',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/QueryRoleBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysRole',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/role/getRoleListByUser': {
        get: {
          tags: ['系统-角色信息管理'],
          summary: '查询当前用户所在机构',
          description: '查询当前用户所在机构',
          operationId: 'getRoleListByUser',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListSysRole',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/policy/{id}': {
        get: {
          tags: ['政策信息'],
          summary: '根据id查询政策',
          description: '根据id查询政策',
          operationId: 'search',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RSysPolicy',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/oss/{ossId}': {
        get: {
          tags: ['系统-OSS对象存储'],
          summary: '获取系统-OSS对象存储详细信息',
          description: '获取系统-OSS对象存储详细信息',
          operationId: 'getInfo_4',
          parameters: [
            {
              name: 'ossId',
              in: 'path',
              description: '主键',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RSysOssVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/oss/list': {
        get: {
          tags: ['系统-OSS对象存储'],
          summary: '查询系统-OSS对象存储列表',
          description: '查询系统-OSS对象存储列表',
          operationId: 'list_5',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysOssBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysOssVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/oss/list/{ids}': {
        get: {
          tags: ['系统-OSS对象存储'],
          summary: '查询oss列表',
          description: '查询oss列表',
          operationId: 'list_6',
          parameters: [
            {
              name: 'ids',
              in: 'path',
              description: 'ids',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListSysOss',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/oss/download': {
        get: {
          tags: ['系统-OSS对象存储'],
          summary: '文件下载',
          description: '文件下载',
          operationId: 'download',
          parameters: [
            {
              name: 'fileId',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/api/bankEnter/system/organization/{organizationId}': {
        get: {
          tags: ['系统-融资担保机构'],
          summary: '获取融资担保机构详细信息',
          description: '获取融资担保机构详细信息',
          operationId: 'getInfo_5',
          parameters: [
            {
              name: 'organizationId',
              in: 'path',
              description: '主键',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RSysOrgInfoVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/organization/relationBankList/{organizationId}': {
        get: {
          tags: ['系统-融资担保机构'],
          summary: '获取担保机构关联的银行机构列表',
          description: '获取担保机构关联的银行机构列表',
          operationId: 'relationBankList',
          parameters: [
            {
              name: 'organizationId',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListSysBankNodeVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/organization/organizationTree': {
        get: {
          tags: ['系统-融资担保机构'],
          summary: '获取担保机构树列表',
          description: '获取担保机构树列表',
          operationId: 'organizationTree',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysOrganizationBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListTreeLong',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/organization/list': {
        get: {
          tags: ['系统-融资担保机构'],
          summary: '查询融资担保机构列表',
          description: '查询融资担保机构列表',
          operationId: 'list_7',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/QueryOrgBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysOrgNodeVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/document/{id}': {
        get: {
          tags: ['文档管理信息'],
          summary: '根据id查询文档详情',
          description: '根据id查询文档详情',
          operationId: 'search_1',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RSysDocumentVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/dictManage/getDictDetailMap': {
        get: {
          tags: ['转发数智平台字典接口'],
          summary: '调用数智-查询字典',
          description: '调用数智-查询字典',
          operationId: 'getDictDetailMap',
          parameters: [
            {
              name: 'dictName',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RObject',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/dictManage/getAreas': {
        get: {
          tags: ['转发数智平台字典接口'],
          summary: '调用数智-查询区域',
          description: '调用数智-查询区域',
          operationId: 'getAreas',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RObject',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/bank/{bankId}': {
        get: {
          tags: ['系统-银行机构'],
          summary: '获取系统-银行机构详细信息',
          description: '获取系统-银行机构详细信息',
          operationId: 'getInfo_6',
          parameters: [
            {
              name: 'bankId',
              in: 'path',
              description: '主键',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RSysBankNodeVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/bank/user/relationList': {
        get: {
          tags: ['管理银行用户'],
          summary: '担保机构管理员查看关联银行机构非管理员列表',
          description: '担保机构管理员查看关联银行机构非管理员列表',
          operationId: 'relationList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/QuerySysUserBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysUserVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/bank/list': {
        get: {
          tags: ['系统-银行机构'],
          summary: '查询系统-银行机构列表',
          description: '查询系统-银行机构列表',
          operationId: 'list_9',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/QueryBankBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysBankNodeVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/bank/list/{bankId}': {
        get: {
          tags: ['系统-银行机构'],
          summary: '根据传入银行id，返回所有银行体系（树形结构）',
          description: '根据传入银行id，返回所有银行体系（树形结构）',
          operationId: 'listByBankId',
          parameters: [
            {
              name: 'bankId',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListSysBankNodeVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/sendPhoneCode': {
        get: {
          tags: ['管理-登录验证'],
          summary: '发送短信',
          description: '发送短信',
          operationId: 'sendPhoneCode',
          parameters: [
            {
              name: 'phone',
              in: 'query',
              description: '电话号',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'templateCode',
              in: 'query',
              description:
                '短信模板 (0登录 1修改密码 2修改手机号-第一步 3修改手机号-第二步)',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RObject',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/relationOrgList/{bankId}': {
        get: {
          tags: ['管理-登录验证'],
          summary: '获取银行机构关联的担保机构列表',
          description: '获取银行机构关联的担保机构列表',
          operationId: 'relationOrgList',
          parameters: [
            {
              name: 'bankId',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListSysOrganization',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/monitor/operlog/list': {
        get: {
          tags: ['操作日志记录'],
          summary: '获取操作日志记录列表',
          description: '获取操作日志记录列表',
          operationId: 'list_10',
          parameters: [
            {
              name: 'operLog',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysOperLog',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysOperLog',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/monitor/logininfor/list': {
        get: {
          tags: ['系统访问记录'],
          summary: '获取系统访问记录列表',
          description: '获取系统访问记录列表',
          operationId: 'list_11',
          parameters: [
            {
              name: 'logininfor',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysLoginLog',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysLoginLog',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/home/product/list': {
        get: {
          tags: ['首页展示接口'],
          summary: '首页产品中心列表',
          description: '首页产品中心列表',
          operationId: 'productList',
          parameters: [
            {
              name: 'productName',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'current',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
            {
              name: 'pageSize',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RObject',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/home/policy/list': {
        get: {
          tags: ['首页展示接口'],
          summary: '首页政策列表',
          description: '首页政策列表',
          operationId: 'policyList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysPolicyBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysPolicy',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/home/document/list': {
        get: {
          tags: ['首页展示接口'],
          summary: '首页文件下载列表',
          description: '首页文件下载列表',
          operationId: 'documentList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/SysDocumentBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoSysDocumentVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/getInfo': {
        get: {
          tags: ['管理-登录验证'],
          summary: '获取用户信息',
          description: '获取用户信息',
          operationId: 'getInfo_7',
          responses: {
            '200': {
              description: '用户信息',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RLoginUser',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/productScheme/template': {
        get: {
          tags: ['产品方案相关接口'],
          summary: '产品模版列表查询接口',
          description: '产品模版列表查询接口',
          operationId: 'template',
          parameters: [
            {
              name: 'tempTypeCoder',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListBuxTemplateTableVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/productScheme/list': {
        get: {
          tags: ['产品方案相关接口'],
          summary: '合作产品方案列表查询接口',
          description: '合作产品方案列表查询接口',
          operationId: 'list_12',
          parameters: [
            {
              name: 'productSchemeName',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoInfoProductSchemeListVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/productScheme/getOne': {
        get: {
          tags: ['产品方案相关接口'],
          summary: '合作产品方案列表查询接口',
          description: '合作产品方案列表查询接口',
          operationId: 'list_13',
          parameters: [
            {
              name: 'productSchemeName',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
            {
              name: 'productCoder',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RInfoProductSchemeListVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proCreditApply/template': {
        get: {
          tags: ['业务录入-授信相关接口'],
          summary: '授信模版列表查询接口',
          description: '授信模版列表查询接口',
          operationId: 'template_1',
          parameters: [
            {
              name: 'clientUserBo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/ClientUserBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListBuxTemplateTableVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/{id}': {
        get: {
          tags: ['业务录入'],
          summary: '获取业务录入详细信息',
          description: '获取业务录入详细信息',
          operationId: 'getInfo_8',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: '主键',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RInfoBuxPrjApplyVo',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['业务录入'],
          summary: '删除单个业务录入',
          description: '删除单个业务录入',
          operationId: 'removeById',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: '主键',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/template/download': {
        get: {
          tags: ['业务录入'],
          summary: '业务录入模版下载',
          description: '业务录入模版下载',
          operationId: 'templateDownload',
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/pageList': {
        get: {
          tags: ['业务录入'],
          summary: '查询业务录入列表',
          description: '查询业务录入列表',
          operationId: 'list_14',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PrjApplyQueryBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoInfoBuxPrjApplyVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/originalLoanReceiptList': {
        get: {
          tags: ['业务录入'],
          summary: '债务人原业务信息及借据信息列表查询',
          description: '债务人原业务信息及借据信息列表查询',
          operationId: 'originalLoanReceiptList',
          parameters: [
            {
              name: 'loanContractCodeList',
              in: 'query',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RBuxOriginLoanSumVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/originalBizList': {
        get: {
          tags: ['业务录入'],
          summary: '根据条件查询原业务列表信息',
          description: '根据条件查询原业务列表信息',
          operationId: 'originalLoanReceiptList_1',
          parameters: [
            {
              name: 'infoBuxOriginLoanBo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/InfoBuxOriginLoanBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListInfoBuxOriginLoanVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/initApply': {
        get: {
          tags: ['业务录入'],
          summary: '业务录入-初始化信息接口',
          description: '业务录入-初始化信息接口',
          operationId: 'initApply',
          parameters: [
            {
              name: 'clientUserBo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/ClientUserBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RInfoBuxPrjApplyInitVO',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/contractTemplate/list': {
        get: {
          tags: ['业务录入'],
          summary: '获取法律文件模板',
          description: '获取法律文件模板',
          operationId: 'templateList',
          parameters: [
            {
              name: 'legalTemplateBo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/LegalTemplateBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListLegalTemplateVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/proApply/calPremium': {
        get: {
          tags: ['业务录入'],
          summary: '计算保费接口',
          description: '计算保费接口',
          operationId: 'initApply_1',
          parameters: [
            {
              name: 'calPremiumBo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/CalPremiumBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RBigDecimal',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt/{id}': {
        get: {
          tags: ['借据录入'],
          summary: '获取借据录入详细信息',
          description: '获取借据录入详细信息',
          operationId: 'getInfo_9',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: '主键',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RPrjLoanReceiptVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt/template/download': {
        get: {
          tags: ['借据录入'],
          summary: '借据录入模版下载',
          description: '借据录入模版下载',
          operationId: 'templateDownload_1',
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt/list': {
        get: {
          tags: ['借据录入'],
          summary: '查询借据录入列表',
          description: '查询借据录入列表',
          operationId: 'list_15',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PrjLoanReceiptBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoPrjLoanReceipt',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt/getLoanContractList': {
        get: {
          tags: ['借据录入'],
          summary: '获取借据相关信息',
          description: '获取借据相关信息',
          operationId: 'getLoanContractList',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/BuxPrjLoanReceiptBo',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RListBuxPrjLoanReceiptDto',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjReplace/{id}': {
        get: {
          tags: ['代偿方案'],
          summary: '获取代偿方案详细信息',
          description: '获取代偿方案详细信息',
          operationId: 'getInfo_10',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: '主键',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RBuxPrjReplaceVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjReplace/list': {
        get: {
          tags: ['代偿方案'],
          summary: '查询代偿方案列表',
          description: '查询代偿方案列表',
          operationId: 'list_16',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/BuxPrjReplaceBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoBuxPrjReplaceVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/{id}': {
        get: {
          tags: ['解保录入'],
          summary: '获取解保录入详细信息',
          description: '获取解保录入详细信息',
          operationId: 'getInfo_11',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: '主键',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RBuxPrjInsuredVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/list': {
        get: {
          tags: ['解保录入'],
          summary: '查询解保录入分页列表',
          description: '查询解保录入分页列表',
          operationId: 'list_17',
          parameters: [
            {
              name: 'bo',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/BuxPrjInsuredPageListBo',
              },
            },
            {
              name: 'pageQuery',
              in: 'query',
              required: true,
              schema: {
                $ref: '#/components/schemas/PageQuery',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/TableDataInfoBuxPrjInsuredVo',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/downloadSubmitErrorInfo': {
        get: {
          tags: ['解保录入'],
          summary: '下载提交错误信息',
          description: '下载提交错误信息',
          operationId: 'downloadSubmitErrorInfo',
          parameters: [
            {
              name: 'recordId',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjInsured/downloadImportErrorInfo': {
        get: {
          tags: ['解保录入'],
          summary: '下载导入错误信息',
          description: '下载导入错误信息',
          operationId: 'downloadImportErrorInfo',
          parameters: [
            {
              name: 'recordId',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
      },
      '/demo/tree/{ids}': {
        delete: {
          tags: ['测试树表Controller'],
          summary: '删除测试树表',
          description: '删除测试树表',
          operationId: 'remove_4',
          parameters: [
            {
              name: 'ids',
              in: 'path',
              description: '测试树ID串',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/demo/{ids}': {
        delete: {
          tags: ['测试单表Controller'],
          summary: '删除测试单表',
          description: '删除测试单表',
          operationId: 'remove_5',
          parameters: [
            {
              name: 'ids',
              in: 'path',
              description: '测试ID串',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/demo/batch': {
        delete: {
          tags: ['测试批量方法'],
          summary: '删除批量方法',
          description: '删除批量方法',
          operationId: 'remove_6',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/user/{userIds}': {
        delete: {
          tags: ['系统-用户信息管理'],
          summary: '删除用户',
          description: '删除用户',
          operationId: 'remove_7',
          parameters: [
            {
              name: 'userIds',
              in: 'path',
              description: '角色ID串',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/role/{roleIds}': {
        delete: {
          tags: ['系统-角色信息管理'],
          summary: '删除角色',
          description: '删除角色',
          operationId: 'remove_8',
          parameters: [
            {
              name: 'roleIds',
              in: 'path',
              description: '角色ID串',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/policy/{ids}': {
        delete: {
          tags: ['政策信息'],
          summary: '删除政策',
          description: '删除政策',
          operationId: 'delete',
          parameters: [
            {
              name: 'ids',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/oss/{ossIds}': {
        delete: {
          tags: ['系统-OSS对象存储'],
          summary: '删除系统-OSS对象存储',
          description: '删除系统-OSS对象存储',
          operationId: 'remove_9',
          parameters: [
            {
              name: 'ossIds',
              in: 'path',
              description: '主键串',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/system/document/{ids}': {
        delete: {
          tags: ['文档管理信息'],
          summary: '根据id删除文档',
          description: '根据id删除文档',
          operationId: 'deleteById',
          parameters: [
            {
              name: 'ids',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int64',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/monitor/operlog/{operIds}': {
        delete: {
          tags: ['操作日志记录'],
          summary: '批量删除操作日志记录',
          description: '批量删除操作日志记录',
          operationId: 'remove_10',
          parameters: [
            {
              name: 'operIds',
              in: 'path',
              description: '日志ids',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/monitor/operlog/clean': {
        delete: {
          tags: ['操作日志记录'],
          summary: '清理操作日志记录',
          description: '清理操作日志记录',
          operationId: 'clean',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/monitor/logininfor/{infoIds}': {
        delete: {
          tags: ['系统访问记录'],
          summary: '批量删除登录日志',
          description: '批量删除登录日志',
          operationId: 'remove_11',
          parameters: [
            {
              name: 'infoIds',
              in: 'path',
              description: '日志ids',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/monitor/logininfor/clean': {
        delete: {
          tags: ['系统访问记录'],
          summary: '清理系统访问记录',
          description: '清理系统访问记录',
          operationId: 'clean_1',
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/prjLoanReceipt/{ids}': {
        delete: {
          tags: ['借据录入'],
          summary: '删除借据录入',
          description: '删除借据录入',
          operationId: 'remove_12',
          parameters: [
            {
              name: 'ids',
              in: 'path',
              description: '主键串',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
      '/api/bankEnter/business/buxPrjReplace/{ids}': {
        delete: {
          tags: ['代偿方案'],
          summary: '删除代偿方案',
          description: '删除代偿方案',
          operationId: 'remove_13',
          parameters: [
            {
              name: 'ids',
              in: 'path',
              description: '主键串',
              required: true,
              schema: {
                type: 'array',
                items: {
                  type: 'integer',
                  format: 'int64',
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                '*/*': {
                  schema: {
                    $ref: '#/components/schemas/RVoid',
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        TestTreeBo: {
          required: ['deptId', 'id', 'treeName', 'userId'],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            parentName: {
              type: 'string',
              description: '父菜单名称',
            },
            parentId: {
              type: 'integer',
              description: '父菜单ID',
              format: 'int64',
            },
            children: {
              type: 'array',
              description: '子部门',
              items: {
                $ref: '#/components/schemas/TestTreeBo',
              },
            },
            id: {
              type: 'integer',
              description: '主键',
              format: 'int64',
            },
            deptId: {
              type: 'integer',
              description: '部门id',
              format: 'int64',
            },
            userId: {
              type: 'integer',
              description: '用户id',
              format: 'int64',
            },
            treeName: {
              type: 'string',
              description: '树节点名',
            },
          },
          description: '测试树表业务对象 test_tree',
        },
        RVoid: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'object',
            },
          },
          description: '响应信息主体',
        },
        TestDemoBo: {
          required: ['deptId', 'id', 'orderNum', 'testKey', 'userId', 'value'],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: '主键',
              format: 'int64',
            },
            deptId: {
              type: 'integer',
              description: '部门id',
              format: 'int64',
            },
            userId: {
              type: 'integer',
              description: '用户id',
              format: 'int64',
            },
            orderNum: {
              type: 'integer',
              description: '排序号',
              format: 'int32',
            },
            testKey: {
              type: 'string',
              description: 'key键',
            },
            value: {
              type: 'string',
              description: '值',
            },
          },
          description: '测试单表业务对象 test_demo',
        },
        EditUserBo: {
          required: [
            'deptName',
            'phoneNumber',
            'status',
            'userName',
            'workNumber',
          ],
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              description: '用户ID',
              format: 'int64',
            },
            userName: {
              maxLength: 50,
              minLength: 0,
              type: 'string',
              description: '用户姓名',
            },
            idNumber: {
              type: 'string',
              description: '身份证号',
            },
            phoneNumber: {
              type: 'string',
              description: '手机号码',
            },
            institutionId: {
              type: 'integer',
              description: '机构ID（担保机构、银行机构）',
              format: 'int64',
            },
            deptName: {
              maxLength: 50,
              minLength: 0,
              type: 'string',
              description: '部门名称',
            },
            position: {
              type: 'string',
              description: '职位',
            },
            workNumber: {
              maxLength: 50,
              minLength: 0,
              type: 'string',
              description: '工号',
            },
            email: {
              maxLength: 50,
              minLength: 0,
              type: 'string',
              description: '邮箱',
            },
            status: {
              type: 'integer',
              description: '帐号状态（0正常 1停用）',
              format: 'int32',
            },
            roleIds: {
              type: 'array',
              items: {
                type: 'integer',
                format: 'int64',
              },
            },
          },
          description: '用户对象 sys_user',
        },
        UpdatePwdBo: {
          type: 'object',
          properties: {
            newPassword: {
              type: 'string',
            },
            smsCode: {
              type: 'string',
            },
          },
          description: '',
        },
        EditRoleBo: {
          required: ['dataScope', 'roleName', 'status'],
          type: 'object',
          properties: {
            roleId: {
              type: 'integer',
              description: '角色ID',
              format: 'int64',
            },
            roleKey: {
              type: 'string',
            },
            roleName: {
              maxLength: 30,
              minLength: 0,
              type: 'string',
              description: '角色名称',
            },
            dataScope: {
              type: 'integer',
              description:
                '机构数据范围（1全部数据权限 2本机构数据权限 3本机构及以下数据权限 4仅本人数据权限）',
              format: 'int32',
            },
            status: {
              type: 'integer',
              description: '角色状态（0正常 1停用）',
              format: 'int32',
            },
            remark: {
              type: 'string',
              description: '角色说明',
            },
          },
          description: '',
        },
        SysOssBo: {
          required: [
            'createByName',
            'fileName',
            'fileSuffix',
            'originalName',
            'ossId',
            'url',
          ],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            ossId: {
              type: 'integer',
              description: '文件编码',
              format: 'int64',
            },
            fileName: {
              type: 'string',
              description: '文件名',
            },
            originalName: {
              type: 'string',
              description: '原名',
            },
            fileSuffix: {
              type: 'string',
              description: '文件后缀名',
            },
            url: {
              type: 'string',
              description: 'URL地址',
            },
          },
          description: '系统-OSS对象存储业务对象 sys_oss',
        },
        EditOrgAdminBo: {
          required: [
            'adminIdNumber',
            'adminName',
            'adminPhoneNumber',
            'adminWorkNumber',
            'bankIds',
            'organizationId',
          ],
          type: 'object',
          properties: {
            organizationId: {
              type: 'integer',
              description: '机构id',
              format: 'int64',
            },
            adminId: {
              type: 'integer',
              description: '管理员id',
              format: 'int64',
            },
            adminName: {
              type: 'string',
              description: '管理员姓名',
            },
            adminWorkNumber: {
              type: 'string',
              description: '管理员工号',
            },
            adminIdNumber: {
              type: 'string',
              description: '管理员身份者号',
            },
            adminPhoneNumber: {
              type: 'string',
              description: '管理员手机号',
            },
            adminEmail: {
              maxLength: 50,
              minLength: 0,
              type: 'string',
              description: '管理员邮箱',
            },
            bankIds: {
              type: 'array',
              description: '关联银行ids，设置银行非管理员角色用户的有效性',
              items: {
                type: 'string',
              },
            },
          },
          description: '',
        },
        EditBankAdminBo: {
          required: [
            'adminBankId',
            'adminIdNumber',
            'adminName',
            'adminPhoneNumber',
            'adminWorkNumber',
            'bankId',
          ],
          type: 'object',
          properties: {
            bankId: {
              type: 'integer',
              description: '机构id',
              format: 'int64',
            },
            adminId: {
              type: 'integer',
              description: '管理员id',
              format: 'int64',
            },
            adminName: {
              type: 'string',
              description: '管理员姓名',
            },
            adminIdNumber: {
              type: 'string',
              description: '管理员身份者号',
            },
            adminPhoneNumber: {
              type: 'string',
              description: '管理员手机号',
            },
            adminWorkNumber: {
              type: 'string',
              description: '管理员工号',
            },
            adminBankId: {
              type: 'integer',
              description: '管理员所在银行ID',
              format: 'int64',
            },
            adminDeptName: {
              type: 'string',
              description: '管理员所在部门',
            },
            adminEmail: {
              maxLength: 50,
              minLength: 0,
              type: 'string',
              description: '管理员邮箱',
            },
          },
          description: '',
        },
        UpdateStatusBo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            status: {
              type: 'integer',
              format: 'int32',
            },
          },
          description: '',
        },
        FileAttachmentBo: {
          required: ['fileIds', 'fileName'],
          type: 'object',
          properties: {
            fileIds: {
              type: 'string',
            },
            fileName: {
              type: 'string',
            },
          },
          description: '文件入参',
        },
        PrjLoanReceiptBo: {
          required: ['clientCode'],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            busitypeId: {
              type: 'string',
              description: '业务品种ID',
            },
            busitypeName: {
              type: 'string',
              description: '业务品种名称',
            },
            clientCode: {
              type: 'string',
              description: '客户编号',
            },
            clientId: {
              type: 'string',
              description: '客户ID',
            },
            clientName: {
              type: 'string',
              description: '客户名称',
            },
            coder: {
              type: 'string',
              description: '编码',
            },
            creditorCoder: {
              type: 'string',
              description: '债权人coder',
            },
            creditorName: {
              type: 'string',
              description: '债权人名称',
            },
            creditId: {
              type: 'string',
              description: '授信ID',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除，6-担保撤销, 7-担保终止；字典key=guaranteeStatus',
              format: 'int32',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanContractName: {
              type: 'string',
              description: '借款合同名',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            loanReceiptSum: {
              type: 'number',
              description: '借款借据【借款凭证】金额',
            },
            pcoder: {
              type: 'string',
              description: '父编码',
            },
            status: {
              type: 'string',
              description: '借据类型：1 正常  2 结清 3 逾期 4 欠息',
            },
            bizStatus: {
              type: 'string',
              description:
                '借据类型(业务类型,直保系统用)\n ZC在保（正常） YQ逾期 DC代偿 QBZC全部追偿 ZCZJ追偿终结 ZCJB正常解保 ZQJB展期解保 JXHJJB借新还旧解保 ZWCZJB债务重组解保\n StatusCode.java 取值用这里面的取值',
            },
            relationId: {
              type: 'string',
              description: '流程id',
            },
            certificateType: {
              type: 'string',
              description: '证件类型',
            },
            applyId: {
              type: 'string',
              description: '业务申请id',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借据余额（元）',
            },
            loanContractBalance: {
              type: 'number',
              description: '借款合同金余额',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件编号',
            },
            insuredBalance: {
              type: 'number',
              description: '责任余额',
            },
            serialNumber: {
              type: 'string',
              description: '业务流水号',
            },
            guaranteeContractCode: {
              type: 'string',
              description: '保证合同号',
            },
            guaranteePeriod: {
              type: 'string',
              description: '担保期限（月）',
            },
            templateId: {
              type: 'string',
              description: '模板id',
            },
            productCoder: {
              type: 'string',
              description: '产品coder',
            },
            isCycle: {
              type: 'string',
              description: '是否可循环',
            },
            mustMonthFee: {
              type: 'number',
              description: '应收',
            },
            projectSerial: {
              type: 'string',
              description: '业务录入流水号',
            },
            buxProjectSerial: {
              type: 'string',
              description: '融资担保流水号',
            },
            busiStatus: {
              type: 'string',
              description: '业务状态',
            },
            currency: {
              type: 'string',
              description: '币种',
            },
            dimensionType: {
              type: 'string',
              description: '解保维度类型 取自prj_apply的dimensionType',
            },
            fileId: {
              type: 'string',
              description: '附件记录ID',
            },
            branchBank: {
              type: 'string',
              description: '放款行coder 取自业务表',
            },
            branchBankName: {
              type: 'string',
              description: '放款行名称',
            },
            completionDate: {
              type: 'string',
              description: '审批完成时间',
              format: 'date-time',
            },
            loanPremiumAmount: {
              type: 'number',
              description: '本笔借据的保费',
            },
            solveMoney: {
              type: 'number',
              description: '累计解保金额',
            },
            bankId: {
              type: 'string',
              description: '银行id',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            applyType: {
              type: 'string',
              description: '业务种类 1：授信业务 2：产品业务',
            },
            fileInfos: {
              type: 'array',
              description: '附件信息',
              items: {
                $ref: '#/components/schemas/FileAttachmentBo',
              },
            },
            buxCoder: {
              type: 'string',
              description: '直保借据录入coder',
            },
            bankCoder: {
              type: 'string',
              description: '银行coder(直保)',
            },
          },
          description: '借据录入业务对象',
        },
        BuxPrjReplaceBo: {
          required: [
            'actualAlreadyRepayAmt',
            'bankId',
            'bankName',
            'clientCode',
            'clientId',
            'clientName',
            'clientNum',
            'clientType',
            'compensatoryCause',
            'compensatoryExplanation',
            'contractTerminationAmount',
            'createByName',
            'directInsuranceCompensationRatio',
            'fileIds',
            'flowStatus',
            'guaranteeStatus',
            'id',
            'insuredAmount',
            'insuredStatus',
            'intendsToReplaceThePrincipal',
            'iouNum',
            'loanBalance',
            'loanBeginDate',
            'loanContract',
            'loanContractAmount',
            'loanContractCode',
            'loanEndDate',
            'loanReceiptBalance',
            'loanReceiptBeginDate',
            'loanReceiptCode',
            'loanReceiptEndDate',
            'loanReceiptSum',
            'organizationId',
            'organizationName',
            'proposedCompensatedAmount',
            'proposedCompensatedInterest',
            'proposedCompensationDate',
            'proposedPenaltyInterest',
            'unAlreadyRepayAmt',
            'unReleaseInt',
            'unReleasePunish',
            'updateByName',
            'uuid',
          ],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            clientId: {
              type: 'string',
              description: '客户ID',
            },
            clientCode: {
              type: 'string',
              description: '债务人编号',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            clientNum: {
              type: 'string',
              description: '债务人证件编号',
            },
            clientType: {
              type: 'string',
              description: '债务人类别',
            },
            loanContract: {
              type: 'string',
              description: '借款合同编号',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额（元）（元）',
            },
            loanBalance: {
              type: 'number',
              description: '借款合同余额（元）（元）',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            iouNum: {
              type: 'string',
              description: '借据编号',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptSum: {
              type: 'number',
              description: '借款借据【借款凭证】金额（元）',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借款借据【借款凭证】余额（元）',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            unReleaseInt: {
              type: 'number',
              description: '债务人未清偿利息（含债权人部分）（元）',
            },
            unReleasePunish: {
              type: 'number',
              description: '债务人未清偿罚息（元）',
            },
            unAlreadyRepayAmt: {
              type: 'number',
              description: '债务人未清偿本金（元）',
            },
            insuredStatus: {
              type: 'integer',
              description: '是否差额解保：0是，1否',
              format: 'int32',
            },
            insuredAmount: {
              type: 'number',
              description: '差额解保金额（元）（元）',
            },
            actualAlreadyRepayAmt: {
              type: 'number',
              description: '实际未清偿本金（元）',
            },
            proposedCompensatedAmount: {
              type: 'number',
              description: '拟代偿金额（元）',
            },
            directInsuranceCompensationRatio: {
              type: 'number',
              description: '直保代偿分险比例（%）',
            },
            intendsToReplaceThePrincipal: {
              type: 'number',
              description: '拟代偿本金（元）',
            },
            proposedCompensationDate: {
              type: 'string',
              description: '拟代偿日期',
              format: 'date-time',
            },
            proposedCompensatedInterest: {
              type: 'number',
              description: '拟代偿利息（元）',
            },
            proposedPenaltyInterest: {
              type: 'number',
              description: '拟代偿罚息（元）',
            },
            contractTerminationAmount: {
              type: 'number',
              description: '合同解除金额（元）',
            },
            compensatoryCause: {
              type: 'string',
              description: '代偿原因',
            },
            compensatoryExplanation: {
              type: 'string',
              description: '代偿说明',
            },
            fileIds: {
              type: 'string',
              description: '附件资料',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除；字典key=guaranteeStatus',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            uuid: {
              type: 'string',
              description: '业务流水号',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
          },
          description: '代偿方案业务对象 info_bux_prj_replace',
        },
        RString: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'string',
            },
          },
          description: '响应信息主体',
        },
        StatusSyncVo: {
          type: 'object',
          properties: {
            businessId: {
              type: 'string',
              description: '业务id',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1.担保审批中、2.担保受理、3.担保退回、4.担保否决、5.担保同意、6.担保删除、7.担保撤销',
              format: 'int32',
            },
            checkInfo: {
              type: 'string',
              description: '系统校验信息（不通过规则）',
            },
            suggestInfo: {
              type: 'string',
              description: '其它信息（人工补录信息）',
            },
            businessType: {
              type: 'integer',
              description:
                '业务类型：1业务录入，2借据录入，3解保录入，4保后检查录入，5风险预警录入，6预警解除录入，7代偿方案录入，8代偿申请录入',
              format: 'int32',
            },
            content: {
              type: 'string',
              description: '修改后业务数据',
            },
          },
          description: '',
        },
        TaskApprovalBo: {
          required: ['approvalMessage', 'taskId'],
          type: 'object',
          properties: {
            taskId: {
              type: 'integer',
              description: '任务id',
              format: 'int64',
            },
            approvalMessage: {
              type: 'string',
              description: '审批意见',
            },
            approvalFileIds: {
              type: 'string',
              description: '审批文件id，多个逗号分隔',
            },
            approvalFileName: {
              type: 'string',
              description: '审批附件文档名称',
            },
          },
          description: '任务审批操作-入参',
        },
        RLong: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'integer',
              format: 'int64',
            },
          },
          description: '响应信息主体',
        },
        WorkflowConfigSaveBo: {
          required: ['createBankGrade', 'workflowCode'],
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '数据库主键',
              format: 'int64',
            },
            workflowCode: {
              type: 'string',
              description: '流程类型',
            },
            createBankGrade: {
              type: 'integer',
              description: '发起行层级（同银行表）1 总行 2分行 3支行',
              format: 'int32',
            },
            nodeList: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/WorkflowNodeConfigBo',
              },
            },
          },
          description: '流程配置业务对象-新增&修改',
        },
        WorkflowNodeConfigBo: {
          required: ['approvalBankType', 'approvalType', 'nodeName', 'roleIds'],
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '数据库主键',
              format: 'int64',
            },
            workflowConfigId: {
              type: 'integer',
              format: 'int64',
            },
            no: {
              type: 'integer',
              format: 'int32',
            },
            nodeName: {
              type: 'string',
              description: '节点名称',
            },
            approvalBankType: {
              type: 'integer',
              description:
                '审批行类型：1 总行 2分行 3支行；字典key=approvalBankType',
              format: 'int32',
            },
            roleIds: {
              type: 'string',
              description: '角色id，英文逗号分隔',
            },
            approvalType: {
              type: 'integer',
              description:
                '审批方式：0-会签；1-或签；字典key=workflowApprovalType',
              format: 'int32',
            },
            nodeType: {
              type: 'integer',
              description:
                '节点类型：0-发起人；1-银行复核；2-担保机构复核；字典key=workflowNodeType',
              format: 'int32',
            },
          },
          description: '流程节点配置业务对象 workflow_node_config',
        },
        SysPolicy: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              format: 'int32',
            },
            policyId: {
              type: 'integer',
              format: 'int64',
            },
            policyName: {
              type: 'string',
            },
            organizationId: {
              type: 'integer',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
            },
            type: {
              type: 'integer',
              format: 'int32',
            },
            garde: {
              type: 'integer',
              format: 'int32',
            },
            publishDept: {
              type: 'string',
            },
            publishTime: {
              type: 'string',
              format: 'date-time',
            },
            publishMark: {
              type: 'string',
            },
            titleOne: {
              type: 'string',
            },
            titleTwo: {
              type: 'string',
            },
            titleThree: {
              type: 'string',
            },
            titleFour: {
              type: 'string',
            },
            titleFive: {
              type: 'string',
            },
            content: {
              type: 'string',
            },
            publishBy: {
              type: 'integer',
              format: 'int64',
            },
            publishByName: {
              type: 'string',
            },
            publishType: {
              type: 'integer',
              format: 'int32',
            },
            effectTime: {
              type: 'string',
              description: '政策生效时间',
              format: 'date-time',
            },
            noEffectTime: {
              type: 'string',
              description: '政策失效时间',
              format: 'date-time',
            },
            releaseArea: {
              type: 'string',
              description: '发文地区',
            },
          },
          description: '系统-政策信息对象 sys_policy',
        },
        RSysOss: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/SysOss',
            },
          },
          description: '响应信息主体',
        },
        SysOss: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            ossId: {
              type: 'integer',
              description: '文件编码',
              format: 'int64',
            },
            fileName: {
              type: 'string',
              description: '文件名',
            },
            originalName: {
              type: 'string',
              description: '原名',
            },
            fileSuffix: {
              type: 'string',
              description: '文件后缀名',
            },
            url: {
              type: 'string',
              description: 'URL地址',
            },
            size: {
              type: 'string',
              description: '文件大小',
            },
            type: {
              type: 'string',
              description: '文件类型',
            },
          },
          description: '系统-OSS对象存储对象 sys_oss',
        },
        SysDocument: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是 2-否',
              format: 'int32',
            },
            documentId: {
              type: 'integer',
              format: 'int64',
            },
            documentName: {
              type: 'string',
            },
            organizationId: {
              type: 'integer',
              description: '担保机构id',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '担保机构名称',
            },
            documentDescription: {
              type: 'string',
              description: '文档描述',
            },
            publishBy: {
              type: 'integer',
              description: '发布者',
              format: 'int64',
            },
            publishByName: {
              type: 'string',
              description: '发布用户',
            },
            publishTime: {
              type: 'string',
              description: '发布日期',
              format: 'date-time',
            },
            publishType: {
              type: 'integer',
              description: '发布状态：0已发布 1未发布',
              format: 'int32',
            },
            fileIds: {
              type: 'string',
              description: '文件ids',
            },
          },
          description: '系统-文档信息对象 sys_document',
        },
        SmsLoginBody: {
          required: ['phoneNumber', 'smsCode'],
          type: 'object',
          properties: {
            phoneNumber: {
              type: 'string',
              description: '手机号',
            },
            smsCode: {
              type: 'string',
              description: '短信code',
            },
          },
          description: '短信登录对象',
        },
        RMapStringObject: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
            },
          },
          description: '响应信息主体',
        },
        SysOperLog: {
          type: 'object',
          properties: {
            operId: {
              type: 'integer',
              description: '日志主键',
              format: 'int64',
            },
            title: {
              type: 'string',
              description: '操作模块',
            },
            businessType: {
              type: 'integer',
              description: '业务类型（0其它 1新增 2修改 3删除）',
              format: 'int32',
            },
            businessTypes: {
              type: 'array',
              description: '业务类型数组',
              items: {
                type: 'integer',
                format: 'int32',
              },
            },
            method: {
              type: 'string',
              description: '请求方法',
            },
            requestMethod: {
              type: 'string',
              description: '请求方式',
            },
            operateBy: {
              type: 'integer',
              description: '操作人员',
              format: 'int64',
            },
            operateName: {
              type: 'string',
              description: '操作人员',
            },
            operateUrl: {
              type: 'string',
              description: '请求url',
            },
            operateParam: {
              type: 'string',
              description: '请求参数',
            },
            jsonResult: {
              type: 'string',
              description: '返回参数',
            },
            status: {
              type: 'integer',
              description: '操作状态（0正常 1异常）',
              format: 'int32',
            },
            errorMsg: {
              type: 'string',
              description: '错误消息',
            },
            operateTime: {
              type: 'string',
              description: '操作时间',
              format: 'date-time',
            },
            costTime: {
              type: 'integer',
              description: '消耗时间',
              format: 'int64',
            },
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
          },
          description: '操作日志记录表 oper_log',
        },
        SysLoginLog: {
          type: 'object',
          properties: {
            infoId: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            userId: {
              type: 'integer',
              description: '用户ID',
              format: 'int64',
            },
            userName: {
              type: 'string',
              description: '用户账号',
            },
            status: {
              type: 'string',
              description: '登录状态 0成功 1失败',
            },
            ipaddr: {
              type: 'string',
              description: '登录IP地址',
            },
            loginLocation: {
              type: 'string',
              description: '登录地点',
            },
            browser: {
              type: 'string',
              description: '浏览器类型',
            },
            os: {
              type: 'string',
              description: '操作系统',
            },
            msg: {
              type: 'string',
              description: '提示消息',
            },
            loginTime: {
              type: 'string',
              description: '访问时间',
              format: 'date-time',
            },
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
          },
          description: '系统访问记录表 sys_logininfor',
        },
        LoginBody: {
          required: ['password', 'phoneNumber'],
          type: 'object',
          properties: {
            phoneNumber: {
              type: 'string',
              description: '用户名',
            },
            password: {
              type: 'string',
              description: '用户密码',
            },
            uuid: {
              type: 'string',
              description: '唯一标识',
            },
          },
          description: '用户登录对象',
        },
        InfoBuxOriginLoanReceipt: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            applyId: {
              type: 'integer',
              description: '业务录入主表id',
              format: 'int64',
            },
            applyType: {
              type: 'integer',
              description: '录入类型：2产品 1授信',
              format: 'int32',
            },
            originRecordNumber: {
              type: 'string',
              description: '原合同流水号（直保业务编号projectSerial）',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptSum: {
              type: 'number',
              description: '借款借据【借款凭证】金额',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借款借据【借款凭证】余额（元）',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            deptName: {
              type: 'string',
              description: '部门名称',
            },
          },
          description: '原业务借据信息对象 info_bux_origin_loan_receipt',
        },
        InfoBuxPrjApplyBo: {
          required: [
            'applyType',
            'branchBank',
            'businessType',
            'certificateType',
            'clientName',
            'clientType',
            'counterGuaranteeMeasures',
            'currency',
            'enterprisePlan',
            'financingVarieties',
            'identificationCode',
            'industryCategory',
            'industryLarge',
            'industryMedium',
            'industrySmall',
            'isFirstLoan',
            'lendRate',
            'loanBeginDate',
            'loanContractCode',
            'loanContractName',
            'loanEndDate',
            'obligationAmount',
            'originLoanContractCode',
            'originRecordNumber',
            'otherRiskRatio',
            'payTaxes',
            'productCoder',
            'productName',
            'registrationPlace',
            'riskRatio',
            'riskSharingRatio',
            'saveType',
            'yearBusinessIncome',
            'yearPractices',
            'yearTotalAssets',
          ],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            saveType: {
              type: 'integer',
              description: '保存类型：0 发起人保存，1 发起人提交，2 审核人提交',
              format: 'int32',
            },
            approvalMessage: {
              type: 'string',
              description: '提交意见',
            },
            id: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            businessType: {
              type: 'string',
              description:
                '业务类型：01 新增 02 展期 03 借新还旧 04 债务重组 06无还本续贷',
            },
            applyType: {
              type: 'integer',
              description: '录入类型：2产品 1授信',
              format: 'int32',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            projectSerial: {
              type: 'string',
              description: '业务流水号',
            },
            branchBank: {
              type: 'string',
              description: '分行名称id',
            },
            branchBankName: {
              type: 'string',
              description: '分行名称',
            },
            businessAddr: {
              type: 'string',
              description: '经营地址',
            },
            businessDetailedAddress: {
              type: 'string',
              description: '经营地址详细地址',
            },
            taskId: {
              type: 'integer',
              description: '任务id',
              format: 'int64',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                "担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除, 6-担保撤销, 7-担保终止；字典key=guaranteeStatus'",
              format: 'int32',
            },
            certificateType: {
              type: 'string',
              description: '债务人证件类型',
            },
            clientContact: {
              type: 'string',
              description: '债务人联系人',
            },
            clientContactPhone: {
              type: 'string',
              description: '债务人联系电话',
            },
            clientType: {
              type: 'string',
              description: '客户类型（债务人类别）',
            },
            corpIdfCode: {
              type: 'string',
              description: '法定代表人证件号码',
            },
            corporationCertificateType: {
              type: 'string',
              description: '法定代表人证件类型',
            },
            corporationName: {
              type: 'string',
              description: '法定代表人名称',
            },
            counterGuarantee: {
              type: 'string',
              description: '担保服务合同类型',
            },
            counterGuaranteeMeasures: {
              type: 'string',
              description: '反担保措施',
            },
            counterGuaranteeSub: {
              type: 'string',
              description: '担保服务合同',
            },
            guaranteeSub: {
              type: 'string',
              description: '保函模板code',
            },
            currency: {
              type: 'string',
              description: '币种',
            },
            debtorsCertId: {
              type: 'string',
              description: '债务人2证件号码',
            },
            debtorsCertIdType: {
              type: 'string',
              description: '债务人2证件类型',
            },
            debtorsName: {
              type: 'string',
              description: '债务人2名称',
            },
            debtorsNature: {
              type: 'string',
              description: '债务人2类别',
            },
            debtorsPhone: {
              type: 'string',
              description: '债务人2手机号码',
            },
            deposit: {
              type: 'number',
              description: '收取保证金金额（元）',
            },
            discountAmount: {
              type: 'number',
              description: '保费优惠金额',
            },
            enterprisePlan: {
              type: 'string',
              description: '企业划型',
            },
            entrustedContractCode: {
              type: 'string',
              description: '委保合同号',
            },
            exchangeRate: {
              type: 'number',
              description: '人民币汇率中间价',
            },
            file1: {
              type: 'string',
              description: '担保函',
            },
            file2: {
              type: 'string',
              description: '担保服务合同',
            },
            file4: {
              type: 'string',
              description: '其他附件',
            },
            financingVarieties: {
              type: 'string',
              description: '融资品种',
            },
            formulaMode: {
              type: 'string',
              description: '主债权金额计算方式',
            },
            governmentGrantsType: {
              type: 'string',
              description: '政策扶持领域类别',
            },
            guarantee: {
              type: 'string',
              description: '担保函类型',
            },
            guaranteeContractCode: {
              type: 'string',
              description: '保证合同号',
            },
            guaranteePeriod: {
              type: 'string',
              description: '担保期限（月）',
            },
            guaranteeRate: {
              type: 'number',
              description: '融资担保费率（年化）（%）',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件号码',
            },
            industryCategory: {
              type: 'string',
              description: '所属行业（国门类）',
            },
            industryLarge: {
              type: 'string',
              description: '所属行业（国大类）',
            },
            industryMedium: {
              type: 'string',
              description: '所属行业（国中类）',
            },
            industrySmall: {
              type: 'string',
              description: '所属行业（国小类）',
            },
            isBilling: {
              type: 'string',
              description: '是否需要开票',
            },
            isCycle: {
              type: 'string',
              description: '是否自主循环：是1，否0（额度是否可循环使用）',
            },
            isExceedFivethousand: {
              type: 'string',
              description: '在保余额是否超1000万元：是1，否2',
            },
            isFirstLoan: {
              type: 'string',
              description: '是否首次贷款：是1、否2',
            },
            isRelatedJxw: {
              type: 'string',
              description: '是否关联担保（经信委）',
            },
            lendRate: {
              type: 'number',
              description: '贷款利率（年化）（%）',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanContractName: {
              type: 'string',
              description: '借款合同名',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            managerName: {
              type: 'string',
              description: '银行客户经理姓名',
            },
            managerPhone: {
              type: 'string',
              description: '客户经理联系电话',
            },
            obligationAmount: {
              type: 'number',
              description: '主债权金额（元）（借款合同金额）',
            },
            originGuaranteeBalance: {
              type: 'number',
              description: '原业务-责任担保余额(在保余额*担保分险比例)',
            },
            originInsuredBalance: {
              type: 'number',
              description: '原业务余额',
            },
            defuseAmount: {
              type: 'number',
              description: '拟化解业务本金（元）  在保余额之和',
            },
            originRecordNumber: {
              type: 'string',
              description: '原合同流水号（直保业务编号projectSerial）',
            },
            originLoanContractCode: {
              type: 'string',
              description: '原业务借款合同号',
            },
            otherExpenses: {
              type: 'string',
              description: '是否收取保证金以及除担保费之外的其他费用',
            },
            otherRiskRatio: {
              type: 'number',
              description: '风险比例（其他）',
            },
            payTaxes: {
              type: 'number',
              description: '缴纳税收（元）',
            },
            premiumAmount: {
              type: 'number',
              description: '保费金额（元）',
            },
            creditCoder: {
              type: 'string',
              description: '授信方案coder',
            },
            productCoder: {
              type: 'string',
              description: '产品coder',
            },
            productName: {
              type: 'string',
              description: '产品名称',
            },
            productSchemeCoder: {
              type: 'string',
              description: '产品方案coder',
            },
            ratioRemark: {
              type: 'string',
              description: '担保费率备注',
            },
            registrationDetailedAddress: {
              type: 'string',
              description: '登记详细地址',
            },
            registrationPlace: {
              type: 'string',
              description: '登记所在地',
            },
            remark: {
              type: 'string',
              description: '备注',
            },
            riskRatio: {
              type: 'number',
              description: '风险比例（担保）（%）',
            },
            riskSharingRatio: {
              type: 'number',
              description: '分险比例(债权人)（%）',
            },
            strategicClassification: {
              type: 'string',
              description: '战略性新兴产业分类',
            },
            settleStatus: {
              type: 'string',
              description: '0-未结清，1-已结清',
            },
            subjectIdentificationCode: {
              type: 'string',
              description: '债务人经营主体统一社会信用代码',
            },
            subjectEconomicComponent: {
              type: 'string',
              description: '债务人经营主体经济成分',
            },
            subjectName: {
              type: 'string',
              description: '债务人经营主体名称',
            },
            talentsScienceType: {
              type: 'string',
              description: '人才科创类别（01 人才类  02 科创类）',
            },
            taxpayerAddress: {
              type: 'string',
              description: '地址',
            },
            taxpayerBankName: {
              type: 'string',
              description: '开户银行名称',
            },
            taxpayerBankNum: {
              type: 'string',
              description: '开户银行账号',
            },
            taxpayerCellPhone: {
              type: 'string',
              description: '开票手机号',
            },
            taxpayerNumber: {
              type: 'string',
              description: '纳税人识别号',
            },
            taxpayerPhone: {
              type: 'string',
              description: '电话',
            },
            templateId: {
              type: 'string',
              description: '模版coder',
            },
            unitNature: {
              type: 'string',
              description: '单位性质',
            },
            whiteList: {
              type: 'string',
              description: '白名单',
            },
            yearBusinessIncome: {
              type: 'number',
              description: '上一年度营业收入（万元）',
            },
            yearPractices: {
              type: 'string',
              description: '上一年末从业人数',
            },
            yearTotalAssets: {
              type: 'number',
              description: '上一年末资产总额（万元）',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            deptName: {
              type: 'string',
              description: '部门名称',
            },
            fileInfos1: {
              type: 'array',
              description: '担保函附件',
              items: {
                $ref: '#/components/schemas/FileAttachmentBo',
              },
            },
            fileInfos2: {
              type: 'array',
              description: '担保服务合同附件',
              items: {
                $ref: '#/components/schemas/FileAttachmentBo',
              },
            },
            fileInfos4: {
              type: 'array',
              description: '其他附件',
              items: {
                $ref: '#/components/schemas/FileAttachmentBo',
              },
            },
            rootBankCoder: {
              type: 'string',
              description: '总行coder',
            },
            rootBankId: {
              type: 'integer',
              description: '总行ID',
              format: 'int64',
            },
            originLoanReceiptList: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/InfoBuxOriginLoanReceipt',
              },
            },
            requiredField: {
              uniqueItems: true,
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          description: '业务录入业务对象 info_bux_prj_apply',
        },
        RListString: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          description: '响应信息主体',
        },
        PrjLoanReceipt: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            busitypeId: {
              type: 'string',
              description: '业务品种ID',
            },
            busitypeName: {
              type: 'string',
              description: '业务品种名称',
            },
            clientCode: {
              type: 'string',
              description: '客户编号',
            },
            clientId: {
              type: 'string',
              description: '客户ID',
            },
            clientName: {
              type: 'string',
              description: '客户名称',
            },
            coder: {
              type: 'string',
              description: '编码',
            },
            creditorCoder: {
              type: 'string',
              description: '债权人coder',
            },
            creditorName: {
              type: 'string',
              description: '债权人名称',
            },
            creditId: {
              type: 'string',
              description: '授信ID',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除，6-担保撤销, 7-担保终止；字典key=guaranteeStatus',
              format: 'int32',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanContractName: {
              type: 'string',
              description: '借款合同名',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            loanReceiptSum: {
              type: 'number',
              description: '借款借据【借款凭证】金额',
            },
            pcoder: {
              type: 'string',
              description: '父编码',
            },
            status: {
              type: 'string',
              description: '借据状态：1 正常  2 结清 3 逾期 4 欠息',
            },
            bizStatus: {
              type: 'string',
              description:
                '借据类型(业务类型,直保系统用)\n ZC在保（正常） YQ逾期 DC代偿 QBZC全部追偿 ZCZJ追偿终结 ZCJB正常解保 ZQJB展期解保 JXHJJB借新还旧解保 ZWCZJB债务重组解保\n StatusCode.java 取值用这里面的取值',
            },
            relationId: {
              type: 'string',
              description: '流程id',
            },
            certificateType: {
              type: 'string',
              description: '证件类型',
            },
            applyId: {
              type: 'string',
              description: '业务申请id',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借据余额（元）',
            },
            loanContractBalance: {
              type: 'number',
              description: '借款合同金余额',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件编号',
            },
            insuredBalance: {
              type: 'number',
              description: '责任余额',
            },
            serialNumber: {
              type: 'string',
              description: '业务流水号',
            },
            guaranteeContractCode: {
              type: 'string',
              description: '保证合同号',
            },
            guaranteePeriod: {
              type: 'string',
              description: '担保期限（月）',
            },
            templateId: {
              type: 'string',
              description: '模板id',
            },
            productCoder: {
              type: 'string',
              description: '产品coder',
            },
            isCycle: {
              type: 'string',
              description: '是否可循环',
            },
            mustMonthFee: {
              type: 'number',
              description: '应收',
            },
            projectSerial: {
              type: 'string',
              description: '业务录入流水号',
            },
            buxProjectSerial: {
              type: 'string',
              description: '融资担保流水号',
            },
            busiStatus: {
              type: 'string',
              description: '业务状态',
            },
            currency: {
              type: 'string',
              description: '币种',
            },
            dimensionType: {
              type: 'string',
              description: '解保维度类型 取自prj_apply的dimensionType',
            },
            fileId: {
              type: 'string',
              description: '附件记录ID',
            },
            branchBank: {
              type: 'string',
              description: '放款行coder 取自业务表',
            },
            branchBankName: {
              type: 'string',
              description: '放款行名称',
            },
            completionDate: {
              type: 'string',
              description: '审批完成时间',
              format: 'date-time',
            },
            loanPremiumAmount: {
              type: 'number',
              description: '本笔借据的保费',
            },
            solveMoney: {
              type: 'number',
              description: '累计解保金额',
            },
            bankId: {
              type: 'string',
              description: '银行id',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            errIndex: {
              type: 'integer',
              description: '错误下标(excel导入用)',
              format: 'int32',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            organizationCoder: {
              type: 'string',
              description: '机构名称',
            },
            approvalMessage: {
              type: 'string',
              description: '申请意见',
            },
            flowTaskId: {
              type: 'integer',
              description: '流程实例id',
              format: 'int64',
            },
            applyType: {
              type: 'string',
              description: '业务种类 1：授信业务 2：产品业务',
            },
            buxCoder: {
              type: 'string',
              description: '直保借据录入coder',
            },
            bankCoder: {
              type: 'string',
              description: '银行coder(直保)',
            },
          },
          description: '借据录入信息表',
        },
        RPrjLoanReceipt: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/PrjLoanReceipt',
            },
          },
          description: '响应信息主体',
        },
        PrjLoanReceiptSubmitBo: {
          type: 'object',
          properties: {
            ids: {
              type: 'array',
              description: '批量提交id集合',
              items: {
                type: 'integer',
                format: 'int64',
              },
            },
            id: {
              type: 'integer',
              description: '单个提交id',
              format: 'int64',
            },
            approvalMessage: {
              type: 'string',
              description: '申请意见',
            },
          },
          description: '借据录入提交/批量提交',
        },
        RObject: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'object',
            },
          },
          description: '响应信息主体',
        },
        BuxPrjInsuredSubmitBo: {
          required: [
            'buxProjectSerial',
            'clientCode',
            'clientName',
            'clientNum',
            'dimensionType',
            'fileIds',
            'insuredAmount',
            'insuredDate',
            'isCompleteRelease',
            'isRefund',
            'loanBeginDate',
            'loanContractAmount',
            'loanContractAmountCurrency',
            'loanContractBalance',
            'loanContractCode',
            'loanEndDate',
            'loanReceiptAmount',
            'loanReceiptBalance',
            'loanReceiptBeginDate',
            'loanReceiptCode',
            'loanReceiptEndDate',
            'remark',
            'submitApprovalComment',
          ],
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '主键',
              format: 'int64',
            },
            buxProjectSerial: {
              type: 'string',
              description: '【直保】直保业务录入流水号',
            },
            dimensionType: {
              type: 'string',
              description: '解保维度类型：01、合同 02、借据',
            },
            clientCode: {
              type: 'string',
              description: '债务人编号',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            clientNum: {
              type: 'string',
              description: '债务人证件编号',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同编号',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额（元）',
            },
            loanContractAmountCurrency: {
              type: 'string',
              description: '借款合同币种',
            },
            loanContractBalance: {
              type: 'number',
              description: '借款合同余额（元）',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptAmount: {
              type: 'number',
              description: '借款借据【借款凭证】金额（元）',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借款借据【借款凭证】余额（元）',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            insuredAmount: {
              type: 'number',
              description: '解保金额（元）',
            },
            insuredDate: {
              type: 'string',
              description: '解保日期',
              format: 'date-time',
            },
            isCompleteRelease: {
              type: 'integer',
              description: '本合同担保责任是否完全解除 1是0否',
              format: 'int32',
            },
            remark: {
              type: 'string',
              description: '备注',
            },
            isRefund: {
              type: 'integer',
              description: '是否退费  1-是 0-否',
              format: 'int32',
            },
            fileIds: {
              type: 'string',
              description: '附件资料',
            },
            bankId: {
              type: 'string',
              description: '银行ID',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            submitApprovalComment: {
              type: 'string',
              description: '提交审批意见',
            },
          },
          description: '解保录入业务对象 info_bux_prj_insured',
        },
        BuxPrjInsuredSubmitVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              format: 'int32',
            },
            successNum: {
              type: 'integer',
              format: 'int32',
            },
            failureNum: {
              type: 'integer',
              format: 'int32',
            },
            recordId: {
              type: 'integer',
              format: 'int64',
            },
            errorInfoList: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ErrorInfo',
              },
            },
          },
          description: '',
        },
        ErrorInfo: {
          type: 'object',
          properties: {
            projectSerial: {
              type: 'string',
            },
            reason: {
              type: 'string',
            },
          },
          description: '',
        },
        RBuxPrjInsuredSubmitVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/BuxPrjInsuredSubmitVo',
            },
          },
          description: '响应信息主体',
        },
        BuxPrjInsuredSaveBo: {
          required: [
            'buxProjectSerial',
            'clientCode',
            'clientName',
            'clientNum',
            'dimensionType',
            'fileIds',
            'insuredAmount',
            'insuredDate',
            'isCompleteRelease',
            'isRefund',
            'loanBeginDate',
            'loanContractAmount',
            'loanContractAmountCurrency',
            'loanContractBalance',
            'loanContractCode',
            'loanEndDate',
            'loanReceiptAmount',
            'loanReceiptBalance',
            'loanReceiptBeginDate',
            'loanReceiptCode',
            'loanReceiptEndDate',
            'remark',
            'submitApprovalComment',
          ],
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '主键',
              format: 'int64',
            },
            buxProjectSerial: {
              type: 'string',
              description: '【直保】直保业务录入流水号',
            },
            dimensionType: {
              type: 'string',
              description: '解保维度类型：01、合同 02、借据',
            },
            clientCode: {
              type: 'string',
              description: '债务人编号',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            clientNum: {
              type: 'string',
              description: '债务人证件编号',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同编号',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额（元）',
            },
            loanContractAmountCurrency: {
              type: 'string',
              description: '借款合同币种',
            },
            loanContractBalance: {
              type: 'number',
              description: '借款合同余额（元）',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptAmount: {
              type: 'number',
              description: '借款借据【借款凭证】金额（元）',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借款借据【借款凭证】余额（元）',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            insuredAmount: {
              type: 'number',
              description: '解保金额（元）',
            },
            insuredDate: {
              type: 'string',
              description: '解保日期',
              format: 'date-time',
            },
            isCompleteRelease: {
              type: 'integer',
              description: '本合同担保责任是否完全解除 1是0否',
              format: 'int32',
            },
            remark: {
              type: 'string',
              description: '备注',
            },
            isRefund: {
              type: 'integer',
              description: '是否退费  1-是 0-否',
              format: 'int32',
            },
            fileIds: {
              type: 'string',
              description: '附件资料',
            },
            bankId: {
              type: 'string',
              description: '银行ID',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            submitApprovalComment: {
              type: 'string',
              description: '提交审批意见',
            },
          },
          description: '解保录入业务对象 info_bux_prj_insured',
        },
        BuxPrjInsuredBatchSubmitBo: {
          required: ['ids', 'submitApprovalComment'],
          type: 'object',
          properties: {
            ids: {
              type: 'string',
            },
            submitApprovalComment: {
              type: 'string',
              description: '提交审批意见',
            },
          },
          description: '',
        },
        BuxPrjInsuredCheckBo: {
          required: [
            'certificateType',
            'clientName',
            'identificationCode',
            'loanContractCode',
          ],
          type: 'object',
          properties: {
            clientName: {
              type: 'string',
              description: '债务人名称不能为空',
            },
            certificateType: {
              type: 'string',
              description: '债务人证件类型不能为空',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件号码不能为空',
            },
            loanContractCode: {
              type: 'string',
              description: '债务人证件号码不能为空',
            },
            loanReceiptCode: {
              type: 'string',
              description: '债务人证件号码不能为空',
            },
            orgCoder: {
              type: 'string',
            },
          },
          description: '',
        },
        PrjInsuredBuxResultVo: {
          type: 'object',
          properties: {
            dimensionType: {
              type: 'string',
            },
            projectSerial: {
              type: 'string',
            },
            loanReceiptCode: {
              type: 'string',
            },
            loanReceiptSum: {
              type: 'number',
            },
            loanReceiptBalance: {
              type: 'number',
            },
            loanReceiptBeginDate: {
              type: 'string',
            },
            loanReceiptEndDate: {
              type: 'string',
            },
            loanBeginDate: {
              type: 'string',
            },
            loanEndDate: {
              type: 'string',
            },
            loanContractAmount: {
              type: 'number',
            },
            loanContractBalance: {
              type: 'number',
            },
            currency: {
              type: 'string',
            },
          },
          description: '',
        },
        RPrjInsuredBuxResultVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/PrjInsuredBuxResultVo',
            },
          },
          description: '响应信息主体',
        },
        BuxPrjInsuredImpVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              format: 'int32',
            },
            successNum: {
              type: 'integer',
              format: 'int32',
            },
            failureNum: {
              type: 'integer',
              format: 'int32',
            },
            recordId: {
              type: 'integer',
              format: 'int64',
            },
            errorInfoList: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ErrorInfo',
              },
            },
          },
          description: '',
        },
        RBuxPrjInsuredImpVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/BuxPrjInsuredImpVo',
            },
          },
          description: '响应信息主体',
        },
        RTestTreeVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/TestTreeVo',
            },
          },
          description: '响应信息主体',
        },
        TestTreeVo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '主键',
              format: 'int64',
            },
            parentId: {
              type: 'integer',
              description: '父id',
              format: 'int64',
            },
            deptId: {
              type: 'integer',
              description: '部门id',
              format: 'int64',
            },
            userId: {
              type: 'integer',
              description: '用户id',
              format: 'int64',
            },
            treeName: {
              type: 'string',
              description: '树节点名',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
          },
          description: '测试树表视图对象 test_tree',
        },
        RListTestTreeVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/TestTreeVo',
              },
            },
          },
          description: '响应信息主体',
        },
        RTestSensitive: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/TestSensitive',
            },
          },
          description: '响应信息主体',
        },
        TestSensitive: {
          type: 'object',
          properties: {
            idCard: {
              type: 'string',
              description: '身份证',
            },
            phone: {
              type: 'string',
              description: '电话',
            },
            address: {
              type: 'string',
              description: '地址',
            },
            email: {
              type: 'string',
              description: '邮箱',
            },
            bankCard: {
              type: 'string',
              description: '银行卡',
            },
          },
          description: '',
        },
        TestI18nBo: {
          required: ['age', 'name'],
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            age: {
              type: 'integer',
              format: 'int32',
            },
          },
          description: '',
        },
        RTestI18nBo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/TestI18nBo',
            },
          },
          description: '响应信息主体',
        },
        RMapStringTestDemoEncrypt: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'object',
              additionalProperties: {
                $ref: '#/components/schemas/TestDemoEncrypt',
              },
            },
          },
          description: '响应信息主体',
        },
        TestDemoEncrypt: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: '主键',
              format: 'int64',
            },
            deptId: {
              type: 'integer',
              description: '部门id',
              format: 'int64',
            },
            userId: {
              type: 'integer',
              description: '用户id',
              format: 'int64',
            },
            orderNum: {
              type: 'integer',
              description: '排序号',
              format: 'int32',
            },
            testKey: {
              type: 'string',
              description: 'key键',
            },
            value: {
              type: 'string',
              description: '值',
            },
            version: {
              type: 'integer',
              description: '版本',
              format: 'int64',
            },
          },
          description: '',
        },
        RTestDemoVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/TestDemoVo',
            },
          },
          description: '响应信息主体',
        },
        TestDemoVo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '主键',
              format: 'int64',
            },
            deptId: {
              type: 'integer',
              description: '部门id',
              format: 'int64',
            },
            userId: {
              type: 'integer',
              description: '用户id',
              format: 'int64',
            },
            orderNum: {
              type: 'integer',
              description: '排序号',
              format: 'int32',
            },
            testKey: {
              type: 'string',
              description: 'key键',
            },
            value: {
              type: 'string',
              description: '值',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            createBy: {
              type: 'string',
              description: '创建人',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'string',
              description: '更新人',
            },
          },
          description: '测试单表视图对象 test_demo',
        },
        PageQuery: {
          type: 'object',
          properties: {
            pageSize: {
              type: 'integer',
              description: '分页大小',
              format: 'int32',
            },
            current: {
              type: 'integer',
              description: '当前页数',
              format: 'int32',
            },
            orderByColumn: {
              type: 'string',
              description: '排序列',
            },
            isAsc: {
              type: 'string',
              description: '排序的方向desc或者asc',
            },
          },
          description: '分页查询实体类',
        },
        TableDataInfoTestDemoVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/TestDemoVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        RBoolean: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'boolean',
            },
          },
          description: '响应信息主体',
        },
        TaskInfoQueryBo: {
          type: 'object',
          properties: {
            taskName: {
              type: 'string',
              description: '任务名称',
            },
            nodeName: {
              type: 'string',
              description: '当前环节',
            },
            createByName: {
              type: 'string',
              description: '发起人姓名',
            },
            createTimeStart: {
              type: 'string',
              description: '创建时间-开始',
              format: 'date-time',
            },
            createTimeEnd: {
              type: 'string',
              description: '创建时间-结束',
              format: 'date-time',
            },
            flowStatus: {
              type: 'integer',
              description: '审批状态',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description: '担保受理状态',
              format: 'int32',
            },
          },
          description: '任务列表查询入参',
        },
        TableDataInfoTaskInfoListVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/TaskInfoListVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        TaskInfoListVo: {
          type: 'object',
          properties: {
            taskId: {
              type: 'integer',
              description: '任务id',
              format: 'int64',
            },
            businessId: {
              type: 'integer',
              description: '业务主表id',
              format: 'int64',
            },
            businessType: {
              type: 'integer',
              description:
                '业务类型：1业务录入，2借据录入，3解保录入，4保后检查录入，5风险预警录入，6预警解除录入，7代偿方案录入，8代偿申请录入',
              format: 'int64',
            },
            taskName: {
              type: 'string',
              description: '任务名称',
            },
            taskNote: {
              type: 'string',
              description: '任务摘要',
            },
            nodeName: {
              type: 'string',
              description: '当前环节名称',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除；字典key=guaranteeStatus',
              format: 'int32',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            createByName: {
              type: 'string',
              description: '发起人',
            },
            createTime: {
              type: 'string',
              description: '发起时间',
              format: 'date-time',
            },
          },
          description: '任务列表查询返回 task_info',
        },
        TaskCheckInfoBo: {
          type: 'object',
          properties: {
            businessId: {
              type: 'integer',
              description: '业务主表id',
              format: 'int64',
            },
            businessType: {
              type: 'integer',
              description:
                '业务类型：1业务录入，2借据录入，3解保录入，4保后检查录入，5风险预警录入，6预警解除录入，7代偿方案录入，8代偿申请录入',
              format: 'int32',
            },
          },
          description: '',
        },
        RTaskCheckInfo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/TaskCheckInfo',
            },
          },
          description: '响应信息主体',
        },
        TaskCheckInfo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '主键id',
              format: 'int64',
            },
            businessId: {
              type: 'integer',
              description: '业务主表id',
              format: 'int64',
            },
            businessType: {
              type: 'integer',
              description:
                '业务类型：1业务录入，2借据录入，3解保录入，4保后检查录入，5风险预警录入，6预警解除录入，7代偿方案录入，8代偿申请录入',
              format: 'int32',
            },
            checkInfo: {
              type: 'string',
              description: '系统校验信息（不通过规则）',
            },
            suggestInfo: {
              type: 'string',
              description: '其它信息（人工补录信息）',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
          },
          description: '系统校验信息表 task_check_info',
        },
        BatchResultVo: {
          type: 'object',
          properties: {
            sumCount: {
              type: 'integer',
              description: '总条数',
              format: 'int32',
            },
            successCount: {
              type: 'integer',
              description: '成功条数',
              format: 'int32',
            },
            failCount: {
              type: 'integer',
              description: '失败条数',
              format: 'int32',
            },
            list: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Detail',
              },
            },
          },
          description: '批量处理返回',
        },
        Detail: {
          type: 'object',
          properties: {
            num: {
              type: 'integer',
              description: '导入数据第N行',
              format: 'int32',
            },
            detailNote: {
              type: 'string',
              description: '任务名称',
            },
            failMessage: {
              type: 'string',
              description: '失败原因',
            },
            detailBusinessId: {
              type: 'integer',
              description: '任务id',
              format: 'int64',
            },
          },
          description: '',
        },
        RBatchResultVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/BatchResultVo',
            },
          },
          description: '响应信息主体',
        },
        TaskApprovalRecordBo: {
          required: [
            'approvalFileName',
            'approvalFileOriginalName',
            'approvalMessage',
            'approvalType',
            'bankId',
            'bankName',
            'createByName',
            'deptName',
            'flowStatus',
            'guaranteeStatus',
            'id',
            'nodeName',
            'nodeType',
            'organizationId',
            'organizationName',
            'ossIds',
            'roleIds',
            'taskId',
            'taskNodeId',
            'updateByName',
          ],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: '数据库主键',
              format: 'int64',
            },
            taskId: {
              type: 'integer',
              description: '任务id',
              format: 'int64',
            },
            taskNodeId: {
              type: 'integer',
              description: '任务节点id',
              format: 'int64',
            },
            nodeName: {
              type: 'string',
              description: '节点名称',
            },
            approvalBankType: {
              type: 'integer',
              description:
                '审批行类型：1 总行 2分行 3支行；字典key=approvalBankType',
              format: 'int32',
            },
            roleIds: {
              type: 'string',
              description: '角色id，英文逗号分隔',
            },
            approvalType: {
              type: 'integer',
              description:
                '审批方式：0-会签；1-或签；字典key=workflowApprovalType',
              format: 'int32',
            },
            nodeType: {
              type: 'integer',
              description:
                '节点类型：0-发起人；1-银行复核；2-担保机构复核；9-担保审批；字典key=workflowNodeType',
              format: 'int32',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除；字典key=guaranteeStatus',
              format: 'int32',
            },
            approvalMessage: {
              type: 'string',
              description: '审批意见',
            },
            ossIds: {
              type: 'string',
              description: '审批附件地址',
            },
            approvalFileName: {
              type: 'string',
              description: '审批附件文档名称',
            },
            approvalFileOriginalName: {
              type: 'string',
              description: '审批附件原名称',
            },
            approvedUserIds: {
              type: 'string',
              description: '该任务节点已审批用户id，会签同意时保存',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            deptName: {
              type: 'string',
              description: '部门名称',
            },
          },
          description: '任务审批记录业务对象 task_approval_record',
        },
        FileInfo: {
          type: 'object',
          properties: {
            ossId: {
              type: 'integer',
              description: '附件ossId',
              format: 'int64',
            },
            approvalFileUrl: {
              type: 'string',
              description: '审批附件地址',
            },
            approvalFileOriginalName: {
              type: 'string',
              description: '审批附件原名称',
            },
          },
          description: '',
        },
        TableDataInfoTaskApprovalRecordVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/TaskApprovalRecordVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        TaskApprovalRecordVo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '数据库主键',
              format: 'int64',
            },
            taskId: {
              type: 'integer',
              description: '任务id',
              format: 'int64',
            },
            taskNodeId: {
              type: 'integer',
              description: '任务节点id',
              format: 'int64',
            },
            nodeName: {
              type: 'string',
              description: '节点名称',
            },
            roleIds: {
              type: 'string',
              description: '角色id，英文逗号分隔',
            },
            approvalType: {
              type: 'integer',
              description:
                '审批方式：0-会签；1-或签；字典key=workflowApprovalType',
              format: 'int32',
            },
            nodeType: {
              type: 'integer',
              description:
                '节点类型：0-发起人；1-银行复核；2-担保机构复核；9-担保审批；字典key=workflowNodeType',
              format: 'int32',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除；字典key=guaranteeStatus',
              format: 'int32',
            },
            approvalMessage: {
              type: 'string',
              description: '审批意见',
            },
            approvedUserIds: {
              type: 'string',
              description: '该任务节点已审批用户id，会签同意时保存',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            approvedUserName: {
              type: 'string',
              description: '已审批用户名称',
            },
            approvalUserNames: {
              type: 'string',
              description: '待审批用户名称',
            },
            approvalUserIds: {
              type: 'string',
              description: '待审批用户id',
            },
            updateTime: {
              type: 'string',
              format: 'date-time',
            },
            approvalFileName: {
              type: 'string',
              description: '审批附件文档名称',
            },
            fileList: {
              type: 'array',
              description: '审批附件信息',
              items: {
                $ref: '#/components/schemas/FileInfo',
              },
            },
          },
          description: '任务审批记录视图对象 task_approval_record',
        },
        RListWorkflowNodeConfigVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/WorkflowNodeConfigVo',
              },
            },
          },
          description: '响应信息主体',
        },
        WorkflowNodeConfigVo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '数据库主键',
              format: 'int64',
            },
            workflowConfigId: {
              type: 'integer',
              description: '流程配置id',
              format: 'int64',
            },
            no: {
              type: 'integer',
              description: '节点顺序',
              format: 'int32',
            },
            nodeName: {
              type: 'string',
              description: '节点名称',
            },
            approvalBankType: {
              type: 'integer',
              description:
                '审批行类型：1 总行 2分行 3支行；字典key=approvalBankType',
              format: 'int32',
            },
            roleIds: {
              type: 'string',
              description: '角色id，英文逗号分隔',
            },
            roleNames: {
              type: 'string',
              description: '角色名称，英文逗号分隔',
            },
            approvalType: {
              type: 'integer',
              description:
                '审批方式：0-会签；1-或签；字典key=workflowApprovalType',
              format: 'int32',
            },
            nodeType: {
              type: 'integer',
              description:
                '节点类型：0-发起人；1-银行复核；2-担保机构复核；字典key=workflowNodeType',
              format: 'int32',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            updateByName: {
              type: 'string',
              description: '更新用户',
            },
          },
          description: '流程节点配置视图对象 workflow_node_config',
        },
        WorkflowConfigGetBo: {
          required: [
            'approvalTypes',
            'bankId',
            'bankName',
            'bankNodeNum',
            'createByName',
            'deptName',
            'id',
            'workflowCode',
            'workflowName',
          ],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: '数据库主键',
              format: 'int64',
            },
            workflowName: {
              type: 'string',
              description: '流程名称',
            },
            workflowCode: {
              type: 'string',
              description: '流程类型',
            },
            createBankGrade: {
              type: 'integer',
              description: '发起行层级（同银行表）1 总行 2分行 3支行',
              format: 'int32',
            },
            bankNodeNum: {
              type: 'integer',
              description: '银行审批节点数',
              format: 'int64',
            },
            approvalTypes: {
              type: 'string',
              description: '银行审批节点类型（名称，英文逗号分隔）',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            deptName: {
              type: 'string',
              description: '部门名称',
            },
          },
          description: '流程配置业务对象-查询 workflow_config',
        },
        TableDataInfoWorkflowConfigVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/WorkflowConfigVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        WorkflowConfigVo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: '数据库主键',
              format: 'int64',
            },
            workflowName: {
              type: 'string',
              description: '流程名称',
            },
            createBankGrade: {
              type: 'integer',
              description: '发起行层级（同银行表）1 总行 2分行 3支行',
              format: 'int32',
            },
            workflowCode: {
              type: 'string',
              description: '流程类型',
            },
            bankNodeNum: {
              type: 'integer',
              description: '银行审批节点数',
              format: 'int32',
            },
            approvalTypes: {
              type: 'string',
              description: '银行审批节点类型（名称，英文逗号分隔）',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            deptName: {
              type: 'string',
              description: '部门名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
          },
          description: '流程配置视图对象 workflow_config',
        },
        RSysUser: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/SysUser',
            },
          },
          description: '响应信息主体',
        },
        SysRole: {
          required: ['roleName'],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            roleId: {
              type: 'integer',
              description: '角色ID',
              format: 'int64',
            },
            roleName: {
              maxLength: 30,
              minLength: 0,
              type: 'string',
              description: '角色名称',
            },
            roleKey: {
              type: 'string',
              description: '角色权限',
            },
            dataScope: {
              type: 'integer',
              description:
                '机构数据范围（1全部数据权限 2本机构数据权限 3本机构及以下数据权限 4仅本人数据权限）',
              format: 'int32',
            },
            remark: {
              type: 'string',
              description: '角色说明',
            },
            status: {
              type: 'integer',
              description: '角色状态（0正常 1停用）',
              format: 'int32',
            },
            adminFlag: {
              type: 'integer',
              description: '管理员角色（0是 1否）',
              format: 'int32',
            },
            institutionType: {
              type: 'integer',
              description: '机构类型（0超级管理员 1担保机构 2银行机构）',
              format: 'int32',
            },
            institutionId: {
              type: 'integer',
              description: '机构ID（融资担保机构、银行机构）',
              format: 'int64',
            },
            institutionName: {
              type: 'string',
              description: '机构名称（融资担保机构、银行机构）',
            },
            flag: {
              type: 'boolean',
              description: '用户是否存在此角色标识 默认不存在',
            },
            admin: {
              type: 'boolean',
            },
          },
          description: '角色表 sys_role',
        },
        SysUser: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            userId: {
              type: 'integer',
              description: '用户ID',
              format: 'int64',
            },
            institutionType: {
              type: 'integer',
              description: '机构类型（0超级管理员 1担保机构 2银行机构）',
              format: 'int32',
            },
            institutionId: {
              type: 'integer',
              description: '机构ID（担保机构、银行机构）',
              format: 'int64',
            },
            institutionName: {
              type: 'string',
              description: '机构名称（担保机构、银行机构）',
            },
            userType: {
              type: 'integer',
              description:
                '用户类型（0超级管理员 1担保机构管理员 2担保机构管理员以及审批人员 3担保机构审批人员 4银行机构管理员 5银行机构管理员以及业务人员 6银行机构业务人员）',
              format: 'int32',
            },
            userName: {
              type: 'string',
              description: '用户姓名',
            },
            idNumber: {
              type: 'string',
              description: '身份证号',
            },
            phoneNumber: {
              type: 'string',
              description: '手机号码',
            },
            deptName: {
              type: 'string',
              description: '部门名称',
            },
            position: {
              type: 'string',
              description: '职位',
            },
            workNumber: {
              type: 'string',
              description: '工号',
            },
            email: {
              maxLength: 50,
              minLength: 0,
              type: 'string',
              description: '邮箱',
            },
            password: {
              type: 'string',
              description: '密码',
              writeOnly: true,
            },
            status: {
              type: 'integer',
              description: '帐号状态（0正常 1停用）',
              format: 'int32',
            },
            loginIp: {
              type: 'string',
              description: '最后登录IP',
            },
            loginDate: {
              type: 'string',
              description: '最后登录时间',
              format: 'date-time',
            },
            loginOrganizationId: {
              type: 'integer',
              description: '银行机构非管理员角色上次登录选择的担保机构id',
              format: 'int64',
            },
            roles: {
              type: 'array',
              description: '角色对象',
              items: {
                $ref: '#/components/schemas/SysRole',
              },
            },
            admin: {
              type: 'boolean',
            },
          },
          description: '用户对象 sys_user',
        },
        RListSysRole: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/SysRole',
              },
            },
          },
          description: '响应信息主体',
        },
        QuerySysUserBo: {
          type: 'object',
          properties: {
            institutionName: {
              type: 'string',
              description: '机构名称（担保机构、银行机构）',
            },
            userName: {
              type: 'string',
              description: '用户姓名',
            },
            phoneNumber: {
              type: 'string',
              description: '手机号码',
            },
            status: {
              type: 'integer',
              description: '帐号状态（0正常 1停用）',
              format: 'int32',
            },
          },
          description: '',
        },
        SysUserVo: {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              description: '用户ID',
              format: 'int64',
            },
            institutionType: {
              type: 'integer',
              description: '机构类型（0超级管理员 1担保机构 2银行机构）',
              format: 'int32',
            },
            institutionId: {
              type: 'integer',
              description: '机构ID（担保机构、银行机构）',
              format: 'int64',
            },
            institutionName: {
              type: 'string',
              description: '机构名称（担保机构、银行机构）',
            },
            userType: {
              type: 'integer',
              description:
                '用户类型（0超级管理员 1担保机构管理员 2担保机构管理员以及审批人员 3担保机构审批人员 4银行机构管理员 5银行机构管理员以及业务人员 6银行机构业务人员）',
              format: 'int32',
            },
            userName: {
              type: 'string',
              description: '用户姓名',
            },
            idNumber: {
              type: 'string',
              description: '身份证号',
            },
            phoneNumber: {
              type: 'string',
              description: '手机号码',
            },
            deptName: {
              type: 'string',
              description: '部门名称',
            },
            position: {
              type: 'string',
              description: '职位',
            },
            workNumber: {
              type: 'string',
              description: '工号',
            },
            email: {
              maxLength: 50,
              minLength: 0,
              type: 'string',
              description: '邮箱',
            },
            password: {
              type: 'string',
              description: '密码',
              writeOnly: true,
            },
            status: {
              type: 'integer',
              description: '帐号状态（0正常 1停用）',
              format: 'int32',
            },
            loginIp: {
              type: 'string',
              description: '最后登录IP',
            },
            loginDate: {
              type: 'string',
              description: '最后登录时间',
              format: 'date-time',
            },
            roles: {
              type: 'array',
              description: '角色对象',
              items: {
                $ref: '#/components/schemas/SysRole',
              },
            },
          },
          description: '',
        },
        TableDataInfoSysUserVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysUserVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        RListSysBank: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/SysBank',
              },
            },
          },
          description: '响应信息主体',
        },
        SysBank: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            bankId: {
              type: 'integer',
              description: '银行id',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            parentId: {
              type: 'integer',
              description: '父银行id',
              format: 'int64',
            },
            parentName: {
              type: 'string',
              description: '父银行名称',
            },
            ancestorId: {
              type: 'integer',
              description: '总行id',
              format: 'int64',
            },
            ancestorName: {
              type: 'string',
              description: '总行名称',
            },
            ancestorList: {
              type: 'string',
              description: '祖级列表',
            },
            bankAbbreviation: {
              type: 'string',
              description: '银行简称',
            },
            socialCreditCode: {
              type: 'string',
              description: '统一社会信用代码',
            },
            bankAccountNumber: {
              type: 'string',
              description: '银行联行号',
            },
            bankCoder: {
              type: 'string',
              description: '银行编码',
            },
            grade: {
              type: 'integer',
              description: '层级关系 1 总行 2分行 3支行',
              format: 'int32',
            },
            level: {
              type: 'integer',
              description: '直保系统同步结构层级',
              format: 'int32',
            },
            adminId: {
              type: 'integer',
              description: '管理员id',
              format: 'int64',
            },
            validFlag: {
              type: 'integer',
              description: '同步标志（0有效 1无效）',
              format: 'int32',
            },
          },
          description: '系统-银行机构对象 sys_bank',
        },
        TableDataInfoSysUser: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysUser',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        RSysRole: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/SysRole',
            },
          },
          description: '响应信息主体',
        },
        QueryRoleBo: {
          type: 'object',
          properties: {
            roleName: {
              type: 'string',
            },
            status: {
              type: 'integer',
              format: 'int32',
            },
          },
          description: '系统-融资担保机构业务对象 sys_organization',
        },
        TableDataInfoSysRole: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysRole',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        SysPolicyBo: {
          type: 'object',
          properties: {
            policyName: {
              type: 'string',
              description: '政策名称',
            },
            type: {
              type: 'integer',
              description: '政策类型(0.金融政策1.机构政策)',
              format: 'int32',
            },
            publishType: {
              type: 'integer',
              description: '发布状态（1.未发布 2.已发布 3.已下线）',
              format: 'int32',
            },
            beginTime: {
              type: 'string',
              description: '发文起始日期',
              format: 'date-time',
            },
            endTime: {
              type: 'string',
              description: '发文结束时间',
              format: 'date-time',
            },
          },
          description: '系统-政策业务对象 sys_policy',
        },
        TableDataInfoSysPolicy: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysPolicy',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        RSysPolicy: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/SysPolicy',
            },
          },
          description: '响应信息主体',
        },
        RSysOssVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/SysOssVo',
            },
          },
          description: '响应信息主体',
        },
        SysOssVo: {
          type: 'object',
          properties: {
            ossId: {
              type: 'integer',
              description: '文件编码',
              format: 'int64',
            },
            fileName: {
              type: 'string',
              description: '文件名',
            },
            originalName: {
              type: 'string',
              description: '原名',
            },
            fileSuffix: {
              type: 'string',
              description: '文件后缀名',
            },
            url: {
              type: 'string',
              description: 'URL地址',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
          },
          description: '系统-OSS对象存储视图对象 sys_oss',
        },
        TableDataInfoSysOssVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysOssVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        RListSysOss: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/SysOss',
              },
            },
          },
          description: '响应信息主体',
        },
        RSysOrgInfoVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/SysOrgInfoVo',
            },
          },
          description: '响应信息主体',
        },
        SysOrgInfoVo: {
          type: 'object',
          properties: {
            organizationId: {
              type: 'integer',
              description: '机构id',
              format: 'int64',
            },
            parentId: {
              type: 'integer',
              description: '父机构id',
              format: 'int64',
            },
            parentName: {
              type: 'string',
              description: '父机构名称',
            },
            ancestorId: {
              type: 'integer',
              description: '总公司id',
              format: 'int64',
            },
            ancestorName: {
              type: 'string',
              description: '总公司名称',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            organizationAbbreviation: {
              type: 'string',
              description: '担保机构简称',
            },
            socialCreditCode: {
              type: 'string',
              description: '统一社会信用代码',
            },
            organizationCode: {
              type: 'string',
              description: '担保机构编码',
            },
            organizationCoder: {
              type: 'string',
              description: '担保机构coder-直保系统',
            },
            area: {
              type: 'string',
              description: '所在地区',
            },
            address: {
              type: 'string',
              description: '详细地址',
            },
            grade: {
              type: 'integer',
              description: '层级关系 1总公司 2子公司 3办事处/分公司',
              format: 'int32',
            },
            typer: {
              type: 'integer',
              description: '类型：1运营机构；2管理机构',
              format: 'int32',
            },
            level: {
              type: 'integer',
              description: '直保系统同步结构层级',
              format: 'int32',
            },
            validFlag: {
              type: 'integer',
              description: '同步标志（0有效 1无效）',
              format: 'int32',
            },
            adminId: {
              type: 'integer',
              description: '管理员id',
              format: 'int64',
            },
            adminName: {
              type: 'string',
              description: '管理员姓名',
            },
            adminIdNumber: {
              type: 'string',
              description: '管理员身份证号',
            },
            adminPhoneNumber: {
              type: 'string',
              description: '管理员手机号码',
            },
            adminStatus: {
              type: 'integer',
              description: '管理员帐号状态（0正常 1停用）',
              format: 'int32',
            },
            adminBankId: {
              type: 'integer',
              description: '管理员所在银行ID',
              format: 'int64',
            },
            adminBankName: {
              type: 'string',
              description: '管理员所在银行名称',
            },
            adminWorkNumber: {
              type: 'string',
              description: '管理员工号',
            },
            adminDeptName: {
              type: 'string',
              description: '管理员所在部门',
            },
            adminEmail: {
              type: 'string',
              description: '管理员邮箱',
            },
            bankList: {
              type: 'array',
              description: '关联银行集合',
              items: {
                $ref: '#/components/schemas/SysBank',
              },
            },
          },
          description: '系统-银行机构视图对象 sys_bank',
        },
        RListSysBankNodeVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/SysBankNodeVo',
              },
            },
          },
          description: '响应信息主体',
        },
        SysBankNodeVo: {
          type: 'object',
          properties: {
            bankId: {
              type: 'integer',
              description: '银行id',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            parentId: {
              type: 'integer',
              description: '父银行id',
              format: 'int64',
            },
            parentName: {
              type: 'string',
              description: '父银行名称',
            },
            ancestorId: {
              type: 'integer',
              description: '总行id',
              format: 'int64',
            },
            ancestorName: {
              type: 'string',
              description: '总行名称',
            },
            ancestorList: {
              type: 'string',
              description: '祖级列表',
            },
            bankAbbreviation: {
              type: 'string',
              description: '银行简称',
            },
            socialCreditCode: {
              type: 'string',
              description: '统一社会信用代码',
            },
            bankAccountNumber: {
              type: 'string',
              description: '银行联行号',
            },
            bankCoder: {
              type: 'string',
              description: '银行编码',
            },
            grade: {
              type: 'integer',
              description: '层级关系 1 总行 2分行 3支行',
              format: 'int32',
            },
            level: {
              type: 'integer',
              description: '直保系统同步结构层级',
              format: 'int32',
            },
            validFlag: {
              type: 'integer',
              description: '同步标志（0有效 1无效）',
              format: 'int32',
            },
            adminId: {
              type: 'integer',
              description: '管理员id',
              format: 'int64',
            },
            adminName: {
              type: 'string',
              description: '管理员姓名',
            },
            adminIdNumber: {
              type: 'string',
              description: '管理员身份证号',
            },
            adminPhoneNumber: {
              type: 'string',
              description: '管理员手机号码',
            },
            adminStatus: {
              type: 'integer',
              description: '管理员帐号状态（0正常 1停用）',
              format: 'int32',
            },
            adminBankId: {
              type: 'integer',
              description: '管理员所在银行ID',
              format: 'int64',
            },
            adminBankName: {
              type: 'string',
              description: '管理员所在银行名称',
            },
            adminWorkNumber: {
              type: 'string',
              description: '管理员工号',
            },
            adminDeptName: {
              type: 'string',
              description: '管理员所在部门',
            },
            adminEmail: {
              type: 'string',
              description: '管理员邮箱',
            },
          },
          description: '系统-银行机构视图对象 sys_bank',
        },
        SysOrganizationBo: {
          required: [
            'address',
            'adminId',
            'ancestorId',
            'ancestorList',
            'ancestorName',
            'area',
            'bankIds',
            'createByName',
            'grade',
            'isDel',
            'organizationAbbreviation',
            'organizationCode',
            'organizationCoder',
            'organizationId',
            'organizationName',
            'parentId',
            'parentName',
            'socialCreditCode',
            'updateByName',
          ],
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            organizationId: {
              type: 'integer',
              description: '机构id',
              format: 'int64',
            },
            parentId: {
              type: 'integer',
              description: '父机构id',
              format: 'int64',
            },
            parentName: {
              type: 'string',
              description: '父机构名称',
            },
            ancestorId: {
              type: 'integer',
              description: '总公司id',
              format: 'int64',
            },
            ancestorName: {
              type: 'string',
              description: '总公司名称',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            organizationAbbreviation: {
              type: 'string',
              description: '担保机构简称',
            },
            socialCreditCode: {
              type: 'string',
              description: '统一社会信用代码',
            },
            organizationCode: {
              type: 'string',
              description: '担保机构编码',
            },
            organizationCoder: {
              type: 'string',
              description: '担保机构coder-直保系统',
            },
            area: {
              type: 'string',
              description: '所在地区',
            },
            address: {
              type: 'string',
              description: '详细地址',
            },
            grade: {
              type: 'integer',
              description: '层级关系 1总公司 2子公司 3办事处/分公司',
              format: 'int32',
            },
            adminId: {
              type: 'integer',
              description: '管理员id',
              format: 'int64',
            },
            bankIds: {
              type: 'string',
              description: '关联银行ids，设置银行非管理员角色用户的有效性',
            },
            ancestorList: {
              type: 'string',
              description: '祖级列表',
            },
          },
          description: '系统-融资担保机构业务对象 sys_organization',
        },
        RListTreeLong: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/TreeLong',
              },
            },
          },
          description: '响应信息主体',
        },
        TreeLong: {
          type: 'object',
          properties: {
            name: {
              type: 'object',
            },
            id: {
              type: 'integer',
              format: 'int64',
            },
            weight: {
              type: 'object',
            },
            parentId: {
              type: 'integer',
              format: 'int64',
            },
            config: {
              $ref: '#/components/schemas/TreeNodeConfig',
            },
            empty: {
              type: 'boolean',
            },
          },
          additionalProperties: {
            type: 'object',
          },
          description: '',
        },
        TreeNodeConfig: {
          type: 'object',
          properties: {
            idKey: {
              type: 'string',
            },
            parentIdKey: {
              type: 'string',
            },
            weightKey: {
              type: 'string',
            },
            nameKey: {
              type: 'string',
            },
            childrenKey: {
              type: 'string',
            },
            deep: {
              type: 'integer',
              format: 'int32',
            },
          },
          description: '',
        },
        QueryOrgBo: {
          type: 'object',
          properties: {
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            organizationCode: {
              type: 'string',
              description: '担保机构编码',
            },
          },
          description: '系统-融资担保机构业务对象 sys_organization',
        },
        SysOrgNodeVo: {
          type: 'object',
          properties: {
            organizationId: {
              type: 'integer',
              description: '机构id',
              format: 'int64',
            },
            parentId: {
              type: 'integer',
              description: '父机构id',
              format: 'int64',
            },
            parentName: {
              type: 'string',
              description: '父机构名称',
            },
            ancestorId: {
              type: 'integer',
              description: '总公司id',
              format: 'int64',
            },
            ancestorName: {
              type: 'string',
              description: '总公司名称',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            organizationAbbreviation: {
              type: 'string',
              description: '担保机构简称',
            },
            socialCreditCode: {
              type: 'string',
              description: '统一社会信用代码',
            },
            organizationCode: {
              type: 'string',
              description: '担保机构编码',
            },
            organizationCoder: {
              type: 'string',
              description: '担保机构coder-直保系统',
            },
            area: {
              type: 'string',
              description: '所在地区',
            },
            address: {
              type: 'string',
              description: '详细地址',
            },
            grade: {
              type: 'integer',
              description: '层级关系 1总公司 2子公司 3办事处/分公司',
              format: 'int32',
            },
            typer: {
              type: 'integer',
              description: '类型：1运营机构；2管理机构',
              format: 'int32',
            },
            level: {
              type: 'integer',
              description: '直保系统同步结构层级',
              format: 'int32',
            },
            validFlag: {
              type: 'integer',
              description: '同步标志（0有效 1无效）',
              format: 'int32',
            },
            adminId: {
              type: 'integer',
              description: '管理员id',
              format: 'int64',
            },
            adminName: {
              type: 'string',
              description: '管理员姓名',
            },
            adminIdNumber: {
              type: 'string',
              description: '管理员身份证号',
            },
            adminPhoneNumber: {
              type: 'string',
              description: '管理员手机号码',
            },
            adminStatus: {
              type: 'integer',
              description: '管理员帐号状态（0正常 1停用）',
              format: 'int32',
            },
            adminBankId: {
              type: 'integer',
              description: '管理员所在银行ID',
              format: 'int64',
            },
            adminBankName: {
              type: 'string',
              description: '管理员所在银行名称',
            },
            adminWorkNumber: {
              type: 'string',
              description: '管理员工号',
            },
            adminDeptName: {
              type: 'string',
              description: '管理员所在部门',
            },
            adminEmail: {
              type: 'string',
              description: '管理员邮箱',
            },
          },
          description: '系统-银行机构视图对象 sys_bank',
        },
        TableDataInfoSysOrgNodeVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysOrgNodeVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        SysDocumentBo: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            documentName: {
              type: 'string',
              description: '文档名称',
            },
            publishType: {
              type: 'integer',
              description: '发布状态:0已发布 1未发布',
              format: 'int32',
            },
            publishStartTime: {
              type: 'string',
              description: '起始时间',
              format: 'date-time',
            },
            publishEndTime: {
              type: 'string',
              description: '结束时间',
              format: 'date-time',
            },
          },
          description: '系统-文档管理业务对象 sys_document',
        },
        SysDocumentVo: {
          type: 'object',
          properties: {
            documentId: {
              type: 'integer',
              format: 'int64',
            },
            documentName: {
              type: 'string',
            },
            organizationId: {
              type: 'integer',
              description: '担保机构id',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '担保机构名称',
            },
            documentDescription: {
              type: 'string',
              description: '文档描述',
            },
            publishBy: {
              type: 'integer',
              description: '发布者',
              format: 'int64',
            },
            publishByName: {
              type: 'string',
              description: '发布用户',
            },
            publishTime: {
              type: 'string',
              description: '发布日期',
              format: 'date-time',
            },
            publishType: {
              type: 'integer',
              description: '发布状态：0已发布 1未发布',
              format: 'int32',
            },
            fileIds: {
              type: 'string',
              description: '文件ids',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是 2-否',
              format: 'int32',
            },
            ossIds: {
              type: 'array',
              description: '附件ids',
              items: {
                type: 'integer',
                format: 'int64',
              },
            },
            ossList: {
              type: 'array',
              description: '文件列表',
              items: {
                $ref: '#/components/schemas/SysOss',
              },
            },
          },
          description: '',
        },
        TableDataInfoSysDocumentVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysDocumentVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        RSysDocumentVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/SysDocumentVo',
            },
          },
          description: '响应信息主体',
        },
        RSysBankNodeVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/SysBankNodeVo',
            },
          },
          description: '响应信息主体',
        },
        QueryBankBo: {
          type: 'object',
          properties: {
            bankName: {
              type: 'string',
              description: '银行机构名称',
            },
            bankAccountNumber: {
              type: 'string',
              description: '银行联行号',
            },
            searchAllBankId: {
              type: 'integer',
              description: '查询该银行机构体系下的银行机构列表',
              format: 'int64',
            },
          },
          description: '系统-融资担保机构业务对象 sys_organization',
        },
        TableDataInfoSysBankNodeVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysBankNodeVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        RListSysOrganization: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/SysOrganization',
              },
            },
          },
          description: '响应信息主体',
        },
        SysOrganization: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            organizationId: {
              type: 'integer',
              description: '机构id',
              format: 'int64',
            },
            parentId: {
              type: 'integer',
              description: '父机构id',
              format: 'int64',
            },
            parentName: {
              type: 'string',
              description: '父机构名称',
            },
            ancestorId: {
              type: 'integer',
              description: '总公司id',
              format: 'int64',
            },
            ancestorName: {
              type: 'string',
              description: '总公司名称',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            organizationAbbreviation: {
              type: 'string',
              description: '担保机构简称',
            },
            socialCreditCode: {
              type: 'string',
              description: '统一社会信用代码',
            },
            organizationCode: {
              type: 'string',
              description: '担保机构编码',
            },
            organizationCoder: {
              type: 'string',
              description: '担保机构coder-直保系统',
            },
            area: {
              type: 'string',
              description: '所在地区',
            },
            address: {
              type: 'string',
              description: '详细地址',
            },
            grade: {
              type: 'integer',
              description: '层级关系 1总公司 2子公司 3办事处/分公司',
              format: 'int32',
            },
            typer: {
              type: 'integer',
              description: '类型：1运营机构；2管理机构',
              format: 'int32',
            },
            level: {
              type: 'integer',
              description: '直保系统同步结构层级',
              format: 'int32',
            },
            validFlag: {
              type: 'integer',
              description: '同步标志（0有效 1无效）',
              format: 'int32',
            },
            adminId: {
              type: 'integer',
              description: '管理员id',
              format: 'int64',
            },
            bankIds: {
              type: 'string',
              description: '关联银行ids，设置银行非管理员角色用户的有效性',
            },
            ancestorList: {
              type: 'string',
              description: '/**\n 祖级列表',
            },
          },
          description: '系统-融资担保机构对象 sys_organization',
        },
        TableDataInfoSysOperLog: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysOperLog',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        TableDataInfoSysLoginLog: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/SysLoginLog',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        LoginUser: {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              description: '用户ID',
              format: 'int64',
            },
            roleId: {
              type: 'integer',
              description: '数据权限 当前角色ID',
              format: 'int64',
            },
            userName: {
              type: 'string',
              description: '用户名',
            },
            institutionType: {
              type: 'integer',
              description: '机构类型（0超级管理员 1担保机构 2银行机构）',
              format: 'int32',
            },
            institutionId: {
              type: 'integer',
              description: '用户所属机构Id',
              format: 'int64',
            },
            institutionName: {
              type: 'string',
              description: '机构名称（担保机构、银行机构）',
            },
            institutionCoder: {
              type: 'string',
              description: '机构用户所属的担保机构coder',
            },
            institutionGrade: {
              type: 'integer',
              description: '层级关系 1 总行 2分行 3支行',
              format: 'int32',
            },
            organizationId: {
              type: 'integer',
              description: '银行机构非管理员角色用户选择的当前合作担保机构id',
              format: 'int64',
            },
            organizationCoder: {
              type: 'string',
              description:
                '银行机构非管理员角色用户选择的当前合作担保机构coder',
            },
            organizationName: {
              type: 'string',
              description: '银行机构非管理员角色用户选择的当前合作担保机构名称',
            },
            userType: {
              type: 'integer',
              description:
                '用户类型（0超级管理员 1担保机构管理员 2担保机构管理员以及审批人员 3担保机构审批人员 4银行机构管理员 5银行机构管理员以及业务人员 6银行机构业务人员）',
              format: 'int32',
            },
            deptName: {
              type: 'string',
              description: '部门名',
            },
            phoneNumber: {
              type: 'string',
              description: '手机号码',
            },
            primitiveFlag: {
              type: 'boolean',
              description: '密码是否为默认密码',
            },
            token: {
              type: 'string',
              description: '用户唯一标识',
            },
            loginTime: {
              type: 'integer',
              description: '登录时间',
              format: 'int64',
            },
            expireTime: {
              type: 'integer',
              description: '过期时间',
              format: 'int64',
            },
            ipaddr: {
              type: 'string',
              description: '登录IP地址',
            },
            loginLocation: {
              type: 'string',
              description: '登录地点',
            },
            browser: {
              type: 'string',
              description: '浏览器类型',
            },
            os: {
              type: 'string',
              description: '操作系统',
            },
            roleKeyList: {
              uniqueItems: true,
              type: 'array',
              description: '角色权限',
              items: {
                type: 'string',
              },
            },
            roles: {
              type: 'array',
              description: '角色对象',
              items: {
                $ref: '#/components/schemas/RoleDTO',
              },
            },
            admin: {
              type: 'boolean',
            },
            loginId: {
              type: 'string',
            },
          },
          description: '登录用户身份权限',
        },
        RLoginUser: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/LoginUser',
            },
          },
          description: '响应信息主体',
        },
        RoleDTO: {
          type: 'object',
          properties: {
            roleId: {
              type: 'integer',
              description: '角色ID',
              format: 'int64',
            },
            roleName: {
              type: 'string',
              description: '角色名称',
            },
            roleKey: {
              type: 'string',
              description: '角色权限',
            },
            dataScope: {
              type: 'integer',
              description:
                '机构数据范围（1全部数据权限 2本机构数据权限 3本机构及以下数据权限 4仅本人数据权限）',
              format: 'int32',
            },
            institutionType: {
              type: 'integer',
              description: '机构类型（0超级管理员 1担保机构 2银行机构）',
              format: 'int32',
            },
            institutionId: {
              type: 'integer',
              description: '机构ID（融资担保机构、银行机构）',
              format: 'int64',
            },
            institutionName: {
              type: 'string',
              description: '机构名称（融资担保机构、银行机构）',
            },
          },
          description: '角色',
        },
        BuxTemplateTableVo: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: '表名',
            },
            moduleName: {
              type: 'string',
              description: '模块名称',
            },
            pageType: {
              type: 'string',
              description: '页面属性：text、table',
            },
            isRequired: {
              type: 'string',
              description: '是否必填',
            },
            isAdd: {
              type: 'string',
              description: '是否添加',
            },
            tempAttributeTag: {
              type: 'string',
              description: '模板属性标识',
            },
          },
          description: '',
        },
        RListBuxTemplateTableVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/BuxTemplateTableVo',
              },
            },
          },
          description: '响应信息主体',
        },
        BankVO: {
          type: 'object',
          properties: {
            branchBankName: {
              type: 'string',
              description: '合作行名称',
            },
            branchBankCoder: {
              type: 'string',
              description: '合作行编码',
            },
          },
          description: '',
        },
        InfoProductSchemeListVo: {
          type: 'object',
          properties: {
            productSchemeName: {
              type: 'string',
              description: '产品方案的名称',
            },
            productCoder: {
              type: 'string',
              description: '产品coder',
            },
            productSchemeCode: {
              type: 'string',
              description: '产品方案编码',
            },
            productTempId: {
              type: 'string',
              description: '产品模版查询',
            },
            riskSharingRatio: {
              type: 'number',
              description: '债权人风险比例',
            },
            riskRatio: {
              type: 'number',
              description: '担保机构风险比例',
            },
            otherRiskRatio: {
              type: 'number',
              description: '其他风险比例',
            },
            productCooperateList: {
              type: 'array',
              description: '合作行列表',
              items: {
                $ref: '#/components/schemas/BankVO',
              },
            },
          },
          description: '产品方案列表返回',
        },
        TableDataInfoInfoProductSchemeListVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/InfoProductSchemeListVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        RInfoProductSchemeListVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/InfoProductSchemeListVo',
            },
          },
          description: '响应信息主体',
        },
        ClientUserBo: {
          required: ['certificateType', 'identificationCode'],
          type: 'object',
          properties: {
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件号码',
            },
            certificateType: {
              type: 'string',
              description: '债务人证件类型',
            },
          },
          description: '查询入参--债务人信息',
        },
        BusinessOssVo: {
          type: 'object',
          properties: {
            ossId: {
              type: 'integer',
              description: '文件编码',
              format: 'int64',
            },
            fileName: {
              type: 'string',
              description: '文件名',
            },
            originalName: {
              type: 'string',
              description: '原名',
            },
            fileSuffix: {
              type: 'string',
              description: '文件后缀名',
            },
            url: {
              type: 'string',
              description: 'URL地址',
            },
          },
          description: '业务返回oss文件',
        },
        InfoBuxOriginLoanReceiptVo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            applyId: {
              type: 'integer',
              description: '业务录入主表id',
              format: 'int64',
            },
            applyType: {
              type: 'integer',
              description: '录入类型：2产品 1授信',
              format: 'int32',
            },
            originRecordNumber: {
              type: 'string',
              description: '原合同流水号（直保业务编号projectSerial）',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptSum: {
              type: 'number',
              description: '借款借据【借款凭证】金额',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借款借据【借款凭证】余额（元）',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            deptName: {
              type: 'string',
              description: '部门名称',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            updateByName: {
              type: 'string',
              description: '更新用户',
            },
          },
          description: '原业务借据信息视图对象 info_bux_origin_loan_receipt',
        },
        InfoBuxPrjApplyVo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            projectSerial: {
              type: 'string',
              description: '授信流水号',
            },
            buxProjectSerial: {
              type: 'string',
              description: '融资担保授信流水号',
            },
            applyType: {
              type: 'integer',
              description: '录入类型：2产品 1授信',
              format: 'int32',
            },
            branchBank: {
              type: 'string',
              description: '分行名称id',
            },
            branchBankName: {
              type: 'string',
              description: '分行名称',
            },
            businessAddr: {
              type: 'string',
              description: '经营地址',
            },
            businessDetailedAddress: {
              type: 'string',
              description: '经营地址详细地址',
            },
            businessType: {
              type: 'string',
              description:
                '业务类型：01 新增 02 展期 03 借新还旧 04 债重组 06无还本续贷',
            },
            taskId: {
              type: 'integer',
              description: '任务id',
              format: 'int64',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除；字典key=guaranteeStatus',
              format: 'int32',
            },
            certificateType: {
              type: 'string',
              description: '债务人证件类型',
            },
            clientContact: {
              type: 'string',
              description: '债务人联系人',
            },
            clientContactPhone: {
              type: 'string',
              description: '债务人联系电话',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            clientType: {
              type: 'string',
              description: '客户类型（债务人类别）',
            },
            corpIdfCode: {
              type: 'string',
              description: '法定代表人证件号码',
            },
            corporationCertificateType: {
              type: 'string',
              description: '法定代表人证件类型',
            },
            corporationName: {
              type: 'string',
              description: '法定代表人名称',
            },
            counterGuarantee: {
              type: 'string',
              description: '担保服务合同类型',
            },
            counterGuaranteeMeasures: {
              type: 'string',
              description: '反担保措施',
            },
            counterGuaranteeSub: {
              type: 'string',
              description: '担保服务合同',
            },
            guaranteeSub: {
              type: 'string',
              description: '保函模板code',
            },
            currency: {
              type: 'string',
              description: '币种',
            },
            debtorsCertId: {
              type: 'string',
              description: '债务人2证件号码',
            },
            debtorsCertIdType: {
              type: 'string',
              description: '债务人2证件类型',
            },
            debtorsName: {
              type: 'string',
              description: '债务人2名称',
            },
            debtorsNature: {
              type: 'string',
              description: '债务人2类别',
            },
            debtorsPhone: {
              type: 'string',
              description: '债务人2手机号码',
            },
            deposit: {
              type: 'number',
              description: '收取保证金金额（元）',
            },
            discountAmount: {
              type: 'number',
              description: '保费优惠金额',
            },
            enterprisePlan: {
              type: 'string',
              description: '企业划型',
            },
            entrustedContractCode: {
              type: 'string',
              description: '委保合同号',
            },
            exchangeRate: {
              type: 'number',
              description: '人民币汇率中间价',
            },
            file1: {
              type: 'string',
              description: '担保函',
            },
            file2: {
              type: 'string',
              description: '担保服务合同',
            },
            file4: {
              type: 'string',
              description: '其他附件',
            },
            financingVarieties: {
              type: 'string',
              description: '融资品种',
            },
            formulaMode: {
              type: 'string',
              description: '主债权金额计算方式',
            },
            governmentGrantsType: {
              type: 'string',
              description: '政策扶持领域类别',
            },
            guarantee: {
              type: 'string',
              description: '担保函类型',
            },
            guaranteeContractCode: {
              type: 'string',
              description: '保证合同号',
            },
            guaranteePeriod: {
              type: 'string',
              description: '担保期限（月）',
            },
            guaranteeRate: {
              type: 'number',
              description: '融资担保费率（年化）（%）',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件号码',
            },
            industryCategory: {
              type: 'string',
              description: '所属行业（国门类）',
            },
            industryLarge: {
              type: 'string',
              description: '所属行业（国大类）',
            },
            industryMedium: {
              type: 'string',
              description: '所属行业（国中类）',
            },
            industrySmall: {
              type: 'string',
              description: '所属行业（国小类）',
            },
            isBilling: {
              type: 'string',
              description: '是否需要开票',
            },
            isCycle: {
              type: 'string',
              description: '是否自主循环：是1，否0（额度是否可循环使用）',
            },
            isExceedFivethousand: {
              type: 'string',
              description: '在保余额是否超1000万元：是1，否2',
            },
            isFirstLoan: {
              type: 'string',
              description: '是否首次贷款：是1、否2',
            },
            isRelatedJxw: {
              type: 'string',
              description: '是否关联担保（经信委）',
            },
            lendRate: {
              type: 'number',
              description: '贷款利率（年化）（%）',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanContractName: {
              type: 'string',
              description: '借款合同名',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            managerName: {
              type: 'string',
              description: '银行客户经理姓名',
            },
            managerPhone: {
              type: 'string',
              description: '客户经理联系电话',
            },
            obligationAmount: {
              type: 'number',
              description: '主债权金额（元）（借款合同金额）',
            },
            originGuaranteeBalance: {
              type: 'number',
              description: '原业务-责任担保余额(在保余额*担保分险比例)',
            },
            defuseAmount: {
              type: 'number',
              description: '拟化解业务本金（元）  在保余额之和',
            },
            originInsuredBalance: {
              type: 'number',
              description: '原业务余额',
            },
            originRecordNumber: {
              type: 'string',
              description: '原合同流水号（直保业务编号projectSerial）',
            },
            originLoanContractCode: {
              type: 'string',
              description: '原业务借款合同号',
            },
            otherExpenses: {
              type: 'string',
              description: '是否收取保证金以及除担保费之外的其他费用',
            },
            otherRiskRatio: {
              type: 'number',
              description: '风险比例（其他）',
            },
            payTaxes: {
              type: 'number',
              description: '缴纳税收（元）',
            },
            premiumAmount: {
              type: 'number',
              description: '保费金额（元）',
            },
            creditCoder: {
              type: 'string',
              description: '授信方案coder',
            },
            productCoder: {
              type: 'string',
              description: '产品coder',
            },
            productName: {
              type: 'string',
              description: '产品名称',
            },
            productSchemeCoder: {
              type: 'string',
              description: '产品方案coder',
            },
            ratioRemark: {
              type: 'string',
              description: '担保费率备注',
            },
            registrationDetailedAddress: {
              type: 'string',
              description: '登记详细地址',
            },
            registrationPlace: {
              type: 'string',
              description: '登记所在地',
            },
            remark: {
              type: 'string',
              description: '备注',
            },
            riskRatio: {
              type: 'number',
              description: '风险比例（担保）（%）',
            },
            riskSharingRatio: {
              type: 'number',
              description: '分险比例(债权人)（%）',
            },
            strategicClassification: {
              type: 'string',
              description: '战略性新兴产业分类',
            },
            settleStatus: {
              type: 'string',
              description: '0-未结清，1-已结清',
            },
            subjectIdentificationCode: {
              type: 'string',
              description: '债务人经营主体统一社会信用代码',
            },
            subjectName: {
              type: 'string',
              description: '债务人经营主体名称',
            },
            subjectEconomicComponent: {
              type: 'string',
              description: '债务人经营主体经济成分',
            },
            talentsScienceType: {
              type: 'string',
              description: '人才科创类别（01 人才类  02 科创类）',
            },
            taxpayerAddress: {
              type: 'string',
              description: '地址',
            },
            taxpayerBankName: {
              type: 'string',
              description: '开户银行名称',
            },
            taxpayerBankNum: {
              type: 'string',
              description: '开户银行账号',
            },
            taxpayerCellPhone: {
              type: 'string',
              description: '开票手机号',
            },
            taxpayerNumber: {
              type: 'string',
              description: '纳税人识别号',
            },
            taxpayerPhone: {
              type: 'string',
              description: '电话',
            },
            templateId: {
              type: 'string',
              description: '模版coder',
            },
            unitNature: {
              type: 'string',
              description: '单位性质',
            },
            whiteList: {
              type: 'string',
              description: '白名单',
            },
            yearBusinessIncome: {
              type: 'number',
              description: '上一年度营业收入（万元）',
            },
            yearPractices: {
              type: 'string',
              description: '上一年末从业人数',
            },
            yearTotalAssets: {
              type: 'number',
              description: '上一年末资产总额（万元）',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            deptName: {
              type: 'string',
              description: '部门名称',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户',
            },
            selfFlag: {
              type: 'boolean',
              description: '是否本人提交',
            },
            prjContractList: {
              type: 'array',
              description: '项目合同列表',
              items: {
                $ref: '#/components/schemas/OssFileAttachmentVo',
              },
            },
            prjFileList: {
              type: 'array',
              description: '项目附件列表',
              items: {
                $ref: '#/components/schemas/OssFileAttachmentVo',
              },
            },
            receiptList: {
              type: 'array',
              description: '业务录入借据列表',
              items: {
                $ref: '#/components/schemas/InfoBuxOriginLoanReceiptVo',
              },
            },
          },
          description: '业务录入视图对象 info_bux_prj_apply',
        },
        OssFileAttachmentVo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            fileDocName: {
              type: 'string',
              description: '文档名称',
            },
            fileIds: {
              type: 'string',
              description: '文件id,多个逗号隔离(sys_oss.oss_id)',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            signStatus: {
              type: 'integer',
              description: '签署状态0-未签署，1-已签署',
              format: 'int32',
            },
            fileList: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/BusinessOssVo',
              },
            },
          },
          description: '文件组处理返回',
        },
        RInfoBuxPrjApplyVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/InfoBuxPrjApplyVo',
            },
          },
          description: '响应信息主体',
        },
        PrjApplyQueryBo: {
          type: 'object',
          properties: {
            projectSerial: {
              type: 'string',
              description: '授信流水号',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            productSchemeName: {
              type: 'string',
              description: '产品名称',
            },
            bankName: {
              type: 'string',
              description: '债权人名称',
            },
            obligationAmountStart: {
              type: 'number',
              description: '借款合同起始金额',
            },
            obligationAmountEnd: {
              type: 'number',
              description: '借款合同截止金额',
            },
            loanDateStart: {
              type: 'string',
              description: '借款合同起始日期 yyyy-MM-dd',
              format: 'date-time',
            },
            loanDateEnd: {
              type: 'string',
              description: '借款合同截止日期 yyyy-MM-dd',
              format: 'date-time',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                "担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除, 6-担保撤销, 7-担保终止；字典key=guaranteeStatus'",
              format: 'int32',
            },
          },
          description: '系统-业务录入对象 info_bux_prj_apply',
        },
        TableDataInfoInfoBuxPrjApplyVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/InfoBuxPrjApplyVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        BuxOriginLoanSumVo: {
          type: 'object',
          properties: {
            originGuaranteeBalance: {
              type: 'number',
              description: '原业务-责任担保余额(在保余额*担保分险比例)',
            },
            originInsuredBalance: {
              type: 'number',
              description: '原业务余额（拟化解金额和原业务余额相等）',
            },
            defuseAmount: {
              type: 'number',
              description: '拟化解业务本金（元）  在保余额之和',
            },
            originRecordNumber: {
              type: 'string',
              description: '原合同流水号（直保业务编号projectSerial）',
            },
            loanContractCode: {
              type: 'string',
              description: '原业务借款合同号',
            },
            originLoanReceiptList: {
              type: 'array',
              description: '原业务借据信息列表',
              items: {
                $ref: '#/components/schemas/OriginLoanReceipt',
              },
            },
          },
          description: '原业务金额汇总信息',
        },
        OriginLoanReceipt: {
          type: 'object',
          properties: {
            originRecordNumber: {
              type: 'string',
              description: '原合同流水号（直保业务编号projectSerial）',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptSum: {
              type: 'number',
              description: '借款借据【借款凭证】金额',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借款借据【借款凭证】余额（元）',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
          },
          description: '',
        },
        RBuxOriginLoanSumVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/BuxOriginLoanSumVo',
            },
          },
          description: '响应信息主体',
        },
        InfoBuxOriginLoanBo: {
          required: ['certificateType', 'clientName', 'identificationCode'],
          type: 'object',
          properties: {
            bankCoder: {
              type: 'string',
              description: '银行总行coder',
            },
            orgCoder: {
              type: 'string',
              description: '担保机构coder',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件号码',
            },
            certificateType: {
              type: 'string',
              description: '债务人证件类型',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同',
            },
          },
          description: '原业务列表查询入参',
        },
        InfoBuxOriginLoanVo: {
          type: 'object',
          properties: {
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件号码',
            },
            certificateType: {
              type: 'string',
              description: '债务人证件类型',
            },
            bankName: {
              type: 'string',
              description: '债权人-总行名称',
            },
            bankId: {
              type: 'string',
              description: '债权人-coder',
            },
            branchBankName: {
              type: 'string',
              description: '放款行名称',
            },
            branchBank: {
              type: 'string',
              description: '放款行-coder',
            },
            projectSerial: {
              type: 'string',
              description: '原业务流水号',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同编号',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额（元）',
            },
            solveMoney: {
              type: 'number',
              description: '已解保金额（元）',
            },
            insuredBalance: {
              type: 'number',
              description: '在保余额（元）',
            },
            loanEndDate: {
              type: 'string',
              description: '合同到期日',
              format: 'date-time',
            },
            riskRatio: {
              type: 'number',
              description: '风险比例（担保）（%）',
            },
          },
          description: '原业务信息',
        },
        RListInfoBuxOriginLoanVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/InfoBuxOriginLoanVo',
              },
            },
          },
          description: '响应信息主体',
        },
        InfoBuxPrjApplyInitVO: {
          type: 'object',
          properties: {
            isFirstLoan: {
              type: 'string',
              description: '是否首贷户 是1、否0',
            },
          },
          description: '业务录入初始化信息接口',
        },
        RInfoBuxPrjApplyInitVO: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/InfoBuxPrjApplyInitVO',
            },
          },
          description: '响应信息主体',
        },
        LegalTemplateBo: {
          type: 'object',
          properties: {
            productSchemeCoder: {
              type: 'string',
              description: '产品模板coder',
            },
            typer: {
              type: 'string',
              description: '类型：01-担保函；02-担保服务合同类型',
            },
            guaranteeModel: {
              type: 'string',
              description: '(反)担保方式，如最高额',
            },
          },
          description: '系统-业务录入法律模板查询参数',
        },
        LegalTemplateVo: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: '文件名称',
            },
            coder: {
              type: 'string',
              description: '文件coder',
            },
          },
          description: '系统-业务录入法律模板查询返回参数',
        },
        RListLegalTemplateVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/LegalTemplateVo',
              },
            },
          },
          description: '响应信息主体',
        },
        CalPremiumBo: {
          required: [
            'currency',
            'guaranteeRate',
            'loanBeginDate',
            'loanEndDate',
            'obligationAmount',
          ],
          type: 'object',
          properties: {
            currency: {
              type: 'string',
              description: '币种',
            },
            exchangeRate: {
              type: 'number',
              description: '人民币汇率中间价',
            },
            guaranteeRate: {
              type: 'number',
              description: '担保费率',
            },
            loanBeginDate: {
              type: 'string',
              description: '合同起始日',
              format: 'date-time',
            },
            loanEndDate: {
              type: 'string',
              description: '合同到期日',
              format: 'date-time',
            },
            obligationAmount: {
              type: 'number',
              description: '借款合同金额',
            },
            productSchemeCoder: {
              type: 'string',
              description: '产品方案coder',
            },
          },
          description: '计算保费接口请求',
        },
        RBigDecimal: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'number',
            },
          },
          description: '响应信息主体',
        },
        PrjLoanReceiptVo: {
          type: 'object',
          properties: {
            params: {
              type: 'object',
              additionalProperties: {
                type: 'object',
              },
              description: '请求参数',
            },
            createBy: {
              type: 'integer',
              description: '创建者',
              format: 'int64',
            },
            createByName: {
              type: 'string',
              description: '创建用户名称',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            updateBy: {
              type: 'integer',
              description: '更新者',
              format: 'int64',
            },
            updateByName: {
              type: 'string',
              description: '更新用户名称',
            },
            updateTime: {
              type: 'string',
              description: '更新时间',
              format: 'date-time',
            },
            isDel: {
              type: 'integer',
              description: '是否删除：1-是，2-否',
              format: 'int32',
            },
            id: {
              type: 'string',
            },
            busitypeId: {
              type: 'string',
              description: '业务品种ID',
            },
            busitypeName: {
              type: 'string',
              description: '业务品种名称',
            },
            clientCode: {
              type: 'string',
              description: '客户编号',
            },
            clientId: {
              type: 'string',
              description: '客户ID',
            },
            clientName: {
              type: 'string',
              description: '客户名称',
            },
            coder: {
              type: 'string',
              description: '编码',
            },
            creditorCoder: {
              type: 'string',
              description: '债权人coder',
            },
            creditorName: {
              type: 'string',
              description: '债权人名称',
            },
            creditId: {
              type: 'string',
              description: '授信ID',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除，6-担保撤销, 7-担保终止；字典key=guaranteeStatus',
              format: 'int32',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanContractName: {
              type: 'string',
              description: '借款合同名',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            loanReceiptSum: {
              type: 'number',
              description: '借款借据【借款凭证】金额',
            },
            pcoder: {
              type: 'string',
              description: '父编码',
            },
            status: {
              type: 'string',
              description: '借据类型：1 正常  2 结清 3 逾期 4 欠息',
            },
            bizStatus: {
              type: 'string',
              description:
                '借据类型(业务类型,直保系统用)\n ZC在保（正常） YQ逾期 DC代偿 QBZC全部追偿 ZCZJ追偿终结 ZCJB正常解保 ZQJB展期解保 JXHJJB借新还旧解保 ZWCZJB债务重组解保\n StatusCode.java 取值用这里面的取值',
            },
            relationId: {
              type: 'string',
              description: '流程id',
            },
            certificateType: {
              type: 'string',
              description: '证件类型',
            },
            applyId: {
              type: 'string',
              description: '业务申请id',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借据余额（元）',
            },
            loanContractBalance: {
              type: 'number',
              description: '借款合同金余额',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件编号',
            },
            insuredBalance: {
              type: 'number',
              description: '责任余额',
            },
            serialNumber: {
              type: 'string',
              description: '业务流水号',
            },
            guaranteeContractCode: {
              type: 'string',
              description: '保证合同号',
            },
            guaranteePeriod: {
              type: 'string',
              description: '担保期限（月）',
            },
            templateId: {
              type: 'string',
              description: '模板id',
            },
            productCoder: {
              type: 'string',
              description: '产品coder',
            },
            isCycle: {
              type: 'string',
              description: '是否可循环',
            },
            mustMonthFee: {
              type: 'number',
              description: '应收',
            },
            projectSerial: {
              type: 'string',
              description: '业务录入流水号',
            },
            buxProjectSerial: {
              type: 'string',
              description: '融资担保流水号',
            },
            busiStatus: {
              type: 'string',
              description: '业务状态',
            },
            currency: {
              type: 'string',
              description: '币种',
            },
            dimensionType: {
              type: 'string',
              description: '解保维度类型 取自prj_apply的dimensionType',
            },
            fileId: {
              type: 'string',
              description: '附件记录ID',
            },
            branchBank: {
              type: 'string',
              description: '放款行coder 取自业务表',
            },
            branchBankName: {
              type: 'string',
              description: '放款行名称',
            },
            completionDate: {
              type: 'string',
              description: '审批完成时间',
              format: 'date-time',
            },
            loanPremiumAmount: {
              type: 'number',
              description: '本笔借据的保费',
            },
            solveMoney: {
              type: 'number',
              description: '累计解保金额',
            },
            bankId: {
              type: 'string',
              description: '银行id',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            applyType: {
              type: 'string',
              description: '业务种类 1：授信业务 2：产品业务',
            },
            buxCoder: {
              type: 'string',
              description: '直保借据录入coder',
            },
            bankCoder: {
              type: 'string',
              description: '银行coder(直保)',
            },
            ossFileAttachmentVos: {
              type: 'array',
              description: '文件集合',
              items: {
                $ref: '#/components/schemas/OssFileAttachmentVo',
              },
            },
          },
          description: '借据录入列表返回对象',
        },
        RPrjLoanReceiptVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/PrjLoanReceiptVo',
            },
          },
          description: '响应信息主体',
        },
        TableDataInfoPrjLoanReceipt: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/PrjLoanReceipt',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        BuxPrjLoanReceiptBo: {
          type: 'object',
          properties: {
            bankCoder: {
              type: 'string',
              description: '银行总行coder',
            },
            orgCoder: {
              type: 'string',
              description: '担保机构coder',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同编号--支持模糊查询',
            },
          },
          description: '借据录入查询入参',
        },
        BuxPrjLoanReceiptDto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            busitypeId: {
              type: 'string',
              description: '业务品种ID',
            },
            busitypeName: {
              type: 'string',
              description: '业务品种名称',
            },
            clientCode: {
              type: 'string',
              description: '客户编号',
            },
            clientId: {
              type: 'string',
              description: '客户ID',
            },
            clientName: {
              type: 'string',
              description: '客户名称',
            },
            coder: {
              type: 'string',
              description: '编码',
            },
            creditorCoder: {
              type: 'string',
              description: '债权人coder',
            },
            creditorName: {
              type: 'string',
              description: '债权人名称',
            },
            creditId: {
              type: 'string',
              description: '授信ID',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除，6-担保撤销, 7-担保终止；字典key=guaranteeStatus',
              format: 'int32',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanContractName: {
              type: 'string',
              description: '借款合同名',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            loanReceiptSum: {
              type: 'number',
              description: '借款借据【借款凭证】金额',
            },
            pcoder: {
              type: 'string',
              description: '父编码',
            },
            status: {
              type: 'string',
              description: '借据类型：1 正常  2 结清 3 逾期 4 欠息',
            },
            bizStatus: {
              type: 'string',
              description:
                '借据类型(业务类型,直保系统用)\n ZC在保（正常） YQ逾期 DC代偿 QBZC全部追偿 ZCZJ追偿终结 ZCJB正常解保 ZQJB展期解保 JXHJJB借新还旧解保 ZWCZJB债务重组解保\n StatusCode.java 取值用这里面的取值',
            },
            relationId: {
              type: 'string',
              description: '流程id',
            },
            certificateType: {
              type: 'string',
              description: '证件类型',
            },
            applyId: {
              type: 'string',
              description: '业务申请id',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借据余额（元）',
            },
            loanContractBalance: {
              type: 'number',
              description: '借款合同金余额',
            },
            identificationCode: {
              type: 'string',
              description: '债务人证件编号',
            },
            insuredBalance: {
              type: 'number',
              description: '责任余额',
            },
            serialNumber: {
              type: 'string',
              description: '业务流水号',
            },
            guaranteeContractCode: {
              type: 'string',
              description: '保证合同号',
            },
            guaranteePeriod: {
              type: 'string',
              description: '担保期限（月）',
            },
            templateId: {
              type: 'string',
              description: '模板id',
            },
            productCoder: {
              type: 'string',
              description: '产品coder',
            },
            isCycle: {
              type: 'string',
              description: '是否可循环',
            },
            mustMonthFee: {
              type: 'number',
              description: '应收',
            },
            projectSerial: {
              type: 'string',
              description: '业务录入流水号',
            },
            buxProjectSerial: {
              type: 'string',
              description: '融资担保流水号',
            },
            busiStatus: {
              type: 'string',
              description: '业务状态',
            },
            currency: {
              type: 'string',
              description: '币种',
            },
            dimensionType: {
              type: 'string',
              description: '解保维度类型 取自prj_apply的dimensionType',
            },
            fileId: {
              type: 'string',
              description: '附件记录ID',
            },
            branchBank: {
              type: 'string',
              description: '放款行coder 取自业务表',
            },
            branchBankName: {
              type: 'string',
              description: '放款行名称',
            },
            completionDate: {
              type: 'string',
              description: '审批完成时间',
              format: 'date-time',
            },
            loanPremiumAmount: {
              type: 'number',
              description: '本笔借据的保费',
            },
            solveMoney: {
              type: 'number',
              description: '累计解保金额',
            },
            bankId: {
              type: 'string',
              description: '银行id',
            },
            bankCoder: {
              type: 'string',
              description: '银行coder',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            applyType: {
              type: 'string',
              description: '业务种类 1：授信业务 2：产品业务',
            },
          },
          description: '借据录入',
        },
        RListBuxPrjLoanReceiptDto: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/BuxPrjLoanReceiptDto',
              },
            },
          },
          description: '响应信息主体',
        },
        BuxPrjReplaceVo: {
          type: 'object',
          properties: {
            clientId: {
              type: 'string',
              description: '客户ID',
            },
            clientCode: {
              type: 'string',
              description: '债务人编号',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            clientNum: {
              type: 'string',
              description: '债务人证件编号',
            },
            clientType: {
              type: 'string',
              description: '债务人类别',
            },
            loanContract: {
              type: 'string',
              description: '借款合同编号',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额（元）（元）',
            },
            loanBalance: {
              type: 'number',
              description: '借款合同余额（元）（元）',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            iouNum: {
              type: 'string',
              description: '借据编号',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptSum: {
              type: 'number',
              description: '借款借据【借款凭证】金额（元）',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借款借据【借款凭证】余额（元）',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            unReleaseInt: {
              type: 'number',
              description: '债务人未清偿利息（含债权人部分）（元）',
            },
            unReleasePunish: {
              type: 'number',
              description: '债务人未清偿罚息（元）',
            },
            unAlreadyRepayAmt: {
              type: 'number',
              description: '债务人未清偿本金（元）',
            },
            insuredStatus: {
              type: 'integer',
              description: '是否差额解保：0是，1否',
              format: 'int32',
            },
            insuredAmount: {
              type: 'number',
              description: '差额解保金额（元）（元）',
            },
            actualAlreadyRepayAmt: {
              type: 'number',
              description: '实际未清偿本金（元）',
            },
            proposedCompensatedAmount: {
              type: 'number',
              description: '拟代偿金额（元）',
            },
            directInsuranceCompensationRatio: {
              type: 'number',
              description: '直保代偿分险比例（%）',
            },
            intendsToReplaceThePrincipal: {
              type: 'number',
              description: '拟代偿本金（元）',
            },
            proposedCompensationDate: {
              type: 'string',
              description: '拟代偿日期',
              format: 'date-time',
            },
            proposedCompensatedInterest: {
              type: 'number',
              description: '拟代偿利息（元）',
            },
            proposedPenaltyInterest: {
              type: 'number',
              description: '拟代偿罚息（元）',
            },
            contractTerminationAmount: {
              type: 'number',
              description: '合同解除金额（元）',
            },
            compensatoryCause: {
              type: 'string',
              description: '代偿原因',
            },
            compensatoryExplanation: {
              type: 'string',
              description: '代偿说明',
            },
            fileIds: {
              type: 'string',
              description: '附件资料',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除；字典key=guaranteeStatus',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            uuid: {
              type: 'string',
              description: '业务流水号',
            },
            organizationId: {
              type: 'integer',
              description: '机构ID',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '机构名称',
            },
            bankId: {
              type: 'integer',
              description: '银行ID',
              format: 'int64',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            createByName: {
              type: 'string',
              description: '创建用户',
            },
            updateByName: {
              type: 'string',
              description: '更新用户',
            },
          },
          description: '代偿方案视图对象 info_bux_prj_replace',
        },
        RBuxPrjReplaceVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/BuxPrjReplaceVo',
            },
          },
          description: '响应信息主体',
        },
        TableDataInfoBuxPrjReplaceVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/BuxPrjReplaceVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
        BuxPrjInsuredVo: {
          type: 'object',
          properties: {
            projectSerial: {
              type: 'string',
              description: '业务流水号',
            },
            clientCode: {
              type: 'string',
              description: '债务人编号',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            clientNum: {
              type: 'string',
              description: '债务人证件编号',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同编号',
            },
            loanContractAmount: {
              type: 'number',
              description: '借款合同金额（元）',
            },
            loanContractAmountCurrency: {
              type: 'string',
            },
            loanContractBalance: {
              type: 'number',
              description: '借款合同余额（元）',
            },
            loanBeginDate: {
              type: 'string',
              description: '借款合同起始日',
              format: 'date-time',
            },
            loanEndDate: {
              type: 'string',
              description: '借款合同到期日',
              format: 'date-time',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptAmount: {
              type: 'number',
              description: '借款借据【借款凭证】金额（元）',
            },
            loanReceiptBalance: {
              type: 'number',
              description: '借款借据【借款凭证】余额（元）',
            },
            loanReceiptBeginDate: {
              type: 'string',
              description: '借款凭证（借据）起始日期',
              format: 'date-time',
            },
            loanReceiptEndDate: {
              type: 'string',
              description: '借款凭证（借据）到期日期',
              format: 'date-time',
            },
            insuredAmount: {
              type: 'number',
              description: '解保金额（元）',
            },
            insuredDate: {
              type: 'string',
              description: '解保日期',
              format: 'date-time',
            },
            isCompleteRelease: {
              type: 'string',
              description: '本合同担保责任是否完全解除 1是0否',
            },
            remark: {
              type: 'string',
              description: '备注',
            },
            dimensionType: {
              type: 'string',
              description: '解保维度类型：01、合同 02、借据',
            },
            solveState: {
              type: 'string',
              description: '解保状态  0未解保  1已解保',
            },
            fileIds: {
              type: 'string',
              description: '附件资料',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除；字典key=guaranteeStatus',
              format: 'int32',
            },
            id: {
              type: 'integer',
              description: 'ID',
              format: 'int64',
            },
            institutionType: {
              type: 'integer',
              description: '机构类型（0超级管理员 1担保机构 2银行机构）',
              format: 'int32',
            },
            institutionId: {
              type: 'integer',
              description: '用户所属机构Id',
              format: 'int64',
            },
            institutionName: {
              type: 'string',
              description: '机构名称（担保机构、银行机构）',
            },
            institutionCoder: {
              type: 'string',
              description: '机构用户所属的担保机构coder',
            },
            organizationId: {
              type: 'integer',
              description: '银行机构非管理员角色用户选择的当前合作担保机构id',
              format: 'int64',
            },
            organizationName: {
              type: 'string',
              description: '银行机构非管理员角色用户选择的当前合作担保机构名称',
            },
            bankId: {
              type: 'string',
              description: '银行ID',
            },
            bankName: {
              type: 'string',
              description: '银行名称',
            },
            createByName: {
              type: 'string',
              description: '登记人',
            },
            createTime: {
              type: 'string',
              description: '创建时间',
              format: 'date-time',
            },
            deptName: {
              type: 'string',
              description: '登记部门',
            },
            guaranteeValidInfo: {
              type: 'string',
            },
            guaranteeOtherInfo: {
              type: 'string',
            },
          },
          description: '解保录入视图对象 info_bux_prj_insured',
        },
        RBuxPrjInsuredVo: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            msg: {
              type: 'string',
            },
            data: {
              $ref: '#/components/schemas/BuxPrjInsuredVo',
            },
          },
          description: '响应信息主体',
        },
        BuxPrjInsuredPageListBo: {
          type: 'object',
          properties: {
            projectSerial: {
              type: 'string',
              description: '业务录入流水号',
            },
            clientName: {
              type: 'string',
              description: '债务人名称',
            },
            clientNum: {
              type: 'string',
              description: '债务人证件编号',
            },
            dimensionType: {
              type: 'string',
              description: '解保维度类型：01、合同 02、借据',
            },
            flowStatus: {
              type: 'integer',
              description:
                '审批状态：0-待提交，1-审批中，2-已通过，3-退回，4-已否决，5-已撤销；字典key=workflowStatus',
              format: 'int32',
            },
            loanContractCode: {
              type: 'string',
              description: '借款合同号',
            },
            loanReceiptCode: {
              type: 'string',
              description: '借款凭证（借据）编号',
            },
            loanReceiptEndDateRangeStart: {
              type: 'string',
              description: '借款凭证（借据）到期日期 -- 开始',
            },
            loanReceiptEndDateRangeEnd: {
              type: 'string',
              description: '借款凭证（借据）到期日期  -- 结束',
            },
            guaranteeStatus: {
              type: 'integer',
              description:
                '担保受理状态:1-担保审批中，2-担保同意，3-担保退回，4-担保否决，5-担保删除；字典key=guaranteeStatus',
              format: 'int32',
            },
          },
          description: '解保录入业务对象 info_bux_prj_insured',
        },
        TableDataInfoBuxPrjInsuredVo: {
          type: 'object',
          properties: {
            total: {
              type: 'integer',
              description: '总记录数',
              format: 'int64',
            },
            rows: {
              type: 'array',
              description: '列表数据',
              items: {
                $ref: '#/components/schemas/BuxPrjInsuredVo',
              },
            },
            code: {
              type: 'integer',
              description: '消息状态码',
              format: 'int32',
            },
            msg: {
              type: 'string',
              description: '消息内容',
            },
          },
          description: '表格分页数据对象',
        },
      },
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  }) as any;

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
