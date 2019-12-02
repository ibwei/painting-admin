const Logo = require('../assets/logo.png');

const API = process.env.NODE_ENV === 'production' ? '' : '/api';

const config = {
  name: '信驰云巡检管理平台',
  footerText: '信驰云巡检管理平台  2018 - 2019 © CQXC.allright reserved.ICP',
  logo: Logo,
  icon: '/favicon.ico',
  API,
  openPages: ['/login', '/404', '/401'], // 全屏页面
  noLoginList: ['#/login'],
};

export default config;
