import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import { routerItem } from '@/interface';

const getComponent = require(`./import_${process.env.NODE_ENV}`);

// 不需要权限判断的路由
export const constantRouterMap: routerItem[] & RouterOptions['routes'] = [
  {
    path: '/dashboard',
    name: '数据看板',
    component: getComponent('dashboard/index'),
    meta: { key: 'Dashboard' },
  },
  {
    path: '/',
    name: 'dashboard',
    component: getComponent('dashboard/index'),
  },
  {
    path: '/login',
    name: 'login',
    component: getComponent('login/index'),
  },
  {
    path: '/modiflyPwd',
    name: 'modiflyPwd',
    component: getComponent('updatePwd/index.vue'),
  },
  {
    path: '/updateSelf',
    name: 'personCenter',
    component: getComponent('updateSelf/index.vue'),
  },
  {
    path: '*',
    name: '404',
    component: getComponent('error/404.vue'),
  },
  {
    path: '/401',
    name: '401',
    component: getComponent('error/401.vue'),
  },
];
/**
 * permission 有3种类型： Boolean Array String
 * Boolean值的情况，为true，有权限，为false，没有权限
 * Array值的情况，只要其中一个有，就有权限，
 * String值，会匹配vuex里面的perssions数组，如果有，就有权限
 * meta.key 这个是用来匹配缓存的，请确保key值和对应页面的class名称一致，否则页面无法正常缓存
 */
export const asyncRouterMap: routerItem[] = [
  {
    path: '/dashboard',
    icon: 'dashboard',
    name: '数据看板',
    component: getComponent('dashboard/index'),
    permission: true,
    meta: { key: 'Dashboard' },
  },
  {
    path: '/studio',
    icon: 'home',
    name: '画室管理',
    component: getComponent('studio/index'),
    permission: true,
    meta: { key: 'studio' },
  },
  {
    path: '/courseenroll',
    icon: 'pay-circle',
    name: '在线报名',
    component: getComponent('courseenroll/index'),
    permission: true,
    meta: { key: 'courseenroll' },
  },
  {
    path: '/feedback',
    icon: 'smile',
    name: '反馈管理',
    component: getComponent('feedback/index'),
    permission: true,
    meta: { key: 'feedback' },
  },
  {
    path: '/banner',
    icon: 'picture',
    name: '轮播图片管理',
    component: getComponent('banner/index'),
    permission: true,
    meta: { key: 'banner' },
  },
];

Vue.use(Router);

export default new Router({
  routes: constantRouterMap,
});
