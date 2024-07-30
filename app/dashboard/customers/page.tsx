'use client';

import { Button, Form, Input, Radio } from 'antd';
import { FC, useState } from 'react';
import FileUpload from './components/FileUpload';
import request from '@/app/lib/request';
import { useRouter } from 'next/navigation';

const getSwaggerJson = async (data: FormData) => {
  return request<{
    id: number;
  }>({
    url: '/swagger',
    method: 'post',
    data,
  });
};

const UploadSwaggerPage: FC = () => {
  const router = useRouter();

  return (
    <Form
      onFinish={async (values) => {
        const formData = new FormData();
        formData.append('uploadType', values.uploadType);
        if (values.uploadType === 1) {
          formData.append('file', values.file);
        } else {
          formData.append('url', values.url);
        }
        const res = await getSwaggerJson(formData);
        if (res.id) {
          router.push(`/dashboard/customers/step1?id=${res.id}`);
        }
      }}
      labelCol={{
        style: {
          width: 200,
        },
      }}
      initialValues={{
        uploadType: 1,
      }}
    >
      <Form.Item
        label="上传方式"
        name="uploadType"
        rules={[
          {
            required: true,
            message: '请选择上传方式',
          },
        ]}
      >
        <Radio.Group>
          <Radio value={1}>本地上传</Radio>
          <Radio value={2}>在线地址</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item noStyle dependencies={['uploadType']}>
        {({ getFieldValue }) => {
          const uploadType = getFieldValue('uploadType');
          if (uploadType === 1) {
            // resetFields(['file'])
            return (
              <Form.Item
                name="file"
                label="上传文档"
                rules={[
                  {
                    required: true,
                    message: '请上传swagger文档',
                  },
                ]}
                valuePropName="file"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.file;
                }}
              >
                <FileUpload />
              </Form.Item>
            );
          }
          // resetFields(['url'])
          return (
            <Form.Item
              name="url"
              label="文档地址"
              rules={[
                {
                  required: true,
                  message: '请输入文档地址',
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        }}
      </Form.Item>
      <Form.Item noStyle>
        <Button className="ml-[200px]" type="primary" htmlType="submit">
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadSwaggerPage;
