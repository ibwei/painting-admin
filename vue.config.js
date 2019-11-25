const Mock = require('./src/mock/index');

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('tsx')
      .test(/\.tsx$/)
      .use('vue-jsx-hot-loader')
      .before('babel-loader')
      .loader('vue-jsx-hot-loader');
    config.plugin('html').tap((args) => {
      args[0].chunksSortMode = 'none';
      return args;
    });
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#0390FF',
          'border-radius-base': '3px',
          'border-radius-sm': '2px',
          'shadow-color': 'rgba(0,0,0,0.05)',
          'shadow-1-down': '4px 4px 40px @shadow-color',
          'border-color-split': '#f4f4f4',
          'border-color-base': '#e5e5e5',
          'font-size-base': '13px',
          'text-color': '#666',
        },
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.103.72.200:3000/mock/104/api/v1', // 开发环境地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
    before(app) {
      Mock(app);
    },
  },
};
