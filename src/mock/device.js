const Mock = require('mockjs');

const baseData = require('./baseData');

const BaseInfoData = Mock.mock({
  /* 
  id 
  设备编号
  设备名
  所属管线
  所属区域
  所属设施 
  设备照片
  所处地址
  地理坐标
  自定义属性
  状态
  创建人
  创建时间
  */
  'list|100': [
    {
      id: '@id',
      deviceId: '@guid',
      name: '设备' + '@integer(1, 100)',
      belongToArea: '区域' + '@integer(1,100)',
      belongToLine: '管线' + '@integer(1,100)',
      belongToFacilities: '设施' + '@integer(1,100)',
      thumnail: "@image('200x100', '@color()','@color()', 'png', '设备'+'@integer(1,100)')",
      address: '@county(true)',
      'position|1': [
        { x: "106.55", y: "29.57" },
        { x: "106.65", y: "29.97" },
        { x: "106.75", y: "29.67" },
        { x: "106.55", y: "29.47" },
      ],
      createName: '@cname',
      createTime: '@datetime',
    },
  ],
});

let database = BaseInfoData.list;

module.exports = {
  deviceList(req, res) {
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
    newData.id = Mock.mock('@id');
    newData.deviceNum = Mock.mock('@integer(1000, 5000)');
    newData.guandaoNum = Mock.mock('@integer(1000, 5000)');
    newData.shesiNum = Mock.mock('@integer(1000, 5000)');
    newData.errorNum = Mock.mock('@integer(0, 10)');
    newData.createName = Mock.mock('@cname');
    database.unshift(newData);
    res.json(baseData('success', '新增成功！'));
  },
};
