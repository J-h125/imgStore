// import * as React from 'react';
// import { Button, Tree } from 'antd';
// import { CaretRightOutlined, FolderOutlined, FolderAddOutlined } from '@ant-design/icons';
// import AddFileModal from './AddFileModal';
// const { DirectoryTree } = Tree;

// interface AddFileProps {
//   addFileName: (value: any) => void;
//   chooseFolder: (value: any) => void;
//   imgData: object[];
// }

// interface AddFileState {
//   visible: boolean;
//   selectedKey: string;
//   treeData: [];
// }

// class AddFile extends React.Component<AddFileProps, AddFileState> {
//   constructor(props: AddFileProps) {
//     super(props);
//     this.state = {
//       visible: false,
//       selectedKey: '',
//       treeData: [
//         {
//           title: '根目录',
//           key: '0-0',
//           children: [],
//         },
//         {
//           title: '在线图库',
//           key: '0-1',
//           children: [],
//         },
//       ],
//     };
//   }
//   selectedKey: string = '';
//   onSelect(selectedKeys: React.Key[], info: any) {
//     console.log('selected', selectedKeys, info);
//     this.selectedKey = selectedKeys[0].toString();
//     console.log(this.selectedKey);
//     this.props.chooseFolder(info.node.title);
//     console.log(info.node.title);
//   }

//   showModal() {
//     this.setState({ visible: true });
//     console.log('showModel');
//   }
//   handleOk() {
//     console.log('handleOk');
//     this.setState({ visible: false });
//   }
//   handleCancel() {
//     console.log('handleCancel');
//     this.setState({ visible: false });
//   }
//   handleFileName(value: any) {
//     const filename = { name: value.folder };
//     const treeData = this.state.treeData;
//     this.addNode(treeData, value);
//     this.setState({
//       treeData: [...treeData],
//     });
//     console.log('this.treeData', this.state.treeData);
//     console.log('filename', filename);
//     this.props.addFileName(filename);
//   }
//   addNode(treeData: any, value: any) {
//     treeData.forEach((item: any) => {
//       console.log('item.key', item.key);

//       if (item.key === this.selectedKey) {
//         console.log('add', item.key);
//         if (item.children) {
//           item.children.push({
//             title: value.folder,
//             key: this.selectedKey + '-' + item.children.length,
//             children: [],
//           });
//         } else {
//           item.children = [];
//           item.children.push({
//             title: value.folder,
//             key: this.selectedKey + '-' + item.children.length,
//             children: [],
//           });
//         }
//       } else {
//         if (item.children && item.children.length) {
//           this.addNode(item.children, value);
//         }
//       }
//     });
//   }
//   // chooseFolder(index: number) {
//   //   console.log('选第' + (index + 1) + '个图库');
//   //   this.props.chooseFolder(index);
//   // }
//   render() {
//     return (
//       <div>
//         <Button onClick={this.showModal.bind(this)}>
//           <FolderAddOutlined />
//           新建文件夹
//         </Button>
//         <AddFileModal
//           visible={this.state.visible}
//           handleOk={this.handleOk.bind(this)}
//           handleCancel={this.handleCancel.bind(this)}
//           handleFileName={this.handleFileName.bind(this)}
//         />
//         <DirectoryTree
//           style={{ marginTop: '10px' }}
//           defaultExpandedKeys={['0-0-0', '0-0-1']}
//           defaultSelectedKeys={['0-0-0', '0-0-1']}
//           onSelect={this.onSelect.bind(this)}
//           treeData={this.state.treeData}
//         />
//         {/* <div style={{ marginTop: '10px' }}>
//           {this.props.imgData.map((item: any, index) => {
//             return (
//               <div
//                 key={item.name + index}
//                 style={{ cursor: 'pointer', margin: '8px 0' }}
//                 onClick={this.chooseFolder.bind(this, index)}
//               >
//                 <CaretRightOutlined style={{ marginRight: '14px', fontSize: '12px' }} />
//                 <FolderOutlined style={{ marginRight: '3px' }} />
//                 {item.name}({item.data.length})
//               </div>
//             );
//           })}
//         </div> */}
//       </div>
//     );
//   }
// }

// export default AddFile;
import * as React from 'react';
import { useState } from 'react';
import { Button, Tree } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import AddFileModal from './AddFileModal';
const { DirectoryTree } = Tree;

const AddFile: React.FC<any> = (props) => {
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
  const [visible, setVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');
  const [treeData, setTreeData] = useState(initTreeData);

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
  const addNode = (addTreeData: any, value: any) => {
    addTreeData.forEach((item: any) => {
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
  const handleFileName = (value: any) => {
    const filename = { name: value.folder };
    const tempTreeData = treeData;
    addNode(treeData, value);
    setTreeData([...tempTreeData]);
    console.log('this.treeData', treeData);
    console.log('filename', filename);
    props.addFileName(filename);
  };

  // chooseFolder(index: number) {
  //   console.log('选第' + (index + 1) + '个图库');
  //   this.props.chooseFolder(index);
  // }
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
