import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 管理员查看单独教师页面
  {
    path: '/singleAdminTeacher/:id',
    component: Layout,
    children: [
      {
        path: '/singleAdminTeacher/:id',
        component: () => import('@/views/singleAdminTeacher/index'),
        name: 'singleAdminTeacher',
        hidden: true,
        props: true,
        meta: {
          title: '教师详情',
          roles: [2, 3, 11, 12, 13]
        }
      }
    ]
  },
  // 教师总表链接单一老师
  {
    path: '/singleTeacher/:id',
    component: Layout,
    children: [
      {
        path: '/singleTeacher/:id',
        component: () => import('@/views/singleTeacher/index'),
        name: 'singleTeacher',
        hidden: true,
        props: true,
        meta: {
          title: '教师详情',
          roles: [2, 3, 11, 12, 13]
        }
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacher/index'),
        name: 'teacher',
        meta: {
          title: '教师总表',
          icon: 'peoples',
          affix: false,
          roles: [2, 3, 11, 12, 13]
        }
      }
    ]
  },
  {
    path: '/teachingWorkload',
    component: Layout,
    redirect: 'noRedirect',
    name: 'teachingWorkload',
    meta: {
      title: '教学工作量',
      icon: 'lock',
      roles: [2, 3, 11, 12, 13]
    },
    children: [
      {
        path: 'teachingWorkload',
        component: () => import('@/views/teachingWorkload/teachingWorkload'),
        name: 'TeachingWorkload',
        meta: { title: '教学工作量统计', noCache: true, roles: [2, 3, 11, 12, 13] }
      },
      {
        path: 'test',
        component: () => import('@/views/teachingWorkload/test'),
        name: 'test',
        meta: { title: 'test', noCache: true, roles: [2, 3, 11, 12, 13] }
      }
    ]
  },
  {
    path: '/scientificWorkload',
    component: Layout,
    redirect: 'noRedirect',
    name: 'scientificWorkload',
    meta: {
      title: '科研工作量',
      icon: 'lock',
      roles: [2, 3, 11, 12, 13]
    },
    children: [
      {
        path: 'scientificWorkload',
        component: () => import('@/views/scientificWorkload/scientificWorkload'),
        name: 'TeachingWorkload',
        meta: { title: '科研工作量统计', noCache: true, roles: [2, 3, 11, 12, 13] }
      },
      {
        path: 'test',
        component: () => import('@/views/scientificWorkload/test'),
        name: 'test',
        meta: { title: 'test', noCache: true, roles: [2, 3, 11, 12, 13] }
      }
    ]
  },
  {
    path: '/othersWorkload',
    component: Layout,
    redirect: 'noRedirect',
    name: 'othersWorkload',
    meta: {
      title: '其他工作量',
      icon: 'lock',
      roles: [2, 3, 11, 12, 13]
    },
    children: [
      {
        path: 'othersWorkload',
        component: () => import('@/views/othersWorkload/othersWorkload'),
        name: 'othersWorkload',
        meta: { title: '其他工作量统计', noCache: true, roles: [2, 3, 11, 12, 13] }
      },
      {
        path: 'test',
        component: () => import('@/views/othersWorkload/test'),
        name: 'test',
        meta: { title: 'test', noCache: true, roles: [2, 3, 11, 12, 13] }
      }
    ]
  },
  {
    path: '/counselorsWorkload',
    component: Layout,
    redirect: 'noRedirect',
    name: 'counselorsWorkload',
    meta: {
      title: '辅导员工作量',
      icon: 'lock',
      roles: [2, 3, 11, 12, 13]
    },
    children: [
      {
        path: 'counselorsWorkload',
        component: () => import('@/views/counselorsWorkload/counselorsWorkload'),
        name: 'CounselorsWorkload',
        meta: { title: '辅导员工作量统计', noCache: true, roles: [2, 3, 11, 12, 13] }
      },
      {
        path: 'test',
        component: () => import('@/views/counselorsWorkload/test'),
        name: 'test',
        meta: { title: 'test', noCache: true, roles: [2, 3, 11, 12, 13] }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: 'noRedirect',
    name: 'config',
    meta: {
      title: '参数设置',
      icon: 'lock',
      roles: [2, 3, 11, 12, 13]
    },
    children: [
      {
        path: 'createWorkload',
        component: () => import('@/views/config/createWorkload'),
        name: 'CreateWorkload',
        meta: { title: '工作量类别', noCache: true, roles: [2, 3, 11, 12, 13] }
      },
      {
        path: 'createUser',
        component: () => import('@/views/config/createUser'),
        name: 'createUser',
        meta: { title: '用户添加', noCache: true, roles: [2, 3, 11, 12, 13] }
      },
      {
        path: 'teacherConfig',
        component: () => import('@/views/config/teacherConfig'),
        name: 'teacherConfig',
        meta: { title: '用户类别&职称', noCache: true, roles: [2, 3, 11, 12, 13] }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
