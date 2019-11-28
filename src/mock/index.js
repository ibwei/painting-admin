const bodyParser = require('body-parser');

const login = require('./login');
const dashboard = require('./dashboard');
const customers = require('./customers');
const area = require('./area');
const device = require('./device');
const deviceType = require('./deviceType');
const facilities = require('./facilities');
const facilitiesType = require('./facilitiesType');
const line = require('./line');
const lineType = require('./lineType');
const inspectRoad = require('./inspectRoad');
const inspectPlan = require('./inspectPlan');
const task = require('./task');
const insititution = require('./sysIntitution');

module.exports = function mockInit(app) {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );
  app.all('/api/*', login.authLogin);
  app.post('/api/user/login', login.loginByName);
  app.post('/api/user/getUserInfo', login.getUserInfo);
  app.post('/api/dashboard', dashboard);

  app.post('/api/customers/baseInfoList', customers.baseInfoList);
  app.post('/api/customers/baseInfo/add', customers.add);
  app.post('/api/customers/baseInfo/update', customers.update);
  app.post('/api/customers/baseInfo/delete', customers.delete);

  app.post('/api/area/areaList', area.areaList);
  app.post('/api/area/baseInfo/add', area.add);
  app.post('/api/area/baseInfo/update', area.update);
  app.post('/api/area/baseInfo/delete', area.delete);

  app.post('/api/device/deviceList', device.deviceList);
  app.post('/api/device/baseInfo/add', device.add);
  app.post('/api/device/baseInfo/update', device.update);
  app.post('/api/device/baseInfo/delete', device.delete);

  app.post('/api/deviceType/deviceTypeList', deviceType.deviceTypeList);
  app.post('/api/deviceType/baseInfo/add', deviceType.add);
  app.post('/api/deviceType/baseInfo/update', deviceType.update);
  app.post('/api/deviceType/baseInfo/delete', deviceType.delete);

  app.post('/api/facilities/facilitiesList', facilities.facilitiesList);
  app.post('/api/facilities/baseInfo/add', facilities.add);
  app.post('/api/facilities/baseInfo/update', facilities.update);
  app.post('/api/facilities/baseInfo/delete', facilities.delete);

  app.post('/api/facilitiesType/facilitiesTypeList', facilitiesType.facilitiesTypeList);
  app.post('/api/facilitiesType/baseInfo/add', facilitiesType.add);
  app.post('/api/facilitiesType/baseInfo/update', facilitiesType.update);
  app.post('/api/facilitiesType/baseInfo/delete', facilitiesType.delete);

  app.post('/api/line/lineList', line.lineList);
  app.post('/api/line/baseInfo/add', line.add);
  app.post('/api/line/baseInfo/update', line.update);
  app.post('/api/line/baseInfo/delete', line.delete);

  app.post('/api/lineType/lineTypeList', lineType.lineTypeList);
  app.post('/api/lineType/baseInfo/add', lineType.add);
  app.post('/api/lineType/baseInfo/update', lineType.update);
  app.post('/api/lineType/baseInfo/delete', lineType.delete);

  app.post('/api/inspectRoad', inspectRoad.list);

  app.post('/api/inspectPlan/list', inspectPlan.list);
  app.post('/api/inspectPlan/add', inspectPlan.add);
  app.post('/api/inspectPlan/update', inspectPlan.update);
  app.post('/api/inspectPlan/delete', inspectPlan.delete);

  app.post('/api/task/list', task.list);
  app.post('/api/task/abnormal', task.abnormal);

  app.post('/api/sys/insititution', insititution.list);
};
