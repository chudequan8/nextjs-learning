'use client';
import { Button, Form, Modal } from 'antd';
import { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import DqForm from '@/app/components/DqForm';
import { DqFormItem } from '@/app/components/DqForm/type';

type SwaggerForm = {
  name: string;
  uploadType: 0 | 1;
  file: string;
};

const CreateSwagger: FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<SwaggerForm>();

  const formConfigs: DqFormItem<SwaggerForm>[] = [
    {
      name: 'name',
      label: '文档名称',
    },
    {
      name: 'uploadType',
      label: '上传方式',
      type: "radio",
      inputProps: {
        options: [
          {
            label: '上传文件',
            value: 0,
          },
          {
            label: '上传链接',
            value: 1,
          },
        ],
      }
    },
    {
      name: "file",
      label: "上传文档",
      type: "input",
      dependencies: ["uploadType"],
      // visible: (val) => val === 0,
      rules: [
        {
          required: true,
          message: "请上传文件",
        },
      ],
      inputProps: {
        //   type: "file",
        //   accept: ".json",
        //   maxCount: 1,
      },
    }
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        新增
      </Button>
      <Modal
        title="新增接口文档"
        open={open}
        afterClose={() => {
          form.resetFields();
        }}
        onOk={async () => {
          form.validateFields().then(async (val) => {
            // const { paymentExplanationFileIds = [], ...other } = val;
            // const unfinishedFilesCount = paymentExplanationFileIds.filter(
            //   (item) => item.status !== 'done',
            // ).length;
            // Modal.confirm({
            //   title: unfinishedFilesCount > 0 ? `还有${unfinishedFilesCount}个文件未上传完成，是否确定提交？` : '是否确定提交？',
            //   centered: true,
            //   onOk: async () => {
            //     const res = await reviewPriceUsingPUT({
            //       ...other,
            //       paymentExplanationFileIds: paymentExplanationFileIds
            //         .map((item) => item.fileId)
            //         .filter(Boolean)
            //         .join(','),
            //       id: row.id,
            //     });
            //     if (!!res) {
            //       message.success('提交成功');
            //       refreshTable && refreshTable();
            //     }
            //     setOpen(false);
            //   },
            // });
          });
        }}
        centered
        width={464}
        destroyOnClose
        maskClosable={false}
        onCancel={() => setOpen(false)}
      >
        <DqForm
          name="swagger_modal"
          labelCol={{
            span: 5,
          }}
          form={form}
          list={formConfigs}
        />
      </Modal>
    </>
  );
};

export default CreateSwagger;
