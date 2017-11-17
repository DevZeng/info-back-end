<style>
.check-in-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
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

.share-form {
  max-width: 900px;
  margin: 0 auto;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="check-in-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item>会员功能</el-breadcrumb-item>
      <el-breadcrumb-item>分享</el-breadcrumb-item>
      <el-breadcrumb-item>分享编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="share-form">
      <el-form label-position="top" label-width="80px" :model="shareForm" :rules="rules" ref="shareForm">
        <el-form-item label="活动时间" prop="time">
          <el-date-picker v-model="shareForm.time" type="datetimerange" :picker-options="dateRangeOption" placeholder="选择活动时间" align="left">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分享积分" prop="score">
          <el-input v-model.number="shareForm.score" placeholder="请输入每次分享积分">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="每天分享积分上限" prop="daily_max">
          <el-input v-model.number="shareForm.daily_max" placeholder="请输入积分上限">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="H5的分享文本" prop="content">
          <el-input type="textarea" v-model="shareForm.content"></el-input>
        </el-form-item>
        <el-form-item label="APP的分享规则" prop="rule">
          <el-input type="textarea" v-model="shareForm.rule"></el-input>
        </el-form-item>
        <el-form-item label="H5的图片" prop="image">
          <el-upload class="start-img-uploader" :action="host" with-credentials name="image" :multiple="false" accept="image/jpg,image/png,image/jpeg" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
            <img v-if="shareForm.image" :src="shareForm.image" class="start-img">
            <i v-else class="el-icon-plus start-img-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('shareForm')" style="width: 100%;margin-top: 20px;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      host: this.$common.host + "upload",
      shareForm: {
        score: "",
        daily_max: "",
        content: "",
        rule: "",
        time: "",
        image: ""
      },

      rules: {
        score: [
          { required: true, message: "分享积分不能为空" },
          { type: "number", message: "分享积分必须为数字" }
        ],
        daily_max: [
          { required: true, message: "分享积分不能为空" },
          { type: "number", message: "分享积分必须为数字" }
        ],
        time: [{ required: true, message: "请选择时间" }]
      },

      dateRangeOption: this.$common.dateOptions
      // dateRange: ""
    };
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
      this.shareForm.image = res.data.base_url;
    },
    /*
    * 提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.shareForm.start = this.shareForm.time[0];
          this.shareForm.end = this.shareForm.time[1];
          this.$api.postShare(this.shareForm, res => {
            this.$message({
              type: "success",
              message: "提交成功",
              showClose: true
            });
            this.$router.push("/membershare");
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
