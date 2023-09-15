const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/itemSearch',
    createProxyMiddleware({
      target: 'https://www.aladin.co.kr/ttb/api/ItemSearch.aspx',
      changeOrigin: true,
      pathRewrite: {
        '^/itemSearch': '',
      },
    })
  );


};
