<style scoped>
.qrcode-wrap {
  height: 100%;
  padding: 15px;
}

.breadcrumb {
  margin-bottom: 60px;
}
</style>

<template>
  <section class="qrcode-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item>二维码开关</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tooltip :content="'当前状态：' + QRStatus[QRSwitch]" placement="top">
      <el-switch v-model="QRSwitch" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0" on-text="打开" off-text="关闭" @change="QRSwitchFnc">
      </el-switch>
    </el-tooltip>
  </section>
</template>

<script>
export default {
  data() {
    return {
      QRStatus: ['关闭', '打开'],
      QRSwitch: '1',
    }
  },

  methods: {
    QRSwitchFnc(value) {
      this.$message({
        type: 'info',
        message: `当前状态：${this.QRStatus[value]}`,
        showClose: true
      })
    }
  }
}
</script>
