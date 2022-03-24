import * as React from 'react';
import { useState, useCallback } from 'react';
import { Button, Tree } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import AddFileModal from './AddFileModal';
const { DirectoryTree } = Tree;

interface IAddFileProps {
  addFileName: (value: { name: string }) => void;
  chooseFolder: (value: string) => void;
}
interface ITreeDataType {
  title: string;
  key: string;
  children?: any[];
}
const AddFile = (props: IAddFileProps) => {
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
  const [treeData, setTreeData] = useState<ITreeDataType[]>(initTreeData);

  const onSelect = useCallback(
    (selectedKeys: React.Key[], info: any) => {
      console.log('selected', selectedKeys, info);
      const tempSelectedKey = selectedKeys[0].toString();
      setSelectedKey(tempSelectedKey);
      console.log(selectedKey);
      props.chooseFolder(info.node.title);
      console.log(info.node.title);
    },
    [props, selectedKey],
  );

  const showModal = useCallback(() => {
    setVisible(true);
    console.log('showModel');
  }, []);
  const handleOk = useCallback(() => {
    console.log('handleOk');
    setVisible(false);
  }, []);
  const handleCancel = useCallback(() => {
    console.log('handleCancel');
    setVisible(false);
  }, []);
  const addNode = useCallback(
    (addTreeData: ITreeDataType[], value: { folder: string }) => {
      addTreeData.forEach((item: ITreeDataType) => {
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
    },
    [selectedKey],
  );
  const handleFileName = useCallback(
    (value: { folder: string }) => {
      const filename = { name: value.folder };
      const tempTreeData = treeData;
      addNode(treeData, value);
      setTreeData([...tempTreeData]);
      console.log('this.treeData', treeData);
      console.log('filename', filename);
      props.addFileName(filename);
    },
    [addNode, props, treeData],
  );

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
