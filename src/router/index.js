import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import IndexContent from '@/components/IndexContent'
import LogoEdit from '@/components/main/logoEdit'
import BannerList from '@/components/main/bannerList'
import BannerChange from '@/components/main/bannerChange'
import BannerEdit from '@/components/main/bannerEdit'
import textList from '@/components/main/textList'
import textEdit from '@/components/main/textEdit'

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
      }, {
        path: 'bannerlist',
        name: 'bannerlist',
        component: BannerList
      }, {
        path: 'bannerchange',
        name: 'bannerchange',
        component: BannerChange
      }, {
        path: 'banneredit',
        name: 'banneredit',
        component: BannerEdit
      }, {
        path: 'textlist',
        name: 'textlist',
        component: textList
      }, {
        path: 'textedit',
        name: 'textedit',
        component: textEdit,
        beforeEnter: (to, from, next) => {
          if(from.path === '/'){
            next('/')
          }
          next()
        }
      }]
    }
  ]
})
