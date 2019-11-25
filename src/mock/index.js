const bodyParser = require('body-parser');

const login = require('./login');
const dashboard = require('./dashboard');
const customers = require('./customers');
const area = require('./area');
const device = require('./device');
module.exports = function mockInit(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));
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
};
