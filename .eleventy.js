const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");
const tickerCodes = require("./tickerCodes.js")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_src/assets");
  eleventyConfig.addPassthroughCopy("_src/favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("_src/favicon-16x16.png");

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    strict_filters: true
  });

  // MINIFYING CSS
  eleventyConfig.on('eleventy.before', async () => {
    if (process.env.ENVIRONMENT === 'production') {
      let cssData = fs.readFileSync(path.resolve(__dirname, "_src/assets/css/main.css"))
      let minifiedCSS = new CleanCSS().minify(cssData).styles;
      fs.writeFile('_src/assets/css/main-min.css', minifiedCSS, (err) => {
        console.log(err);
      });
    }
  });

  // SHORT CODES
  eleventyConfig.addShortcode("mapStockType", function (code) {
    const match = tickerCodes.filter((t) => t.code === code)

    return match[0].description
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