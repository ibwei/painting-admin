const Mock = require('mockjs');

const baseData = require('./baseData');

const BaseInfoData = Mock.mock({
  /**
  id
  管道名称
  基础属性1
  基础属性2
  所属类型
  最新巡检记录
  地理位置画线(展示已有设备/设施/管道的地理位置信息)
  创建人
  创建时间
  */
  'list|100': [{
    id: '@increment',
    'name|1': '管道' + '@integer(1,100)',
    basicProperty1: '管道长度：' + '@integer(100,4000)' + ' (m)',
    basicProperty2: '管道直径:' + '@integer(10,400)' + ' (cm)',
    'ownProperty1|1': ['管道包含线缆类型：高压线', '管道包含线缆类型：低压线'],
    ownProperty2: '管道破损频率：' + '@integer(0,10)' + '次/年',
    'position|1': [
      { x: "106.55", y: "29.57" },
      { x: "106.45", y: "29.97" },
      { x: "106.75", y: "29.67" },
      { x: "106.65", y: "29.47" },
    ],
    type: '类型' + '@integer(1,100)',
    xjlist: '2019年11月26日14:55:03:3个设施异常',
    detail: '0',
    createName: '@cname',
    createTime: '@datetime',
  }],
});

let database = BaseInfoData.list;

module.exports = {
  lineList(req, res) {
    let {
      pageSize,
      pageNum,
      ...other
    } = req.body;
    pageSize = pageSize || 10;
    pageNum = pageNum || 1;
    other = {
      ...other,
    };

    let newData = database;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
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
    const {
      id,
    } = req.body;
    database = database.filter(item => item.id != id);
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
    newData.createName = Mock.mock('@cname');
    database.unshift(newData);
    res.json(baseData('success', '新增成功！'));
  },
};
