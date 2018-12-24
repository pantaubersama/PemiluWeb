import Vue from 'vue'
import VueRouter from 'vue-router'
import { vueAuth } from '@/services/symbolic'
import Meta from 'vue-meta'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: () => import('@/components/NotFound')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/another-page',
      name: 'AnotherPage',
      component: () => import('@/pages/AnotherPage'),
      meta: {
        AuthenticationRequired: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home')
    },
    {
      path: '/Linimasa',
      name: 'Linimasa',
      component: () => import('@/pages/Linimasa')
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import('@/pages/Profile')
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.AuthenticationRequired) && !vueAuth.isAuthenticated()) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

Vue.use(Meta)

export default router
