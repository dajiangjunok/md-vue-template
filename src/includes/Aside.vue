<template>
  <md-aside
    class="md-aside"
    :class="{ 'md-aside--collapsed': collapse }"
    :width="collapse ? collapsedWidth : width"
  >
    <md-container class="md-aside__inner" direction="vertical">
      <slot name="header"></slot>
      <md-scrollbar class="clear-scroll-x">
        <slot></slot>
      </md-scrollbar>
      <slot name="footer"></slot>
      <md-toggle-button :collapse="collapse" @click.native="onToggle()" />
    </md-container>
  </md-aside>
</template>

<script>
import ToggleButton from './ToggleButton.vue'

export default {
  name: 'include-aside',
  inheritAttrs: false,
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100px'
    },
    collapsedWidth: {
      type: String,
      default: '40px'
    }
  },
  methods: {
    onToggle() {
      this.$emit('on-toggle')
    }
  },
  components: {
    'md-toggle-button': ToggleButton
  }
}
</script>

<style lang="scss">
.md-aside {
  background: #3d526f;
  z-index: 1000;
  &__inner {
    height: 100%;
  }

  .md-scrollbar {
    flex: 1;
    height: 100%;
    &.clear-scroll-x {
      .md-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
}
</style>
