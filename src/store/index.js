import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import getters from './getters';
Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);
const modules = {};
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default || files(key);
});

export default new Store({
  getters,
  modules,
});
