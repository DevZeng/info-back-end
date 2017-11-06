import axios from 'axios'
import qs from 'qs'
import jsonP from 'jsonp'
import {
  MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
const TXWebService = 'http://apis.map.qq.com/ws/district/v1/'
const TXKey = 'FF2BZ-H34WP-GQPDC-VFKIS-P7DDH-BCFNG'
const host = 'http://192.168.3.22:8090/'
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
   * @param {function} cb 回调 
   */
  getRoleList(cb) {
    axios.get(`${host}roles`)
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
   * 添加新的启动页
   * @param {object} data {title, url, link_url}
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
