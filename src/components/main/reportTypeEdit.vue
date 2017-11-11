<style scoped>
.editor-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.form-wrap {
  max-width: 900px;
  margin: 0 auto;
}
</style>

<template>
  <section class="editor-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>举报与投诉</el-breadcrumb-item>
      <el-breadcrumb-item :to="{'path': '/report/type/list'}">举报原因列表</el-breadcrumb-item>
      <el-breadcrumb-item>举报原因编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="form-wrap">
      <el-form label-position="top" label-width="80px" :model="reportForm" :rules="rules" ref="reportForm">
        <el-form-item label="名称" prop="content">
          <el-input v-model="reportForm.content" placeholder="输入举报原因名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('reportForm')" style="width: 100%;margin: 20px auto 0;display: block;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      reportForm: {
        content: "",
        id: ""
      },

      rules: {
        content: [{ required: true, message: "举报原因名称不能为空" }]
      }
    };
  },

  created() {
    const report = this.$route.params.report;
    if (report) {
      this.reportForm = report;
    }
  },
  methods: {
    /*
      提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.postReportReason(this.reportForm, res => {
            this.$message({
              type: "success",
              message: "提交成功",
              showClose: true
            });
            this.$router.push("/report/type/list");
          });
        } else {
          this.$message({
            type: "warning",
            message: "信息输入不正确",
            showClose: true
          });
          return false;
        }
      });
    }
  }
};
</script>
