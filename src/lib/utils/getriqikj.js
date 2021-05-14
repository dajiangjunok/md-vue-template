/**获取本周、下周、上周的起始日、结束日 */
// 1.调用方法 getMonday("s",0)、getMonday("e",0)
// 2.type 为"s"代表开始日期,type为"e"代表结束日期
// 3.dates  不传或0代表本周，-1代表上周，1代表下周
export const getMonday = (type, dates) => {
  var now = new Date()
  var nowTime = now.getTime()
  var day = now.getDay()
  var longTime = 24 * 60 * 60 * 1000
  var n = longTime * 7 * (dates || 0)
  if (type == 's') {
    var dd = nowTime - (day - 1) * longTime + n
  }
  if (type == 'e') {
    var dd = nowTime + (7 - day) * longTime + n
  }
  dd = new Date(dd)
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1
  var d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  var day = y + '-' + m + '-' + d
  return day
}
/**获取本月、上月、下月的起始日、结束日 (不传或0代表本月，-1代表上月，1代表下月)*/
// 1.调用方法 getMonth("s",0)、getMonth("e",0)
// 2.type 为"s"代表开始日期,type为"e"代表结束日期
// 3.dates  不传或0代表本月，-1代表上月，1代表下月
export const getMonth = (type, months) => {
  var d = new Date()
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  if (Math.abs(months) > 12) {
    months = months % 12
  }
  if (months != 0) {
    if (month + months > 12) {
      year++
      month = (month + months) % 12
    } else if (month + months < 1) {
      year--
      month = 12 + month + months
    } else {
      month = month + months
    }
  }
  month = month < 10 ? '0' + month : month
  var date = d.getDate()
  var firstday = year + '-' + month + '-' + '01'
  var lastday = ''
  if (month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12') {
    lastday = year + '-' + month + '-' + 31
  } else if (month == '02') {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = year + '-' + month + '-' + 29
    } else {
      lastday = year + '-' + month + '-' + 28
    }
  } else {
    lastday = year + '-' + month + '-' + 30
  }
  var day = ''
  if (type == 's') {
    day = firstday
  } else {
    day = lastday
  }
  return day
}

/**获取去年、今年、明年开始日期、结束日期 (不传或0代表今年，-1代表去年，1代表明年)*/
// 1.调用方法 getYear("s",0)、getYear("e",0)
// 2.type 为"s"代表开始日期,type为"e"代表结束日期
// 3.dates  不传或0代表本年，-1代表上年，1代表下年
export const getYear = (type, dates) => {
  var dd = new Date()
  var n = dates || 0
  var year = dd.getFullYear() + Number(n)
  if (type == 's') {
    var day = year + '-01-01'
  }
  if (type == 'e') {
    var day = year + '-12-31'
  }
  if (!type) {
    var day = year + '-01-01/' + year + '-12-31'
  }
  return day
}
