'use client';

import { Button, Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FC } from 'react';

type Step1PageProps = {
  pathList: string[];
};

const Step1Page: FC<Step1PageProps> = ({ pathList }) => {
  const [form] = Form.useForm();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const goNext = (values: any) => {
    const params = new URLSearchParams(searchParams);
    params.set('current', '1');
    params.set('module', values.module);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const addressInputEnd = () => {
    const val = form.getFieldValue('address');
    if (!val) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set('address', val);
    params.delete('baseUrl');
    params.delete('module');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const baseUrlInputEnd = () => {
    const val = form.getFieldValue('baseUrl');
    if (!val) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set('baseUrl', val);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={goNext}
      onFinishFailed={(errorInfo) => {
        console.log('errorInfo', errorInfo);
      }}
      initialValues={{
        address: searchParams.get('address')?.toString(),
        baseUrl: searchParams.get('baseUrl')?.toString(),
        module: searchParams.get('module')?.toString(),
      }}
    >
      <FormItem
        label="请输入 Swagger 文档地址"
        name="address"
        rules={[
          {
            required: true,
            message: '请输入 Swagger 文档地址',
          },
        ]}
      >
        <Input onBlur={addressInputEnd} />
      </FormItem>
      <FormItem label="请输入 baseUrl" name="baseUrl" >
        <Input placeholder='请求接口的路由前缀，没有就填 /' onBlur={baseUrlInputEnd} />
      </FormItem>
      <FormItem
        label="请选择接口模块路径"
        name="module"
        rules={[
          {
            required: true,
            message: '请选择接口模块路径',
          },
        ]}
      >
        <Select
          showSearch
          options={pathList.map((item) => ({
            label: item,
            value: item,
            key: item,
          }))}
        />
      </FormItem>
      <div style={{ marginTop: 24 }}>
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </div>
    </Form>
  );
};

export default Step1Page;
