/**
 * 构建模式入口
 */
import webpack from 'webpack'

import webpackConfig from '../webpack.config.prod'
import upload from './upload'
import deploy from './deploy'
import { envName } from '../config'

webpack(webpackConfig, function (err, stats) {
    if (err) {
        throw err
    }
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(stats.toString({
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: true,
        chunks: false,
        children: false
    }))

    if (stats.hasErrors() || stats.hasWarnings()) {
        return
    }

    // 集成发版
    if (envName == 'prod') {
        deploy()
    } else {
        upload()
    }
})
