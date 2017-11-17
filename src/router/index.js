import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import IndexContent from '@/components/IndexContent'
import LogoEdit from '@/components/main/logoEdit'
import BannerList from '@/components/main/bannerList'
import BannerChange from '@/components/main/bannerChange'
// import BannerEdit from '@/components/main/bannerEdit'
import textList from '@/components/main/textList'
import textEdit from '@/components/main/textEdit'
// import cityList from '@/components/main/cityList'
// import cityEdit from '@/components/main/cityEdit'
import guideList from '@/components/main/guideList'
import guideEdit from '@/components/main/guideEdit'
import payList from '@/components/main/payList'
import reportList from '@/components/main/reportList'
import reportTypeList from '@/components/main/reportTypeList'
import reportTypeEdit from '@/components/main/reportTypeEdit'
import backList from '@/components/main/backList'
import backEdit from '@/components/main/backEdit'
import backCharacterList from '@/components/main/backCharacterList'
import backCharacterEdit from '@/components/main/backCharacterEdit'
import memberLevelList from '@/components/member/memberLevelList'
import memberLevelEdit from '@/components/member/memberLevelEdit'
import QRControl from '@/components/member/QRControl'
import partTimeList from '@/components/member/partTimeList'
import userList from '@/components/member/userList'
import memberCheckIn from '@/components/member/memberCheckIn'
import memberScan from '@/components/member/memberScan'
import memberShare from '@/components/member/memberShare'
import memberCheckInList from '@/components/member/memberCheckInList'
import memberScanList from '@/components/member/memberScanList'
import memberShareList from '@/components/member/memberShareList'
import categoryList from '@/components/info/categoryList'
import categoryEdit from '@/components/info/categoryEdit'
import auditList from '@/components/info/auditList'
import auditPassList from '@/components/info/auditPassList'
import auditSingle from '@/components/info/auditSingle'
import reportSingle from '@/components/info/reportSingle'
import auditCondition from '@/components/info/auditCondition'
import auditConditionEdit from '@/components/info/auditConditionEdit'
import chargeMode from '@/components/info/chargeMode'
import startPageList from '@/components/info/startPageList'
import startPageEdit from '@/components/info/startPageEdit'
import sms from '@/components/info/sms'
import config from '@/components/info/config'
import temp from '@/components/main/temp'
import backUserList from '@/components/main/backUserList'

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
        },
        // {
        //   path: 'banneredit',
        //   name: 'banneredit',
        //   component: BannerEdit
        // },
        {
          path: 'textlist',
          name: 'textlist',
          component: textList
        }, {
          path: 'textedit',
          name: 'textedit',
          component: textEdit,
          beforeEnter: (to, from, next) => {
            if (from.path === '/') {
              next('/')
            }
            next()
          }
        },
        // {
        //   path: 'citylist',
        //   name: 'citylist',
        //   component: cityList
        // }, {
        //   path: 'cityedit',
        //   name: 'cityedit',
        //   component: cityEdit
        // }, 
        {
          path: 'guidelist',
          name: 'guidelist',
          component: guideList
        }, {
          path: 'guideedit',
          name: 'guideedit',
          component: guideEdit
        }, {
          path: 'paylist',
          name: 'paylist',
          component: payList
        }, {
          path: 'reportlist',
          name: 'reportlist',
          component: reportList
        }, {
          path: 'report/type/list',
          name: 'reporttypelist',
          component: reportTypeList
        }, {
          path: 'report/type/edit',
          name: 'reporttypeedit',
          component: reportTypeEdit
        }, {
          path: 'backlist',
          name: 'backlist',
          component: backList
        }, {
          path: 'backedit',
          name: 'backedit',
          component: backEdit
        }, {
          path: 'backcharacterlist',
          name: 'backcharacterlist',
          component: backCharacterList
        }, {
          path: 'backcharacteredit',
          name: 'backcharacteredit',
          component: backCharacterEdit
        }, {
          path: 'backuserlist',
          name: 'backuserlist',
          component: backUserList
        }, {
          path: 'memberlevellist',
          name: 'memberlevellist',
          component: memberLevelList
        }, {
          path: 'memberleveledit',
          name: 'memberleveledit',
          component: memberLevelEdit
        }, {
          path: 'qrcontrol',
          name: 'qrcontrol',
          component: QRControl
        }, {
          path: 'parttimelist',
          name: 'parttimelist',
          component: partTimeList
        }, {
          path: 'userlist',
          name: 'userlist',
          component: userList
        }, {
          path: 'membercheckin/edit',
          name: 'membercheckin',
          component: memberCheckIn
        }, {
          path: 'memberscan/edit',
          name: 'memberscan',
          component: memberScan
        }, {
          path: 'membershare/edit',
          name: 'membershare',
          component: memberShare
        }, {
          path: 'membercheckin',
          name: 'membercheckinlist',
          component: memberCheckInList
        }, {
          path: 'memberscan',
          name: 'memberscanlist',
          component: memberScanList
        }, {
          path: 'membershare',
          name: 'membersharelist',
          component: memberShareList
        }, {
          path: 'categorylist',
          name: 'categorylist',
          component: categoryList
        }, {
          path: 'categoryedit',
          name: 'categoryedit',
          component: categoryEdit
        }, {
          path: 'auditlist',
          name: 'auditlist',
          component: auditList
        }, {
          path: 'auditpasslist',
          name: 'auditpasslist',
          component: auditPassList
        }, {
          path: 'auditsingle',
          name: 'auditsingle',
          component: auditSingle
        }, {
          path: 'reportsingle',
          name: 'reportsingle',
          component: reportSingle
        }, {
          path: 'auditcondition',
          name: 'auditcondition',
          component: auditCondition
        }, {
          path: 'auditconditionedit',
          name: 'auditconditionedit',
          component: auditConditionEdit
        }, {
          path: 'chargemode',
          name: 'chargemode',
          component: chargeMode
        }, {
          path: 'startpagelist',
          name: 'startpagelist',
          component: startPageList
        }, {
          path: 'startpageedit',
          name: 'startpageedit',
          component: startPageEdit
        }, {
          path: 'sms',
          name: 'sms',
          component: sms
        }, {
          path: 'config',
          name: 'config',
          component: config
        }, {
          path: 'temp',
          name: 'temp',
          component: temp
        }
      ]
    }
  ]
})
