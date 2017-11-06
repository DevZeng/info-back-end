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
      <el-upload class="start-img-uploader" :action="uploadUrl" with-credentials name="image" :multiple="false" accept="image/jpg,image/png,image/jpeg" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
        <img v-if="startPageForm.url" :src="startPageForm.url" class="start-img">
        <i v-else class="el-icon-plus start-img-uploader-icon"></i>
      </el-upload>
      <el-form label-position="top" label-width="80px" :model="startPageForm" :rules="rules" ref="startPageForm">
        <el-form-item label="启动页面名称" prop="title">
          <el-input v-model="startPageForm.title" placeholder="输入启动页面名称"></el-input>
        </el-form-item>        
        <el-form-item label="启动页面跳转链接" prop="link_url">
          <el-input v-model="startPageForm.link_url" placeholder="输入启动页面跳转链接"></el-input>
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
      uploadUrl: this.$common.host + "upload",
      startPageForm: {
        url: "",
        title: "",
        link_url: ""
      },

      rules: {
        title: [{ required: true, message: "启动页面名称不能为空" }]
      }
    };
  },

  created() {
    const startPage = this.$route.params.startPage;
    if (startPage) {
      this.startPageForm = startPage;
    }
    this.loading = false;
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
      console.log(res);
      this.startPageForm.url = res.data.base_url;
    },

    /*
      提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.startPageForm.url) {
            this.$api.postLaunchImg(this.startPageForm, res => {
              this.$message({
                message: "提交成功！",
                showClose: true,
                type: "success"
              });
              this.$router.push("/startpagelist");
            });
          } else {
            this.$message({
              message: "请先选择图片",
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
