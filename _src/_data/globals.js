module.exports = function () {
  return {
    environment: process.env.ENVIRONMENT || "development",
    cssPath: process.env.ENVIRONMENT === 'production' ? '/assets/css/main-min.css' : '/assets/css/main.css',
    jsPath: process.env.ENVIRONMENT === 'production' ? '/assets/css/main-min.js' : '/assets/js/main.js',
    "title": "Dividend List",
    "description": "A tool for dividend stock discovery, focused on high yield income stocks that pay monthly.",
    "server_address": "https://server.thedividendlist.com",
    "baseUrl": "https://thedividendlist.com",
    "image": "/assets/img/logo.svg"
  };
};