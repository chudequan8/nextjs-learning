import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { useFieldFetchData } from '../hooks';
import { useMemo } from 'react';

export type MySelectProps<T = any> = Omit<SelectProps, 'options'> & {
  options:
    | SelectProps['options']
    | ((params?: T) => Promise<SelectProps['options']>);
  params?: T;
};

const defaultFieldNames = {
  label: 'label',
  value: 'value',
  options: 'options',
};

// 通过withLabel 可以将option的label字段也一起提交
// 此时 格式为object
const MySelect = (props: MySelectProps) => {
  const {
    options: originalOptions,
    params,
    value: propsValue,
    fieldNames: propsFieldNames,
    ...other
  } = props;

  const [loading, options] = useFieldFetchData(props);

  const fieldNames = useMemo(() => {
    return propsFieldNames
      ? {
          ...defaultFieldNames,
          ...propsFieldNames,
        }
      : defaultFieldNames;
  }, [propsFieldNames]);

  /**
   * @description 当value和options没有匹配到，或者options是接口请求但未返回时，不显示value
   */
  const value = useMemo(() => {
    if (!propsValue) {
      return propsValue;
    }
    if (!options?.length) {
      return undefined;
    }

    const matchValue = (options as NonNullable<SelectProps['options']>).some(
      (item) => {
        const { value: valueKey } = fieldNames;
        return item[valueKey] === propsValue;
      },
    );

    return matchValue ? propsValue : undefined;
  }, [propsValue, options, fieldNames]);

  return (
    <Select
      options={options}
      loading={!!loading}
      value={value}
      fieldNames={fieldNames}
      {...other}
    />
  );
};
export default MySelect;
