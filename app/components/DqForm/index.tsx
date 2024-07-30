import React, { createContext, useContext } from 'react';
import { Form, Row, Col } from 'antd';
import { customAlphabet } from 'nanoid';
import FormComponentMap from './components';
import type {
  DqFormItem,
  DqFormProps,
  ICustomField,
  IGroupFormItem,
  INormalFormItem,
  ILayoutFormItem,
} from './type';
import type { FC } from 'react';

const ViewField: FC<INormalFormItem['inputProps']> = (props = {}) => {
  const { value = '--', render } = props;
  if (render) {
    return render(value);
  }
  return (
    <p
      style={{
        lineHeight: '40px',
      }}
    >
      {value}
    </p>
  );
};

const ViewFormItem: FC<INormalFormItem> = (props) => {
  const { inputProps, ...other } = props;
  return (
    <Form.Item {...other}>
      <ViewField {...inputProps} />
    </Form.Item>
  );
};

const EditFormItem: FC<INormalFormItem> = (props) => {
  const { type = 'input', inputProps, dependencies, ...other } = props;
  const Component = FormComponentMap[type] as FC<any>;

  if (dependencies) {
    return (
      <Form.Item noStyle dependencies={dependencies}>
        {({ getFieldsValue }) => {
          const fieldsValue = getFieldsValue(dependencies);

          return (
            <Form.Item {...other}>
              <Component params={fieldsValue} {...inputProps} />
            </Form.Item>
          );
        }}
      </Form.Item>
    );
  }

  return (
    <Form.Item {...other}>
      <Component {...inputProps} />
    </Form.Item>
  );
};

const NormalFormItem = (props: INormalFormItem) => {
  const { type: formType } = useContext(DqFormContext);
  return formType === 'view' ? (
    <ViewFormItem {...props} />
  ) : (
    <EditFormItem {...props} />
  );
};

const GroupFormItem = (props: IGroupFormItem) => {
  const { child, ...other } = props;
  return (
    <Form.Item {...other}>
      {child.map((childItem) => {
        return <NormalFormItem key={childItem.name} {...childItem} />;
      })}
    </Form.Item>
  );
};

export const DqFormContext = createContext<{
  type?: 'view';
}>({});

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10);

const RenderFormContent = <T extends Record<string, any>>(props: {
  formItem: DqFormItem<T>;
}) => {
  const { formItem } = props;

  const RenderFormItem = () => {
    if (formItem.hasOwnProperty('layout')) {
      const { layout, list } = formItem as ILayoutFormItem<T>;
      return React.cloneElement(
        layout,
        layout.props,
        <Row gutter={30}>
          {list.map((childItem, index) => (
            <RenderFormContent key={index} formItem={childItem} />
          ))}
        </Row>,
      );
    }
    if (formItem.hasOwnProperty('render')) {
      return (formItem as ICustomField).render();
    }
    if (!formItem.hasOwnProperty('name') && formItem.hasOwnProperty('child')) {
      return <GroupFormItem key={nanoid()} {...(formItem as IGroupFormItem)} />;
    }
    return <NormalFormItem {...(formItem as INormalFormItem)} />;
  };

  return <Col span={formItem.span || 24}>{RenderFormItem()}</Col>;
};

const DqForm = <T extends Record<string, any>>(props: DqFormProps<T>) => {
  const { subbmiter, list, ...otherProps } = props;
  return (
    <Form<T> autoComplete="off" {...otherProps}>
      <Row>
        {list.map((listItem) => {
          const key = listItem.hasOwnProperty('name')
            ? (listItem as INormalFormItem).name
            : nanoid();
          return <RenderFormContent<T> formItem={listItem} key={key} />;
        })}
      </Row>
      {subbmiter}
    </Form>
  );
};

export default DqForm;
