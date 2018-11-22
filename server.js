"use strict";
let webpack = require('webpack');
let webpackDevServer = require("webpack-dev-server");
let config = require("./webpack.config.js");
let compiler = webpack(config);
let ip = require('ip');
let myIp=ip.address();
let server = new webpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  // quiet: true,
});


server.listen(process.env.npm_package_config_port, myIp,
  function(err, result) {
    err && console.log(err);
    console.log('Listening at ' + myIp + ':' + process.env.npm_package_config_port);
  });
