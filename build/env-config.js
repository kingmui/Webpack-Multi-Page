const utils = require('./utils');

const { pathResolve } = utils;

/*
 * 环境列表，第一个环境为默认环境
 * envName: 指明现在使用的环境
 * dirName: 打包的路径，只在 build 的时候有用
 * baseUrl: 这个环境下面的 api 请求的域名
 * assetsPublicPath: 静态资源存放的域名，未指定则使用相对路径
 * */
const ENV_LIST = [
  {
    envName: 'dev',
    dirName: 'dev',
    baseUrl: '',
    assetsPublicPath: '../',
  },
  {
    envName: 'test',
    dirName: pathResolve('../dist'),
    baseUrl: '',
    assetsPublicPath: '../',
  },
  {
    envName: 'build',
    dirName: pathResolve('../dist'),
    baseUrl: '',
    assetsPublicPath: '../',
  },
];

let HOST_ENV = JSON.parse(process.env.npm_config_argv).original[0] || '';
if (HOST_ENV === 'run') {
  HOST_ENV = 'dev';
}

const HOST_CONF = HOST_ENV ? ENV_LIST.find((item) => item.envName === HOST_ENV) : ENV_LIST[0];
process.env.BASE_URL = HOST_CONF.baseUrl;

module.exports.HOST_CONF = HOST_CONF;
module.exports.ENV_LIST = ENV_LIST;
