import * as React from 'react';
import { Modal, Form, Select } from 'antd';
const { Option } = Select;

type MoveAllModalProps = {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleMove: (value: { folder: number }) => void;
  imgData: any[];
  imageDataName: string;
};

const MoveAll = (props: MoveAllModalProps) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    props.handleOk();
    form
      .validateFields()
      .then((value: { folder: number }) => {
        props.handleMove(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    props.handleCancel();
  };

  return (
    <Modal title="移动图片" visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
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
