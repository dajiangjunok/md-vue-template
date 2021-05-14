import { Base64 } from 'js-base64'
import { getCookie } from '@/lib/utils/function'

function getUser() {
  try {
    const token = getCookie('Authorization')
    if (token) {
      const value = token.split('.')[1]
      return JSON.parse(Base64.decode(value))
    }
  } catch (error) {
    console.error('加载用户信息失败', error.message)
  }

  return { name: '匿名用户' }
}

export default {
  namespaced: true,
  state() {
    return {
      data: getUser(),
    }
  },
}
