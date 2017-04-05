/**
 * 微信分享
 *
 * 参考：https://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 */

/**
 * 所有需要使用JS-SDK的页面必须先注入配置信息，
 * 否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,
 * 目前Android微信客户端不支持pushState的H5新特性，
 * 所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复）。
 */
export function share (options) {
    if (!utils.browser.isWechat) {
        return
    }
    const wx = window.wx
    let signatureUrl = '/api/weixin/signature'
    if (__DEV__) {
        signatureUrl = 'http://m.rent.iwjwbeta.com/api/weixin/signature'
    }
    iwjw.ajax(signatureUrl).then((result) => {
        let { appId, timestamp, nonceStr, signature } = result.data
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名，见附录1
            jsApiList: [
                // 'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage' // ,
                // 'onMenuShareQQ',
                // 'onMenuShareWeibo',
                // 'onMenuShareQZone',
                // 'hideMenuItems',
                // 'showMenuItems',
                // 'hideAllNonBaseMenuItem',
                // 'showAllNonBaseMenuItem',
                // 'translateVoice',
                // 'startRecord',
                // 'stopRecord',
                // 'onVoiceRecordEnd',
                // 'playVoice',
                // 'onVoicePlayEnd',
                // 'pauseVoice',
                // 'stopVoice',
                // 'uploadVoice',
                // 'downloadVoice',
                // 'chooseImage',
                // 'previewImage',
                // 'uploadImage',
                // 'downloadImage',
                // 'getNetworkType',
                // 'openLocation',
                // 'getLocation',
                // 'hideOptionMenu',
                // 'showOptionMenu',
                // 'closeWindow',
                // 'scanQRCode',
                // 'chooseWXPay',
                // 'openProductSpecificView',
                // 'addCard',
                // 'chooseCard',
                // 'openCard'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })

        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function () {
            const config = Object.assign({
                title: '爱屋吉屋',
                link: pageConfig.mobileSiteUrl,
                imgUrl: require('global/img/wx_share_logo.jpg'),
                desc: '品牌公寓'
            }, options)

            wx.onMenuShareTimeline({
                title: config.title,
                link: config.link,
                imgUrl: config.imgUrl,
                success: config.success,
                cancel: config.cancel
            })

            wx.onMenuShareAppMessage({
                title: config.title,
                desc: config.desc,
                link: config.link,
                imgUrl: config.imgUrl,
                type: config.type,
                dataUrl: config.dataUrl,
                success: config.success,
                cancel: config.cancel
            })
        })

        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        wx.error(function (res) {
            console.log('wechat share error', res)
        })
    })
}
