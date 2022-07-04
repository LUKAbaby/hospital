import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
// import formateTime from '../utils/formateTime'
// import common from "./global/global.js"	

Vue.use(ElementUI)
Vue.config.productionTip = false

//配置接口地址域名
axios.default.baseURL = 'http://localhost:8090/'

//将axios赋值给Vue的原始http属性
Vue.prototype.$http = axios
// Vue.prototype.$global = common

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
