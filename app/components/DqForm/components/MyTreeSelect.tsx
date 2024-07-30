import { useMemo } from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { useFieldFetchData } from '../hooks';

export interface FieldNames {
  value?: string;
  label?: string;
  children?: string;
}

export type MyTreeSelectProps<T = any> = Omit<TreeSelectProps, 'treeData'> & {
  options:
    | TreeSelectProps['treeData']
    | ((params?: T) => Promise<TreeSelectProps['treeData']>);
  params?: T;
};

const getValue = (
  data: NonNullable<TreeSelectProps['treeData']>,
  fieldNames: Required<FieldNames>,
  target: unknown,
): boolean => {
  const { value: valueKey, children: childrenKey } = fieldNames;
  return data.some((item) => {
    if (item[valueKey] === target) {
      return true;
    }
    if (item[childrenKey]?.length) {
      return getValue(item[childrenKey], fieldNames, target);
    }
    return false;
  });
};

const defaultFieldNames = {
  label: 'title',
  value: 'value',
  children: 'children',
};

const MyTreeSelect = (props: MyTreeSelectProps) => {
  const {
    options,
    params,
    value: propsValue,
    fieldNames: propsFieldNames,
    ...other
  } = props;

  const [loading, treeData] = useFieldFetchData(props);

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
    if (!treeData?.length) {
      return undefined;
    }

    const matchValue = getValue(treeData, fieldNames, propsValue);

    return matchValue ? propsValue : undefined;
  }, [propsValue, treeData, fieldNames]);

  return (
    <TreeSelect
      treeData={treeData}
      loading={loading}
      value={value}
      fieldNames={fieldNames}
      {...other}
    />
  );
};

export default MyTreeSelect;
