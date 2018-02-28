import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/001-home'
    },
    {
      path: '/001-home',
      name: 'home',
      component: (resolve) => require(['../pages/001-home.vue'], resolve)
    },
    {
      path: '/003-send',
      name: 'home',
      component: (resolve) => require(['../pages/003-send.vue'], resolve)
    }
  ]
})
