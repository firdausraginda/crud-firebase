import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import {auth} from './components/firebaseinit'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import(/* webpackChunkName: "about" */ './views/Todo.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newtodo',
      name: 'newtodo',
      component: () => import(/* webpackChunkName: "about" */ './views/NewTodo.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      // meta: {
      //   requiresGuest: true
      // }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
      // meta: {
      //   requiresGuest: true
      // }
    },
    {
      path: '/:id',
      name: 'viewtodo',
      component: () => import(/* webpackChunkName: "about" */ './views/ViewTodo.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edittodo/:id',
      name: 'edittodo',
      component: () => import(/* webpackChunkName: "about" */ './views/EditTodo.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)){
    // Check if NOT logged in
    if (!auth.currentUser){
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  }
  // else if(to.matched.some(record => record.meta.requiresGuest)) {
  //    if (auth.currentUser){
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   } else {
  //     next()
  //   }
  // }
  else{
    next()
  }
})

export default router