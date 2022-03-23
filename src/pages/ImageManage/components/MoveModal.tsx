import * as React from 'react';
import { Modal, Form, Select } from 'antd';
const { Option } = Select;

type MoveModalProps = {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleMove: (value: { folderIndex: number }) => void;
  imgData: any[];
  imageDataName: string;
};

const MoveModal = (props: MoveModalProps) => {
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
          label="移动文件夹"
          name="folderIndex"
          rules={[{ required: true, message: '请选择移动文件夹' }]}
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
export default MoveModal;
