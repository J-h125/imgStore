import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { Pagination, Checkbox } from 'antd';
import RenameModal from './RenameModal';
import MoveModal from './MoveModal';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface IImageListProps {
  handleMoveSingleImg: (folderIndex: number, imgIndex: number) => void;
  handleRemoveImg: (index: number) => void;
  imageData: IImageDataType[];
  handleDrag: (value: IImageDataType[]) => void;
  handleRenameImg: (value: { imgName: string }, renameIndex: number) => void;
  imageDataName: string;
  handleImageData: (index: number, check: boolean) => void;
  checkedList: number[];
  handleChooseAll: (value: boolean) => void;
}
interface IImageDataType {
  name: string;
  checked: boolean;
  path: string | undefined;
}

const ImageList = (props: IImageListProps) => {
  let movedImgIndex = useMemo(() => {
    const index = -1;
    return index;
  }, []);
  let movedInIndex = useMemo(() => {
    const index = -1;
    return index;
  }, []);

  // let movedInIndex = -1;
  const [renameVisible, setRenameVisible] = useState<boolean>(false);
  const [moveVisible, setMoveVisible] = useState<boolean>(false);
  const [renameIndex, setRenameIndex] = useState<number>(0);
  const [moveIndex, setMoveIndex] = useState<number>(0);

  const showRemoveModal = useCallback((index: number) => {
    setRenameVisible(true);
    setRenameIndex(index);
    console.log('showModel');
  }, []);
  const showMoveModal = useCallback((index: number) => {
    setMoveVisible(true);
    setMoveIndex(index);
    console.log('showMoveModel');
  }, []);

  const handleRenameOk = useCallback(() => {
    console.log('handleOk');
    setRenameVisible(false);
  }, []);

  const handleRenameCancel = useCallback(() => {
    console.log('handleCancel');
    setRenameVisible(false);
  }, []);

  const handleRename = useCallback(
    (value: { imgName: string }) => {
      console.log('handleRename', value);
      props.handleRenameImg(value, renameIndex);
    },
    [props, renameIndex],
  );

  const handleMoveOk = useCallback(() => {
    console.log('handleOk');
    setMoveVisible(false);
  }, []);

  const handleMoveCancel = useCallback(() => {
    console.log('handleCancel');
    setMoveVisible(false);
  }, []);
  const handleMove = (value: { folderIndex: number }) => {
    console.log('handleMove', value);
    const folderIndex = value.folderIndex;
    props.handleMoveSingleImg(folderIndex, moveIndex);
  };

  const dragStart = (index: number) => {
    movedImgIndex = index;
  };
  const allowDrop = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const swapImg = (fromIndex: number, toIndex: number): IImageDataType[] => {
    const picData: IImageDataType[] = [...props.imageData];
    [picData[fromIndex], picData[toIndex]] = [picData[toIndex], picData[fromIndex]];
    return picData;
  };
  const drop = (index: number, e: React.DragEvent<HTMLDivElement>) => {
    console.log('drop');
    e.preventDefault();
    movedInIndex = index;
    const imgData = swapImg(movedImgIndex, movedInIndex);
    props.handleDrag(imgData);
  };

  const showTotal = () => {
    return `共${props.imageData.length}条`;
  };

  const removeImg = useCallback(
    (index: number) => {
      console.log('删除第' + (index + 1) + '个');
      props.handleRemoveImg(index);
    },
    [props],
  );
  const onChange = useCallback(
    (index: number, e: CheckboxChangeEvent) => {
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
    },
    [props],
  );
  return (
    <div style={{}}>
      <div style={{ margin: '30px 10px', display: 'flex', flexWrap: 'wrap' }}>
        {props.imageData.map((item: IImageDataType, index: number) => {
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
