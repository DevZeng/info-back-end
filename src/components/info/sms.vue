<style scoped>
.sms-wrap {
  height: 100%;
  padding: 15px;
}

.breadcrumb {
  margin-bottom: 20px;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="sms-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>信息处理</el-breadcrumb-item>
      <el-breadcrumb-item>短信反馈</el-breadcrumb-item>
    </el-breadcrumb>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    };
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 200);
  }
};
</script>

