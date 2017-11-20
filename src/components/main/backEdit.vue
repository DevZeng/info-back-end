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
      <el-breadcrumb-item :to="{'path': '/backcharacterlist'}">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="back-edit-form">
      <el-form label-position="top" label-width="80px" :model="adminUser" :rules="rules" ref="adminUser">      
        <el-form-item label="用户名" prop="username">
          <el-input v-model="adminUser.username" placeholder="请输入分工用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adminUser.password" placeholder="请输入密码（不能短于6位）"></el-input>
        </el-form-item>        
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="adminUser.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="权限角色" prop="role">
            <el-select v-model="adminUser.role" placeholder="请选择权限角色">
              <el-option v-for="role in roles" :key="role.id" :label="role.display_name" :value="role.id"></el-option>
            </el-select>
          <el-button type="text" @click="moreRole" style="margin-top: 10px;">{{roleFlag?'没有了':'加载更多角色'}}</el-button>
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
        username: "",
        phone: null,
        password: "",
        role: ""
      },

      rules: {
        username: [{ required: true, message: "分工用户名不能为空" }],
        phone: [
          { required: true, message: "分工电话不能为空" },
          { type: "number", message: "请输入数字" }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, message: "长度在 6 个字符以上" }
        ]
      },

      roles: [],
      page: 1,
      roleFlag: false
    };
  },

  created() {
    // const user = this.$route.params.user;
    // if (user) {
    //   this.adminUser.name = user.name;
    //   this.adminUser.password = user.password;
    //   this.adminUser.authorities = user.authority;
    // }

    // let arr = [];
    // for (let i = 0; i < this.$common.authorities.length; i++) {
    //   arr.push(i);
    // }
    // this.authoritiesArr = arr;
    this.$api.getRoleList("", res => {
      this.roles = res.data.data;
    });
  },

  methods: {
    moreRole() {
      if (this.roleFlag) {
        return false;
      }
      this.$api.getRoleList({ page: ++this.page }, res => {
        const data = res.data.data;
        if (data.length) {
          this.roles = [...this.roles, ...data];
        } else {
          this.roleFlag = true;
        }
      });
    },

    /*
    * 表单提交
    */
    submitForm(formName) {
      if (!this.adminUser.role) {
        this.$message({
          type: "warning",
          message: "请选择角色"
        });
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.postNewAdmin(this.adminUser, res => {
            this.$message({
              type: "success",
              message: "新建成功",
              showClose: true
            });
            this.$router.push("/backcharacterlist");
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
