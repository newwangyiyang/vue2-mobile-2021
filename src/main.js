import Vue from 'vue';
import App from './App.vue';
import globalConfig from './config/globalConfig';

import 'tailwindcss/tailwind.css';

import router from './router';
import store from './store';

// 自定义全局扩展
Vue.use(globalConfig.baseSetting)
  .use(globalConfig.components)
  .use(globalConfig.filters);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
