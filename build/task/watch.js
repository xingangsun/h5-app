/**
 * 监听模式入口
 *
 * 生成未压缩的代码和sourceMap到dist目录
 */
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import webpackConfigDev from '../webpack.config.dev'

// add sourceMap
const webpackConfig = Object.assign(webpackConfigDev, {
    watch: true,
    devtool: 'source-map'
})

// remove dist
webpackConfig.plugins.push(new CleanWebpackPlugin(['dist'], {
    root: `${process.cwd()}`,
    verbose: false
}))

webpack(webpackConfig, function (err, stats) {
    if (err) {
        return console.error(err)
    }

    const jsonStats = stats.toJson()
    if(jsonStats.errors.length > 0) {
        return console.log(jsonStats.errors.toString())
    }
    if(jsonStats.warnings.length > 0) {
        return console.log(jsonStats.warnings.toString())
    }
})
