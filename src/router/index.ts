import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import { routerItem } from '@/interface';

const getComponent = require(`./import_${process.env.NODE_ENV}`);

// 不需要权限判断的路由
export const constantRouterMap: routerItem[] & RouterOptions['routes'] = [
  {
    path: '/',
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
      {
        path: 'plan',
        name: '巡检计划管理',
        component: getComponent('inspection/plan/index'),
        permission: true,
        meta: { key: 'inspectionPlan' },
        children: [
          {
            path: 'list',
            name: '计划列表',
            component: getComponent('inspection/plan/list/index'),
            permission: true,
            meta: { key: 'inspectPlanList' },
          },
          {
            path: 'calender',
            name: '计划日历',
            component: getComponent('inspection/plan/calendar/index'),
            permission: true,
            meta: { key: 'inspectPlancalender' },
          },
        ],
      },
      {
        path: 'task',
        name: '巡检任务管理',
        component: getComponent('inspection/task/index'),
        permission: true,
        meta: { key: 'task' },
        children: [
          {
            path: 'list',
            name: '巡检任务列表',
            component: getComponent('inspection/task/list/index'),
            permission: true,
            meta: { key: 'list' },
          },
          {
            path: 'detail',
            name: '巡检任务详情',
            component: getComponent('inspection/task/list/page/detail'),
            permission: false,
            meta: { key: 'taskDetail' },
          },
          {
            path: 'abnormal',
            name: '异常巡检列表',
            component: getComponent('inspection/task/abnormal/index'),
            permission: true,
            meta: { key: 'abnormal' },
          },
        ],
      },

      {
        path: 'monitor',
        name: '巡检监控',
        component: getComponent('inspection/monitor/index'),
        permission: true,
        meta: { key: 'monitor' },
      },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'dashboard',
    component: getComponent('system/index'),
    permission: true,
    meta: { key: 'system' },
    children: [
      {
        path: 'institution',
        name: '组织机构管理',
        component: getComponent('system/institution/index'),
        permission: true,
        meta: { key: 'institution' },
      },
      {
        path: 'role',
        name: '角色管理',
        component: getComponent('system/role/index'),
        permission: true,
        meta: { key: 'role' },
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
        component: getComponent('line/lineList/index'),
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
        component: getComponent('facilities/facilitiesList/index'),
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
        component: getComponent('device/deviceList/index'),
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
];

Vue.use(Router);

export default new Router({
  routes: constantRouterMap,
});
