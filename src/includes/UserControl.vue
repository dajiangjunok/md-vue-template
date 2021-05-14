<template>
  <md-dropdown class="user-control" trigger="click">
    <md-button class="user-control__text" type="text" icon="md-icon-yonghu-k">
      <span>欢迎您！</span>
      <span>{{ user.name }}</span>
      <i class="md-icon-caret-bottom md-icon--right"></i>
    </md-button>
    <md-dropdown-menu slot="dropdown">
      <md-dropdown-item> 个人中心 </md-dropdown-item>
      <md-dropdown-item> 设置 </md-dropdown-item>
      <md-dropdown-item divided @click.native="onLogout()"> 注销 </md-dropdown-item>
    </md-dropdown-menu>
  </md-dropdown>
</template>

<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex'

import authService from '@/coustomJs/auth'

export default {
  name: 'include-user-control',
  computed: mapState('user', { user: 'data' }),
  methods: {
    onLogout() {
      var domain = document.domain
      if (domain.indexOf('.mediinfo.cn') != -1) {
        domain = '.mediinfo.cn'
      }
      Cookies.remove('Authorization', { domain: domain })
      authService.logout().then(() => location.reload())
    },
  },
  created() {
    authService.createMcrpCookie()
  },
}
</script>
