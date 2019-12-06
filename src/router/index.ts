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
    path: '/deviceMap',
    icon: 'heat-map',
    name: '设备地图',
    component: getComponent('deviceMap/index'),
    permission: true,
    meta: { key: 'DeviceMap' },
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
    meta: { key: 'Inspection' },
    children: [
      {
        path: 'inspectionroad',
        name: '巡检路线管理',
        component: getComponent('inspection/road/index'),
        permission: true,
        meta: { key: 'inspectionroad' },
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
    icon: 'setting',
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
      {
        path: 'user',
        name: '用户管理',
        component: getComponent('system/user/index'),
        permission: true,
        meta: { key: 'user' },
      },
      {
        path: 'servicemanage',
        name: '服务管理',
        component: getComponent('system/servicemanage/index'),
        permission: true,
        meta: { key: 'servicemanage' },
        children: [
          {
            path: 'infomation',
            name: '信息服务',
            component: getComponent('system/servicemanage/infomation/index'),
            permission: true,
            meta: { key: 'infomation' },
            children: [
              {
                path: 'message',
                name: '短信服务',
                component: getComponent('system/servicemanage/infomation/message/index'),
                permission: true,
                meta: { key: 'message' },
              },
              {
                path: 'wechat',
                name: '微信公众号服务',
                component: getComponent('system/servicemanage/infomation/wechat/index'),
                permission: true,
                meta: { key: 'wechat' },
              },
              {
                path: 'email',
                name: '邮箱服务',
                component: getComponent('system/servicemanage/infomation/email/index'),
                permission: true,
                meta: { key: 'email' },
              },
            ],
          },
          {
            path: 'features',
            name: '功能服务',
            component: getComponent('system/servicemanage/features/index'),
            permission: true,
            meta: { key: 'features' },
            children: [
              {
                path: 'message',
                name: '云巡检服务',
                component: getComponent('system/servicemanage/features/cloud/index'),
                permission: true,
                meta: { key: 'message' },
              },
              {
                path: 'wechat',
                name: '组态服务',
                component: getComponent('system/servicemanage/features/configuration/index'),
                permission: true,
                meta: { key: 'wechat' },
              },
            ],
          },
          {
            path: 'apply',
            name: '开通申请管理',
            component: getComponent('system/servicemanage/apply/index'),
            permission: true,
            meta: { key: 'apply' },
          },
          {
            path: 'record',
            name: '开通记录管理',
            component: getComponent('system/servicemanage/record/index'),
            permission: true,
            meta: { key: 'record' },
          },
          {
            path: 'open',
            name: '开通指定服务',
            component: getComponent('system/servicemanage/open/index'),
            permission: true,
            meta: { key: 'open' },
          },
        ],
      },
      {
        path: 'businessmanage',
        name: '企业管理',
        component: getComponent('system/businessmanage/index'),
        permission: true,
        meta: { key: 'businessmanage' },
      },
      {
        path: 'terminalmanage',
        name: '终端类型管理',
        component: getComponent('system/terminalmanage/index'),
        permission: true,
        meta: { key: 'terminalmanage' },
      },
      {
        path: 'messagelist',
        name: '系统通知列表',
        component: getComponent('system/messagelist/index'),
        permission: true,
        meta: { key: 'messagelist' },
      },
      {
        path: 'servicecenter',
        name: '服务中心',
        component: getComponent('system/servicecenter/index'),
        permission: true,
        meta: { key: 'servicecenter' },
      },
      {
        path: 'patrol',
        name: '巡检设置',
        component: getComponent('system/patrol/index'),
        permission: true,
        meta: { key: 'patrol' },
      },
      {
        path: 'bill',
        name: '发票管理',
        component: getComponent('system/bill/index'),
        permission: true,
        meta: { key: 'bill' },
        children: [
          {
            path: 'info',
            name: '发票申请信息设置 ',
            component: getComponent('system/bill/info/index'),
            permission: true,
            meta: { key: 'info' },
          },
          {
            path: 'list',
            name: '开票历史记录 ',
            component: getComponent('system/bill/list/index'),
            permission: true,
            meta: { key: 'list' },
          },
        ],
      },
      {
        path: 'order',
        name: '订单管理',
        component: getComponent('system/order/index'),
        permission: true,
        meta: { key: 'order' },
      },
      {
        path: 'message',
        name: '通知管理',
        component: getComponent('system/message/index'),
        permission: true,
        meta: { key: 'message' },
        children: [
          {
            path: 'send',
            name: '发送通知',
            component: getComponent('system/message/send/index'),
            permission: true,
            meta: { key: 'send' },
          },
          {
            path: 'list',
            name: '通知历史列表',
            component: getComponent('system/message/list/index'),
            permission: true,
            meta: { key: 'list' },
          },
        ],
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
        path: 'facilitiesTypeList',
        name: '设施类型',
        component: getComponent('facilities/facilitiesType/index'),
        permission: true,
        meta: { key: 'facilitiesTypeList' },
      },
      {
        path: 'facilitiesList',
        name: '设施列表',
        component: getComponent('facilities/facilitiesList/index'),
        permission: true,
        meta: { key: 'facilitiesList' },
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
        path: 'deviceType',

        name: '设备类型',
        component: getComponent('device/deviceType/index'),
        permission: true,
        meta: { key: 'deviceType' },
      },
      {
        path: 'deviceList',
        name: '设备列表',
        component: getComponent('device/deviceList/index'),
        permission: true,
        meta: { key: 'deviceList' },
      },
    ],
  },
  {
    path: '/danger',
    icon: 'team',
    name: '隐患管理',
    component: getComponent('danger/index'),
    permission: true,
    meta: { key: 'Danger' },
    children: [
      {
        path: 'message',
        name: '隐患消息',
        component: getComponent('danger/message/index'),
        permission: true,
        meta: { key: 'Message' },
      },
      {
        path: 'check',
        name: '隐患审核',
        component: getComponent('danger/check/index'),
        permission: true,
        meta: { key: 'DangerCheck' },
      },
      {
        path: 'dangerMap',
        name: '隐患地图',
        component: getComponent('danger/map/index'),
        permission: true,
        meta: { key: 'DangerMap' },
      },
    ],
  },
  {
    path: '/knowledgebase',
    icon: 'folder',
    name: '知识库',
    component: getComponent('knowledgebase/index'),
    permission: true,
    meta: { key: 'knowledgebase' },
    children: [
      {
        path: 'public',
        name: '公共知识库',
        component: getComponent('knowledgebase/public/index'),
        permission: true,
        meta: { key: 'public' },
        children: [
          {
            path: 'type',
            name: '分类管理',
            component: getComponent('knowledgebase/public/type/index'),
            permission: true,
            meta: { key: 'type' },
          },
          {
            path: 'problem',
            name: '题库管理',
            component: getComponent('knowledgebase/public/problem/index'),
            permission: true,
            meta: { key: 'problem' },
          },
        ],
      },
      {
        path: '/private',
        name: '私有知识库',
        component: getComponent('knowledgebase/private/index'),
        permission: true,
        meta: { key: 'private' },
      },
    ],
  },
  {
    path: '/statistics',
    icon: 'pie-chart',
    name: '统计管理',
    component: getComponent('statistics/index'),
    permission: true,
    meta: { key: 'statistics' },
    children: [
      {
        path: 'statisticsdanger',
        name: '隐患统计',
        component: getComponent('statistics/danger/index'),
        permission: true,
        meta: { key: 'statisticsdanger' },
      },
      {
        path: 'statisticsdanger',
        name: '巡检统计',
        component: getComponent('statistics/inspection/index'),
        permission: true,
        meta: { key: 'statisticsinspection' },
      },
    ],
  },
];

Vue.use(Router);

export default new Router({
  routes: constantRouterMap,
});
