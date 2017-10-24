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
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="formCharacter.authorities" @change="handleCheckedItemChange">
          <el-checkbox v-for="authority in authorities" :label="authority.id" :key="authority.id" style="margin: 10px;">{{authority.name}}</el-checkbox>
        </el-checkbox-group>
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
      authorities: this.$common.authorities,
      isIndeterminate: true,
      checkAll: true,
      authoritiesArr: [],

      rules: {
        name: [{ required: true, message: "权限角色名称不能为空" }]
      },

      formCharacter: {
        name: "",
        authorities: []
      }
    };
  },
  created() {
    const character = this.$route.params.character;
    if (character) {
      this.formCharacter.name = character.name;
      this.formCharacter.authorities = character.authorities;
    }
    let arr = [];
    for (let i = 0; i < this.$common.authorities.length; i++) {
      arr.push(i);
    }
    this.authoritiesArr = arr;
  },
  methods: {
    /*
    * 全选
    */
    handleCheckAllChange(event) {
      this.formCharacter.authorities = event.target.checked
        ? this.authoritiesArr
        : [];
      this.isIndeterminate = false;
    },

    /*
    * 监听多选
    */
    handleCheckedItemChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.authorities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.authorities.length;
    },

    /*
    * 表单提交
    */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type: "success",
            message: "保存成功",
            showClose: true
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
