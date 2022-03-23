import * as React from 'react';
import { useState } from 'react';
import { Pagination, Checkbox } from 'antd';
import RenameModal from './RenameModal';
import MoveModal from './MoveModal';

type ImageListProp = {
  handleMoveSingleImg: (folderIndex: number, imgIndex: number) => void;
  handleRemoveImg: (index: number) => void;
  imageData: any[];
  imgData: any[];
  handleDrag: (value: any[]) => void;
  handleRenameImg: (value: { imgName: string }, renameIndex: number) => void;
  imageDataName: string;
  handleCheckedList: (value: []) => void;
  handleImageData: (index: number, check: boolean) => void;
  checkedList: number[];
  handleChooseAll: (value: boolean) => void;
};

const ImageList = (props: ImageListProp) => {
  let movedImgIndex = -1;
  let movedInIndex = -1;
  // const [movedImgIndex, setMovedImgIndex] = useState<number>(-1);
  // const [movedInIndex, setMovedInIndex] = useState<number>(-1);
  const [renameVisible, setRenameVisible] = useState<boolean>(false);
  const [moveVisible, setMoveVisible] = useState<boolean>(false);
  const [renameIndex, setRenameIndex] = useState<number>(0);
  const [moveIndex, setMoveIndex] = useState<number>(0);

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

  const handleRename = (value: { imgName: string }) => {
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
  const handleMove = (value: { folderIndex: number }) => {
    console.log('handleMove', value);
    const folderIndex = value.folderIndex;
    props.handleMoveSingleImg(folderIndex, moveIndex);
  };

  const dragStart = (index: number) => {
    // setMovedImgIndex(index);
    movedImgIndex = index;
  };
  const allowDrop = (e: any) => {
    e.preventDefault();
  };
  const swapImg = (fromIndex: number, toIndex: number): any[] => {
    const picData: any[] = [...props.imageData];
    [picData[fromIndex], picData[toIndex]] = [picData[toIndex], picData[fromIndex]];
    return picData;
  };
  const drop = (index: number, e: any) => {
    console.log('drop');
    e.preventDefault();
    // setMovedInIndex(index);
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
