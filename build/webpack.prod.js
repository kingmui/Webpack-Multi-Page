const { smart } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const base = require('./webpack.base.js');
const { HOST_CONF } = require('./env-config');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(
  smart(base, {
    mode: 'production',
    devtool: 'source-map',
    output: {
      chunkFilename: 'js/[name].[chunkhash:8].js',
      // publicPath: HOST_CONF.assetsPublicPath,
    },
    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      minimizer: [
        new TerserJSPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            output: {
              comments: /@license/i,
            },
          },
          extractComments: true,
        }),
        new OptimizeCssAssetsPlugin({}),
      ],
      splitChunks: {
        // 选择对哪些块进行优化。如果提供字符串值，可选的值有 all, async, initial
        // 提供 all 可以特别强大，因为这意味着即使在异步和非异步块之间也可以共享块。
        chunks: 'all',
        // 按需加载时的最大并行请求数
        maxAsyncRequests: 5,
        // 入口点的最大并行请求数
        maxInitialRequests: 3,
        // 分割前必须共享模块的最小块数
        minChunks: 1,
        // 页面初始化时加载代码块的请求数量应该 <= 5
        maxInitialRequests: 5,
        // 要生成的块的最小大小
        minSize: 0,
        // 打包出来的文件名。如果提供 true 将自动生成基于块和缓存组密钥的名称
        // 提供字符串或函数将允许您使用自定义名称
        name: true,
        // 缓存组可以继承或覆盖 splitChunks 中的任何选项。
        // 但是 test，priority 和 reuseExistingChunk 只能在缓存组级别配置。要禁用任何默认缓存组，请将它们设置为 false
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            // 缓存优先级权重
            priority: 100,
          },
          utils: {
            name: 'manifest',
            minSize: 0,
            minChunks: 2,
          },
        },
      },
    },
    plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()],
  })
);
