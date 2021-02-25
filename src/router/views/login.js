export default {
  path: '/Login',
  name: 'Login',
  component: import(/* webpackChunkName: 'Login' */ '@/views/Login'),
  meta: {
    title: '登录',
    auth: false,
  },
};
