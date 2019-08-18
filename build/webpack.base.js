const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const colors = require("colors");
const emoji = require("node-emoji");
const rules = require("./webpack.rules");
const utils = require("./utils");
const { devMode, pathResolve, getEntry, getHTMLConfig } = utils;
const entries = getEntry("./src/pages/**/*.js");
const pages = getEntry("./src/pages/**/*.html");
console.log(
  `${emoji.get("triangular_flag_on_post")} 入口文件:\n`.green,
  entries
);
console.log(`${emoji.get("triangular_flag_on_post")} 多页面:\n`.green, pages);

const webpackConfig = {
  entry: entries,
  output: {
    path: pathResolve("../dist"),
    filename: devMode ? "js/[name].[hash:8].js" : "js/[name].[chunkhash:8].js"
  },
  module: {
    rules: [...rules]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "@": pathResolve("../src")
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "css/[name].[chunkhash:8].min.css",
      chunkFilename: devMode ? "[id].css" : "css/[id].[chunkhash:8].css"
    })
  ]
};

const htmlArray = Object.keys(entries).map(basename => {
  return {
    _html: basename,
    title: "",
    chunks: ["vendor", "manifest", basename]
  };
});

htmlArray.forEach(val => {
  const conf = getHTMLConfig(val._html, pages, val.chunks);
  console.log(`${emoji.get("gear")} ${val._html.bgBlue.white}`, conf);
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = webpackConfig;
