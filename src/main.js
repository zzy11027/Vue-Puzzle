// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '@/utils/postcssrc';
import '@/assets/css/reset.css'; /*引入公共样式*/
import '@/assets/iconfont/iconfont.css'; /*引入阿里icon*/
import axios from 'axios';
import QS from 'qs';
import wx from 'weixin-js-sdk';
import WXConfig from './utils/wxshare';

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
Vue.prototype.WXConfig = WXConfig;




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
