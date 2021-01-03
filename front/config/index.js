var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../.bundle/index.html'),
    assetsRoot: path.resolve(__dirname, '../.bundle'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    stylesRoot: path.resolve(__dirname, '../src/styles'),
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8090,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    stylesRoot: path.resolve(__dirname, '../src/styles'),
    cssSourceMap: false
  }
}
