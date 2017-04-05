/**
 * http://babeljs.io/docs/usage/polyfill/
 *
 * 我们使用了transform-runtime按需转换不支持的API，
 * 但是transform-runtime并不能转换实例方法，
 * 所以我们全局引入了这些不支持的API（部分常用）
 *
 * 更多请参考：https://github.com/zloirock/core-js
 */
import 'core-js/fn/array/copy-within'
import 'core-js/fn/array/fill'
import 'core-js/fn/array/find'
import 'core-js/fn/array/find-index'

// import 'core-js/fn/function/name'

// import 'core-js/fn/regexp/flags'

// import 'core-js/fn/string/code-point-at'
import 'core-js/fn/string/ends-with'
import 'core-js/fn/string/includes'
import 'core-js/fn/string/repeat'
import 'core-js/fn/string/starts-with'
import 'core-js/fn/string/pad-start'
import 'core-js/fn/string/pad-end'
