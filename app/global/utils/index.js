/**
 * 工具方法
 */

/**
 * 浏览器类型判断
 */
// var userAgent = navigator.userAgent.toLowerCase()
// export var browser = Object.assign({
//     isApp: /Iwjw/i.test(userAgent),
//     isIos: /ios/i.test(userAgent),
//     isAndroid: /android/i.test(userAgent),
//     isWeixin: userAgent.match(/MicroMessenger/i) === 'micromessenger',
//     isMobile: (function (userAgent) {
//         const phoneReg = '\\b(ip(hone|od)|android|opera m(ob|in)i|windows (phone|ce)|blackberry|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp|laystation portable)|nokia|fennec|htc[-_]|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b'
//         return !!new RegExp(phoneReg, 'igm').exec(userAgent)
//     })(userAgent),
//     isPad: (function (userAgent) {
//         const tableReg = '\\b(ipad|tablet|(Nexus 7)|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b'
//         return !!new RegExp(tableReg, 'igm').exec(userAgent)
//     })(userAgent),
//     isIphone: (function (userAgent) {
//         const phoneReg = '\\b(ip(hone|od))\\b'
//         return !!new RegExp(phoneReg, 'igm').exec(userAgent)
//     })(userAgent)
// }, (function judgeBrowser (userAgent) { // judge browser
//     function uaMatch (userAgent) {
//         // ie 11
//         let match = /(msie\s|trident.*rv:)([\w.]+)/.exec(userAgent)
//         if (match !== null) {
//             return {
//                 browser: 'msie',
//                 version: match[2] || '0'
//             }
//         }
//         let b = /(chrome)[ \/]([\w.]+)/.exec(userAgent) || /(webkit)[ \/]([\w.]+)/.exec(userAgent) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(userAgent) || /(msie) ([\w.]+)/.exec(userAgent) || userAgent.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) || []

//         return {
//             browser: b[1] || '',
//             version: b[2] || '0'
//         }
//     }

//     let a = uaMatch(userAgent)
//     let b = {}
//     a.browser && (b[a.browser] = !0, b.version = a.version)
//     b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0)

//     return b
// })(userAgent), { // judge OS
//     isMs: userAgent.indexOf('windows', 0) !== -1,
//     isMac: userAgent.indexOf('mac', 0) !== -1,
//     isLinux: userAgent.indexOf('linux', 0) !== -1,
//     isUnix: userAgent.indexOf('x11', 0) !== -1
// }, (function getAppVersion (userAgent) {
//     var obj = {}
//     if (/iwjw/i.test(userAgent)) {
//         obj.appVersion = (userAgent.split('iwjw_ios_')[1] || userAgent.split('iwjw_android_')[1])
//     } else {
//         obj.appVersion = null
//     }
//     return obj
// })())

/**
 * 浏览器类型判断
 *
 * os.isWebkit
 * os.isIos
 * os.isAndroid
 * os.isIphone
 * os.isIpad
 * os.isIpod
 * os.isWp
 * os.isWebos
 * os.isTouchpad
 * os.isTablet
 * os.isMs
 * os.isMac
 * os.isLinux
 * os.isUnix
 * os.version
 *
 * browser.isWebkit
 * browser.isChrome
 * browser.isFirefox
 * browser.isIe
 * browser.isSafari
 * browser.isWebview
 * browser.isWechat
 * browser.isApp
 * browser.appVersion
 * browser.version
 *
 */
const detector = (function detect (ua) {
    const os = {}
    const browser = {}
    const webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/)
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
    const osx = !!ua.match(/\(Macintosh\; Intel /)
    const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
    const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
    const webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)
    const wp = ua.match(/Windows Phone ([\d.]+)/)
    const touchpad = webos && ua.match(/TouchPad/)
    const chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)
    const firefox = ua.match(/Firefox\/([\d.]+)/)
    const ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/)
    const webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
    const safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

    if (webkit) {
        browser.isWebkit = true
        browser.version = webkit[1]
    }
    if (android) {
        os.isAndroid = true
        os.version = android[2]
    }
    if (iphone && !ipod) {
        os.isIos = os.isIphone = true
        os.version = iphone[2].replace(/_/g, '.')
    }
    if (ipad) {
        os.isIos = os.isIpad = true
        os.version = ipad[2].replace(/_/g, '.')
    }
    if (ipod) {
        os.isIos = os.isIpod = true
        os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
    }
    if (wp) {
        os.isWp = true
        os.version = wp[1]
    }
    if (webos) {
        os.isWebos = true
        os.version = webos[2]
    }
    if (touchpad) {
        os.isTouchpad = true
    }
    if (chrome) {
        browser.isChrome = true
        browser.version = chrome[1]
    }
    if (firefox) {
        browser.isFirefox = true
        browser.version = firefox[1]
    }
    if (ie) {
        browser.isIe = true
        browser.version = ie[1]
    }
    if (safari && (osx || os.ios)) {
        browser.isSafari = true
        if (osx) {
            browser.version = safari[1]
        }
    }
    if (webview) {
        browser.isWebview = true
    }
    if (ipad || (android && !ua.match(/Mobile/)) ||
        (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/))) {
        os.isTablet = true
    }
    if (!os.tablet && !os.ipod && (android || iphone || webos ||
        (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
        (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/)))) {
        os.isPhone = true
    }
    if (/Iwjw/i.test(ua)) { // iwjw app
        browser.isApp = true
        browser.appVersion = (ua.match(/Iwjw_iOS_([\d\.]+)/) || ua.match(/Iwjw_Android_([\d\.]+)/))[1]
    }
    if (/MicroMessenger/i.test(ua)) {
        browser.isWechat = true
    }
    if (ua.indexOf('windows') !== -1) {
        os.isMs = true
    }
    if (ua.indexOf('mac') !== -1) {
        os.isMac = true
    }
    if (ua.indexOf('linux') !== -1) {
        os.isLinux = true
    }
    if (ua.indexOf('x11') !== -1) {
        os.isUnix = true
    }

    // console.log(os, browser)
    return { os, browser }
}(navigator.userAgent))

export var os = detector.os
export var browser = detector.browser

/**
 * APP版本比较
 *
 * Example:
 * versionCompare('1.1', '1.2') => -1
 * versionCompare('1.1', '1.1') =>  0
 * versionCompare('1.2', '1.1') =>  1
 * versionCompare('2.23.3', '2.22.3') => 1
 * Returns:
 * -1 = left is LOWER than right
 *  0 = they are equal
 *  1 = left is GREATER = right is LOWER
 *  And FALSE if one of input versions are not valid
 *
 * @param {string} a
 * @param {string} b
 */
export function appVersionCompare (a, b) {
    if ((typeof a + typeof b) != 'stringstring') {
        return
    }
    a = a.split('.')
    b = b.split('.')
    const len = Math.max(a.length, b.length)
    for (let i = 0; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1
        }
    }
    return 0
}

/**
 * cookie操作
 *
 * @param {string} key - 键
 * @param {string|*} val - 值
 * @param {number} [time] - 有效时间毫秒。可选，不设置则没有过期时间
 * @return {string|null} get方法才有返回值
 */
export var cookie = {
    set (key, val, time) {
        let date = new Date()
        date.setTime(date.getTime() + time)
        document.cookie = `${key}=${val};expires=${date.toGMTString()}`
    },
    get (key) {
        const arr = document.cookie.match(new RegExp(`(^| )${key}=([^;]*)(;|$)`))
        return arr ? unescape(arr[2]) : null
    },
    delete (key) {
        if (this.get(key)) {
            this.set(key, 'x', -1)
        }
    }
}

/**
 * localStorage操作
 *
 * storage.set('a', { a: 1 })
 * storage.get('a') 返回JSON对象
 * storage.remove('a')
 */
export var storage = {
    set (key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val))
        } catch (err) {
            console.log(err)
        }
    },
    get (key) {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (err) {
            return undefined
        }
    },
    remove (key) {
        localStorage.removeItem(key)
    }
}

/*
 * Generate a random uuid.
 *
 * USAGE: uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
export function uuid (len, radix = CHARS.length) {
    let uuid = []

    if (len) {
        for (let i = 0; i < len; i++) {
            uuid[i] = CHARS[0 | Math.random() * radix]
        }
    } else {
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                let r = 0 | Math.random() * 16
                uuid[i] = CHARS[(i === 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }
    return uuid.join('')
}
