/**
 * 与原生交互桥
 * @Author SUNXG
 * @CreateTime 2017-02-04T11:26:34+0800
 *
 * 参考文档bridge.md，新增bridge请一定要在该文档中说明
 */

var idCounter = 1 // 全局唯一标识，从1开始累加

function callnative (api, params) {
  if (!utils.browser.isApp) {
    console.warn(`[bridge.${api}]`, params)
    return Promise.resolve({})
  }
  return new Promise(function (resolve, reject) {
    try {
      // 1.创建全局回调函数，放在映射表中
      const callback = `cb_${idCounter++}`
      if (__DEV__) {
        console.warn(`[bridge.${api}.${callback}]`, params)
      }
      window[callback] = data => {
        if (__DEV__) {
          console.warn(`${callback}-->`, data && JSON.parse(JSON.stringify(data)))
        }
        // data ? resolve(data) : reject(data)
        resolve(data)
        setTimeout(() => delete window[callback], 0)
      }
      params.callback = callback
      params._t = Date.now()

      // 2.序列化参数
      const search = Object.keys(params).map(k => {
        let v = params[k]
        // v = encodeURIComponent(encodeURIComponent(typeof v === 'string' ? v : JSON.stringify(v)))
        v = encodeURIComponent(typeof v === 'string' ? v : JSON.stringify(v))
        return `${k}=${v}`
      }).join('&')

      // 3.通过iframe与原生通信
      const url = `iwjw://callnatvie/${api}?${search}`
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = url
      document.body.appendChild(iframe)
      setTimeout(() => {
        iframe.parentNode.removeChild(iframe)
      }, 300)
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * 方法调用
 * @param {string} method 方法名称
 * @param {object} params 参数
 * @return {promise}
 */
export function call (method, params) {
  params = Object.assign({ method }, params)
  return callnative('callmethod', params)
}

/**
 * 打开UI界面
 * @param {object} params 参数
 * @return {promise}
 */
export function jumpui (params = {}) {
  return callnative('jumpui', params)
}

/**
 * 调用后台API
 * @param {string} url API地址
 * @param {object} params 参数
 * @return {promise}
 */
export function ajax (url, params) {
  params = Object.assign({ apiname: url }, params)
  return callnative('callapiservice', params)
}

/**
 * 弹出原生登录页面
 * @param {object} params 参数
 * @return {promise}
 */
export function login (params = {}) {
  return callnative('loginwithui', params)
}

/**
 * 日志收集
 * @param {object} params 参数
 * @return {promise}
 */
export function log (params = {}) {
  return callnative('datacollection', { data: params })
}

/**
 * 关闭当前webview
 * @return {promise}
 */
export function back () {
  return callnative('back', {})
}

/* *************************
 * APP调用H5
 **************************/

const callMap = {} // 回调映射表

/**
 * 注册一个回调函数
 * @param {string} 回调函数名称
 * @param {function} 回调函数
 */
export function onCall (method, callback) {
  callMap[method] = callback
}

/**
 * 解除回调函数
 * @param {string} 回调函数名称
 * @param {function} 回调函数
 */
export function offCall (method) {
  delete callMap[method]
}

/**
 * APP回调H5
 * @param {string} method 方法名称
 * @param {object} params 参数
 */
window.callJs = function (method, params) {
  callMap[method] && callMap[method](params)
}

