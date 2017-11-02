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
    axios.post(host + 'login', data)
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
    axios.post(host + 'member/level', data)
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
    axios.get(host + 'member/levels')
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
    axios.get(host + 'member/level/' + id)
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
    axios.get(host + 'del/member/level/' + id)
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
