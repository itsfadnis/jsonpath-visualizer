const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isProd = 'production' === process.env.NODE_ENV;

module.exports = () => {
  const config = {
    mode: process.env.NODE_ENV,
    entry: {
      app: './src/components/App',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: isProd ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
    ],
  };

  if (isProd) {
    config.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin()],
    };
    config.plugins.push(
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          level: 11,
        },
        threshold: 10240,
        minRatio: 0.8,
      }),
    );
  } else {
    config.devtool = 'source-map';
    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      disableHostCheck: true,
    };
  }

  return config;
};