import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'

let shuaXinToken=false;
let userData = {};
let jingWeiZTCPID="776228951361064960";
let token = Cookies.get("Authorization");
if (token) {
  try {
    let arr = token.split('.')
    userData = JSON.parse(Base64.decode(arr[1]))
  } catch (e) {
    console.log(e);
  }
}

function shuaXinTokenFun(val){
  shuaXinToken=val;
}

function setUserData(){
  let token = Cookies.get("Authorization");
  if (token) {
    try {
      let arr = token.split('.')
      userData = JSON.parse(Base64.decode(arr[1]))
    } catch (e) {}
  }
}

export {
  userData,
  setUserData,
  shuaXinToken,
  jingWeiZTCPID,
  shuaXinTokenFun
}
