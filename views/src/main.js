// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/style.css'
import 'ionicons/dist/css/ionicons.css'
import 'weui/dist/style/weui.css'
import 'jquery-weui/dist/css/jquery-weui.css'
// require("../static/css/style.css");

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
