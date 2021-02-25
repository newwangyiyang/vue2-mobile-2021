const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-model' : '/', // 设置output.publicPath，区分生产环境和开发环境
  outputDir: 'vue-model',
  productionSourceMap: false,
  devServer: {
    // 配置 webpack-dev-server 行为。
    open: process.env.NODE_ENV === 'development',
    host: 'localhost',
    port: 8080,
    https: false,
    hot: true,
    hotOnly: true,
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${process.env.VUE_APP_BASE_API_PORT}/api`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    }, // string | Object
    before: (app) => {},
  },
  parallel: false,
  css: {
    // 开启 CSS source maps
    sourceMap: false,
  },
  chainWebpack: (config) => {
    // 新增别名
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('vue$', 'vue/dist/vue.esm.js');

    if (process.env.NODE_ENV === 'production') {
      // 1、压缩html中的css
      config.plugin('html').tap((args) => {
        args[0].minify.minifyCSS = true;
        return args;
      });
      // 2、去除console.log 、debugger
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true;
        args[0].terserOptions.compress.drop_debugger = true;
        return args;
      });

      // 3、gzip需要nginx进行配合
      config
        .plugin('compression')
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            algorithm: 'gzip',
            minRatio: 0.8,
            test: /\.js$|\.html$|\.css$/, // 匹配文件名
            threshold: 4096, // 超过4k进行压缩
            deleteOriginalAssets: true, // 是否删除源文件
          },
        ]);
      // 4、去掉空格，减少打包体积
      config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap((options) => {
          // modify the options...
          options.compilerOptions.preserveWhitespace = true;
          return options;
        });
    }
  },
};

function resolve(dir) {
  return path.join(__dirname, dir);
}
