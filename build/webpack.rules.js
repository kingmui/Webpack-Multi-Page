const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HOST_CONF } = require('./env-config');
const utils = require("./utils");
const { devMode } = utils;

const rules = [
  {
    test: /\.js$/,
    use: "babel-loader",
    exclude: "/node_modules/"
  },
  {
    test: /\.tsx?$/,
    loader: "ts-loader",
    exclude: /node_modules/
  },
  {
    test: /\.html$/,
    use: {
      loader: "html-loader",
      options: {
        attrs: ["img:src", "img:data-src", "video:src", "audio:src"],
        minimize: true,
        removeAttributeQuotes: false,
      }
    }
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: devMode,
          publicPath: HOST_CONF.assetsPublicPath,
        }
      },
      "css-loader",
      "postcss-loader",
      "sass-loader"
    ]
  },
  {
    test: /\.(png|jpe?g|svg|gif)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[name].[contenthash:8].[ext]",
          outputPath: "images"
        }
      }
    ]
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
    loader: "file-loader",
    options: {
      name: "[name].[contenthash:8].[ext]",
      outputPath: "video"
    }
  }
];

module.exports = rules;
