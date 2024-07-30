import { Input, InputNumber, DatePicker, Radio, Upload } from 'antd';
import MySelect from './MySelect';
import MyTreeSelect from './MyTreeSelect';
// import MyUpload from './MyUpload';

const FormComponentMap = {
  input: Input,
  password: Input.Password,
  select: MySelect,
  'tree-select': MyTreeSelect,
  radio: Radio.Group,
  textarea: Input.TextArea,
  number: InputNumber,
  date: DatePicker,
  'date-range': DatePicker.RangePicker,
  upload: Upload,
};
export default FormComponentMap;
