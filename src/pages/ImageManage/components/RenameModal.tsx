import * as React from 'react';
import { Modal, Form, Input } from 'antd';

const RenameModal: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    props.handleOk();
    form
      .validateFields()
      .then((value) => {
        props.handleRename(value);
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
    <Modal title="重命名" visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
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
          label="图片名称"
          name="imgName"
          rules={[{ required: true, message: '请输入图片名称' }]}
        >
          <Input placeholder="请输入图片名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default RenameModal;
