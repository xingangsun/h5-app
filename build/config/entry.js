/**
 * 入口
 */
export default {
    vendor: [ // vendor
        'vue',
        'vue-router',
        'vue-resource',
        'vuex',
        // 'vuex-router-sync',
    ],
    app: [ // APP
        './global/iconfont/iconfont.css', // iconfont
        './global/module/polyfill.js', // polyfill
        './global/utils', // 工具类
        './global/bridge', // 与原生交互桥
        './global/iwjw', // 通用适配
        './main.js', // 应用入口
        './global/wechat', // 微信(分享)
    ]
}
