/**
 * 对axios稍作封装
 * 1. 设置请求超时时间
 * 2. 添加请求拦截器，在每个请求的头部添加token
 * 3. 添加响应拦截器，根据服务器返回状态进行相应的结果返回
 * 4. 基于Promise的http请求
 * 5. 由于await会阻塞代码，推荐使用then方法解决回调地狱
 */
import axiosObj from 'axios';
import s from 'store2';

import store from '@/store';
import { storeMutations } from '@/store/contant';
import useAxiosCancel from '@/utils/useAxiosCancel';
import websiteToken from '@/api/websiteToken';
import { ModelState } from './globalContant';

const defaultConfig = {
  timeout: 60 * 1000,
  withCredentials: true,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
};

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];

// 创建实例
const _axios = axiosObj.create(defaultConfig);
// 取消请求队列
const { cancelQueue } = useAxiosCancel();
// 请求拦截器
_axios.interceptors.request.use(
  function(config) {
    // 对已发出的请求进行缓存
    config.cancelToken = new axiosObj.CancelToken((c) => {
      // 此处也可以做一些专门的逻辑处理
      cancelQueue.push(c);
    });
    // 从vuex里获取token
    // const token = store.getters.token || s('token');
    // // 如果token存在就在请求头里添加，用户的鉴权操作
    // token && (config.headers.token = token);
    return config;
  },
  function(error) {
    // Do something with request error
    error.data = {};
    error.data.msg = '服务器异常';
    return Promise.reject(error);
  },
);
// 响应拦截器
_axios.interceptors.response.use(
  function(response) {
    // token过期，续期token，跟后台约定好token失效的code值
    if (response.data.code === 401 && s('username') && s('token')) {
      // 原请求的配置
      const config = response.config;
      if (!isRefreshing) {
        // 开始刷新token
        isRefreshing = true;
        // 重新请求并更新token，执行未执行完的请求
        return websiteToken
          .tokenRefresh(s('username'))
          .then((res) => {
            if (res.code === ModelState.SUCCESS) {
              const token = res.data.token;
              // 刷新未执行请求中的token
              config.headers.token = token;
              config.baseURL = '';
              // TODO: 更新store中保存的user信息
              store.commit(storeMutations.user.updateToken, token);
              // 执行队列中的请求
              requests.forEach((cb) => cb(token));
              // 清空队列
              requests = [];
              // 重试当前请求并返回promise | _axios(config) => 返回当前的请求实例
              return _axios(config);
            } else {
              websiteToken.tokenLogout().then(() => {
                // 清除本地存储，刷新当前页面
                store.commit(storeMutations.user.resetUserState);
                localStorage.clear();
                location.reload();
              });
            }
          })
          .catch((reason) => {
            throw reason;
          })
          .finally(() => {
            // 改变刷新状态
            isRefreshing = false;
          });
      } else {
        // 正在刷新token，返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((token) => {
            config.headers.token = token;
            config.baseURL = '';
            resolve(_axios(config));
          });
        });
      }
    }
    if (response.status === 200) {
      // 处理接口中的data
      if (response.data.data) {
        try {
          const dataObj = JSON.parse(response.data.data);
          if (typeof dataObj === 'object' && dataObj) {
            // 为json字符串将其转为json对象
            response.data.data = dataObj;
          }
        } catch (e) {
          // 不是json字符串就不处理
          return response.data;
        }
      }
      return response.data;
    }
    response.data.code = 1;
    response.data.msg = '服务器错误';
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default _axios;
