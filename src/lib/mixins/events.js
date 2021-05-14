import eventBus from '@/system/lib/events'

function getCallback(vm, handler) {
  return typeof handler === 'function' ? handler : vm[handler]
}

export default {
  created() {
    // 获取刷新配置
    const events = this.$options.events
    if (!events) return

    // 当前组件上绑定的全局事件
    const bindEvents = []

    // 事件绑定
    for (const type in events) {
      const callback = getCallback(this, events[type])

      const handler = (...args) => {
        callback.call(this, type, ...args)
      }
      bindEvents.push({ type, handler })
      eventBus.$on(type, handler)
    }

    // 不需要响应式处理，而且这是私有的
    this._bindEvents = bindEvents
  },
  beforeDestroy() {
    const bindEvents = this._bindEvents || []

    // 循环解除事件
    bindEvents.forEach(obj => {
      eventBus.$off(obj.type, obj.bindFn)
    })

    // 销毁属性
    this._bindEvents = null
  }
}
