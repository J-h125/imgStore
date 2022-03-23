import * as React from 'react';
import { Modal, Form, Select } from 'antd';
const { Option } = Select;

const MoveAll: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    props.handleOk();
    form
      .validateFields()
      .then((value) => {
        props.handleMove(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    props.handleCancel();
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal title="移动图片" visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="移动目标"
          name="folder"
          rules={[{ required: true, message: '请输入文件夹名称' }]}
        >
          <Select placeholder="请选择文件夹">
            {props.imgData.map((item: any, index: number) => {
              if (item.name === props.imageDataName) {
                return null;
              } else {
                return (
                  <Option key={item + index} value={index}>
                    {item.name}
                  </Option>
                );
              }
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MoveAll;
