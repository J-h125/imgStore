// import * as React from 'react';
// import { Pagination, Checkbox } from 'antd';
// import RenameModal from './RenameModal';
// import MoveModal from './MoveModal';
// interface ImageListProps {
//   imageData: any;
//   imgData: any;
//   imageDataName: string;
//   chooseAll: boolean;
//   checkedList: [];
//   handleCheckedList: (value: any) => void;
//   handleDrag: (value: any) => void;
//   handleRemoveImg: (value: number) => void;
//   handleRenameImg: (value: any, index: number) => void;
//   handleMoveSingleImg: (folderIndex: number, imgIndex: number) => void;
//   handleImageData: (index: any, check: any) => void;
// }

// interface ImageListState {
//   renameVisible: boolean;
//   moveVisible: boolean;
//   renameIndex: number;
//   moveIndex: number;
// }

// class ImageList extends React.Component<ImageListProps, ImageListState> {
//   movedImgIndex: number;
//   movedInIndex: number;
//   constructor(props: ImageListProps) {
//     super(props);
//     this.state = {
//       renameVisible: false,
//       moveVisible: false,
//       renameIndex: 0,
//       moveIndex: 0,
//     };
//     this.dragStart = this.dragStart.bind(this);
//     this.allowDrop = this.allowDrop.bind(this);
//     this.drop = this.drop.bind(this);
//     this.movedImgIndex = -1;
//     this.movedInIndex = -1;
//   }

//   showRemoveModal(index: number) {
//     this.setState({ renameVisible: true, renameIndex: index });
//     console.log('showModel');
//   }
//   showMoveModal(index: number) {
//     this.setState({ moveVisible: true, moveIndex: index });
//     console.log('showMoveModel');
//   }

//   handleRenameOk() {
//     console.log('handleOk');
//     this.setState({ renameVisible: false });
//   }

//   handleRenameCancel() {
//     console.log('handleCancel');
//     this.setState({ renameVisible: false });
//   }

//   handleRename(value: any) {
//     console.log('handleRename', value);
//     this.props.handleRenameImg(value, this.state.renameIndex);
//   }

//   handleMoveOk() {
//     console.log('handleOk');
//     this.setState({ moveVisible: false });
//   }

//   handleMoveCancel() {
//     console.log('handleCancel');
//     this.setState({ moveVisible: false });
//   }

//   handleMove(value: any) {
//     console.log('handleMove', value);
//     const folderIndex = value.folderIndex;
//     this.props.handleMoveSingleImg(folderIndex, this.state.moveIndex);
//   }

//   dragStart(index: number) {
//     this.movedImgIndex = index;
//   }
//   allowDrop(e: any) {
//     e.preventDefault();
//   }
//   drop(index: number, e: any) {
//     e.preventDefault();
//     this.movedInIndex = index;
//     const imgData = this.swapImg(this.movedImgIndex, this.movedInIndex);
//     this.props.handleDrag(imgData);
//   }
//   swapImg(fromIndex: number, toIndex: number) {
//     const picData = [...this.props.imageData];
//     [picData[fromIndex], picData[toIndex]] = [picData[toIndex], picData[fromIndex]];
//     return picData;
//   }
//   showTotal() {
//     return `共${this.props.imageData.length}条`;
//   }
//   removeImg(index: number) {
//     console.log('删除第' + (index + 1) + '个');
//     this.props.handleRemoveImg(index);
//   }
//   onChange(index: number, e: any) {
//     console.log(`checked = ${e.target.checked}--${index}`);
//     let check = false;
//     if (e.target.checked) {
//       check = true;
//       this.props.handleImageData(index, check);
//     } else {
//       check = false;
//       this.props.handleImageData(index, check);
//     }
//     if (this.props.checkedList.length === this.props.imageData.length) {
//       this.props.handleChooseAll(true);
//     }
//   }
//   render() {
//     return (
//       <div style={{}}>
//         <div style={{ margin: '30px 10px', display: 'flex', flexWrap: 'wrap' }}>
//           {this.props.imageData.map((item: any, index: any) => {
//             return (
//               <div
//                 key={index}
//                 style={{ width: '100px', margin: '10px' }}
//                 draggable="true"
//                 onDragStart={(e) => this.dragStart(index, e)}
//                 onDragOver={this.allowDrop}
//                 onDrop={(e) => this.drop(index, e)}
//               >
//                 <Checkbox checked={item.checked} onChange={this.onChange.bind(this, index)} />
//                 <img
//                   src={item.path}
//                   style={{
//                     width: '100px',
//                     height: '100px',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                   }}
//                 />
//                 <div style={{ textAlign: 'center', margin: '2px 0' }}>{item.name}</div>
//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     color: '#1890ff',
//                     fontSize: '10px',
//                   }}
//                 >
//                   <span
//                     style={{ cursor: 'pointer' }}
//                     onClick={this.showRemoveModal.bind(this, index)}
//                   >
//                     重命名
//                   </span>
//                   <span
//                     style={{ cursor: 'pointer' }}
//                     onClick={this.showMoveModal.bind(this, index)}
//                   >
//                     移动
//                   </span>
//                   <span style={{ cursor: 'pointer' }} onClick={this.removeImg.bind(this, index)}>
//                     删除
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <RenameModal
//           visible={this.state.renameVisible}
//           handleOk={this.handleRenameOk.bind(this)}
//           handleCancel={this.handleRenameCancel.bind(this)}
//           handleRename={this.handleRename.bind(this)}
//         />
//         <MoveModal
//           visible={this.state.moveVisible}
//           handleOk={this.handleMoveOk.bind(this)}
//           handleCancel={this.handleMoveCancel.bind(this)}
//           handleMove={this.handleMove.bind(this)}
//           imgData={this.props.imgData}
//           imageDataName={this.props.imageDataName}
//         />
//         {this.props.imageData && this.props.imageData.length ? (
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <Pagination
//               style={{}}
//               size="small"
//               total={50}
//               showTotal={this.showTotal.bind(this)}
//               showSizeChanger
//               showQuickJumper
//             />
//           </div>
//         ) : null}
//       </div>
//     );
//   }
// }

// export default ImageList;

import * as React from 'react';
import { useState } from 'react';
import { Pagination, Checkbox } from 'antd';
import RenameModal from './RenameModal';
import MoveModal from './MoveModal';

const ImageList: React.FC<any> = (props) => {
  let movedImgIndex = -1;
  let movedInIndex = -1;
  const [renameVisible, setRenameVisible] = useState(false);
  const [moveVisible, setMoveVisible] = useState(false);
  const [renameIndex, setRenameIndex] = useState(0);
  const [moveIndex, setMoveIndex] = useState(0);

  const showRemoveModal = (index: number) => {
    setRenameVisible(true);
    setRenameIndex(index);
    console.log('showModel');
  };
  const showMoveModal = (index: number) => {
    setMoveVisible(true);
    setMoveIndex(index);
    console.log('showMoveModel');
  };

  const handleRenameOk = () => {
    console.log('handleOk');
    setRenameVisible(false);
  };

  const handleRenameCancel = () => {
    console.log('handleCancel');
    setRenameVisible(false);
  };

  const handleRename = (value: any) => {
    console.log('handleRename', value);
    props.handleRenameImg(value, renameIndex);
  };

  const handleMoveOk = () => {
    console.log('handleOk');
    setMoveVisible(false);
  };

  const handleMoveCancel = () => {
    console.log('handleCancel');
    setMoveVisible(false);
  };

  const handleMove = (value: any) => {
    console.log('handleMove', value);
    const folderIndex = value.folderIndex;
    props.handleMoveSingleImg(folderIndex, moveIndex);
  };

  const dragStart = (index: number) => {
    movedImgIndex = index;
  };
  const allowDrop = (e: any) => {
    e.preventDefault();
  };
  const swapImg = (fromIndex: number, toIndex: number) => {
    const picData = [...props.imageData];
    [picData[fromIndex], picData[toIndex]] = [picData[toIndex], picData[fromIndex]];
    return picData;
  };
  const drop = (index: number, e: any) => {
    e.preventDefault();
    movedInIndex = index;
    const imgData = swapImg(movedImgIndex, movedInIndex);
    props.handleDrag(imgData);
  };

  const showTotal = () => {
    return `共${props.imageData.length}条`;
  };
  const removeImg = (index: number) => {
    console.log('删除第' + (index + 1) + '个');
    props.handleRemoveImg(index);
  };
  const onChange = (index: number, e: any) => {
    console.log(`checked = ${e.target.checked}--${index}`);
    let check = false;
    if (e.target.checked) {
      check = true;
      props.handleImageData(index, check);
    } else {
      check = false;
      props.handleImageData(index, check);
    }
    if (props.checkedList.length === props.imageData.length) {
      props.handleChooseAll(true);
    }
  };
  return (
    <div style={{}}>
      <div style={{ margin: '30px 10px', display: 'flex', flexWrap: 'wrap' }}>
        {props.imageData.map((item: any, index: any) => {
          return (
            <div
              key={index}
              style={{ width: '100px', margin: '10px' }}
              draggable="true"
              onDragStart={() => dragStart(index)}
              onDragOver={allowDrop}
              onDrop={(e) => drop(index, e)}
            >
              <Checkbox checked={item.checked} onChange={(e) => onChange(index, e)} />
              <img
                src={item.path}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
              <div style={{ textAlign: 'center', margin: '2px 0' }}>{item.name}</div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#1890ff',
                  fontSize: '10px',
                }}
              >
                <span style={{ cursor: 'pointer' }} onClick={() => showRemoveModal(index)}>
                  重命名
                </span>
                <span style={{ cursor: 'pointer' }} onClick={() => showMoveModal(index)}>
                  移动
                </span>
                <span style={{ cursor: 'pointer' }} onClick={() => removeImg(index)}>
                  删除
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <RenameModal
        visible={renameVisible}
        handleOk={handleRenameOk}
        handleCancel={handleRenameCancel}
        handleRename={handleRename}
      />
      <MoveModal
        visible={moveVisible}
        handleOk={handleMoveOk}
        handleCancel={handleMoveCancel}
        handleMove={handleMove}
        imgData={props.imgData}
        imageDataName={props.imageDataName}
      />
      {props.imageData && props.imageData.length ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            size="small"
            total={50}
            showTotal={showTotal}
            showSizeChanger
            showQuickJumper
          />
        </div>
      ) : null}
    </div>
  );
};

export default ImageList;
