import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import IndexContent from '@/components/IndexContent'
import LogoEdit from '@/components/main/logoEdit'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Index,
      children: [{
        path: '',
        name: 'indexcontent',
        component: IndexContent
      }, {
        path: 'logoedit',
        name: 'logoedit',
        component: LogoEdit
      }]
    }
  ]
})
