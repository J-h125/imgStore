import * as React from 'react';
import { Modal, Form, Input } from 'antd';

type RenameModalProps = {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleRename: (value: { imgName: string }) => void;
};

const RenameModal = (props: RenameModalProps) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    props.handleOk();
    form
      .validateFields()
      .then((value: { imgName: string }) => {
        console.log('rename', value);
        props.handleRename(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    props.handleCancel();
  };
  return (
    <Modal title="重命名" visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
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
