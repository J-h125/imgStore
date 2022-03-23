import { Request, Response } from 'express';

const imageData1 = [
  {
    name: '上传1',
    path: '1',
  },
  {
    name: '上传2',
    path: '3',
  },
  {
    name: '上传3',
    path: '5',
  },
  {
    name: '上传4',
    path: '7',
  },
  {
    name: '上传5',
    path: '9',
  },
];
const searchImageData = [
  {
    name: '查询1',
    path: '9',
  },
  {
    name: '查询2',
    path: '8',
  },
  {
    name: '查询3',
    path: '10',
  },
  {
    name: '查询4',
    path: '11',
  },
  {
    name: '查询5',
    path: '1',
  },
];

function uploadImage(req: Request, res: Response) {
  res.json({
    data: imageData1,
  });
}
function searchImage(req: Request, res: Response) {
  res.json({
    data: searchImageData,
  });
}

export default {
  'POST /api/uploadImage': uploadImage,
  'POST /api/searchImage': searchImage,
  // 'POST /api/userManage': postUsers,
  // 'POST /api/addUser': addUser,
};
