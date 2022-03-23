import * as React from 'react';
import { Modal, Form, Input } from 'antd';

const AddFileModal: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    props.handleOk();
    form
      .validateFields()
      .then((value) => {
        props.handleFileName(value);
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
    <Modal title="新建文件夹" visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
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
          label="文件夹名称"
          name="folder"
          rules={[{ required: true, message: '请输入文件夹名称' }]}
        >
          <Input placeholder="请输入文件夹名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFileModal;
