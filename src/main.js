// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import  store from './store'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import qs from 'qs'

// 设置反向代理，前端请求默认发送到 http://localhost:8443/
axios.defaults.baseURL = 'http://localhost:8886/'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
// Vue.prototype.$qs=qs;
Vue.config.productionTip = false


Vue.use(ElementUI,{locale})
Vue.use(mavonEditor)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
