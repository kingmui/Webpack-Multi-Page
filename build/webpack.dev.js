const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const utils = require('./utils');

const { getIPAddress } = utils;
const IPAddress = getIPAddress();

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: IPAddress,
    port: '8080',
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    inline: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
});
