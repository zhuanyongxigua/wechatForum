import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
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
        path: '/006-newsList',
        name: 'newsList',
        component: (resolve) => require(['../pages/006-newsList.vue'], resolve)
    },
    {
        path: '/007-news',
        name: 'news',
        component: (resolve) => require(['../pages/007-news.vue'], resolve)
    },
    {
        path: '/008-personalCardList',
        name: 'personalCardList',
        component: (resolve) => require(['../pages/008-personalCardList.vue'], resolve)
    },
    {
        path: '/009-followList',
        name: 'followList',
        component: (resolve) => require(['../pages/009-followList.vue'], resolve)
    },
    {
        path: '/011-talk',
        name: 'talk',
        component: (resolve) => require(['../pages/011-talk.vue'], resolve)
    },
    {
        path: '/012-reward',
        name: 'reward',
        component: (resolve) => require(['../pages/012-reward.vue'], resolve)
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
        path: '/016-edit',
        name: 'edit',
        component: (resolve) => require(['../pages/016-edit.vue'], resolve)
    },
    {
        path: '/017-interest',
        name: 'interest',
        component: (resolve) => require(['../pages/017-interest.vue'], resolve)
    },
    {
        path: '/018-scoreRule',
        name: 'scoreRule',
        component: (resolve) => require(['../pages/018-scoreRule.vue'], resolve)
    },
    {
        path: '/019-chat',
        name: 'chat',
        component: (resolve) => require(['../pages/019-chat.vue'], resolve)
    }
  ]
})
