<template>
  <md-container class="layout basic-layout">
    <md-header class="layout-header" height="50">
      <!-- S 导航栏 -->
      <md-navbar>
        <template slot="left">
          <md-navbar-brand v-bind="site"></md-navbar-brand>
        </template>

        <template slot="right">
          <span>下城区嘲鸣卫生院</span>
          <md-divider direction="vertical"></md-divider>
          <include-user-control class="navbar-action-button" />
        </template>
      </md-navbar>
      <!-- E 导航栏 -->
    </md-header>

    <md-container>
      <include-aside :collapse="collapse" @on-toggle="toggleAsideCollapse">
        <include-aside-menu :items="menus" :collapse="collapse" />
      </include-aside>

      <md-main class="layout-main">
        <slot />
      </md-main>
    </md-container>
  </md-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Aside from '@/includes/Aside.vue'
import AsideMenu from '@/includes/AsideMenu.vue'
import UserControl from '@/includes/UserControl.vue'

const siteLogo = require('@/assets/images/logo.png')
const siteTitle = process.env.VUE_APP_DEFAULT_SITE_TITLE

export default {
  name: 'basic-layout',
  data() {
    return {
      site: {
        logo: siteLogo,
        title: siteTitle,
      },
    }
  },
  computed: mapState('app', ['collapse', 'menus']),
  methods: mapMutations('app', ['toggleAsideCollapse']),
  components: {
    'include-aside': Aside,
    'include-aside-menu': AsideMenu,
    'include-user-control': UserControl,
  },
}
</script>

<style lang="scss" src="@/assets/styles/layout.scss"></style>
