import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Space, Form, Input, Button, Select } from 'antd';
import { getUsers, searchUser } from '@/services/ant-design-pro/api';
import AddUser from './components/AddUser';

const UserManage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '权限',
      dataIndex: 'power',
      key: 'power',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: any) => (
        <>
          {text.map((item: number) => {
            let action = [];
            if (item === 1) {
              action = ['查看'];
            } else {
              action = ['编辑', '删除'];
            }
            return (
              // eslint-disable-next-line react/jsx-key
              <Space key={item}>
                {action.map((i) => {
                  return <a key={i}>{i}</a>;
                })}
              </Space>
            );
          })}
        </>
      ),
    },
  ];
  const data: any[] = [];
  const addUser = () => {
    console.log('新增用户');
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onPowerChange = (value: string) => {
    console.log(value);
  };
  const showTableData = (value: any) => {
    value.data.forEach((item: any, index: number) => {
      let power, action;
      if (item.power === 0) {
        power = '管理员';
        action = [0];
      } else {
        power = '用户';
        action = [1];
      }
      const newItem = {
        key: index + 1,
        userId: item.userId,
        username: item.username,
        phone: item.phone,
        power: power,
        action: action,
      };
      data.push(newItem);
    });
    setTableData(data);
  };
  const getSearchUser = async (values: any) => {
    const userData = await searchUser(values);
    showTableData(userData);
  };
  const getData = async () => {
    const userData = await getUsers();
    showTableData(userData);
  };
  const getAddData = (value: any) => {
    showTableData(value);
  };

  const onFinish = (values: any) => {
    getSearchUser(values);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    getData();
  }, []);
  const routes = [
    {
      path: 'home',
      breadcrumbName: '首页',
    },
    {
      path: 'userPower',
      breadcrumbName: '用户权限',
    },
    {
      path: 'userMange',
      breadcrumbName: '用户管理',
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Button type="primary" style={{ marginBottom: '20px' }} onClick={addUser}>
          新增用户
        </Button>
        <Form
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 5 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="用户" name="username">
            <Input placeholder="请输入用户姓名或手机号" />
          </Form.Item>

          <Form.Item name="power" label="权限" rules={[{ required: false }]}>
            <Select placeholder="请选择权限" onChange={onPowerChange} allowClear>
              <Select.Option value={0}>管理员</Select.Option>
              <Select.Option value={1}>用户</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={tableData} />
        <AddUser
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          getAddData={getAddData}
        />
        {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
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

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item name="gender" label="权限" rules={[{ required: true }]}>
              <Select placeholder="请选择权限" onChange={onGenderChange} allowClear>
                <Select.Option value="admin">管理员</Select.Option>
                <Select.Option value="user">用户</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}
      </Card>
    </PageContainer>
  );
};
export default UserManage;
