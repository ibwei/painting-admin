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
      name: '路线@integer(1,100)',
      'sheshi|10-500': ['设施@integer(1,1000)'],
      'shebei|10-500': ['设备@integer(1,1000)'],
      'guandao|10-500': ['管道@integer(1,1000)'],
      'xuanjianfangshi|1': ['车巡', '步巡'],
      thumbnail: "@image('150x80', '@color()','@color()', 'png', '设施'+'@integer(1,100)')",
      pointer: { x: Mock.Random.float(106, 106, 2, 3), y: Mock.Random.float(29, 29, 2, 3) },
      luxian: [
        {
          x: parseFloat('106') + parseFloat('0.@integer(1,3)'),
          y: Mock.Random.float(29, 29, 1, 1),
        },
        {
          x: parseFloat('106') + parseFloat('0.@integer(1,3)'),
          y: Mock.Random.float(29, 29, 1, 1),
        },
        {
          x: parseFloat('106') + parseFloat('0.@integer(1,3)'),
          y: Mock.Random.float(29, 29, 1, 1),
        },
      ],
      createName: '@cname',
      createTime: '@datetime',
    },
  ],
});

let database = BaseInfoData.list;

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
    }, 1000);
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
