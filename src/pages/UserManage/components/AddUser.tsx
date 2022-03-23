import * as React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { addUser } from '@/services/ant-design-pro/api';

const AddUser: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const handleAddUser = async (value: any) => {
    const addUserData = await addUser(value);
    console.log('addUserData', addUserData);
    props.getAddData(addUserData);
  };
  const handleOk = () => {
    props.handleOk();
    form
      .validateFields()
      .then((value) => {
        console.log(value);
        handleAddUser(value);
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
  const onPowerChange = (value: string) => {
    console.log(value);
  };
  return (
    <Modal title="新增用户" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
          label="手机号"
          name="phone"
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="power" label="权限" rules={[{ required: true }]}>
          <Select placeholder="请选择权限" onChange={onPowerChange} allowClear>
            <Select.Option value={0}>管理员</Select.Option>
            <Select.Option value={1}>用户</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddUser;
