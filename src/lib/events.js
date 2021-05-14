import Vue from 'vue'
// 使用bus操作请先进入constants/events 中定义事件名,避免事件总线过度导致混乱
const eventBus = new Vue()

export default eventBus
