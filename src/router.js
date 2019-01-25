import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from './util/token'

Vue.use(Router)
console.log(localStorage.getItem('token'))
let router = new Router({
  // redirect重定向
  // meta 可以在页面中用$route.meta来获取里面的数据
  routes: [
    { path: '', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './components/login/login'),
      meta: {
        requiresAuth: false
      }
    },

    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/register/register'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/index',
      name: 'index',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/index/index'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/task',
      name: 'task',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/task/task'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/personal/personal'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/data',
      name: 'data',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/data/data'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/team',
      name: 'team',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/team/team'),
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/card',
      name: 'card',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/card/card'),
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/addcard',
      name: 'addcard',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/addcard/addcard'),
      meta: {
        requiresAuth: false
      }
    }, {
      path: '/service',
      name: 'service',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/service/service'),
      meta: {
        requiresAuth: false
      }
    },
    // advertising
    {
      path: '/advertising',
      name: 'advertising',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/advertising/advertising'),
      meta: {
        requiresAuth: false
      }
    },
    // record
    {
      path: '/record',
      name: 'record',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/record/record'),
      meta: {
        requiresAuth: false
      }
    },
    // problem
    {
      path: '/problem',
      name: 'problem',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/problem/problem'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/Set',
      name: 'Set',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/Set/Set'),
      meta: {
        requiresAuth: false
      }
    },
    // 修改密码
    {
      path: '/changpassword',
      name: 'changpassword',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/password/changpassword'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/static',
      name: 'static',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/static/static'),
      meta: {
        requiresAuth: false
      }
    },
    // dynamic
    {
      path: '/dynamic',
      name: 'dynamic',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/dynamic/dynamic'),
      meta: {
        requiresAuth: false
      }
    },
    // propaganda
    {
      path: '/propaganda',
      name: 'propaganda',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/propaganda/propaganda'),
      meta: {
        requiresAuth: false
      }
    },
    // outer
    {
      path: '/outer',
      name: 'outer',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/outer/outer'),
      meta: {
        requiresAuth: false
      }
    },
    // whypropaganda
    {
      path: '/whypropaganda',
      name: 'whypropaganda',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/whypropaganda/whypropaganda'),
      meta: {
        requiresAuth: false
      }
    },
    // vip
    {
      path: '/vip',
      name: 'vip',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/vip/vip'),
      meta: {
        requiresAuth: false
      }
    },
    // Taskhall
    {
      path: '/Taskhall',
      name: 'Taskhall',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/Taskhall/Taskhall'),
      meta: {
        requiresAuth: false
      }
    },
    // Submitatask
    {
      path: '/Submitatask',
      name: 'Submitatask',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/Submitatask/Submitatask'),
      meta: {
        requiresAuth: false
      }
    },
    // Taskrecord
    {
      path: '/Taskrecord',
      name: 'Taskrecord',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/Taskrecord/Taskrecord'),
      meta: {
        requiresAuth: false
      },
      children: [
        { path: '', redirect: 'audit' }, {
          path: 'audit',
          name: 'audit',
          component: () =>
            import(/* webpackChunkName: "register" */ './components/childer/audit'),
          meta: {
            requiresAuth: false
          },
        }, {
          path: 'complete',
          name: 'complete',
          component: () =>
            import(/* webpackChunkName: "register" */ './components/childer/complete'),
          meta: {
            requiresAuth: false
          },
        }, {
          path: 'through',
          name: 'through',
          component: () =>
            import(/* webpackChunkName: "register" */ './components/childer/through'),
          meta: {
            requiresAuth: false
          },
        }]
    },
    {
      // detail
      path: '/detail/:id',
      name: 'detail',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/detail/detail'),
      meta: {
        requiresAuth: false
      },
    },
    // tijao
    {
      path: '/tijao/:id',
      name: 'tijao',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/tijao/tijao'),
      meta: {
        requiresAuth: false
      },
    },
    {
      // name
      path: '/name/:id',
      name: 'name',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/name/name'),
      meta: {
        requiresAuth: false
      },
    },
    // retrieve
    {
      // name
      path: '/retrieve',
      name: 'retrieve',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/retrieve/retrieve'),
      meta: {
        requiresAuth: false
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!getToken()) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    // console.log(to.matched)
    next()
  }
})

export default router
