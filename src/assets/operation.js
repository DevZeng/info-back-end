import {
  Message,
  MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

export default {

  /**
   * 列表弹窗函数
   * @param {*错误信息} msg 
   * @param {*回调} callback 
   */
  tableMessageBox(msg, callback) {
    MessageBox.confirm(msg + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        typeof callback === 'function' && callback()
      })
      .catch(() => {
        Message({
          type: "info",
          message: "已取消"
        });
      });
  }
}
