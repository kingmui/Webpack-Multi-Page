/* eslint-disable global-require */
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-plugin-px2rem')({
      rootValue: 100,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [],
      exclude: /(node_module|pages\/index)/,
      selectorBlackList: ['html', 'body'],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 2,
    }),
  ]
};
