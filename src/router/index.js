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
      path: '/linimasa',
      name: 'Linimasa',
      component: () => import('@/pages/Linimasa'),
      props: true,
      children: [
        {
          path: 'hint',
          name: 'LinimasaHint',
          component: () => import('@/pages/Linimasa')
        },
        {
          path: 'detail/:id',
          name: 'LinimasaDetail',
          component: () => import('@/pages/Linimasa')
        },
        {
          path: 'create-post',
          name: 'LinimasaCreatePost',
          component: () => import('@/pages/Linimasa')
        }
      ]
    },
    {
      path: '/pendidikan-politik',
      name: 'PendidikanPolitik',
      component: () => import('@/pages/pendidikan-politik'),
      props: true,
      children: [
        {
          path: 'quiz/ikuti',
          name: 'PendidikanPolitikQuiz',
          component: () => import('@/pages/pendidikan-politik')
        }
      ]
    },
    {
      path: '/profile',
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
