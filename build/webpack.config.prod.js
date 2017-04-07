import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ZipWebpackPlugin from 'zip-webpack-plugin'

import eslintFriendlyFormatter from 'eslint-friendly-formatter'
import chalk from 'chalk'
import autoprefixer from 'autoprefixer'
import postcssClean from 'postcss-clean'

import ManifestPlugin from './plugins/manifest.js'

import { entry, alias, provide, envName, envConfig, upload as uploadConfig } from './config'

const postcssPlugin = function () {
  return [
    autoprefixer({
      browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4']
    }),
    postcssClean()
  ]
}

export default {
  context: `${process.cwd()}/app`,
  entry,
  devtool: false,
  output: {
    path: `${process.cwd()}/dist`,
    publicPath: envConfig.publicPath,
    filename: '[name].js',
    chunkFilename: '[id]_[chunkhash:7].js' // 非入口文件的命名规则
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
        cache: true,
        formatter: eslintFriendlyFormatter
      }
    }, {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
      options: {
        // sass: 'vue-style-loader!css-loader!sass-loader',
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
        'css-loader',
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
        name: '[name]_[hash:7].[ext]'
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new ProgressBarPlugin({
      format: `${chalk.bold('[:bar]')} ${chalk.cyan.bold(':percent (:elapseds)')} :msg`,
      clear: true,
      summary: false,
      summaryContent: false,
      customSummary (buildTime) {
        process.stdout.write(`=====${chalk.green.bold(`[ built in ${buildTime} ]`)}=====`)
      }
    }),
    new WebpackNotifierPlugin({
      title: '打包完成',
      logo: 'app/global/img/logo.png',
      successSound: 'Submarine',
      failureSound: 'Glass',
      suppressSuccess: true
    }),

    new webpack.ProvidePlugin(provide),
    // http://vue-loader.vuejs.org/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __DEV__: false,
      __PROD__: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity // 不需要抽取公共代码到这个文件中
    }),

    new CleanWebpackPlugin(['dist', 'zip'], {
      root: `${process.cwd()}`,
      verbose: false
    }),
    // 注意：ManifestPlugin必须放在ZipWebpackPlugin之前
    new ManifestPlugin({
      versionFiles: [
        'vendor.js',
        'app.js'
      ],
      hashNum: 7
    }),
    // https://github.com/erikdesjardins/zip-webpack-plugin
    new ZipWebpackPlugin({
      path: '../zip', //relative (to Webpack output path)
      filename: `${uploadConfig.project}.zip`
    }),
  ]
}
