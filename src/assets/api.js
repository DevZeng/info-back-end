import axios from 'axios'
import qs from 'qs'
import jsonP from 'jsonp'
import {
  MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
const TXWebService = 'http://apis.map.qq.com/ws/district/v1/'
const TXKey = 'FF2BZ-H34WP-GQPDC-VFKIS-P7DDH-BCFNG'
// const host = 'http://192.168.3.22:8090/'
const host = 'http://admin.sennkisystem.cn/'
/*
  配置 axios
*/
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
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

export default {

  /**
   * 出错提示函数
   * @param {object} error 错误对象 {return_code, return_msg}
   */
  APIError(error) {
    MessageBox.alert(error.data.return_msg, '出错啦', {
      confirmButtonText: '确定',
    })
  },

  /**
   * 登录 api
   * @param {object} data 用户的登录信息 {username, password}
   * @param {function} cb 回调
   */
  login(data, cb) {
    axios.post(`${host}login`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 
   * @param {object} data 会员等级信息 {level, title, price, time, send_daily, send_max}
   * @param {function} cb 
   */
  memberLevelEdit(data, cb) {
    axios.post(`${host}member/level`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 
   * @param {function} cb 回调
   */
  memberLevelList(cb) {
    axios.get(`${host}member/levels`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取单个会员信息， 暂不需要使用
   * @param {string} id 会员等级 id
   * @param {*} cb 回调
   */
  memberLevelSingle(id, cb) {
    axios.get(`${host}member/level/` + id)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 删除单个会员等级
   * @param {string} id 会员等级 id
   * @param {function} cb 回调
   */
  memberLevelDelete(id, cb) {
    axios.get(`${host}del/member/level/` + id)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  temp(data, cb) {
    axios.post(`${host}permission`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取角色列表
   * @param {object} data {page, (limit)}
   * @param {function} cb 回调 
   */
  getRoleList(data, cb) {
    axios.get(`${host}roles`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 新增角色
   * @param {object} data  角色提交参数 {name,display_name,description, pres}
   * @param {function} cb 回调
   */
  addRole(data, cb) {
    axios.post(`${host}role`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取所有权限
   * @param {function} cb 回调
   */
  getPermission(cb) {
    axios.get(`${host}permissions`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 删除权限角色
   * @param {string} id 角色 id
   * @param {function} cb 回调 
   */
  deleteCharacter(id, cb) {
    axios.get(`${host}del/role/${id}`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 新建种类细节
   * @param {object} data 种类细节 {title, desc} 
   * @param {function} cb 回调
   */
  postCategory(data, cb) {
    axios.post(`${host}type`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取种类细节列表
   */
  getCategories(page, cb) {
    axios.get(`${host}types`, {
        params: {
          page
        }
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 开关修改
   * @param {string} id id
   * @param {function} cb 回调
   */
  editCategory(id, cb) {
    axios.get(`${host}modify/type/${id}`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取启动页面
   * @param {function} cb 回调
   */
  getLaunchImg(cb) {
    axios.get(`${host}launcher/images`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 启动页提交
   * @param {object} data {}
   * @param {function} cb 回调
   */
  postLaunchImg(data, cb) {
    axios.post(`${host}launcher/image`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 打开启动页
   * @param {string} id 
   * @param {function} cb 
   */
  closeLaunchImg(id, cb) {
    axios.get(`${host}enable/launcher/image/${id}`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 删除启动页
   * @param {string} id 
   * @param {function} cb 
   */
  deleteLaunchImg(id, cb) {
    axios.get(`${host}del/image/${id}`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取二维码
   * @param {function} cb 
   */
  getQRCode(cb) {
    axios.get(`${host}qrcode`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 修改二维码
   * @param {string} id
   * @param {object} data {logo, content}
   * @param {function} cb 
   */
  postQRCode(id, data, cb) {
    axios.post(`${host}qrcode/${id}`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取所有广告
   * @param {function} cb 回调
   */
  getAdverts(data, cb) {
    axios.get(`${host}adverts`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 提交广告
   * @param {object} data {title, city_id, url, link_url, state}
   * @param {function} cb 
   */
  postAdvert(data, cb) {
    axios.post(`${host}advert`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 删除广告
   * @param {string} id 
   * @param {function} cb 回调
   */
  deleteAdvert(id, cb) {
    axios.get(`${host}del/advert/${id}`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取城市列表
   * @param {object} data {pid}
   * @param {function} cb 回调 
   */
  getUsDistrict(data, cb) {
    axios.get(`${host}cities`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取文本列表
   * @param {function} cb 回调
   */
  getTextLists(cb) {
    axios.get(`${host}articles`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 提交文本
   * @param {object} data {title, content, type}
   * @param {function} cb 回调
   */
  postTextList(data, cb) {
    axios.post(`${host}article`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取指南列表
   * @param {function} cb 回调
   */
  getGuides(cb) {
    axios.get(`${host}guides`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 提交指南
   * @param {object} data {title, content, sort, id}
   * @param {function} cb 回调
   */
  postGuide(data, cb) {
    axios.post(`${host}guide`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 删除指南
   * @param {string} id 
   * @param {function} cb 
   */
  delGuide(id, cb) {
    axios.get(`${host}del/guide/${id}`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取支付流水
   * @param {function} cb 回调
   */
  getPayOrders(data, cb) {
    axios.get(`${host}orders`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取举报列表
   * @param {object} data {page, state, username, user_id}
   * @param {function} cb 回调
   */
  getReports(data, cb) {
    axios.get(`${host}reports`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 改变举报状态
   * @param {string} id 
   * @param {function} cb 回调
   */
  changeReport(id, cb) {
    axios.get(`${host}report/${id}`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取兼职列表
   * @param {object} data {page, }
   * @param {function} cb 回调
   */
  getPartTimes(data, cb) {
    axios.get(`${host}parttimes`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 兼职状态修改
   * @param {string} id 
   * @param {object} data {state}
   * @param {function} cb 回调
   */
  chagePratTime(id, data, cb) {
    axios.get(`${host}modify/parttime/${id}`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 签到信息获取
   * @param {function} cb 回调
   */
  getCheckIn(cb) {
    axios.get(`${host}activity/sign`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 签到信息提交
   * @param {object} data {id, start, end, score}
   * @param {function} cb 回调
   */
  postCheckIn(data, cb) {
    axios.post(`${host}activity/sign`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 扫一扫获取
   * @param {function} cb 回调
   */
  getScan(cb) {
    axios.get(`${host}activity/scan`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 扫一扫提交
   * @param {object} data {id, start, end, score}
   * @param {function} cb 回调
   */
  postScan(data, cb) {
    axios.post(`${host}activity/scan`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 系统设置获取
   * @param {function} cb 回调
   */
  getConfig(cb) {
    axios.get(`${host}config`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 系统设置提交
   * @param {object} data {need_pay, pic_score, phone_score, pic_price, phone_price, show_sign, show_qrcode, show_share, Apply}
   * @param {function} cb 回调
   */
  postConfig(data, cb) {
    axios.post(`${host}config`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取用户列表
   * @param {object} data {page, (limit)}
   * @param {function} cb 回调
   */
  getUserList(data, cb) {
    axios.get(`${host}users`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 调整单个用户状态
   * @param {string} id 
   * @param {object} data {state}
   * @param {function} cb 回调
   */
  changeUser(id, data, cb) {
    axios.get(`${host}modify/user/${id}`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取审核条件列表
   * @param {object} data {page, limit}
   * @param {function} cb 回调
   */
  getRefuse(data, cb) {
    axios.get(`${host}refuses`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 添加审核条件
   * @param {object} data {id, title, content}
   * @param {function} cb 回调
   */
  postRefuse(data, cb) {
    axios.post(`${host}refuse`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 删除审核条件
   * @param {string} id 
   * @param {function} cb 
   */
  deleteRefuse(id, cb) {
    axios.get(`${host}del/refuse/${id}`)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取审核通过列表
   * @param {object} data {page, (limit), username, user_id, city_id, start, end}
   * @param {function} cb 回调
   */
  getPassList(data, cb) {
    axios.get(`${host}pass/commodities`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取审核未通过列表
   * @param {object} data {page, (limit), username, user_id, city_id, start, end}
   * @param {function} cb 回调
   */
  getUnPassList(data, cb) {
    axios.get(`${host}unpass/commodities`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 通过、拒绝
   * @param {object} data {pass, reason}
   * @param {string} id 
   * @param {function} cb 回调
   */
  changePass(id, data, cb) {
    axios.get(`${host}pass/commodity/${id}`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 获取举报原因列表
   * @param {function} cb 回调
   */
  getReportReasons(data, cb) {
    axios.get(`${host}report/reasons`, {
        params: data
      })
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },

  /**
   * 提交举报原因
   * @param {object} data {id, content}
   * @param {function} cb 回调
   */
  postReportReason(data, cb) {
    axios.post(`${host}report/reason`, data)
      .then(res => {
        if ('SUCCESS' === res.data.return_code) {
          typeof cb === 'function' && cb(res)
        } else {
          this.APIError(res)
        }
      }).catch(error => {
        this.APIError(error.response)
      })
  },
  /**
   * 假如省份的日期没有更新，就直接拿 localStorage 的数据
   * @param {*行政区 ID} id 
   * @param {* jsonP 回调} callback 
   */
  getDistrict(id, callback) {
    const localShengs = localStorage.infoShengs
    if (id) {
      jsonP(`${TXWebService}getchildren?id=${id}&key=${TXKey}&output=jsonp`, null, (err, data) => {
        if (JSON.parse(localShengs).data_version !== data.data_version) {
          localStorage.infoShengs = ''
        }
        typeof callback === 'function' && callback(err, data)
      })
    } else {
      if (localShengs) {
        typeof callback === 'function' && callback(null, JSON.parse(localShengs))
      }
      jsonP(`${TXWebService}getchildren?key=${TXKey}&output=jsonp`, null, (err, data) => {
        localStorage.infoShengs = JSON.stringify(data)
        typeof callback === 'function' && callback(err, data)
      })
    }
  },

}
