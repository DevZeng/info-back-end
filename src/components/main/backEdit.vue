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
      <el-breadcrumb-item :to="{'path': '/backlist'}">后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="back-edit-form">
      <el-form label-position="top" label-width="80px" :model="adminUser" :rules="rules" ref="adminUser">
        <el-form-item label="分工用户名" prop="name">
          <el-input v-model="adminUser.name" placeholder="请输入分工用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adminUser.password" placeholder="请输入密码（10个字符内）"></el-input>
        </el-form-item>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="adminUser.authorities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="authority in authorities" :label="authority.id" :key="authority.id" style="margin: 10px;">{{authority.name}}</el-checkbox>
        </el-checkbox-group>
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
        name: '',
        password: '',
        authorities: [],
      },

      //多选框
      checkAll: true,
      authorities: this.$common.authorities,
      authoritiesArr: [],
      isIndeterminate: true,

      rules: {
        name: [
          { required: true, message: '分工用户名不能为空', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 10 个字符内', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 10 个字符内', trigger: 'blur' }
        ]
      },
    }
  },

  created() {
    const user = this.$route.params.user
    if (user) {
      this.adminUser.name = user.name
      this.adminUser.password = user.password
      this.adminUser.authorities = user.authority
    }

    let arr = []
    for (let i = 0; i < this.$common.authorities.length; i++) {
      arr.push(i)
    }
    this.authoritiesArr = arr

  },

  methods: {

    /*
    * 全选
    */
    handleCheckAllChange(event) {
      this.adminUser.authorities = event.target.checked ? this.authoritiesArr : []
      this.isIndeterminate = false
    },

    /*
    * 监听多选
    */
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.authorities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.authorities.length
    },

    /*
    * 表单提交
    */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '创建成功',
            showClose: true
          })
        } else {
          this.$message({
            type: 'warning',
            message: '信息填写不正确',
            showClose: true
          })
          return false
        }
      });
    },
  }
}
</script>
