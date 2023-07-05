const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");
const terser = require("terser");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_src/assets");
  eleventyConfig.addPassthroughCopy("_src/favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("_src/favicon-16x16.png");

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    strict_filters: true
  });

  // MINIFYING CSS AND JS
  eleventyConfig.on('eleventy.before', async () => {
    if (process.env.ENVIRONMENT === 'production') {
      let cssData = fs.readFileSync(path.resolve(__dirname, "_src/assets/css/main.css"))
      let minifiedCSS = new CleanCSS().minify(cssData).styles;
      fs.writeFile('_src/assets/css/main-min.css', minifiedCSS, (err) => {
        console.log(err);
      });


      let jsData = fs.readFileSync(path.resolve(__dirname, "_src/assets/js/main.js"), 'utf-8');
      let minifiedJS = await terser.minify(jsData);
      fs.writeFile('_src/assets/js/main-min.js', minifiedJS.code, (err) => {
        console.log(err);
      });
    }
  });

  return {
    dir: {
      input: "_src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  }
};