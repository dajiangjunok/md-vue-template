<template>
  <div class="data-null">
    <div v-if="!isLight" class="data-null__img"></div>
    <div v-else class="data-null__img is-light"></div>
    <p class="data-null__text">{{ content }}<slot name="content"></slot></p>
  </div>
</template>

<script>
export default {
  name: 'data-null',
  props: {
    content: {
      type: String,
      default: '数据为空',
    },
    isLight: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
.data-null {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  &__img {
    height: 40%;
    min-height: 100px;
    background: url(~@/assets/images/null.png) no-repeat center;
    background-size: contain;
    &.is-light {
      background: url(~@/assets/images/burnout-chart-null.png) no-repeat center;
      background-size: contain;
    }
  }
  &__text {
    margin-top: 15px;
    font-size: 12px;
    color: $gray-999;
    text-align: center;
  }
}
</style>
