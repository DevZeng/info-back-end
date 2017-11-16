<style scoped>
.back-character-edit-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}
.breadcrumb {
  margin-bottom: 60px;
}

.back-character-form {
  width: 600px;
  margin: 0 auto;
}
</style>

<template>
  <section class="back-character-edit-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: 'backcharacterlist'}">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="back-character-form">
      <el-form label-position="top" label-width="80px" :model="formCharacter" :rules="rules" ref="formCharacter">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formCharacter.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="显示名称" prop="display_name">
          <el-input v-model="formCharacter.display_name" placeholder="请输入显示名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formCharacter.description" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formCharacter')" style="width: 100%;margin-top: 10px;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
        
  </section>
</template>

<script>
export default {
  data() {
    return {
      authorities: [],
      isIndeterminate: true,
      checkAll: true,
      authoritiesArr: [],

      rules: {
        name: [{ required: true, message: "权限角色名称不能为空" }],
        display_name: [{ required: true, message: "权限角色显示名称不能为空" }]
      },

      formCharacter: {
        name: "",
        display_name: "",
        description: "",
      }
    };
  },
  created() {
  },
  methods: {
    /*
    * 表单提交
    */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.temp(this.formCharacter, res => {
            this.$message({
              type: "success",
              message: "保存成功",
              showClose: true
            });
          });
        } else {
          this.$message({
            type: "warning",
            message: "信息填写不正确",
            showClose: true
          });
          return false;
        }
      });
    }
  }
};
</script>
