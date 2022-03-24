import * as React from 'react';
import { Modal, Form, Input } from 'antd';
import { useCallback } from 'react';

interface IRenameModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleRename: (value: { imgName: string }) => void;
}

const RenameModal = (props: IRenameModalProps) => {
  const [form] = Form.useForm();
  const handleOk = useCallback(() => {
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
  }, [form, props]);
  const handleCancel = useCallback(() => {
    props.handleCancel();
  }, [props]);
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
