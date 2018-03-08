import Vue from 'vue'
import App from './App'
import router from './router'
import 'ionicons/css/ionicons.css'
import 'weui/dist/style/weui.css'
import 'jquery-weui/dist/css/jquery-weui.css'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import '../static/css/style.css'
require("expose-loader?$!jquery");

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:3000';
    // axios.defaults.baseURL = 'http://www.11wdkj.com/pavilion/';
    axios.defaults.withCredentials = true;
    Vue.config.performance = true;
} else {
    axios.defaults.baseURL = '../';
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
