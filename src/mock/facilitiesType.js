const Mock = require('mockjs');

const baseData = require('./baseData');

const BaseInfoData = Mock.mock({
  /* 
  id 
  设施编号
  设施类型名
  设施属性1
  设施属性2
  告警样式
  故障样式
  创建人
  创建时间
  */
  'list|100': [
    {
      id: '@increment',
      facilitiesId: '@guid',
      'name|1': ['供配电设施', '照明设施', '动力设施', '弱电设施', '空调与通风设施', '运输设施'],
      property1: '属性' + '@integer(1,100)',
      property2: '属性' + '@integer(1,100)',
      warnImage: "@image('60x60', '@color()','@color()', 'png', '设施'+'@integer(1,100)')",
      wrongImage: "@image('60x60', '@color()','@color()', 'png', '设施'+'@integer(1,100)')",
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
  facilitiesTypeList(req, res) {
    let { pageSize, pageNum, ...other } = req.body;
    pageSize = pageSize || 10;
    pageNum = pageNum || 1;
    other = { ...other };

    let newData = database;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1);
            } if (key === 'startTime' || key === 'endTime') {
              const start = new Date(other.startTime).getTime();
              const end = new Date(other.endTime).getTime();
              const now = new Date(item[key]).getTime();
              if (start && end) {
                return now >= start && now <= end;
              }
              return true;
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1;
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
    database = database.filter((item) => item.id != id);
    res.status(200).json(baseData('success', '删除成功'));
  },
  update(req, res) {
    const editItem = req.body;
    let isExist = false;

    database = database.map((item) => {
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
    newData.facilitiesId = Mock.mock('@guid');
    newData.warnImage = Mock.mock("@image('60x60', '@color()','@color()', 'png', '设施'+'@integer(1,100)')");
    newData.wrongImage = Mock.mock("@image('60x60', '@color()','@color()', 'png', '设施'+'@integer(1,100)')");
    newData.createName = Mock.mock('@cname');
    database.unshift(newData);
    res.json(baseData('success', '新增成功！'));
  },
};
