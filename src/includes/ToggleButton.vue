<template>
  <div
    class="toggle-button"
    :class="{ 'toggle-button--is-collapse': collapse }"
  >
    <md-icon
      class="toggle-button__icon"
      :name="collapse ? 'shuangyoujiantou' : 'shuangzuojiantou'"
    />
    <span class="toggle-button__text">
      <i class="iconfont iconmediinfo"></i>
      联众智慧
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { Icon } from '@mediinfo-ued/medi-ui'

export default {
  name: 'include-toggle-button',
  computed: mapState('app', ['collapse']),
  components: {
    'md-icon': Icon
  }
}
</script>

<style lang="scss" scoped>
$component: '.toggle-button';

#{$component} {
  display: inline-block;
  height: 27px;
  line-height: 27px;
  background-color: #2d405c;
  color: #c3cede;
  cursor: pointer;
  box-sizing: border-box;

  #{$component}__icon {
    font-size: 12px;
    margin: 0 6px;
  }

  #{$component}__text {
    .iconfont {
      color: #f5231c;
      vertical-align: middle;
    }
  }
}

#{$component}--is-collapse {
  text-align: center;

  #{$component}__text {
    display: none;
  }
}
</style>
