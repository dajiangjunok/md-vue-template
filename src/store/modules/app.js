import { getMenuList } from '@/api/general/menu'

/**
 * 初始化状态
 *
 * @return {Object} 初始数据
 */
function initialState() {
  return {
    menus: [],
    collapse: true,
  }
}

/**
 * @type {import('vuex').Module}
 */
export default {
  namespaced: true,
  state: initialState,
  mutations: {
    loadMenu(state, menuList) {
      state.menus = menuList
    },
    toggleAsideCollapse(state) {
      state.collapse = !state.collapse
    },
  },
  actions: {
    async fetchMenu({ commit }) {
      const menuList = await getMenuList()
      commit('loadMenu', menuList)
    },
  },
}
