import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import { routerItem } from '@/interface';

const getComponent = require(`./import_${process.env.NODE_ENV}`);

export const constantRouterMap: routerItem[] & RouterOptions['routes'] = [
  {
    path: '/dashboard',
    redirect: '/dashboard',
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
    name: 'Dashboard',
    component: getComponent('dashboard/index'),
    permission: true,
    meta: { key: 'Dashboard' },
  },
  {
    path: '/area',
    icon: 'dot-chart',
    name: '区域管理',
    component: getComponent('area/index'),
    permission: true,
    meta: { key: 'Area' },
  },
  {
    path: '/inspection',
    icon: 'dot-chart',
    name: '巡检管理',
    component: getComponent('inspection/index'),
    permission: true,
    meta: { key: 'inspection' },
    children: [
      {
        path: 'road',
        name: '巡检路线管理',
        component: getComponent('inspection/road/index'),
        permission: true,
        meta: { key: 'road' },
      },
    ],
  },
  {
    path: '/line',
    icon: 'line-chart',
    name: '管道管理',
    component: getComponent('line/index'),
    permission: true,
    meta: { key: 'line' },
    children: [
      {
        path: 'lineTypeList',
        name: '管道类型',
        component: getComponent('line/lineType/index'),
        permission: true,
        meta: { key: 'lineTypeList' },
      },
      {
        path: 'lineList',
        name: '管道列表',
        component: getComponent('line/index'),
        permission: true,
        meta: { key: 'lineList' },
      },
    ],
  },
  {
    path: '/facilities',
    icon: 'cluster',
    name: '设施管理',
    component: getComponent('facilities/index'),
    permission: true,
    meta: { key: 'Facilities' },
    children: [
      {
        path: 'facilitiesList',
        name: '设施类型',
        component: getComponent('facilities/index'),
        permission: true,
        meta: { key: 'facilitiesList' },
      },
      {
        path: 'facilitiesTypeList',
        name: '设施列表',
        component: getComponent('facilities/facilitiesType/index'),
        permission: true,
        meta: { key: 'facilitiesTypeList' },
      },
    ],
  },
  {
    path: '/device',
    icon: 'desktop',
    name: '设备管理',
    component: getComponent('device/index'),
    permission: true,
    meta: { key: 'Device' },
    children: [
      {
        path: 'deviceList',
        name: '设备列表',
        component: getComponent('device/index'),
        permission: true,
        meta: { key: 'deviceList' },
      },
      {
        path: 'deviceType',
        name: '设备类型',
        component: getComponent('device/deviceType/index'),
        permission: true,
        meta: { key: 'deviceType' },
      },
    ],
  },
  {
    path: '/customers',
    icon: 'team',
    name: 'Customers',
    component: getComponent('customers/index'),
    permission: true,
    meta: { key: 'Customers' },
    children: [
      {
        path: 'baseInfo',
        name: 'Base Info',
        component: getComponent('customers/baseInfo/index'),
        permission: true,
        meta: { key: 'BaseInfo' },
      },
    ],
  },
  {
    path: '/charts',
    icon: 'line-chart',
    name: 'Charts',
    component: getComponent('chart/index'),
    permission: true,
    meta: { key: 'Charts' },
    children: [
      {
        path: 'apexCharts',
        name: 'ApexCharts',
        component: getComponent('chart/apexCharts/index'),
        permission: true,
        meta: { key: 'ApexCharts' },
        children: [
          {
            path: 'line',
            name: 'Line',
            component: getComponent('chart/apexCharts/line/index'),
            permission: true,
            meta: { key: 'Line' },
          },
          {
            path: 'area',
            name: 'Area',
            component: getComponent('chart/apexCharts/area/index'),
            permission: true,
            meta: { key: 'Area' },
          },
          {
            path: 'column',
            name: 'Column',
            component: getComponent('chart/apexCharts/column/index'),
            permission: true,
            meta: { key: 'Column' },
          },
          {
            path: 'bar',
            name: 'Bar',
            component: getComponent('chart/apexCharts/bar/index'),
            permission: true,
            meta: { key: 'Bar' },
          },
          {
            path: 'mixed',
            name: 'Mixed',
            component: getComponent('chart/apexCharts/mixed/index'),
            permission: true,
            meta: { key: 'Mixed' },
          },
        ],
      },
    ],
  },
  {
    path: '/components',
    icon: 'appstore-o',
    name: 'Components',
    component: getComponent('components/index'),
    permission: true,
    meta: { key: 'Components' },
    children: [
      {
        path: 'form',
        name: 'Form',
        component: getComponent('components/form/index'),
        permission: true,
        meta: { key: 'Form' },
        children: [
          {
            path: 'baseForm',
            name: 'BaseForm',
            component: getComponent('components/form/baseForm/index'),
            permission: true,
            meta: { key: 'BaseForm' },
          },
        ],
      },
    ],
  },
  {
    path: '/map',
    icon: 'environment',
    name: 'Map',
    component: getComponent('map/index'),
    permission: true,
    meta: { key: 'Map' },
    children: [
      {
        path: 'trajectory',
        name: 'Trajectory',
        component: getComponent('map/trajectory/index'),
        permission: true,
        meta: { key: 'Trajectory' },
      },
    ],
  },
];

Vue.use(Router);

export default new Router({
  routes: constantRouterMap,
});
