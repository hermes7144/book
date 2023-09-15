const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/APIAddress',
    createProxyMiddleware({
      target: 'http://api.vworld.kr/req/address',
      changeOrigin: true,
      pathRewrite: {
        '^/APIAddress': '',
      },
    })
  );
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
