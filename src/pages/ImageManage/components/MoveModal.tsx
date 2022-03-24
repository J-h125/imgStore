import * as React from 'react';
import { Modal, Form, Select } from 'antd';
import { useCallback, useContext } from 'react';
import { ImgDataContext } from '../index';
const { Option } = Select;

interface IMoveModalProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleMove: (value: { folderIndex: number }) => void;
  imageDataName: string;
}
interface IImageDataType {
  name: string;
  checked: boolean;
  path: string | undefined;
}
interface IImgDataType {
  name: string;
  data: IImageDataType[];
}

const MoveModal = (props: IMoveModalProps) => {
  const [form] = Form.useForm();
  const imgData = useContext<IImgDataType[]>(ImgDataContext);
  const handleOk = useCallback(() => {
    props.handleOk();
    form
      .validateFields()
      .then((value) => {
        props.handleMove(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [form, props]);
  const handleCancel = useCallback(() => {
    props.handleCancel();
  }, [props]);
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
            {imgData.map((item: IImgDataType, index: number) => {
              if (item.name === props.imageDataName) {
                return null;
              } else {
                return (
                  <Option key={index} value={index}>
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
