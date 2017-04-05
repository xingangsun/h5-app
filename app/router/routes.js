/**
 * 路由合并
 */
import static_ from '../static/router'
import house from '../house/router'

// 合并所有router
export default [
    ...static_,
    ...house,
]
