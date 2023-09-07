const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/itemSearch',
    createProxyMiddleware({
      target: 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx',
      pathRewrite: {
        '^/itemSearch': '',
      },
    }))
}