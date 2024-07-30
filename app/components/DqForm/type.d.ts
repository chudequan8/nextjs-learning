import type { ReactNode, ReactElement } from 'react';
import type {
  FormProps,
  FormItemProps,
  InputProps,
  InputNumberProps,
  DatePickerProps,
  ColProps,
} from 'antd';
import type { PasswordProps, TextAreaProps } from 'antd/es/input';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { RadioGroupProps } from 'antd/es/radio/interface';
import type { MySelectProps } from './components/MySelect';
import type { MyTreeSelectProps } from './components/MyTreeSelect';

type WithRender<T> = T & {
  render?: (val: any) => ReactElement | null;
};

type InputType = {
  type?: 'input';
  inputProps?: WithRender<InputProps>;
};
type PasswordType = {
  type?: 'password';
  inputProps?: WithRender<PasswordProps>;
};
type NumberType = {
  type?: 'number';
  inputProps?: WithRender<InputNumberProps>;
};
type TextareaType = {
  type?: 'textarea';
  inputProps?: WithRender<TextAreaProps>;
};
export type SelectType = {
  type: 'select';
  inputProps?: WithRender<MySelectProps>;
};
type TreeSelectType = {
  type: 'tree-select';
  inputProps?: WithRender<MyTreeSelectProps>;
};
type DateType = {
  type: 'date';
  inputProps?: WithRender<DatePickerProps>;
};
type DateRangeType = {
  type: 'date-range';
  inputProps?: WithRender<RangePickerProps>;
};
type RadioType = {
  type: 'radio';
  inputProps?: WithRender<RadioGroupProps>;
};

type ComponentType =
  | InputType
  | PasswordType
  | NumberType
  | TextareaType
  | SelectType
  | TreeSelectType
  | DateType
  | DateRangeType
  | RadioType;

export type IGroupFormItem<T extends Record<string, unknown> = any> = Omit<
  FormItemProps<T>,
  'name'
> & {
  child: INormalFormItem<T>[];
};

export type ICustomField = {
  render: () => ReactNode;
};

export type INormalFormItem<T extends Record<string, unknown> = any> = Omit<
  FormItemProps<T>,
  'name'
> & {
  name: Exclude<keyof T, symbol | number>;
  // inputProps?: ComponentType['inputProps'] & {
  //   render?: (val: string) => ReactElement | null;
  // };
} & ComponentType;

export type ILayoutFormItem<T extends Record<string, unknown>> = {
  layout: ReactElement;
  list: DqFormItem<T>[];
};

type DqFormItem<T extends Record<string, unknown> = any> = (
  | IGroupFormItem<T>
  | INormalFormItem<T>
  | ICustomField
  | ILayoutFormItem<T>
) &
  Pick<ColProps, 'span'>;

export type DqFormProps<T extends Record<string, unknown> = any> =
  FormProps<T> & {
    list: DqFormItem<T>[];
    subbmiter?: ReactNode;
  };
