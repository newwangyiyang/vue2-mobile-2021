/**
 * 权限校验工具类demo
 */
import router from '@/router';
import store from '@/store';
import s from 'store2';

import { Notify } from 'vant';

const whiteList = ['/Login']; // 白名单列表

const usePermission = () => {
  router.beforeEach(async (to, from, next) => {
    document.title = (to.meta && to.meta.title) || 'vue2-mobile-2021';
    // 开启权限校验
    const openPermissionAndAuth = to.meta.auth;
    if (openPermissionAndAuth || to.path === '/Login') {
      const token = store.getters.token || s('token');
      if (token) {
        if (to.path === '/Login') {
          // 已经登录，跳转到首页
          next({
            path: '/',
          });
        } else {
          // 获取用户信息
          const hasGetUserInfo = store.getters.token;
          if (hasGetUserInfo) {
            next();
          } else {
            // try {
            //     // get user info
            //     await store.dispatch(`user/${getUesrStateByTokenAsync}`, token);
            //     next()
            // } catch (error) {
            //     // 清除用户信息，退出登录，跳转登录页
            //     store.commit(USER_OUT_LOGIN)
            //     Notify.error(error || 'Has Error')
            //     next(`/login?redirect=${to.path}`)
            // }
            Notify.error('登陆异常，请重新登陆');
          }
        }
      } else {
        /* has no token */
        if (whiteList.indexOf(to.path) !== -1) {
          // 白名单中，无需验证
          next();
        } else {
          // other pages that do not have permission to access are redirected to the login page.
          next(`/login?redirect=${to.path}`);
        }
      }
    } else {
      // 未开启权限，放开所有
      next();
    }
  });
};

export default usePermission;
