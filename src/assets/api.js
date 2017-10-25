import axios from 'axios'
import qs from 'qs'
import jsonP from 'jsonp'
const TXWebService = 'http://apis.map.qq.com/ws/district/v1/'
const TXKey = 'FF2BZ-H34WP-GQPDC-VFKIS-P7DDH-BCFNG'
/*
  配置 axios
*/
axios.defaults.timeout = 5000
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
