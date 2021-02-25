import Vue from 'vue';
import VueRouter from 'vue-router';
import page404 from '@/views/404';
Vue.use(VueRouter);

const routeViews = require.context('./views', false, /\.js$/);
const routes = routeViews.keys().map((routeKey) => routeViews(routeKey).default || routeViews(routeKey));
routes.push({
  path: '*',
  component: page404,
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
