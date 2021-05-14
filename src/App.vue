<template>
  <md-app id="app" :layouts="layouts" default-layout="user">
    <md-tabs-view :tabs="initialTabs" />
  </md-app>
</template>

<script>
import { basename, extname } from 'path-browserify'

import { App, TabsView } from '@mediinfo-ued/medi-ui'

export default {
  name: 'App',
  data() {
    // 布局列表
    this.layouts = loadAllLayoutComponents()

    return {
      // 固定页签
      initialTabs: [
        {
          title: '首页',
          to: '/',
          closable: false,
        },
        {
          title: '关于',
          to: '/about',
          closable: false,
        },
      ],
    }
  },
  components: {
    'md-app': App,
    'md-tabs-view': TabsView,
  },
}

/**
 * 加载所有布局组件
 *
 * @return {Object} 布局组件
 */
function loadAllLayoutComponents() {
  const layoutLoader = require.context('./layouts', false, /\.vue$/)

  return layoutLoader.keys().reduce(function (obj, filename) {
    const mod = layoutLoader(filename)
    const name = basename(filename, extname(filename)).toLowerCase()

    if (mod.__esModule) {
      obj[name] = mod.default
    } else {
      obj[name] = mod
    }
    return obj
  }, {})
}
</script>
<style lang="scss" scoped>
#app {
  .md-main.layout-main {
    min-height: calc(100vh - 50px) !important;
  }
}
</style>
