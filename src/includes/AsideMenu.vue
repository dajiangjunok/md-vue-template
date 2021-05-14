<template>
  <ul style="height: 0">
    <li
      class="aside-menu-trigger"
      v-for="(menu, menuIndex) in menus"
      :key="menuIndex"
      :class="{ 'has-child': menu.children.length > 0 }"
    >
      <i :class="menu.icon" :style="{ color: menu.color }"></i>
      <span v-if="!collapse">{{ menu.title }}</span>
      <div class="aside-menu-panel clear-scroll-x" :style="panelStyle">
        <md-scrollbar style="height: 100%; z-index: 999">
          <div
            class="classify"
            :class="{
              'no-child': !(item.children && item.children.length > 0),
            }"
            v-for="(item, index) in menu.children"
            :key="index"
          >
            <template v-if="item.children && item.children.length > 0">
              <p class="head">{{ item.title }}</p>
              <ul class="items">
                <a
                  v-for="(subItem, subIndex) in item.children"
                  class="item"
                  :key="subIndex"
                  @click="onelect(subItem)"
                >
                  <i class="iconfont iconbiaoqiancaidan"></i>
                  <span>{{ subItem.title }}</span>
                </a>
              </ul>
            </template>
            <template v-else>
              <ul class="items">
                <router-link :to="{ name: item.index }" class="item">
                  <i class="iconfont iconbiaoqiancaidan"></i>
                  <span>{{ item.title }}</span>
                </router-link>
              </ul>
            </template>
          </div>
        </md-scrollbar>
      </div>
    </li>
  </ul>
</template>

<script>
import last from 'lodash/last'

import { mapState } from 'vuex'
// import { SideMenu } from '@mediinfo-ued/medi-ui'

export default {
  name: 'include-aside-menu',
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
    theme: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      menus: [],
      indexes: {},
      panelStyle: {
        left: '40px',
      },
    }
  },
  computed: {
    ...mapState('app', ['collapse']),
    matched() {
      const name = this.$route.name
      const indexes = this.indexes
      return indexes[name] || {}
    },
    defaultActive() {
      return this.matched.active || this.$route.name
    },
  },
  watch: {
    items: {
      handler: 'onItemsChange',
      deep: true,
      immediate: true,
    },
    collapse(newValue) {
      this.panelStyle.left = newValue ? '40px' : '100px'
    },
  },
  methods: {
    onItemsChange(items) {
      const mapping = {}
      const router = this.$router

      const recursive = (items, indexes, parents) => {
        return items.map((item) => {
          const indexPaths = indexes.slice(0)
          const breadcrumb = parents.slice(0)

          const { url, title, icon, iconPrefix, hidden, color, children = [] } = item
          const data = { title, icon, iconPrefix, hidden, color }

          if (url) {
            const { resolved } = router.resolve(url)
            const name = resolved.name || url
            if (!hidden) {
              indexPaths.push(name)
            }

            const query = Object.assign({}, resolved.query, data.query)
            const params = Object.assign({}, resolved.params, data.params)

            breadcrumb.push({
              index: name,
              title: title,
              to: { name, params, query },
            })

            const active = hidden === true ? last(indexPaths) : name
            mapping[name] = { active, name, params, query, breadcrumb }

            // 写入 index
            data.index = name
          }

          if (children.length > 0) {
            data.children = recursive(children, indexPaths, breadcrumb)
          }

          return data
        })
      }

      this.indexes = mapping
      this.menus = recursive(items || [], [], [])
    },
    onActiveChange(name) {
      const indexes = this.indexes
      const matched = indexes[name]
      if (matched) {
        this.$router.push({
          name: matched.active,
          query: matched.query,
          params: matched.params,
        })
      } else {
        const { resolved } = this.$router.resolve(name)
        this.$router.push({
          path: resolved.path,
          query: resolved.query,
          params: resolved.params,
        })
      }
    },
  },
  components: {
    // 'md-side-menu': SideMenu
  },
}
</script>

<style lang="scss">
.aside-menu-trigger {
  position: relative;
  width: 100%;
  height: 48px;
  line-height: 48px;
  color: #fff;
  font-size: 12px;
  border-bottom: 1px solid #4b5b73;
  z-index: 4;
  i {
    font-size: 20px;
    margin: 0 8px;
    vertical-align: middle;
  }
  &:hover {
    background-color: #29b6f6;
    cursor: pointer;
    i {
      color: #fff !important;
    }
  }
  &.has-child:hover {
    .aside-menu-panel {
      display: block;
    }
    &:after {
      content: '';
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 6px solid #fff;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 5;
    }
  }
}
.aside-menu-panel {
  width: 200px;
  height: calc(100vh - 50px);
  line-height: 20px;
  font-size: 14px;
  position: fixed;
  top: 50px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.29);
  border-radius: 4px;
  z-index: 9999;
  display: none;
  .classify {
    border-top: 1px solid #eee;
    &:first-child {
      border-top: 0;
    }
    &.no-child {
      border-top: 0;
    }
    .head {
      color: #999;
      padding-top: 14px;
      padding-left: 15px;
    }
    .items {
      padding: 5px 0;
      .item {
        position: relative;
        display: block;
        line-height: 36px;
        padding-left: 35px;
        font-size: 14px;
        color: #333;
        i.iconfont {
          font-size: 12px;
          // margin: 0 8px 0 0;
          position: absolute;
          left: 10px;
          color: #333 !important;
        }
        &:hover {
          background-color: #e2efff;
        }
      }
    }
  }
}
</style>
