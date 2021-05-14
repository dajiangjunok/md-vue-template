import axios, { CancelToken } from 'axios'
import { assignObj, deepCopy } from './function'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import GLOBAL from '@/service/configSettings'

import { shuaXinToken, shuaXinTokenFun, userData } from './quanjubl'

const axiosConfig = {
  timeout: 6000000
}

const request = axios.create(axiosConfig)
const requestTmep = axios.create(axiosConfig)

// request interceptor
request.interceptors.request.use(
  config => {
    let authTemp = Cookies.get('Authorization')
    config.headers['Authorization'] = authTemp
    if (!authTemp && Cookies.get('jiaofu_isReLoad') != 'true') {
      Cookies.set('jiaofu_isReLoad', 'true', {
        expires: 1 / 24 / 60 / 10
      })
      document.location.reload()
    }

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

        requestTmep
          .post(`${GLOBAL.authBaseUri}/connect/token`, obj)
          .then(re => {
            let reData = re.data
            let exp = new Date()
            exp.setTime(exp.getTime() + reData.expires_in * 1000)
            localStorage.setItem('refreshToken', reData.refresh_token)
            document.cookie = 'Authorization=' + reData.token_type + ' ' + reData.access_token + '; path=/; expires=' + exp.toGMTString()
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
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
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
    } else {
      console.log(error)
    }
    //console.log(`404 ----${JSON.stringify(error.response)}`)
    return Promise.reject(responseMessage)
  }
)

export function useOneRequest(options) {
  let source = null

  return async config => {
    if (source) {
      source.cancel(new Error('cancel'))
      source = null
    }

    source = CancelToken.source()
    return request.request({ cancelToken: source.token, ...options, ...config })
  }
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function doGet(url, params = {}, pagesize, pageindex = 1, config) {
  var data = deepCopy(params)
  if (pagesize) {
    data = assignObj(params, {
      per_page: pagesize,
      page: pageindex
    })
  }

  return request.get(url, {
    ...config,
    params: data
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function doPost(url, data = {}, config) {
  return request.post(url, data, config)
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function doPatch(url, data = {}) {
  return new Promise((resolve, reject) => {
    request.patch(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function doPut(url, data = {}) {
  return new Promise((resolve, reject) => {
    request.put(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}
export function doDelete(url) {
  return new Promise((resolve, reject) => {
    request.delete(url).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}
export default request
