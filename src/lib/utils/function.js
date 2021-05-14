/**
 *
 * @param {Object} 待转换对象
 */
export function toParam(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&')
}

/**
 *
 * @param {Object} 目标对象
 * @param {Object} 来源
 */
export function assignObj(target, source) {
  var clone = deepCopy(target)
  Object.assign(clone, source)
  return clone
}
/**
 * @function deepCopy 浅拷贝
 * @param  {Object} obj {description}
 * @return {Object} {description}
 */
export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function delCookie(key) {
  var date = new Date()
  date.setTime(date.getTime() - 1)
  var delValue = getCookie(key)
  if (delValue) {
    document.cookie = key + '=' + delValue + ';path=/;expires=' + date.toGMTString()
  }
}

//读取cookies
export function getCookie(name) {
  let arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}

/**
 * 获取数据label
 *
 * @param {String} 值
 * @param {Array} 列表数组
 */
export function getLabel(val, list) {
  const item = (list && list.find((r) => r.value == val)) || {}
  return item.label || ''
}

/**
 *
 * @param {String} 状态值
 */
export function getColor(label) {
  if (label === '待审核') {
    return 'orange'
  } else if (label === '已完成' || label === '已关闭') {
    return 'green'
  } else if (label === '已拒绝') {
    return 'gray'
  } else {
    return 'blue'
  }
}
import dayjs from 'dayjs'
//周日期格式化
export function weekFormat(weekTime) {
  let date2 = weekTime
  let startTime = dayjs(weekTime).year() + '-01-01'
  let date1 = dayjs(startTime).toDate()
  let date3 = date2 - date1
  let date4 = Math.ceil(date3 / (24 * 60 * 60 * 1000))
  let date5 = Math.ceil(date4 / 7)
  return date5
}
