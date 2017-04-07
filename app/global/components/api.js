/**
 * 获得API
 *
 * # Usage
 * api(API名称)
 */
let basePath = ''
if (__DEV__) {
  if (!utils.browser.isApp) {
    basePath = 'http://10.7.249.168:3001'
    // basePath = 'http://192.168.1.121:7003/'
    // basePath = 'http://192.168.31.213:3001/api/'
  }
}

const apiMap = {
  getSuggestions: 'brandRent/search', // 搜索推荐列表
  cityList: 'city/list' // 城市列表，以及该城市业务
}

export default function (name, ...args) {
  return iwjw.ajax(utils.browser.isApp ? apiMap[name] : `${basePath}/api/${apiMap[name]}`, ...args)
}
