const fs = require("fs/promises");
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
      await fs
        .readFile(path.resolve(__dirname, "_src/assets/css/main.css"))
        .then((data) => {
          let minifiedCSS = new CleanCSS().minify(data).styles;
          fs.writeFile('_src/assets/css/main-min.css', minifiedCSS, (err) => {
            console.log(err);
          });
        });

      let data = await fs.readFile(path.resolve(__dirname, "_src/assets/js/main.js"), 'utf-8');
      let minifiedJS = await terser.minify(data);
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