const Mock = require('mockjs');

const baseData = require('./baseData');

const BaseInfoData = Mock.mock({
  // id
  // 设施名称
  // 所属区域
  // 自定义属性
  // 设施图标
  // 关联设备
  // 创建人
  // 创建时间
  'list|100': [
    {
      id: '@increment',
      title: '标题@integer(1,1000)',
      time: '@datetime',
      area: '区域@integer(1,1000)',
      group: '分组@integer(1,1000)',
      people: '@cname',
      type: '类型@integer(1,1000)',
      name: '终端@integer(1,1000)',
      'status|1': ['未开始', '已完成', '进行中'],
      'xuanjianfangshi|1': ['车巡', '步巡'],
      'danger|1': ['未签到', '无GPS信息'],
      createName: '@cname',
      createTime: '@datetime',
      shebeiname: '设备@integer(1,1000)',
      shebeitype: '类型@integer(1,1000)',
      shebeiluxian: '路线一',
      shebeiquyu: '区域一',
      shebeifenzu: '分组一',
      shebeipeople: '张思聪',
      shebeipeople2: '张思聪',
      'fs|1': ['站内', '短信', '公众号', '邮箱'],
      'tztype|1': ['临时通知', '异常巡检通知'],
    },
  ],
  list2: [
    { id: 1, fwname: '短信服务' },
    { id: 2, fwname: '公众号服务' },
    { id: 3, fwname: '邮箱服务' },
  ],
});

let database = BaseInfoData.list;

const database2 = BaseInfoData.list2;

module.exports = {
  list(req, res) {
    let { pageSize, pageNum, ...other } = req.body;
    pageSize = pageSize || 10;
    pageNum = pageNum || 1;
    other = { ...other };

    let newData = database;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1);
            }
            if (key === 'startTime' || key === 'endTime') {
              const start = new Date(other.startTime).getTime();
              const end = new Date(other.endTime).getTime();
              const now = new Date(item[key]).getTime();
              if (start && end) {
                return now >= start && now <= end;
              }
              return true;
            }
            return (
              String(item[key])
                .trim()
                .indexOf(decodeURI(other[key]).trim()) > -1
            );
          }
          return true;
        });
      }
    }
    const list = {
      data: newData.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      total: newData.length,
    };
    const data = baseData('success', '查询成功');
    data.entity = list;
    setTimeout(() => {
      res.status(200).json(data);
    }, 100);
  },
  list2(req, res) {
    let { pageSize, pageNum, ...other } = req.body;
    pageSize = pageSize || 10;
    pageNum = pageNum || 1;
    other = { ...other };

    let newData = database2;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1);
            }
            if (key === 'startTime' || key === 'endTime') {
              const start = new Date(other.startTime).getTime();
              const end = new Date(other.endTime).getTime();
              const now = new Date(item[key]).getTime();
              if (start && end) {
                return now >= start && now <= end;
              }
              return true;
            }
            return (
              String(item[key])
                .trim()
                .indexOf(decodeURI(other[key]).trim()) > -1
            );
          }
          return true;
        });
      }
    }
    const list = {
      data: newData.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      total: newData.length,
    };
    const data = baseData('success', '查询成功');
    data.entity = list;
    setTimeout(() => {
      res.status(200).json(data);
    }, 100);
  },
  abnormal(req, res) {
    let { pageSize, pageNum, ...other } = req.body;
    pageSize = pageSize || 10;
    pageNum = pageNum || 1;
    other = { ...other };

    let newData = database;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1);
            }
            if (key === 'startTime' || key === 'endTime') {
              const start = new Date(other.startTime).getTime();
              const end = new Date(other.endTime).getTime();
              const now = new Date(item[key]).getTime();
              if (start && end) {
                return now >= start && now <= end;
              }
              return true;
            }
            return (
              String(item[key])
                .trim()
                .indexOf(decodeURI(other[key]).trim()) > -1
            );
          }
          return true;
        });
      }
    }
    const list = {
      data: newData.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      total: newData.length,
    };
    const data = baseData('success', '查询成功');
    data.entity = list;
    setTimeout(() => {
      res.status(200).json(data);
    }, 100);
  },
  delete(req, res) {
    const { id } = req.body;
    database = database.filter(item => item.id !== id);
    res.status(200).json(baseData('success', '删除成功'));
  },
  update(req, res) {
    const editItem = req.body;
    let isExist = false;

    database = database.map(item => {
      if (item.id === editItem.id) {
        isExist = true;
        return Object.assign({}, item, editItem);
      }
      return item;
    });

    if (isExist) {
      res.json(baseData('success', '更新成功！'));
    } else {
      res.json(baseData('error', '未找到对应数据！'));
    }
  },
  add(req, res) {
    const newData = req.body;
    newData.createTime = Mock.mock('@now');
    newData.id = Mock.mock('@increment');
    newData.createName = Mock.mock('@cname');
    newData.thumbnail = Mock.mock(
      "@image('150x80', '@color()','@color()', 'png', '设施'+'@integer(1,100)')",
    );
    database.unshift(newData);
    res.json(baseData('success', '新增成功！'));
  },
};
