<style scoped>
.back-edit-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 60px;
}

.back-edit-form {
  width: 600px;
  margin: 0 auto;
}
</style>


<template>
  <section class="back-edit-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{'path': '/backlist'}">分工列表</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="back-edit-form">
      <el-form label-position="top" label-width="80px" :model="adminUser" :rules="rules" ref="adminUser">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="adminUser.name" placeholder="请输入分工姓名"></el-input>
        </el-form-item>        
        <el-form-item label="用户名" prop="username">
          <el-input v-model="adminUser.username" placeholder="请输入分工用户名"></el-input>
        </el-form-item>        
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="adminUser.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adminUser.password" placeholder="请输入密码（不能短于6位）"></el-input>
        </el-form-item>
        <el-form-item label="权限角色" prop="character">
            <el-select v-model="adminUser.character" placeholder="请选择权限角色">
              <el-option label="角色一" value="1"></el-option>
              <el-option label="角色二" value="2"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('adminUser')" style="width: 100%;margin-top: 10px;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      adminUser: {
        name: "",
        username: "",
        phone: null,
        password: "",
        authorities: [],
        character: ""
      },

      //多选框
      checkAll: true,
      authorities: this.$common.authorities,
      authoritiesArr: [],
      isIndeterminate: true,

      rules: {
        name: [
          { required: true, message: "分工姓名不能为空" },
          { min: 0, max: 10, message: "长度在 10 个字符内" }
        ],
        username: [{ required: true, message: "分工用户名不能为空" }],
        phone: [
          { required: true, message: "分工电话不能为空" },
          { type: "number", message: "请输入数字" }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, message: "长度在 6 个字符以上" }
        ],
        character: [{ required: true, message: "请选择权限角色", trigger: "change" }]
      }
    };
  },

  created() {
    const user = this.$route.params.user;
    if (user) {
      this.adminUser.name = user.name;
      this.adminUser.password = user.password;
      this.adminUser.authorities = user.authority;
    }

    let arr = [];
    for (let i = 0; i < this.$common.authorities.length; i++) {
      arr.push(i);
    }
    this.authoritiesArr = arr;
  },

  methods: {

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
