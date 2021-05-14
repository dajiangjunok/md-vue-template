import store from '@/store'
import uniqBy from 'lodash/uniqBy'
import { tree } from '@mediinfo-ued/common-algorithm'

import { filterWithArr } from '@/system/utils/data-process'

function _setMenus(caiDans) {
  let list = []
  if (caiDans && caiDans.length > 0 && caiDans[0].children) {
    if (caiDans[0].children.length > 0) {
      caiDans[0].children.forEach(item => {
        //item是菜单组或者菜单
        let menu = {
          icon: item.tuBiao,
          iconPrefix: 'iconfont icon',
          color: item.yanSe,
          title: item.gongNengMC,
          children: []
        }

        if (item.gongNengDSX != '菜单组') {
          menu.index = item.url
          menu.hidden = true
        }

        if (item.children && item.children.length > 0) {
          if (item.gongNengDSX == '菜单组') {
            //item是菜单组
            item.children.forEach(item2 => {
              //item2是菜单
              if (item2.children) {
                const caiDanTemp = {
                  title: item2.gongNengMC,
                  index: item2.url,
                  children: []
                }
                item2.children.forEach(bqanItem => {
                  //bqanItem是标签或者按钮
                  if (bqanItem.gongNengDSX == '标签') {
                    const childrenTemp = bqanItem.children || []
                    const itemTemp = {
                      title: bqanItem.gongNengMC,
                      index: bqanItem.url,
                      hidden: true
                    }
                    if (childrenTemp.length > 0) {
                      itemTemp.children = childrenTemp.map(anNiuitem => {
                        return {
                          title: anNiuitem.gongNengMC,
                          index: anNiuitem.url,
                          hidden: true
                        }
                      })
                    }

                    caiDanTemp.children.push(itemTemp)
                  } else {
                    //bqanItem是按钮
                    const itemTemp = {
                      title: bqanItem.gongNengMC,
                      index: bqanItem.url,
                      hidden: true
                    }
                    caiDanTemp.children.push(itemTemp)
                  }
                })
                menu.children.push(caiDanTemp)
              }
            })
          } else {
            //item是菜单
            item.children.forEach(item2 => {
              //item2是标签或者按钮
              if (item2.gongNengDSX == '标签') {
                const childrenTemp = item2.children || []
                const itemTemp = {
                  title: item2.gongNengMC,
                  index: item2.url,
                  hidden: true
                }
                if (childrenTemp.length > 0) {
                  itemTemp.children = childrenTemp.map(anNiuitem => {
                    return {
                      title: anNiuitem.gongNengMC,
                      index: anNiuitem.url,
                      hidden: true
                    }
                  })
                }

                menu.children.push(itemTemp)
              } else {
                //item2是按钮
                const itemTemp = {
                  title: item2.gongNengMC,
                  index: item2.url,
                  hidden: true
                }
                menu.children.push(itemTemp)
              }
            })
          }
        }
        list.push(menu)
      })
    }
  }
  return list
}

export function getXiangMuZXMenus() {
  let list = []
  let treeCaiDan = tree.toTree(store.getters.yongHuCDXMZXList, {
    idKey: 'id',
    parentKey: 'fuJiID',
    rootValue: '0'
  })
  if (treeCaiDan && treeCaiDan.length > 0) {
    let zhongXinCD = treeCaiDan.filter(f => f.url == 'xiangMuZX')
    list = _setMenus(zhongXinCD)
  }
  return list
}

export function getJiaoFuLZDSYMenus() {
  let list = []
  let treeCaiDan = tree.toTree(store.getters.yongHuCDXMZXList, {
    idKey: 'id',
    parentKey: 'fuJiID',
    rootValue: '0'
  })
  if (treeCaiDan && treeCaiDan.length > 0) {
    let zhongXinCD = treeCaiDan.filter(f => f.url == 'jiaoFuLZDSY')
    list = _setMenus(zhongXinCD)
  }
  console.log(list)
  return list
}

export function getMenus(zhongXin) {
  let list = []
  if (store.getters.yongHuCDList.length > 0 && store.getters.chanpinid) {
    let dangQianCD = store.getters.yongHuCDList.filter(f => f.chanPinID == store.getters.chanpinid)
    if (dangQianCD && dangQianCD.length > 0 && dangQianCD[0].gongNengDs) {
      let treeCaiDan = tree.toTree(dangQianCD[0].gongNengDs, {
        idKey: 'id',
        parentKey: 'fuJiID',
        rootValue: '0'
      })
      if (treeCaiDan && treeCaiDan.length > 0) {
        let zhongXinCD = treeCaiDan.filter(f => f.url == zhongXin)
        list = _setMenus(zhongXinCD)
      }
    }
  }
  return list
}

export function getAllMenus(zhongXin) {
  let list = []
  let menuAll = []

  if (store.getters.yongHuCDXMZXList.length > 0) {
    store.commit('app/setIsXiangMuZX', true)
  }

  store.getters.yongHuCDList.forEach(item => {
    //循环获取所有产品菜单
    if (item.gongNengDs && item.gongNengDs.length > 0) {
      menuAll = [...menuAll, ...item.gongNengDs]
    }
  })
  menuAll = [...menuAll, ...store.getters.yongHuCDXMZXList]
  //去除重复菜单
  const allChanPinMenus = uniqBy(menuAll, 'id')
  store.commit('app/setMergeChanPinMenus', allChanPinMenus)
  if (allChanPinMenus && allChanPinMenus.length > 0) {
    //组装树型菜单
    let treeCaiDan = tree.toTree(allChanPinMenus, {
      idKey: 'id',
      parentKey: 'fuJiID',
      rootValue: parentNodes => {
        return parentNodes['0'].filter(f => f.url == zhongXin)
      }
    })
    if (treeCaiDan && treeCaiDan.length > 0 && treeCaiDan[0].children) {
      if (treeCaiDan[0].children.length > 0) {
        treeCaiDan[0].children.forEach(item => {
          //item是菜单组或者菜单
          let menu = {
            icon: item.tuBiao,
            iconPrefix: 'iconfont icon',
            color: item.yanSe,
            title: item.gongNengMC,
            index: item.url,
            children: []
          }

          if (item.gongNengDSX != '菜单组') {
            menu.index = item.url
            menu.hidden = true
          }

          if (item.children && item.children.length > 0) {
            if (item.gongNengDSX == '菜单组') {
              //item是菜单组
              item.children.forEach(item2 => {
                //item2是菜单
                if (item2.children) {
                  const caiDanTemp = {
                    title: item2.gongNengMC,
                    index: item2.url,
                    children: []
                  }
                  item2.children.forEach(bqanItem => {
                    //bqanItem是标签或者按钮
                    if (bqanItem.gongNengDSX == '标签') {
                      const childrenTemp = bqanItem.children || []
                      const itemTemp = {
                        title: bqanItem.gongNengMC,
                        index: bqanItem.url,
                        hidden: true
                      }
                      if (childrenTemp.length > 0) {
                        itemTemp.children = childrenTemp.map(anNiuitem => {
                          return {
                            title: anNiuitem.gongNengMC,
                            index: anNiuitem.url,
                            hidden: true
                          }
                        })
                      }

                      caiDanTemp.children.push(itemTemp)
                    } else {
                      //bqanItem是按钮
                      const itemTemp = {
                        title: bqanItem.gongNengMC,
                        index: bqanItem.url,
                        hidden: true
                      }
                      caiDanTemp.children.push(itemTemp)
                    }
                  })
                  menu.children.push(caiDanTemp)
                }
              })
            } else {
              //item是菜单
              item.children.forEach(item2 => {
                //item2是标签或者按钮
                if (item2.gongNengDSX == '标签') {
                  const childrenTemp = item2.children || []
                  const itemTemp = {
                    title: item2.gongNengMC,
                    index: item2.url,
                    hidden: true
                  }
                  if (childrenTemp.length > 0) {
                    itemTemp.children = childrenTemp.map(anNiuitem => {
                      return {
                        title: anNiuitem.gongNengMC,
                        index: anNiuitem.url,
                        hidden: true
                      }
                    })
                  }

                  menu.children.push(itemTemp)
                } else {
                  //item2是按钮
                  const itemTemp = {
                    title: item2.gongNengMC,
                    index: item2.url,
                    hidden: true
                  }
                  menu.children.push(itemTemp)
                }
              })
            }
          }
          list.push(menu)
        })
      }
    }
  }
  return list
}

export function setQuanXianCP() {
  let list = []
  if (store.getters.yongHuCDList.length > 0) {
    if (store.state.chanPin.items && store.state.chanPin.items.length > 0) {
      list = store.state.chanPin.items.filter(f => {
        let chanPin = store.getters.yongHuCDList.filter(y => y.chanPinID == f.id)
        if (chanPin && chanPin.length > 0) {
          return true
        } else {
          return false
        }
      })
    }
  }
  store.commit('chanPin/load', list)
}

//设置当前路由标签和按钮
function _setCurrentRouteBQAN(list, id) {
  let treeCaiDan = tree.toTree(list, {
    idKey: 'id',
    parentKey: 'fuJiID',
    rootValue: id
  })
  store.commit('yongHuCD/setCurrentRouteBQAN', treeCaiDan)
}

//产品改变时专用
export function setCurrentRouteBQAN(zhongXin) {
  if (store.getters.yongHuCDList.length > 0 && store.getters.chanpinid) {
    let dangQianCPCD = store.getters.yongHuCDList.filter(f => f.chanPinID == store.getters.chanpinid)
    if (dangQianCPCD && dangQianCPCD.length > 0 && dangQianCPCD[0].gongNengDs) {
      let zhongXinCD = dangQianCPCD[0].gongNengDs.filter(f => f.url == zhongXin)
      if (zhongXinCD && zhongXinCD.length > 0) {
        let zhongXinSonCD = filterWithArr(dangQianCPCD[0].gongNengDs, zhongXinCD[0], 'fuJiID', 'id')
        let routeObj = store.getters['yongHuCD/currentRoute']
        let isPowers = zhongXinSonCD.filter(f => f.url == routeObj.path || f.url == routeObj.fuLuYou)
        if (isPowers && isPowers.length > 0) {
          //有权限
          _setCurrentRouteBQAN(zhongXinSonCD, isPowers[0].id)
        }
      }
    }
  }
}

//设置首页路由权限
export function setIndexRouterQX(router, zhongXin) {
  router.beforeEach((to, form, next) => {
    let mergeChanPinMenus = store.getters['app/mergeChanPinMenus']
    if (mergeChanPinMenus && mergeChanPinMenus.length > 0) {
      let zhongXinCD = mergeChanPinMenus.filter(f => f.url == zhongXin)
      if (zhongXinCD && zhongXinCD.length > 0) {
        let zhongXinSonCD = filterWithArr(mergeChanPinMenus, zhongXinCD[0], 'fuJiID', 'id')
        let fuLuYou = to.matched[0].path
        let isPowers = zhongXinSonCD.filter(f => f.url == to.path || f.url == fuLuYou)
        if (isPowers && isPowers.length > 0) {
          //有权限
          _setCurrentRouteBQAN(zhongXinSonCD, isPowers[0].id)
          store.commit('yongHuCD/setcurrentRoute', {
            fuLuYou: fuLuYou,
            path: to.path
          })
          next()
        }
      }
    }
  })
}

//设置路由权限
export function setRouterQX(router, zhongXin) {
  router.beforeEach((to, form, next) => {
    if (store.getters.yongHuCDList.length > 0 && store.getters.chanpinid) {
      let dangQianCPCD = store.getters.yongHuCDList.filter(f => f.chanPinID == store.getters.chanpinid)
      if (dangQianCPCD && dangQianCPCD.length > 0 && dangQianCPCD[0].gongNengDs) {
        let zhongXinCD = dangQianCPCD[0].gongNengDs.filter(f => f.url == zhongXin)
        if (zhongXinCD && zhongXinCD.length > 0) {
          let zhongXinSonCD = filterWithArr(dangQianCPCD[0].gongNengDs, zhongXinCD[0], 'fuJiID', 'id')
          let fuLuYou = to.matched[0].path
          let isPowers = zhongXinSonCD.filter(f => f.url == to.path || f.url == fuLuYou)
          if (isPowers && isPowers.length > 0) {
            //有权限
            _setCurrentRouteBQAN(zhongXinSonCD, isPowers[0].id)
            store.commit('yongHuCD/setcurrentRoute', {
              fuLuYou: fuLuYou,
              path: to.path
            })
            next()
          }
        }
      }
    }
  })
}

//设置路由权限（项目中心）
export function setXiangMuZXRouterQX(router) {
  router.beforeEach((to, form, next) => {
    if (store.getters.yongHuCDXMZXList.length > 0) {
      let zhongXinCD = store.getters.yongHuCDXMZXList.filter(f => f.url == 'xiangMuZX')
      if (zhongXinCD && zhongXinCD.length > 0) {
        let zhongXinSonCD = filterWithArr(store.getters.yongHuCDXMZXList, zhongXinCD[0], 'fuJiID', 'id')
        let fuLuYou = to.matched[0].path
        let isPowers = zhongXinSonCD.filter(f => f.url == to.path || f.url == fuLuYou)
        if (isPowers && isPowers.length > 0) {
          //有权限
          _setCurrentRouteBQAN(zhongXinSonCD, isPowers[0].id)
          store.commit('yongHuCD/setcurrentRoute', {
            fuLuYou: fuLuYou,
            path: to.path
          })
          next()
        }
      }
    }
  })
}

//设置路由权限（交付联众端首页）
export function setJiaoFuLZDSYRouterQX(router) {
  router.beforeEach((to, form, next) => {
    if (store.getters.yongHuCDXMZXList.length > 0) {
      let zhongXinCD = store.getters.yongHuCDXMZXList.filter(f => f.url == 'jiaoFuLZDSY')
      if (zhongXinCD && zhongXinCD.length > 0) {
        let zhongXinSonCD = filterWithArr(store.getters.yongHuCDXMZXList, zhongXinCD[0], 'fuJiID', 'id')
        let fuLuYou = to.matched[0].path
        let isPowers = zhongXinSonCD.filter(f => f.url == to.path || f.url == fuLuYou)
        if (isPowers && isPowers.length > 0) {
          //有权限
          _setCurrentRouteBQAN(zhongXinSonCD, isPowers[0].id)
          store.commit('yongHuCD/setcurrentRoute', {
            fuLuYou: fuLuYou,
            path: to.path
          })
          next()
        }
      }
    }
  })
}

function _setLoa(el, binding, vNode) {
  let currentRouteBQAN = store.getters['yongHuCD/currentRouteBQAN']
  let isLoa = false
  if (binding.value) {
    if (currentRouteBQAN && currentRouteBQAN.length > 0) {
      if (binding.arg) {
        //标签中按钮
        currentRouteBQAN.forEach(item => {
          if (item.url == binding.arg) {
            item.children.forEach(anNiuItem => {
              if (anNiuItem.url == binding.value) {
                isLoa = true
              }
            })
          }
        })
      } else {
        currentRouteBQAN.forEach(item => {
          if (item.url == binding.value) {
            isLoa = true
          }
        })
      }
    }
  }
  if (isLoa) {
    //有权限
    el.style.display = el.getAttribute('display')
  } else {
    //无权限
    el.style.display = 'none'
  }
}

//设置标签和按钮权限
export function setBiaoQianANQX(Vue) {
  Vue.directive('loa', {
    bind: function(el, binding, vNode, oldVnode) {
      el.setAttribute('display', el.style.display)
    },
    componentUpdated: function(el, binding, vNode, oldVnode) {
      _setLoa(el, binding, vNode)
    },
    inserted: function(el, binding, vNode, oldVnode) {
      _setLoa(el, binding, vNode)
    }
  })
}
