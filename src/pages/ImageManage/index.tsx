import * as React from 'react';
import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Input, Button, Space, Upload, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImageList from './components/ImageList';
import AddFile from './components/AddFile';
import MoveAllModal from './components/MoveAllModal';
import imgData1 from '@/imgPath';
const { Search } = Input;

const ImageManage = () => {
  const [imgData, setImgData] =
    useState<{ name: string; data: { name: string; checked: boolean; path: string }[] }[]>(
      imgData1,
    );
  const tempImageData: { name: string; checked: boolean; path: string }[] = imgData[1].data;
  const [imageData, setImageData] = useState<any[]>(tempImageData);
  const [chooseAll, setChooseAll] = useState<boolean>(false);
  const [imageDataName, setImageDataName] = useState<string>('在线图库');
  const [visible, setVisible] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const onSearch = (value: string) => {
    console.log(value);
    const newImgList: { name: string; checked: boolean; path: string }[] = [];
    imageData.forEach((item: { name: string; checked: boolean; path: string }) => {
      if (item.name.match(value)) {
        newImgList.push(item);
      }
    });
    setImageData(newImgList);
  };

  const addFileName = (value: { name: string }) => {
    console.log('value', value);
    const newImgData = Object.assign(value, { data: [] });
    setImgData([...imgData, newImgData]);
    console.log(imgData);
  };
  const handleDrag = (value: { name: string; checked: boolean; path: string }[]) => {
    console.log('handleDray', value);
    setImageData(value);
  };
  const chooseFolder = (value: string) => {
    console.log('chooseFolder', value);
    console.log(imgData1);
    setImageDataName(value);
    imgData.forEach((item) => {
      if (item.name === value) {
        setImageData(item.data);
      }
    });
    console.log('imageData', ImageData);
    // setImageData(imgData[value].data);
    // setImageDataIndex(value);
    // console.log('imageDataIndex' + imageDataIndex);
  };
  const onChange = (e: { target: { checked: boolean } }) => {
    console.log(`checked = ${e.target.checked}`);
    setChooseAll(e.target.checked);
    const temp = imageData;
    if (e.target.checked) {
      temp.forEach((item) => {
        item.checked = true;
      });
    } else {
      temp.forEach((item) => {
        item.checked = false;
      });
    }
    setImageData([...temp]);
  };
  const removeAll = () => {
    console.log('removeAll');
    if (chooseAll) {
      const emptyData: [] = [];
      setImageData(emptyData);
      const tempData = imgData;
      tempData.forEach((item) => {
        if (item.name === imageDataName) {
          item.data = [];
        }
      });
      setImgData([...tempData]);
      console.log('tempData', tempData);
    } else {
      const tempIndex: number[] = [];
      //插入新图库
      imageData.forEach((item, index) => {
        checkedList.forEach((checkItem) => {
          if (index === checkItem) {
            tempIndex.push(index);
          }
        });
      });
      const removeData = imageData;
      for (let i = tempIndex.length - 1; i >= 0; i--) {
        removeData.splice(tempIndex[i], 1);
      }
      setImageData([...removeData]);
      const tempRemoveData = imgData;
      tempRemoveData.forEach((item) => {
        if (item.name === imageDataName) {
          item.data = removeData;
        }
      });
      setCheckedList([]);
    }
    console.log(imgData);
    console.log(imageData);
  };
  const handleRemoveImg = (value: number) => {
    const removeData = imageData;
    removeData.splice(value, 1);
    setImageData([...removeData]);
    const tempRemoveData = imgData;
    tempRemoveData.forEach((item) => {
      if (item.name === imageDataName) {
        item.data = removeData;
      }
    });
    setImgData([...tempRemoveData]);
  };
  const handleRenameImg = (value: { imgName: string }, index: number) => {
    console.log(value, index);
    const tempData = imageData;
    for (let i = 0; i < tempData.length; i++) {
      if (i === index) {
        const oldName = tempData[i].name;
        const suffix = oldName.substring(oldName.lastIndexOf('.'));
        tempData[i].name = value.imgName + suffix;
      }
    }
    setImageData([...tempData]);
  };
  const handleMoveSingleImg = (folderIndex: number, imgIndex: number) => {
    console.log('handleMoveSingleImg', imgIndex);
    const tempData = imgData;
    let tempImg: any = {};
    tempData.forEach((item) => {
      if (item.name === imageDataName) {
        tempImg = item.data[imgIndex];
        handleRemoveImg(imgIndex);
      }
    });
    tempData[folderIndex].data.push(tempImg);
    setImgData([...tempData]);
  };

  const showMoveModal = () => {
    setVisible(true);
    console.log('moveAll');
  };
  const handleMoveOk = () => {
    setVisible(false);
    console.log('handleMoveOk');
  };
  const handleMoveCancel = () => {
    setVisible(false);
    console.log('handleMoveCancel');
  };
  const handleMove = (value: { folder: number }) => {
    console.log('allMove', value);
    const tempImgData = imgData;
    const folderIndex = value.folder;
    if (chooseAll) {
      console.log('handleMove', value);
      console.log('imgData', imgData);
      imageData.forEach((item) => {
        item.checked = false;
      });
      tempImgData[folderIndex].data = tempImgData[folderIndex].data.concat(imageData);
      removeAll();
      setImgData([...tempImgData]);
      setChooseAll(false);
    } else {
      const tempData: any[] = [];
      const tempIndex: number[] = [];
      //插入新图库
      imageData.forEach((item, index) => {
        checkedList.forEach((checkItem) => {
          if (index === checkItem) {
            item.checked = false;
            tempData.push(item);
            tempIndex.push(index);
          }
        });
      });
      //删除要转移的图片
      const removeData = imageData;
      for (let i = tempIndex.length - 1; i >= 0; i--) {
        removeData.splice(tempIndex[i], 1);
      }
      setImageData([...removeData]);
      const tempRemoveData = imgData;
      tempRemoveData.forEach((item) => {
        if (item.name === imageDataName) {
          item.data = removeData;
        }
      });
      console.log('tempData', tempData);
      tempImgData[folderIndex].data = tempImgData[folderIndex].data.concat(tempData);
      setImgData([...tempImgData]);
      setCheckedList([]);
      setChooseAll(false);
      console.log('转移后checkedList', checkedList);
    }
  };
  const handleCheckedList = (value: any) => {
    setCheckedList(value);
    console.log('handleCheckedList', checkedList);
  };

  const handleImageData = (index: number, check: boolean) => {
    const tempCheckedList = checkedList;
    if (check) {
      tempCheckedList.push(index);
    } else {
      tempCheckedList.forEach((item, i) => {
        if (item === index) {
          tempCheckedList.splice(i, 1);
        }
      });
    }
    setCheckedList([...tempCheckedList]);
    console.log('handleCheckedList', checkedList);
    const temp = imageData;
    temp.forEach((item, imgIndex) => {
      if (index === imgIndex) {
        item.checked = check;
        console.log('item', item);
      }
    });
    setImageData([...temp]);

    console.log('imageData', imageData);
  };

  const handleChooseAll = (value: boolean) => {
    setChooseAll(value);
    setCheckedList([]);
  };

  const props = {
    showUploadList: false,
    action: '/api/uploadImage',
    beforeUpload(file: any) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (evt) {
        if (evt.target) {
          // console.log(evt.target.result);
          const newImgData = imageData;
          const newImg: any = {
            name: file.name,
            path: evt.target.result,
            checked: false,
          };
          newImgData.push(newImg);
          setImageData([...newImgData]);
          const tempData = imgData;
          tempData.forEach((item) => {
            if (item.name === imageDataName) {
              item.data = imageData;
            }
          });
          setImgData([...tempData]);
          console.log(imgData);
          console.log(imageData);
        }
      };
    },
    defaultFileList: [],
  };

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard colSpan="20%">
          <AddFile imgData={imgData} addFileName={addFileName} chooseFolder={chooseFolder} />
        </ProCard>
        <ProCard>
          <header>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{imageDataName}</span>
              <Space>
                <Search
                  placeholder="输入名称进行搜索"
                  style={{ width: '250px' }}
                  onSearch={onSearch}
                  enterButton
                />
                <Button onClick={showMoveModal}>批量移动</Button>
                <Button onClick={removeAll}>批量删除</Button>
                <Upload {...props}>
                  <Button type="primary" icon={<UploadOutlined />}>
                    本地上传
                  </Button>
                </Upload>
              </Space>
            </div>
            <div>
              <Checkbox checked={chooseAll} onChange={onChange}>
                全选
              </Checkbox>
            </div>
          </header>
          <div style={{ height: 500 }}>
            <ImageList
              handleMoveSingleImg={handleMoveSingleImg}
              handleRemoveImg={handleRemoveImg}
              imageData={imageData}
              imgData={imgData}
              handleDrag={handleDrag}
              handleRenameImg={handleRenameImg}
              imageDataName={imageDataName}
              handleCheckedList={handleCheckedList}
              handleImageData={handleImageData}
              checkedList={checkedList}
              handleChooseAll={handleChooseAll}
            />
          </div>
          <MoveAllModal
            visible={visible}
            handleOk={handleMoveOk}
            handleCancel={handleMoveCancel}
            handleMove={handleMove}
            imgData={imgData}
            imageDataName={imageDataName}
          />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
export default ImageManage;
