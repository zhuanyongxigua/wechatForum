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
        path: '/002-score',
        name: 'score',
        component: (resolve) => require(['../pages/002-score.vue'], resolve)
    },
    {
      path: '/003-send',
      name: 'send',
      component: (resolve) => require(['../pages/003-send.vue'], resolve)
    },
    {
        path: '/004-my',
        name: 'my',
        component: (resolve) => require(['../pages/004-my.vue'], resolve)
    },
    {
        path: '/005-card',
        name: 'card',
        component: (resolve) => require(['../pages/005-card.vue'], resolve)
    },
    {
        path: '/008-personalCardList',
        name: 'personalCardList',
        component: (resolve) => require(['../pages/008-personalCardList.vue'], resolve)
    },
    {
        path: '/013-recharge',
        name: 'recharge',
        component: (resolve) => require(['../pages/013-recharge.vue'], resolve)
    },
    {
        path: '/014-withdraw',
        name: 'withdraw',
        component: (resolve) => require(['../pages/014-withdraw.vue'], resolve)
    },
    {
        path: '/015-settings',
        name: 'settings',
        component: (resolve) => require(['../pages/015-settings.vue'], resolve)
    },
    {
        path: '/018-scoreRule',
        name: 'scoreRule',
        component: (resolve) => require(['../pages/018-scoreRule.vue'], resolve)
    }
  ]
})
