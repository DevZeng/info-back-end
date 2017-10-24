<style scoped>

</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
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

