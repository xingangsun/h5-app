import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import eslintFriendlyFormatter from 'eslint-friendly-formatter'
import chalk from 'chalk'
import autoprefixer from 'autoprefixer'

import { entry, alias, provide } from './config'

const postcssPlugin = function () {
  return [
    autoprefixer({
      browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4']
    })
  ]
}

export default {
  context: `${process.cwd()}/app`,
  entry,
  // devtool: false,
  // devtool: 'cheap-module-eval-source-map', // 应该用这个速度更快，不知道为啥用这个之后就不能map行对不上
  devtool: 'eval-source-map',
  // devtool: 'source-map',
  output: {
    path: `${process.cwd()}/dist`,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(vue|js)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        cache: false,
        formatter: eslintFriendlyFormatter
      }
    }, {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
      options: {
        // sass: 'vue-style-loader!css-loader?sourceMap!sass-loader?sourceMap',
        postcss: postcssPlugin
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?cacheDirectory'
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: postcssPlugin
          }
        }
      ]
    }, {
      test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|svg|swf)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }]
  },
  plugins: [
    new ProgressBarPlugin({
      format: `${chalk.bold('[:bar]')} ${chalk.cyan.bold(':percent (:elapseds)')} :msg`,
      clear: true,
      summary: false,
      summaryContent: false,
      customSummary (buildTime) {
        process.stdout.write(`=====${chalk.green.bold(`[ built in ${buildTime} ]`)}=====`)
      }
    }),
    // https://github.com/RoccoC/webpack-build-notifier
    new WebpackNotifierPlugin({
      title: '开发服务器',
      logo: 'app/global/img/logo.png',
      successSound: 'Submarine',
      failureSound: 'Glass',
      suppressSuccess: true
    }),

    new webpack.ProvidePlugin(provide),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __DEV__: true,
      __PROD__: false
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity // 不需要抽取公共代码到这个文件中
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      chunks: ['vendor', 'app'],
      filename: 'index.html',
      template: 'app.html',
      inject: true
    })
  ]
}
