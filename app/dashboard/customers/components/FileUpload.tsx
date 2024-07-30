import { Upload, UploadProps, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { FC } from 'react';

const { Dragger } = Upload;

const uploadProps: UploadProps = {
  multiple: false,
  maxCount: 1,
  accept: 'application/json',
  beforeUpload: (file) => {
    if (file.size && file.size / 1024 / 1024 > 5) {
      message.error('单个文件大小不能超过5M');
      return false || Upload.LIST_IGNORE;
    }
    return false;
  },
};

const FileUpload: FC<UploadProps> = (props) => {
  return (
    <div className=" w-40">
      <Dragger {...uploadProps} {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
      </Dragger>
    </div>
  );
};

export default FileUpload;
