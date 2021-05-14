import Vue from 'vue'
import VueRouter from 'vue-router'

// import routes from './routes'

Vue.use(VueRouter)

const files = require.context('@/views', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/views' + key.replace('.', ''))
  return page.default
})

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

// 仅开发的时候使用
if (process.env.NODE_ENV === 'development') {
  window.router = router
}

export default router
