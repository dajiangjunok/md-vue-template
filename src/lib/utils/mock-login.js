import {
  userData,
  setUserData
} from '../utils/quanjubl'

import {
  moNiLogin
} from '@/service/loa/service_loa_token'

//登陆开发账号
export async function loginKaiFaZH() {
  if (!userData.sub) {
    if (process.env.VUE_APP_HOST != 'production') {
      let obj = {
        "clientID": "kibana",
        "yongHuMing": process.env.VUE_APP_UserName,
        "miMa": process.env.VUE_APP_PassWord
      }
      let result = await moNiLogin(obj);
      // console.log(result);
      localStorage.setItem("refreshToken", result.refreshToken);
      document.cookie = "Authorization=" + result.tokenType + " " + result.accessToken + "; path=/;";
      setUserData();
    }
  }
}
