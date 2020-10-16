const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { HOST_CONF } = require('./env-config');
const utils = require('./utils');

const { devMode, pathResolve } = utils;

const rules = [
  {
    // 如果项目源码中只有 .js 文件，就不要写成/\jsx?$/，以提升正则表达式的性能
    test: /\.js$/,
    // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
    use: ['thread-loader', 'babel-loader?cacheDirectory'],
    // 只对项目根目录下的文件采用 babel-loader
    include: pathResolve('src'),
    exclude: /node_modules/,
    // 使用 resolve.alias 把原导入路径映射成一个新的导入路径，减少耗时的递归解析操作
    // alias: {
    //   'react': pathResolve('./node_modules/react/dist/react.min.js'),
    // },
    // 让 Webpack 忽略对部分没采用模块化的文件的递归解析处理
    // noParse: '/jquery|lodash/',
  },
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.html$/i,
    loader: 'html-loader',
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: devMode,
          publicPath: HOST_CONF.assetsPublicPath,
        },
      },
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.(png|jpe?g|svg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'images',
        },
      },
    ],
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[contenthash:8].[ext]',
      outputPath: 'video',
    },
  },
];

module.exports = rules;
