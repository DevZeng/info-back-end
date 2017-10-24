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
  getDistrict(id, callback) {
    jsonP(`${TXWebService}getchildren?${id?'id='+ id + '&': ''}key=${TXKey}&output=jsonp`, null, (err, data) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(data);
      }
    })
  },

}
