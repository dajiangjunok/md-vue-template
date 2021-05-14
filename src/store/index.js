import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersistence from 'vuex-persist'

import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

// 持久化存储插件
const persist = new VuexPersistence({
  storage: window.localStorage,
  key: 'user',
})

const plugins = [persist.plugin]

const store = new Store({
  strict: process.env.NODE_ENV === 'development',
  modules: { app, user },
  plugins: plugins,
})

// 仅开发的时候使用
if (process.env.NODE_ENV === 'development') {
  window.store = store
}

export default store
