<style scoped>
.editor-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}
</style>

<template>
  <section class="editor-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>审核相关</el-breadcrumb-item>
      <el-breadcrumb-item :to="{'path': '/auditcondition'}">审核条件</el-breadcrumb-item>
      <el-breadcrumb-item>条件编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-position="top" label-width="80px" :model="conditionForm" :rules="rules" ref="conditionForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="conditionForm.name" placeholder="输入审核条件名称"></el-input>
      </el-form-item>
      <el-form-item label="未通过原因" prop="content">
        <el-input type="textarea" v-model="conditionForm.content" placeholder="这里输入审核不通过原因" :autosize="{minRows: 10}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('conditionForm')" style="width: 200px;margin: 20px auto 0;display: block;">确定</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      conditionForm: {
        name: '',
        content: '',
      },

      rules: {
        name: [
          { required: true, message: '名称不能为空' }
        ],
        content: [
          { required: true, message: '审核不通过原因不能为空' }
        ]
      },
    }
  },
  methods: {

    /*
      提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '提交成功',
            showClose: true
          })
          this.$router.push('/auditcondition')
        } else {
          this.$message({
            type: 'warning',
            message: '信息输入不正确',
            showClose: true
          })
          return false
        }
      });
    }
  },

  created() {
    const condition = this.$route.params.condition
    if (condition) {
      this.conditionForm.name = condition.name
      this.conditionForm.content = condition.content
    }
  }
}
</script>
