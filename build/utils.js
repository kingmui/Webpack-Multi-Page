const path = require('path');
const glob = require('glob');
const os = require('os');
const colors = require('colors');

const devMode = process.env.NODE_ENV !== 'production';
const pathResolve = (targetPath) => path.resolve(__dirname, targetPath);

exports.getEntry = (globPath) => {
  const entries = {};
  let basename;
  glob.sync(globPath).forEach((entry) => {
    // eslint-disable-next-line no-console
    console.log(entry.magenta);
    basename = path.parse(entry).dir.split('/');
    basename = basename[basename.length - 1];
    entries[basename] = entry;
  });
  return entries;
};

exports.getHTMLConfig = (basename, pages, chunks) => {
  return {
    filename: `${basename}.html`,
    template: pages[basename],
    inject: true,
    hash: false,
    chunks,
    minify: devMode
      ? false
      : {
        removeComments: true,
        collapseWhitespace: true,
      },
    favicon: pathResolve('../src/assets/images/favicon.ico'),
  };
};

exports.getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  Object.getOwnPropertyNames(interfaces).forEach(devName => {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i += 1) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  });
};

exports.pathResolve = pathResolve;
exports.devMode = devMode;
