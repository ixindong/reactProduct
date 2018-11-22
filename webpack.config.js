/**
 * 开发环境配置
 */
"use strict";



let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer'); //添加浏览器前缀
let ExtractTextPlugin = require("extract-text-webpack-plugin"); //独立拆分css
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制文件
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //打开浏览器
let ip = require('ip');
let myIp=ip.address();
let pxtorem = require('postcss-pxtorem');//px转rem
process.env.NODE_ENV = 'development';
//入口程序,解析app.js
let getEntries = (function() {
  let _entries = {};
  let _basePath = path.join(__dirname, './src');
  let _entryFile = 'index.js';
  let _dirs = fs.readdirSync(_basePath);

  _dirs.forEach(function(dir) {
    let _path = path.join(_basePath, dir, _entryFile);
    if (fs.existsSync(_path)) {
      _entries[dir] = ['webpack/hot/dev-server',
        'webpack-dev-server/client?http://' + myIp +
        ':' + process.env.npm_package_config_port, _path
      ];
    }
  });
  return _entries;
})();

module.exports = {
  /*
   * babel参数
   * */
  babelQuery: {
    presets: ['es2015', 'stage-0','react'],
    plugins: ['transform-runtime', 'add-module-exports', 'typecheck',
      "transform-decorators-legacy","babel-plugin-transform-decorators-legacy","transform-class-properties",
        "transform-object-assign"
    ],
    cacheDirectory: true
  },

  devtool: "source-map", //产生source的方式
  entry: getEntries,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name]/[name].bundle.js',
    chunkFilename: '[name]/[name].bundle.js'
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0',
      exclude: /node_modules/,
      query: this.babelQuery
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css?sourceMap!postcss!sass?sourceMap')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css?sourceMap!postcss')
    }, {
      test: /\.(png|jpg)$/,
      loader: "url?name=[path][name].[ext]&limit=8192"
    }]
  },
  postcss: function () {
    return [pxtorem({
        rootValue: 40,
        propWhiteList: [],
        selectorBlackList: [/^html$/]
    })]
  },
  resolve: {
    extensions: ['','.web.js','.js','.jsx', '.scss', 'css', 'png', 'jpg', 'jpeg'],
    alias: { //模块别名定义，方便后续直接引用别名，无须多写长长的地址
      'loading': path.join(__dirname, './src/home/components/loading'),//loading组件
      'MailList': path.join(__dirname, './src/home/components/MailList'),//MailList通讯录
      'tab': path.join(__dirname, './src/home/components/tab'),//tab
      'btn': path.join(__dirname, './src/home/components/btn'),//按钮组件
      'banner': path.join(__dirname, './src/home/components/banner'),//banner组件
      'alert': path.join(__dirname, './src/home/components/alert'),//alert组件
      'footer': path.join(__dirname, './src/home/components/footer'),//footer
      'header': path.join(__dirname, './src/home/components/header'),//header
      'inputGroup': path.join(__dirname, './src/home/components/inputGroup'),//inputGroup组件
      'input': path.join(__dirname, './src/home/components/input'),//input组件
      'image': path.join(__dirname, './src/home/components/image'),//image组件
      'checkbox': path.join(__dirname, './src/home/components/checkbox'),//checkbox组件
      'getPage': path.join(__dirname, './src/home/components/GetPage.js'),//getPage
      'getData': path.join(__dirname, './src/home/components/GetData.js'),//getData
      'getInput': path.join(__dirname, './src/home/components/GetInput.js'),//getInput
      'getNextPage': path.join(__dirname, './src/home/components/GetNextPage.js'),//getNextPage
      'roll': path.join(__dirname, './src/home/components/roll'),//roll组件
      'publicJs': path.join(__dirname, './src/home/lib/public.js'),//公共js
      'session': path.join(__dirname, './src/home/lib/session.js'),//session
      'Dictionaries': path.join(__dirname, './src/home/lib/Dictionaries.js'),//session
      'verticalRoll': path.join(__dirname, './src/home/components/verticalRoll'),//垂直roll组件
      'accordion': path.join(__dirname, './src/home/components/accordion'),//可折叠
      'MainInsure': path.join(__dirname, './src/home/containers/components/MainInsure.js'),
      'ComplanyEtc': path.join(__dirname, './src/home/containers/components/ComplanyEtc.js'),
    }
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://' + myIp+ ':' + process.env.npm_package_config_port+'/src/home/#/'
    }),
    //热加载
    new webpack.HotModuleReplacementPlugin(),
    /**
     * 调用dll的内容
     * @type {[type]}
     */
    new webpack.DllReferencePlugin({
      context: __dirname,
      //这里引入manifest文件
      manifest: require('./dist/vendor-manifest.json')
    }),
    /**
     * 提取公共部分js
     * @type {String}
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js'
    }),
    /**
     * 提取css文件
     */
    new ExtractTextPlugin("[name]/[name].bundle.css")

  ]
};
