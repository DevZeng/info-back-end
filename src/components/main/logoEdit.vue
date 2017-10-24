<style>
.breadcrumb {
  margin-bottom: 20px;
}

.logo-father {
  overflow-y: scroll;
  height: 100%;
  padding: 15px;
}

.logo-wrap {
  width: 500px;
  margin: 60px auto 0;
}

.logo-uploader {
  text-align: center;
}

.logo-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.logo-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.logo-uploader .logo-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.logo {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<template>
  <section class="logo-father">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>LOGO</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="logo-wrap">
      <el-upload class="logo-uploader" action="https://jsonplaceholder.typicode.com/posts/" :multiple="false" accept="image/jpg,image/png,image/jpeg" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
        <img v-if="logoForm.url" :src="logoForm.url" class="logo">
        <i v-else class="el-icon-plus logo-uploader-icon"></i>
      </el-upload>
      <el-form label-position="top" label-width="80px" :rules="rules" :model="logoForm">
        <el-form-item label="LOGO 名称" prop="name">
          <el-input v-model="logoForm.name" placeholder="请输入 LOGO 名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" style="width: 100%;margin-top: 20px;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      logoForm: {
        name: "",
        url: ""
      },

      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    /*
      上传之前
    */
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传 logo 图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    /*
      上传成功
    */
    handleSuccess(res, file) {
      this.logoForm.url = URL.createObjectURL(file.raw);
    },

    /*
      提交
    */
    onSubmit() {
      if (this.logoForm.name) {
        this.$message({
          message: "提交成功！",
          showClose: true,
          type: "success"
        });
      } else {
        this.$message({
          message: "名称不能为空！",
          showClose: true,
          type: "warning"
        });
      }
    }
  }
};
</script>

