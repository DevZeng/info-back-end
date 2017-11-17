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
      <el-breadcrumb-item>签到</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="check-in-form">
      <el-form label-position="top" label-width="80px" :model="checkInForm" :rules="rules" ref="checkInForm">
        <!-- <el-form-item label="签到开关" prop="status">
          <el-tooltip :content="'当前状态：' + checkSwitchText[checkInForm.status]" placement="top">
            <el-switch v-model="checkInForm.status" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0" on-text="打开" off-text="关闭" @change="checkInFnc">
            </el-switch>
          </el-tooltip>
        </el-form-item> -->
        <el-form-item label="活动时间" prop="dateRange">
          <el-date-picker v-model="dateRange" type="datetimerange" :picker-options="dateRangeOption" placeholder="选择活动时间" align="left">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签到积分" prop="score">
          <el-input v-model.number="checkInForm.score" placeholder="请输入每次签到积分">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('checkInForm')" style="width: 100%;margin-top: 20px;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // checkSwitchText: ["关闭", "打开"],
      checkInForm: {
        id: "",
        // status: "1",
        score: null
      },
      dateRange: "",

      rules: {
        score: [
          { required: true, message: "签到积分不能为空" },
          { type: "number", message: "签到积分必须为数字" }
        ]
      },

      dateRangeOption: this.$common.dateOptions
    };
  },

  methods: {
    /*
    * 开关切换
    */
    // checkInFnc(value) {},

    /*
    * 提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const postData = {
            start: this.dateRange[0],
            end: this.dateRange[1],
            id: this.checkInForm.id,
            score: this.checkInForm.score
          };
          this.$api.postCheckIn(postData, res => {
            this.$message({
              type: "success",
              message: "提交成功",
              showClose: true
            });
            this.$router.push("/membercheckin");
          });
        } else {
          this.$message({
            type: "warning",
            message: "积分不能为空",
            showClose: true
          });
          return false;
        }
      });
    }
  }
};
</script>
