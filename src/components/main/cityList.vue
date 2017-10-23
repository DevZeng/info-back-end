<style scoped>
.city-list-wrap {
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
  <section v-else class="city-list-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>城市列表</el-breadcrumb-item>
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

