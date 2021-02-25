/**
 * 网站公用接口定义
 *
 */
import services from '@/config/axios';
import baseUrl from '@/api/baseUrl';

const websiteManageApi = {
  // 登录
  login(params) {
    return services.post(`${baseUrl.devBaseUrl}/user/login`, params);
  },
  // Token续期 => 当后台返回code=401，需重新调用该接口，获取新的Toekn
  tokenRenew(params) {
    return services.post(`${baseUrl.devBaseUrl}/user/tokenRenew`, params);
  },
  // 更新当前用户的登录状态 => 在线、忙碌、离线
  /**
 * 
 * avatarSrc: "https://www.kaisir.cn/uploads/858c0efb60f640b7b17adad1f16d6441.png"
   token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTA4NzEzMTUsInVzZXJJZCI6Ijg4ODg0MjNmYTA0MzRhZTViZTk5NmU5ZmVlODVhMjI1IiwidXNlcm5hbWUiOiJsaW11emkifQ.-ZZq6LxhbaBKgv-sMmYZ4wR9D0dbz2J0bfmA9yScC8A"
    userID: "8888423fa0434ae5be996e9fee85a225"
    username: "limuzi"
  */
  updateOnlineStatus(params) {
    return services.post(`${baseUrl.devBaseUrl}/user/updateOnlineStatus`, params);
  },
};

export default websiteManageApi;
