import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import s from 'store2';

import {
    Notify
} from 'vant';

import {
    USER_OUT_LOGIN
} from '../store/mutation-types';

import {
    getUesrStateByTokenAsync
} from '../store/action-types';

const whiteList = ['/Login'] // 白名单列表

router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title || 'vue-mobile';
    // 开启权限校验
    const openPermissionAndAuth = Vue.prototype.$openPremission && to.meta.auth;
    if (openPermissionAndAuth || to.path === '/Login') { // to.path === '/Login' => 防止用户重复登陆
        const token = s('token');
        if (token) {
            if (to.path === '/Login') {
                // 已经登录，跳转到首页
                next({
                    path: '/'
                })
            } else {
                // 获取用户信息
                const hasGetUserInfo = store.getters.user && store.getters.user.token
                if (hasGetUserInfo) {
                    next()
                } else {
                    try {
                        // get user info
                        await store.dispatch(`user/${getUesrStateByTokenAsync}`, token);
                        next()
                    } catch (error) {
                        // 清除用户信息，退出登录，跳转登录页
                        store.commit(USER_OUT_LOGIN)
                        Notify.error(error || 'Has Error')
                        next(`/login?redirect=${to.path}`)
                    }
                }
            }
        } else {
            /* has no token */
            if (whiteList.indexOf(to.path) !== -1) {
                // 白名单中，无需验证
                next()
            } else {
                // other pages that do not have permission to access are redirected to the login page.
                next(`/login?redirect=${to.path}`)
            }
        }
    } else {
        // 未开启权限，放开所有
        next();
    }
})