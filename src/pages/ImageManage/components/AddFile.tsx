import * as React from 'react';
import { useState } from 'react';
import { Button, Tree } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import AddFileModal from './AddFileModal';
const { DirectoryTree } = Tree;

type AddFileProps = {
  imgData: any[];
  addFileName: (value: { name: string }) => void;
  chooseFolder: (value: string) => void;
};
interface TreeDataType {
  title: string;
  key: string;
  children: any[];
}
const AddFile = (props: AddFileProps) => {
  const initTreeData = [
    {
      title: '根目录',
      key: '0-0',
      children: [],
    },
    {
      title: '在线图库',
      key: '0-1',
      children: [],
    },
  ];
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [treeData, setTreeData] = useState<TreeDataType[]>(initTreeData);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
    const tempSelectedKey = selectedKeys[0].toString();
    setSelectedKey(tempSelectedKey);
    console.log(selectedKey);
    props.chooseFolder(info.node.title);
    console.log(info.node.title);
  };

  const showModal = () => {
    setVisible(true);
    console.log('showModel');
  };
  const handleOk = () => {
    console.log('handleOk');
    setVisible(false);
  };
  const handleCancel = () => {
    console.log('handleCancel');
    setVisible(false);
  };
  const addNode = (addTreeData: TreeDataType[], value: { folder: string }) => {
    addTreeData.forEach((item: TreeDataType) => {
      console.log('item.key', item.key);

      if (item.key === selectedKey) {
        console.log('add', item.key);
        if (item.children) {
          item.children.push({
            title: value.folder,
            key: selectedKey + '-' + item.children.length,
            children: [],
          });
        } else {
          item.children = [];
          item.children.push({
            title: value.folder,
            key: selectedKey + '-' + item.children.length,
            children: [],
          });
        }
      } else {
        if (item.children && item.children.length) {
          addNode(item.children, value);
        }
      }
    });
  };
  const handleFileName = (value: { folder: string }) => {
    const filename = { name: value.folder };
    const tempTreeData = treeData;
    addNode(treeData, value);
    setTreeData([...tempTreeData]);
    console.log('this.treeData', treeData);
    console.log('filename', filename);
    props.addFileName(filename);
  };

  return (
    <div>
      <Button onClick={showModal}>
        <FolderAddOutlined />
        新建文件夹
      </Button>
      <AddFileModal
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleFileName={handleFileName}
      />
      <DirectoryTree
        style={{ marginTop: '10px' }}
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};

export default AddFile;
