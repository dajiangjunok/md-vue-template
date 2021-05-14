import http from '@/lib/http'

/**
 * 获取菜单列表
 *
 * @return {Array}
 */
export function getMenuList() {
  return http.get('/api/general/menu')
}
