/**
 * 路由配置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'hash',
    mode: 'history',
    routes
    // routes,
    // scrollBehavior (to, from, savedPosition) {
        // window.scrollTo(0, 0) // TODO: // 这个方法有bug？
        // return { x: 0, y: 0 }
    // }
})

router.afterEach(route => {
    window.scrollTo(0, 0) // scrollBehavior有bug，使用这个方法滚动到页面顶部
    const { meta: { title }} = route
    title && iwjw.setTitle(title) // 设置标题
})

export default router
