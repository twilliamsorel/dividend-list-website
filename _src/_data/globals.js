module.exports = function () {
  return {
    environment: process.env.ENVIRONMENT || "development",
    cssPath: process.env.ENVIRONMENT === 'production' ? '/assets/css/main-min.css' : '/assets/css/main.css',
    jsPath: process.env.ENVIRONMENT === 'production' ? '/assets/css/main-min.js' : '/assets/js/main.js',
    "title": "Dividend Research",
    "description": "A simple tool for dividend stock discovery, focused on high yield income stocks that pay monthly.",
    "server_address": "tbd",
    "baseUrl": "https://dividendresearch.com",
    "image": "tbd"
  };
};