const path = require('path');
const webpack = require('webpack');

const src_dir = path.resolve(__dirname, 'src');
const out_dir = path.resolve(__dirname, 'cordova/www/js/lib');

const options = {
  entry: src_dir + '/lib/application.jsx',
  output: {
    path: out_dir,
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ] // loaders
  } // module
};

/*
options.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
  })
];*/

module.exports = options;
