import Vue from 'vue';

// 缓存当前取消队列
const cancelQueue = Vue.observable([]);
// canCelToken回调
const cancelCallback = (data) => {
  if (!cancelQueue.length) return;
  for (const callabck of cancelQueue) {
    callabck(data);
  }
};
export default () => ({
  cancelQueue,
  cancelCallback,
});
