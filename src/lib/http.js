import axios from 'axios'
import Cookies from 'js-cookie'
// import isObject from 'lodash/isObject'

const axiosConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 6000000,
  withCredentials: true,
}

const http = axios.create(axiosConfig)

http.interceptors.request.use(
  (config) => {
    let authTemp = Cookies.get('Authorization')
    config.headers['Authorization'] = authTemp

    /*     let expires = Cookies.get('expires')
    if (expires) {
      let dangQianSJ = dayjs()
      let guoQiSJ = dayjs(expires)
      let shengYuSj = guoQiSJ.diff(dangQianSJ, 'hour')
      if (shengYuSj < 6 && !shuaXinToken) {
        shuaXinTokenFun(true)
        let obj = new FormData()
        obj.append('grant_type', 'refresh_token')
        obj.append('refresh_token', localStorage.getItem('refreshToken'))
        obj.append('client_id', userData.client_id)

        httpTmep
          .post(`${GLOBAL.authBaseUri}/connect/token`, obj)
          .then(re => {
            let reData = re.data;
            let exp = new Date();
            exp.setTime(exp.getTime() + reData.expires_in * 1000)
            localStorage.setItem('refreshToken', reData.refresh_token)
            document.cookie = 'Authorization=' + reData.token_type + ' ' + reData.access_token +
              '; path=/; expires=' + exp.toGMTString()
            document.cookie = 'expires=' + exp.toGMTString() + '; path=/; expires=' + exp.toGMTString()

            shuaXinTokenFun(false)
          })
          .catch(e => {
            shuaXinTokenFun(false)
          })
      }
    } */
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    let responseMessage = {}
    if (error.response) {
      responseMessage.code = error.response.status
      responseMessage.message = error.response.statusText
      responseMessage.requestUrl = error.request.responseURL
      if (error.response.data) {
        responseMessage.message = error.response.data
        responseMessage.details = error.response.data
        if (error.response.status == 500) {
          responseMessage.message = '服务发生未处理异常'
        }
      }
    }
    //console.log(`404 ----${JSON.stringify(error.response)}`)
    return Promise.reject(responseMessage)
  }
)
export default http
