const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');

module.exports = env => {
  let htmlWebpackPluginOpts = {
    inject: true,
    template: path.join(__dirname, 'src', 'index.html')
  };

  if (env.option === 'production') {
    htmlWebpackPluginOpts = Object.assign(htmlWebpackPluginOpts, {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    });
  }

  let plugins = [
    new HtmlWebpackPlugin(htmlWebpackPluginOpts),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env.option) }
    })
  ];

  if (env.option === 'production') {
    plugins = plugins.concat([
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        names: [ 'vendor', 'manifest' ]
      }),
      new OfflinePlugin()
    ]);
  }

  let entry = { app: [ path.join(__dirname, 'src', 'index.js') ] };

  if (env.option === 'production') {
    entry = Object.assign(entry, {
      vendor: [
        'immutable',
        'offline-plugin/runtime',
        'react-dom',
        'react-redux',
        'react',
        'redux-actions',
        'redux-thunk',
        'redux',
        'styled-components'
      ]
    });
  }

  let webpackConfig = {
    entry,
    output: {
      path: path.join(__dirname, `build`),
      filename: `[name].[chunkhash:8].js`,
      pathinfo: env.option === 'development',
      publicPath: 'public'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
        { test: /\.(jpe?g|png|gif)$/i, use: 'base64-image-loader' },
        { test: /\.svg$/i, loaders: [ 'file-loader', 'image-webpack-loader' ] }
      ]
    },
    plugins
  };

  if (env.option === 'development') {
    webpackConfig = Object.assign(webpackConfig, {
      devServer: {
        contentBase: 'public/',
        inline: true,
        open: true,
        noInfo: false,
        quiet: false,
        overlay: { errors: true, warnings: true }
      }
    });
  }
  return webpackConfig;
};
