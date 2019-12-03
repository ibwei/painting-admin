const Mock = require('mockjs');

const baseData = require('./baseData');

const BaseInfoData = Mock.mock({
  /* 
  id 
  设施名称
  所属区域
  自定义属性
  设施图标
  关联设备
  创建人
  创建时间
  */
  'list|100': [
    {
      id: '@increment',
      'name|1': ['供配电设施', '照明设施', '动力设施', '弱电设施', '空调与通风设施', '运输设施'],
      belongToArea: '区域' + '@integer(1,100)',
      thumbnail: "@image('150x80', '@color()','@color()', 'png', '设施'+'@integer(1,100)')",
      basicProperty1: '设施规格：' + '@integer(10,3000)' + '*' + '@integer(10,3000)' + '*' + '@integer(10,3000)' + ' (cm)',
      basicProperty2: '设施总功率：' + '@integer(400,3000)' + '(W)',
      'ownProperty1|1': ['设施电压值：' + '@integer(100,3000)' + ' (Pa)', '设施水压值：' + '@integer(100,3000)' + ' (Pa)'],
      'ownProperty2|1': ['设施故障频率：' + '@integer(0,10)' + '次/年', '设施包含设备限制：' + '@integer(60,300)' + ' (台)'],
      type: '设施类型' + '@integer(1,100)',
      'relativeDevice|2-8': [
        {
          'name|+1': ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6', '设备7', '设备8'],
        },
      ],
      'position|1': [
        { x: "106.55", y: "29.57" },
        { x: "106.45", y: "29.97" },
        { x: "106.75", y: "29.67" },
        { x: "106.65", y: "29.47" },
      ],
      createName: '@cname',
      createTime: '@datetime',
    },
  ],
});

let database = BaseInfoData.list;

module.exports = {
  facilitiesList(req, res) {
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
    database = database.filter(item => item.id != id);
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
