import path from 'path';

import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';
import webpack from 'webpack';

import config from './config';

const isProduction = config.env === 'production';

let postCssConf = '!postcss?browsers=last 2 versions';
let cssLoaderConf = '?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:4]';
let cssLoaders = `css${cssLoaderConf}${postCssConf}`;
let scssLoaders = `${cssLoaders}!sass`;

export default {
  entry: isProduction ? [
    './index.js'
  ] : [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './index.js'
  ],
  resolve: {
    alias: {
      warning: 'warning/browser.js',
      invariant: 'invariant/browser.js'
    }
  },
  context: path.resolve(__dirname, './src/client'),
  output: {
    filename: '[name].[hash:7].js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', cssLoaders)
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', scssLoaders)
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: !isProduction
        }
      },
      {
        test: /\.(eot|gif|jpe?g|otf|png|svg|webp|woff|woff2?|ttf)$/,
        exclude: /node_modules/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      path: 'build'
    }),
    new ExtractTextPlugin('[name].[contenthash:7].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    ...isProduction ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      })
    ] : [
      new webpack.HotModuleReplacementPlugin()
    ]
  ],
  postcss: [
    nested(),
    autoprefixer()
  ],
  bail: isProduction,
  cache: !isProduction,
  stats: {
    children: false
  }
};
