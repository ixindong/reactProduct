/**
 * 生产环境配置
 */
"use strict";
let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin"); //独立拆分css
let autoprefixer = require('autoprefixer'); //添加浏览器前缀
var HtmlWebpackPlugin = require('html-webpack-plugin'); //动态生成html
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制文件
var ImageminPlugin = require('imagemin-webpack-plugin').default;//图片压缩
var imageminPngquant = require('imagemin-pngquant');//png压缩
var imageminJpegRecompress = require('imagemin-jpeg-recompress');//jpg压缩
let pxtorem = require('postcss-pxtorem');//px转rem
process.env.NODE_ENV = 'production';
/** 入口配置
 * @type {Object}
 */
var entry = {
  vendor: ['./src/home/lib/public.js'],
  /**
   * 首页入口文件
   * @type {String}
   */
  home: './src/home/index.js'
};

module.exports = {
  /*
   * babel参数
   * */
  babelQuery: {
    presets: ['es2015', 'stage-0', 'react'],
      plugins: ['transform-runtime', 'add-module-exports', 'typecheck',
          "transform-decorators-legacy","babel-plugin-transform-decorators-legacy","transform-class-properties",
          "transform-object-assign"
      ],
    cacheDirectory: true
  },
  /**
   * 入口文件
   * @type {Object}
   */
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: './',
    filename: '[name]/[name].bundle.js',
    chunkFilename: '[name]/[name].bundle.js'
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
      'btn': path.join(__dirname, './src/home/components/btn'),//按钮组件
      'banner': path.join(__dirname, './src/home/components/banner'),//banner组件
      'alert': path.join(__dirname, './src/home/components/alert'),//alert组件
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
      'verticalRoll': path.join(__dirname, './src/home/components/verticalRoll'),//垂直roll组件
      'accordion': path.join(__dirname, './src/home/components/accordion'),//可折叠
    }
  },
  plugins: [
    /**
     * 案例页
     * @type {String}
     */
    new HtmlWebpackPlugin({
      title: '首页',
      keywords: '我的页面关键字',
      description: '我的页面描述',
      filename: './index.html',
      template: './src/common/common.html',
      chunks: ['vendor','home'],
      inject: true, //要把script插入到标签里
      shareIcon: '', //分享图片地址
      hash: true //是否产生hash
    }),
    /**
     * 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
     */
    new webpack.optimize.DedupePlugin(),
    /**
     * 调用dll的内容
     * @type {[type]}
     */
    new webpack.DllReferencePlugin({
      context: __dirname,
      //这里引入manifest文件
      manifest: require('./dist/vendor-manifest.json')
    }),
    new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    /**
     * 提取公共部分js
     * @type {String}
     */
    new webpack.optimize.CommonsChunkPlugin({
        names: 'vendor',
        filename: 'public.js',
        minChunks: Infinity,
    }),
    //使用压缩丑化js插件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$scope', '$']
      },
      output: {
        comments: false,
      },
    }),
    //拷贝文件到dist目录
    new CopyWebpackPlugin(
      [{
        from: './src/home/image',
        to: 'image'
      }],{
            ignore: [
                '.DS_Store',
                '.svn',
                '*.svn-base'
            ]
        }
    ),
    //图片压缩
    new ImageminPlugin({
      test: 'image/**',
      plugins: [
        imageminPngquant({
          quality: '60',//品质 0-100
          speed: 3,//速度 1-10
        }),
        imageminJpegRecompress({
          quality: 'high',
          max: 60,
          min: 40,
        }),
      ]
    }),
    /**
     * 提取css文件生成单独的css
     */
    new ExtractTextPlugin("[name]/[name].bundle.css"),

  ]
}
