/**
 * 整站通用适配
 */
import Vue from 'vue'
import router from '../../router'

/** 页面配置 */
const origin = `${location.protocol}//${location.host}` // 当前站点基路径https://m.rent.iwjw.com
window.pageConfig = {
    mobileSiteUrl: origin, // 租赁项目移动站点基路径
    mobileMainSiteUrl: origin.replace('m.rent', 'm').replace('mrent', 'm') // IWJW移动端主站基路径
}

if (__DEV__) {
    pageConfig.mobileMainSiteUrl = 'http://m.iwjwtest.com'
}

/**
 * 开发环境中可以打印Observar Object
 *
 * @Author     SUNXG
 * @CreateTime 2017-02-14T20:33:08+0800
 */
if (__DEV__) {
    const log = console.log
    console.log = function (...args) {
        try {
            log(...args.map(arg => arg && JSON.parse(JSON.stringify(arg)) || arg))
        } catch (error) {
            console.log(...args)
        }
    }
}

/**
 * 设置文档标题
 */
export function setTitle (title) {
    document.title = title
    // 在webview或微信浏览器中，可能需要再触发一次文档更新才能使document.title生效
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = 'javascript:void(0)' // 使用空iframe，减小请求
    iframe.onload = function () {
        setTimeout(() => iframe.parentNode.removeChild(iframe), 0)
    }
    document.body.appendChild(iframe)
}

/**
 * 页面跳转
 */
export function go (h5, app) {
    if (utils.browser.isApp && app) {
        bridge.jumpui(app)
    } else if (h5 && h5.href) {
        location.href = h5.href
    } else {
        router.push(h5)
    }
}

/**
 * 微信分享
 */
export function share (options) {
    if (utils.browser.isApp) {
        bridge.call('sharepage', options)
    } else if (utils.browser.isWechat) {
        wechat.share(options)
    }
}

/**
 * 全局ajax请求适配，不出意外你必须使用此方法发送API请求，只支持GET，POST，JSONP请求
 *
 * Usage:
 * ajax(url) GET请求url
 * ajax(url, { data }) GET请求url, 请求参数为data
 * ajax(url, { data }, { method: 'POST' }) POST请求url, 请求参数为data
 * ajax(url, true) GET请求url, 强制从WEB发请求
 * ajax(url, { data }, true) GET请求url, 请求参数为data, 强制从WEB发请求
 * ajax(url, { data }, { method: 'JSONP' }, true) JSONP请求url, 请求参数为data, 强制从WEB发请求
 *
 * @Author     SUNXG
 * @CreateTime 2017-02-05T10:48:07+0800
 * @param      {string} url 请求URL[必须]，默认GET请求，根据环境决定是从APP发送请求还是从WEB发送请求
 * @param      {object} [data] 请求数据[可选]
 * @param      {object} [options] 请求配置[可选]，参考：https://github.com/mzabriskie/axios#request-config
 * @param      {boolean} [forceWebAjax] 是否强制从使用WEB发送ajax请求[可选]，默认false：如果在APP内部将通过APP发送ajax请求
 * @return     {promise} promise 参考：https://github.com/mzabriskie/axios#response-schema
 */
export function ajax (url, data, options, forceWebAjax = false) {
    const len = arguments.length
    if (len > 1 && typeof arguments[len - 1] === 'boolean') {
        // 最后一个参数是boolean类型，则作为forceWebAjax值
        forceWebAjax = arguments[len - 1]
        arguments[len - 1] = undefined
    }
    data = arguments[1] || {}
    options = arguments[2] || {}
    if (utils.browser.isApp && !forceWebAjax) {
        // 通过原生发出请求不含'/api/'字符串
        return bridge.ajax(url.replace('/api/', ''), Object.assign(data, options.params))
    } else {
        return Vue.http(Object.assign({
            url,
            params: options.method && options.method === 'POST' ? {} : data,
            body: data,
            emulateJSON: true
        }, options)).then(res => res.data)
    }
}

/**
 * 埋点
 *
 * @Author     SUNXG
 * @CreateTime 2017-01-20T15:17:53+0800
 * @param      {[object]} options [埋点信息]
 * @return     {[promise]}
 */
/* const logUrl = '' + 'track/user/web.do'
export var log = options => Vue.http.jsonp(logUrl, Object.assign({

}, options)).then(res => res.json()).catch(() => ({}))*/
export function log (data) {
    if (utils.browser.isApp) {
        return bridge.log(data)
    } else {
        // TODO：WEB浏览器中通过ajax jsonp进行
        return Promise.resolve({})
    }
}

/**
 * 检查是否安装原生APP，如果安装则唤醒APP并进入指定page，如果没有安装则进入下载页面
 * @param {[string]} page [原生页面名称]，可选，默认只唤醒APP
 */
export function checkApp (page = '') {
    const isAndroid = utils.os.isAndroid
    const iosGet9 = utils.os.isIos && utils.os.version.split('.')[0] >= 9 // ios >= 9

    let nativeUrl = 'iwjw://www.iwjw.com/' // android 6.0以前需要使用www.iwjw.com唤醒
    if (iosGet9) {
        nativeUrl = 'https://applink.iwjw.com/'
    }
    let href = pageConfig.mobileMainSiteUrl + '/download/mobile.html' // APP下载地址，未唤醒APP时的跳转地址
    if (isAndroid) {
        href += '?from=androidH5'
    }

    if (iosGet9) {
        nativeUrl = page ? nativeUrl + page : location.href.replace(location.origin + '/', nativeUrl)
        nativeUrl += (nativeUrl.indexOf('?') == -1 ? '?' : '&') + 'openstore=1'
        location.href = nativeUrl
    } else {
        nativeUrl += page
        if (utils.os.isWechat) {
            return
        }
        const iframe = document.createElement('iframe')
        if (isAndroid) {
            location.href = nativeUrl
        } else {
            iframe.style.display = 'none'
            iframe.src = nativeUrl
            document.body.appendChild(iframe)
        }

        let hasApp = true
        const time = 1000
        const t1 = Date.now()
        setTimeout(function () {
            var t2 = Date.now()
            if (t2 - t1 < time + 100) {
                hasApp = false
            } else {
                clearTimeout(timer2)
                iframe.parentNode.removeChild(iframe)
            }
        }, time)

        var timer2 = setTimeout(function () {
            if (!hasApp) {
                location.href = href
            }
            iframe.parentNode.removeChild(iframe)
        }, time + 1000)
    }
}
