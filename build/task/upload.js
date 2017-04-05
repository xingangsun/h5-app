/**
 * 文件上传test/beta环境
 */
import promptly from 'promptly'
import request from 'request'
import fs from 'fs'
import chalk from 'chalk'

import { upload as config, envName } from '../config'

// 用户输入
const _input = {
    env: envName,        // 上传环境
    version: null,    // 新版本号
    openAuto: null    // 自动更新
}

/**
 * 获得版本号
 */
function getVersion(check = false) {
    return new Promise((resolve, reject) => {
        if (check) { // 是否检查版本
            getResourceVersion()
        } else {
            // 无操作自动退出
            const exitTimer = setTimeout(() => {
                console.log(chalk.cyan('\n--------- 3分钟无操作，已自动退出 -------'))
                process.exit()
            }, 3 * 60 * 1000)

            promptly.confirm(`确认发布到${chalk.yellow.bold(envName)}环境？`, { default: true }, (err, val) => {
                clearTimeout(exitTimer)

                if (!val) {
                    process.exit()
                    return
                }

                getResourceVersion()
            })
        }

        function getResourceVersion() {
            const url = `${config.serverEnv[_input.env].serverUrl}${config.api.versionSuffix}`
            const options = {url, form: {
                folderName: config.project
            }, json: true}
            request.post(options, (err, res, body) => {
                if (err || !body || body.status != 1) {
                    reject(err || body)
                } else {
                    resolve(body.data)
                }
            })
        }
    })
}

/**
 * 上传资源
 */
function uploadAuto(oldVersion) {
    const defaultVersion = oldVersion.replace(/(\d+)$/, (d) => parseInt(d) + 1)
    return new Promise((resolve, reject) => {
        promptly.prompt(`请输入新版本号(${chalk.yellow.bold(defaultVersion)})开始上传:`, {
            default: defaultVersion,
            validator(version) {
                // if (!/^\d\.\d\.\d{1,3}(\.\d{1,3})?$/.test(version)) {
                if (!/^\d+$/.test(version)) {
                    throw new Error(`${chalk.cyan.bold(version)} format error`)
                } else {
                    // oldVersion < version
                    let v1 = oldVersion.split('.'), v2 = version.split('.'), l = Math.min(v1.length, v2.length)
                    if (!v1.every((v, i) => i == l-1 ? parseInt(v) < parseInt(v2[i]) : parseInt(v) <= parseInt(v2[i]))) {
                        throw new Error(`${chalk.cyan.bold(version)} must gt ${chalk.yellow.bold(oldVersion)}`)
                    }
                }
                return version
            },
            retry: false
        }, function (err, version) {
            if (err) {
                console.error('Invalid version:', chalk.red.bold(err.message))
                return err.retry()
            }
            _input.version = version

            const url = `${config.serverEnv[_input.env].serverUrl}${config.api.uploadSuffix}`

            const options = { url, formData: {
                project: config.serverEnv[_input.env].projectId,
                versionType: config.versionType,
                version: _input.version,
                isCoverVer: 1,
                file: fs.createReadStream(config.zipFilePath)
            }, json: true }
            request.post(options, (err, res, body) => {
                // console.log(err, body)
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    })
}

/**
 * 自动更新
 */
function openAuto() {
    return new Promise((resolve, reject) => {
        promptly.confirm(`${chalk.yellow.bold('是')}否打开自动更新？`, { default: true}, (err, openAuto) => {
            _input.openAuto = openAuto

            if (openAuto) {
                const url = `${config.serverEnv[_input.env].serverUrl}${config.api.openAutoSuffix}`
                const options = { url, form: {
                    id: config.serverEnv[_input.env].projectId
                }, json: true }
                request.post(options, (err, res, body) => {
                    // console.log(err, body)
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            } else {
                console.log(chalk.magenta('    已取消'))
                resolve()
            }
        })
    })
}

/**
 * 上传任务
 */
export default async function upload() {
    console.log(chalk.cyan('\n--------- 发布开始 -------'))

    const resourceVersion = await getVersion()
    console.log(`版本号：${chalk.yellow.bold(resourceVersion.version)} ${new Date(resourceVersion.updateTime).toLocaleString()}`)

    await uploadAuto(resourceVersion.version)
    console.log(chalk.magenta(`    已上传至${chalk.cyan.bold(_input.env)}环境`))

    await openAuto()
    _input.openAuto && console.log(chalk.magenta(`    自动更新已打开^_^`))

    // check version
    const checkVersion = await getVersion(true)
    console.log(`\n最新版本号：${chalk.yellow.bold(checkVersion.version)} ${new Date(checkVersion.updateTime).toLocaleString()}`)

    console.log(chalk.cyan('\n--------- 发布结束 -------'))
}
