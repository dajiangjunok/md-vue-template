import { Loading } from 'element-ui'
let loading
export function startLoading() {
  //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(255,255,255,0)'
  })
}
export function endLoading() {
  //使用Element loading-close 方法
  loading.close()
}
export default {}
