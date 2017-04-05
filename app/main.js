import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './app'
import store from './store'
import router from './router'

import { Lazyload, InfiniteScroll } from 'mint-ui'

// 使用插件
Vue.use(VueResource)
Vue.use(Lazyload, {
    loading: require('global/img/img_loading_90_60@2x.png'),
    error: require('global/img/img_empty_90_60@2x.png')
})
Vue.use(InfiniteScroll)

Vue.prototype.browser = utils.browser

const app = new Vue({
    store,
    router,
    render: h => h(App)
})

app.$mount('#app')
