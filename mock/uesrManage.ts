import { Request, Response } from 'express';

const data = [
  {
    userId: 11,
    username: '张一',
    phone: '12345678',
    power: 0,
  },
  {
    userId: 11,
    username: '张二',
    phone: '12345678',
    power: 1,
  },
  {
    userId: 11,
    username: '张三',
    phone: '12345678',
    power: 1,
  },
  {
    userId: 11,
    username: '张四',
    phone: '12345678',
    power: 1,
  },
  {
    userId: 11,
    username: '张五',
    phone: '12345678',
    power: 0,
  },
  {
    userId: 11,
    username: '张六',
    phone: '12345678',
    power: 1,
  },
];

function getUsers(req: Request, res: Response) {
  res.json({
    data: data,
  });
}
function postUsers(req: Request, res: Response) {
  console.log(req.body);
  res.json({
    data: [
      {
        userId: 11,
        username: '查询结果1',
        phone: '12345678',
        power: 1,
      },
      {
        userId: 11,
        username: '查询结果2',
        phone: '12345678',
        power: 1,
      },
    ],
  });
}
function addUser(req: Request, res: Response) {
  res.json({
    data: [
      {
        userId: 11,
        username: '新增用户',
        phone: '12345678',
        power: 1,
      },
    ],
  });
}

export default {
  'GET /api/userManage': getUsers,
  'POST /api/userManage': postUsers,
  'POST /api/addUser': addUser,
};
