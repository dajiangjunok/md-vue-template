import Oidc from 'oidc-client'
import Cookies from 'js-cookie'
var oidcConfig
var mgr
/* var xhr = new XMLHttpRequest()
xhr.open('get', '/authconfig.json', false)
xhr.send() */
var origin = location.origin
if (
  window.location.href.toLowerCase().indexOf('.mediinfo.') < 0 &&
  window.location.href.toLowerCase().indexOf('localhost') < 0
) {
  origin += '/home'
}
oidcConfig = {
  authority: location.origin + '/mcrp-authserver',
  client_id: 'mcrp',
  redirect_uri: origin + '/#/callback',
  scope: 'openid',
  response_type: 'code',
  automaticSilentRenew: true,
  post_logout_redirect_uri: origin + '/#/',
  filterProtocolClaims: true,
  silent_redirect_uri: origin + '/#/silent-callback',
}
//JSON.parse(xhr.responseText).authConfig
oidcConfig.userStore = new Oidc.WebStorageStateStore({
  store: window.localStorage,
})
Oidc.Log.logger = console
mgr = new Oidc.UserManager(oidcConfig)
//console.log(mgr)
mgr.events.addUserLoaded(function (user) {
  createMcrpCookie()
})
mgr.events.addUserUnloaded(function () {
  /*  var domain = document.domain
       if (domain.indexOf('.mediinfo.cn') != -1) {
         domain = '.mediinfo.cn'
       }
       Cookies.remove('Authorization', { domain: domain }) */
})
mgr.events.addAccessTokenExpired(function () {
  //todo 超时异常用户还必须刷新一次看能看到登录按钮，可能需要和vuex结合处理？
  //console.log('Access token expiring...' + new Date())
  mgr.removeUser()
  // mgr.signinRedirect()
})
mgr.events.addSilentRenewError(function (error) {
  console.log('addSilentRenewError', error)
  //mgr.signinRedirect()
})
mgr.events.addUserSignedIn(function () {})
mgr.events.addUserSignedOut(function () {
  /*   var domain = document.domain
    if (domain.indexOf('.mediinfo.cn') != -1) {
      domain = '.mediinfo.cn'
    }
    Cookies.remove('Authorization', { domain: domain }) */
})
function login(args = {}) {
  return mgr.signinRedirect(args)
}
function logout() {
  return mgr.removeUser()
  // return mgr.signoutRedirect()
}
function getUser() {
  return mgr.getUser()
}
function callback() {
  return mgr.signinRedirectCallback()
}
function refresh() {
  return mgr.signinSilentCallback()
}
function createSigninRequest() {
  return mgr.createSigninRequest()
}
async function getAuthState() {
  const user = await this.getUser()
  return user != undefined && !user.expired
}
async function createMcrpCookie() {
  const user = await mgr.getUser()
  if (user != undefined && !user.expired) {
    var exp = new Date(user.expires_at * 1000)
    var domain = document.domain
    if (domain.indexOf('.mediinfo.cn') != -1) {
      domain = '.mediinfo.cn'
    }
    document.cookie =
      'Authorization=' +
      user.token_type +
      ' ' +
      user.access_token +
      '; path=/; expires=' +
      exp.toGMTString() +
      ';domain=' +
      domain

    document.cookie =
      'expires=' +
      exp.toGMTString() +
      '; path=/; expires=' +
      exp.toGMTString() +
      ';domain=' +
      domain
  }
}
export default {
  login,
  logout,
  getUser,
  callback,
  refresh,
  getAuthState,
  createSigninRequest,
  createMcrpCookie,
}
