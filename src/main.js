// 引入项目图标库
// 非必需
import '@/assets/iconfont/iconfont.css'

// 一些常用的组件在全局里面加载
// 不常用的组件，使用按需加载
import './medi-ui'

import Vue from 'vue'

import VuePortal from 'portal-vue'
import { Plugin as VueFragment } from 'vue-fragment'

import App from './App.vue'
import router from './router'
import store from './store'

// import '@/assets/iconfont/iconfont.scss'
import '@/assets/styles/common.scss'

Vue.config.productionTip = false

Vue.use(VueFragment)
Vue.use(VuePortal)

/**
 * 创建应用
 */
function createApp() {
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  })

  app.$mount('#app')

  // 仅开发的时候使用
  if (process.env.NODE_ENV === 'development') {
    window.app = app
  }
}

/**
 * 启动前
 *
 * @return {Promise<void>}
 */
async function bootstrap() {
  // await store.dispatch('app/fetchMenu')
}

/**
 * 启动错误
 *
 * @return {void | Promise<void>}
 */
function errorHandler(err) {
  window.addEventListener('load', function () {
    const errEl = document.getElementById('error')
    const loadingEl = document.getElementById('loading')

    // 隐藏 loading，显示错误
    loadingEl.style.display = 'none'
    errEl.style.display = 'block'

    // 退出登录按钮
    // const logoutBtnEl = errEl.querySelector('.logout-btn')
    // logoutBtnEl.addEventListener('click', () => {
    //   // todo: 退出逻辑
    // })

    // 提示信息
    const msgEl = errEl.querySelector('.errmsg__message')
    if (process.env.NODE_ENV === 'development') {
      msgEl.innerHTML = `<code style="color:red;"><pre>${err.stack}</pre></code>`
    } else {
      // 这里上报错误到服务器
      console.error(err)
      // 生产模式
      msgEl.innerText = `应用启动失败: ${err.message}`
    }
  })
}

bootstrap().then(createApp, errorHandler)

// 仅开发的时候使用
if (process.env.NODE_ENV === 'development') {
  // 初始化 mocks 功能
  const webpackContext = require.context('@/mocks', true, /\.mock\.js/)
  webpackContext.keys().forEach((filename) => {
    webpackContext(filename)
  })
}
