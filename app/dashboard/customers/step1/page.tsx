'use client';

import {
  SwaggerOptions,
  generateReqMethods,
  getModuleListByBaseUrl,
} from '@/app/request';
import { Button, Form, Input, Select } from 'antd';
import { useSearchParams, notFound } from 'next/navigation';
import { FC, useState } from 'react';
import CodeEditor from '../../swagger/components/CodeEditor';

type SwaggerFormParams = Omit<SwaggerOptions, 'id'>;


const getBaseUrl = (baseUrl: string) => {
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

const Step1Page: FC = () => {
  const [form] = Form.useForm<SwaggerFormParams>();

  const searchParams = useSearchParams();
  const docId = searchParams.get('id');
  if (!docId) {
    notFound();
  }

  const [moduleNameList, setModuleNameList] = useState<
    { label: string; value: string }[]
  >([]);

  const [reqMethods, setReqMethods] = useState<string>();
  const [typeString, setTypeString] = useState<string>();

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={async (values) => {
          const res = await generateReqMethods({
            ...values,
            baseUrl: getBaseUrl(values.baseUrl),
            id: Number(docId),
          });
          if (res !== undefined) {
            setReqMethods(res.reqMethods);
            setTypeString(res.typeString)
          }
        }}
        onFinishFailed={(errorInfo) => {
          console.log('errorInfo', errorInfo);
        }}
      >
        <Form.Item noStyle>
          <p>填写对应参数</p>
        </Form.Item>
        <Form.Item
          label="请输入 baseUrl"
          name="baseUrl"
          rules={[
            {
              required: true,
              message: '请输入接口路由前缀',
            },
          ]}
        >
          <Input placeholder="请求接口的路由前缀，必填，默认 /" onBlur={async (e) => {
            if (e.target.value) {
              const res = await getModuleListByBaseUrl({
                id: Number(docId),
                baseUrl: getBaseUrl(e.target.value),
              });
              if (res !== undefined) {
                setModuleNameList(
                  res.map((n) => ({
                    label: n,
                    value: n,
                  })),
                );
              }
            }
          }} />
        </Form.Item>
        <Form.Item
          label="请选择接口模块路径"
          name="module"
          rules={[
            {
              required: true,
              message: '请选择接口模块路径',
            },
          ]}
        >
          <Select showSearch options={moduleNameList} />
        </Form.Item>
        <Form.Item label="请输入要忽略的全局基础类型" name="extractType">
          <Input placeholder="基础类型，一般为框架自带最外层的包装类型，默认空" />
        </Form.Item>
        <div style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">
            生成
          </Button>
        </div>
      </Form>
      {reqMethods && typeString && (
        <div className='flex'>
          <div className="flex-1">
            <CodeEditor value={reqMethods} />
          </div>
          <div className="flex-1 ml-4">
            <CodeEditor value={typeString} />
          </div>
        </div>
      )}
    </>
  );
};

export default Step1Page;
