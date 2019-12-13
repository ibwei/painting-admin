const bodyParser = require('body-parser');
const login = require('./login');
const dashboard = require('./dashboard');
const dangerMessage = require('./dangerMessage');
const dangerCheckMessage = require('./dangerCheckMessage');
const feedback = require('./feedback');
const messageBoard = require('./messageBoard');
const banner = require('./banner');

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

  app.post('/api/feedback/feedbackList', feedback.feedbackList);
  app.post('/api/feedback/feedbackAdd', feedback.add);
  app.post('/api/feedback/feedbackUpdate', feedback.update);
  app.post('/api/feedback/feedbackDelete', feedback.delete);

  app.post('/api/messageBoard/messageBoardList', messageBoard.messageBoardList);
  app.post('/api/messageBoard/messageBoardAdd', messageBoard.add);
  app.post('/api/messageBoard/messageBoardUpdate', messageBoard.update);
  app.post('/api/messageBoard/messageBoardDelete', messageBoard.delete);

  app.post('/api/dangerCheckMessage/list', dangerCheckMessage.list);
  app.post('/api/dangerCheckMessage/add', dangerCheckMessage.add);
  app.post('/api/dangerCheckMessage/update', dangerCheckMessage.update);
  app.post('/api/dangerCheckMessage/delete', dangerCheckMessage.delete);

  app.post('/api/banner/bannerList', banner.bannerList);
  app.post('/api/banner/add', banner.add);
  app.post('/api/banner/update', banner.update);
  app.post('/api/banner/delete', banner.delete);
};
