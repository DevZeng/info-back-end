<style>
.breadcrumb {
  margin-bottom: 20px;
}

.logo-father {
  overflow: auto;
  height: 100%;
  padding: 15px;
}

.start-img-wrap {
  width: 500px;
  margin: 60px auto 0;
}

.start-img-uploader {
  text-align: center;
}

.start-img-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.start-img-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.start-img-uploader .start-img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.start-img {
  max-width: 100%;
  display: block;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="logo-father">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>信息处理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/startpagelist'}">启动页面</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="start-img-wrap">
      <el-upload class="start-img-uploader" action="https://jsonplaceholder.typicode.com/posts/" :multiple="false" accept="image/jpg,image/png,image/jpeg" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
        <img v-if="startPageForm.url" :src="startPageForm.url" class="start-img">
        <i v-else class="el-icon-plus start-img-uploader-icon"></i>
      </el-upload>
      <el-form label-position="top" label-width="80px" :model="startPageForm" :rules="rules" ref="startPageForm">
        <el-form-item label="启动页面名称" prop="name">
          <el-input v-model="startPageForm.name" placeholder="输入启动页面名称"></el-input>
        </el-form-item>        
        <el-form-item label="启动页面跳转链接" prop="link">
          <el-input v-model="startPageForm.link" placeholder="输入启动页面跳转链接"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('startPageForm')" style="width: 100%;margin-top: 20px;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      startPageForm: {
        url: "",
        name: "",
        link: ""
      },

      rules: {
        name: [{ required: true, message: "启动页面名称不能为空" }]
      }
    };
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, 200);
  },

  methods: {
    /*
      上传之前
    */
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    /*
      上传成功
    */
    handleSuccess(res, file) {
      this.startPageForm.url = URL.createObjectURL(file.raw);
    },

    /*
      提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.startPageForm.url) {
            this.$message({
              message: "提交成功！",
              showClose: true,
              type: "success"
            });
            this.$router.push("/auditcondition");
          } else {
            this.$message({
              message: "请先上传图片",
              showClose: true,
              type: "warning"
            });
          }
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
