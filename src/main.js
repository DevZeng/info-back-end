// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import qs from 'qs'
import VueQuillEditor from 'vue-quill-editor'

/*
  配置 axios
*/
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use(config => {
  //在发送 post 请求请设置一下数据格式
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  console.log('错误的传参！')
  return Promise.reject(error)
})

/**
 * 全局钩子
 */
router.beforeEach((to, from, next) => {
  if (sessionStorage.username) {
    if (to.name === 'login') {
      next(from.path)
    } else {
      next()
    }
  } else {
    if (to.name !== 'login') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
