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
      <el-breadcrumb-item  @click="goToConfig()">提现设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="check-in-form">
      <el-form label-position="top" label-width="80px" :model="configForm" :rules="rules" ref="configForm">
        <el-form-item label="一周内可提现次数" prop="time_limit">
          <el-input v-model.number="configForm.time_limit" placeholder="">
            <template slot="append">次</template>
          </el-input>
        </el-form-item>
        <el-form-item label="提现审核金额最低" prop="amount_limit">
          <el-input v-model.number="configForm.amount_limit" placeholder="">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="红包手续费比例" prop="amount_ratio">
          <el-input v-model="configForm.amount_ratio" placeholder="">
            <template slot="append">%</template>
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
        time_limit: 0,
        amount_limit: 0,
        amount_ratio: 0
      },
      dateRange: "",
      rules: {
        time_limit: [{ required: true, message: " " }],
        amount_limit: [{ required: true, message: " " }],
        amount_ratio: [{ required: true, message: " " }],
      }
      
    };
  },

  created() {
    this.$api.getwithdrawConfig(res => {
        console.log(res.data.data)
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
          this.$api.postwithdrawConfig(this.configForm, res => {
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
    },
    goToConfig(){
      this.$router.push({
        name: "amountList"
      });
    },
  }
};
</script>
