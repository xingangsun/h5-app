/**
 * 获得API
 *
 * # Usage
 * api(API名称)
 */
let basePath = ''
if (__DEV__) {
    if (!utils.browser.isApp) {
        basePath = 'http://10.7.249.168:3001/api/'
        // basePath = 'http://192.168.1.121:7003/'
        // basePath = 'http://localhost:3001/api'
        // basePath = 'http://192.168.1.16:8101'
        // basePath = 'http://10.7.249.43:3001/api'
    }
}

const apiMap = {

}

export default function (name, ...args) {
    return iwjw.ajax(`${basePath}/api/${apiMap[name]}`, ...args)
}
