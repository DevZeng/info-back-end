<style scoped>
.check-in-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 60px;
}

.check-in-form {
  width: 500px;
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
      <el-breadcrumb-item>扫一扫</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="check-in-form">
      <el-form label-position="top" label-width="80px" :model="configForm" :rules="rules" ref="configForm">
        <el-form-item label="查看购买开关" prop="need_pay">
          <el-tooltip :content="'当前状态：' + checkSwitchText[configForm.need_pay]" placement="top">
            <el-switch v-model="configForm.need_pay" on-color="#13ce66" off-color="#ff4949" :on-value="1" :off-value="0" on-text="打开" off-text="关闭">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="签到开关" prop="show_sign">
          <el-tooltip :content="'当前状态：' + checkSwitchText[configForm.show_sign]" placement="top">
            <el-switch v-model="configForm.show_sign" on-color="#13ce66" off-color="#ff4949" :on-value="1" :off-value="0" on-text="打开" off-text="关闭">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="二维码开关" prop="show_qrcode">
          <el-tooltip :content="'当前状态：' + checkSwitchText[configForm.show_qrcode]" placement="top">
            <el-switch v-model="configForm.show_qrcode" on-color="#13ce66" off-color="#ff4949" :on-value="1" :off-value="0" on-text="打开" off-text="关闭">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="分享开关" prop="show_share">
          <el-tooltip :content="'当前状态：' + checkSwitchText[configForm.show_share]" placement="top">
            <el-switch v-model="configForm.show_share" on-color="#13ce66" off-color="#ff4949" :on-value="1" :off-value="0" on-text="打开" off-text="关闭">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="兼职开关" prop="apply">
          <el-tooltip :content="'当前状态：' + checkSwitchText[configForm.apply]" placement="top">
            <el-switch v-model="configForm.apply" on-color="#13ce66" off-color="#ff4949" :on-value="1" :off-value="0" on-text="打开" off-text="关闭">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="登录短信开关" prop="need_msg">
          <el-tooltip :content="'当前状态：' + checkSwitchText[configForm.need_msg]" placement="top">
            <el-switch v-model="configForm.need_msg" on-color="#13ce66" off-color="#ff4949" :on-value="1" :off-value="0" on-text="打开" off-text="关闭">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="图片积分" prop="pic_score">
          <el-input v-model.number="configForm.pic_score" placeholder="请输入图片积分（整数）">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="电话积分" prop="phone_score">
          <el-input v-model.number="configForm.phone_score" placeholder="请输入电话积分（整数）">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="图片价格" prop="pic_price">
          <el-input v-model="configForm.pic_price" placeholder="请输入查看图片价格">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="电话价格" prop="phone_price">
          <el-input v-model="configForm.phone_price" placeholder="请输入查看电话价格">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="安卓下载链接" prop="android_url">
          <el-input v-model="configForm.android_url" placeholder="请输入安卓下载链接">
          </el-input>
        </el-form-item>
        <el-form-item label="IOS 下载链接" prop="ios_url">
          <el-input v-model="configForm.ios_url" placeholder="请输入IOS 下载链接">
          </el-input>
        </el-form-item>
        <el-form-item label="分享标题" prop="share_title">
          <el-input v-model="configForm.share_title" placeholder="请输入分享标题">
          </el-input>
        </el-form-item>
        <el-form-item label="分享内容" prop="share_content">
          <el-input v-model="configForm.share_content" placeholder="请输入分享内容">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('configForm')" style="width: 100%;margin-top: 20px;">确定</el-button>
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
      checkSwitchText: ["关闭", "打开"],
      configForm: {
        need_pay: 1,
        show_sign: 1,
        show_qrcode: 1,
        show_share: 1,
        apply: 1,
        need_msg: 1,
        id: "",
        pic_score: null,
        phone_score: null,
        pic_price: "",
        phone_price: null,
        android_url: '',
        ios_url: '',
        share_title:'',
        share_content:''
      },
      dateRange: "",

      rules: {
        pic_score: [
          { required: true, message: "查看图片积分不能为空" },
          { type: "number", message: "查看图片积分必须为数字" }
        ],
        phone_score: [
          { required: true, message: "查看电话积分不能为空" },
          { type: "number", message: "查看电话积分必须为数字" }
        ],
        pic_price: [{ required: true, message: "查看图片价格不能为空" }],
        phone_price: [{ required: true, message: "查看电话价格不能为空" }],
        android_url: [{ required: true, message: "安卓下载链接不能为空" }],
        ios_url: [{ required: true, message: "IOS 下载链接不能为空" }],
        share_title: [{ required: true, message: "分享标题不能为空" }],
        share_content: [{ required: true, message: "分享内容不能为空" }],
      }
    };
  },

  created() {
    this.$api.getConfig(res => {
      this.configForm = res.data.data;
      this.loading = false;
    });
  },

  methods: {
    /*
    * 提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.postConfig(this.configForm, res => {
            this.$message({
              type: "success",
              message: "提交成功",
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
