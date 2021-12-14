/** @format */

const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var path = require('path');
process.env.NODE_ENV = 'development';

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: __dirname + '/startup.json',
      to: './',
      noErrorOnMissing: true,
    },
    {
      from: __dirname + '/theme.json',
      to: './',
      noErrorOnMissing: true,
    },
    {
      from: __dirname + '/components.json',
      to: './',
      noErrorOnMissing: true,
    },
  ],
});

module.exports = {
  entry: './src/md-license-app.js',
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: "[name].bundle.js",
    filename: '[name].bundle.[contenthash].js', //Uncomment for LOCAL
    publicPath: './',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 5000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     "style-loader",
      //     "css-loader"
      //   ]
      // },
      {
        test: /\.(png|svg|jpg|gif|css)$/,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    htmlWebpackPlugin,
    copyWebpackPlugin,
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin()],
  },
};
