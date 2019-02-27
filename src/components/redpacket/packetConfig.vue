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
      <el-breadcrumb-item>红包管理</el-breadcrumb-item>
      <el-breadcrumb-item>红包设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="check-in-form">
      <el-form label-position="top" label-width="80px" :model="configForm" :rules="rules" ref="configForm">
        <el-form-item label="抢红包开关" prop="state">
          <el-tooltip :content="'当前状态：' + checkSwitchText[configForm.state]" placement="top">
            <el-switch v-model="configForm.state" on-color="#13ce66" off-color="#ff4949" :on-value="1" :off-value="0" on-text="打开" off-text="关闭">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="抢红包活动时长最长" prop="cash_max_day">
          <el-input v-model.number="configForm.cash_max_day" placeholder="">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="抢红包活动时长最短" prop="cash_min_day">
          <el-input v-model.number="configForm.cash_min_day" placeholder="">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券有效期最长" prop="coupon_max_day">
          <el-input v-model="configForm.coupon_max_day" placeholder="">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券有效期最短" prop="coupon_min_day">
          <el-input v-model="configForm.coupon_min_day" placeholder="">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="现金红包收费百分比" prop="cash_ratio">
          <el-input v-model="configForm.cash_ratio" placeholder="">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="现金红包单个最大" prop="cash_price_max">
          <el-input v-model="configForm.cash_price_max" placeholder="">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="现金红包单个最小" prop="cash_price_min">
          <el-input v-model="configForm.cash_price_min" placeholder="">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="现金红包总额最高" prop="cash_total_max">
          <el-input v-model="configForm.cash_total_max" placeholder="">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="现金红包总额最低" prop="cash_total_min">
          <el-input v-model="configForm.cash_total_min" placeholder="">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="现金红包个数最高" prop="cash_number_max">
          <el-input v-model="configForm.cash_number_max" placeholder="">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
        <el-form-item label="现金红包个数最低" prop="cash_number_min">
          <el-input v-model="configForm.cash_number_min" placeholder="">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券收费百分比" prop="coupon_ratio">
          <el-input v-model="configForm.coupon_ratio" placeholder="">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券单个最大" prop="coupon_price_max">
          <el-input v-model="configForm.coupon_price_max" placeholder="">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券单个最小" prop="coupon_price_min">
          <el-input v-model="configForm.coupon_price_min" placeholder="">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券总额最高" prop="coupon_total_max">
          <el-input v-model="configForm.coupon_total_max" placeholder="">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券总额最低" prop="coupon_total_min">
          <el-input v-model="configForm.coupon_total_min" placeholder="">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券个数最高" prop="coupon_number_max">
          <el-input v-model="configForm.coupon_number_max" placeholder="">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠券个数最低" prop="coupon_number_min">
          <el-input v-model="configForm.coupon_number_min" placeholder="">
            <template slot="append">个</template>
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
        cash_max_day: 0,
        cash_min_day: 0,
        cash_number_max: 0,
        cash_number_min: 0,
        cash_price_max: 0,
        cash_price_min: 0,
        cash_ratio: 0,
        cash_total_max: 0,
        cash_total_min: 0,
        coupon_max_day: 0,
        coupon_min_day: 0,
        coupon_number_max: 0,
        coupon_number_min: 0,
        coupon_price_max: 0,
        coupon_price_min: 0,
        coupon_ratio: 0,
        coupon_total_max: 0,
        coupon_total_min: 0,
        state: 1
      },
      dateRange: "",
      rules: {
        cash_max_day: [{ required: true, message: " " }],
        cash_min_day: [{ required: true, message: " " }],
        cash_number_max: [{ required: true, message: " " }],
        cash_number_min: [{ required: true, message: "   " }],
        cash_price_max: [{ required: true, message: " " }],
        cash_price_min: [{ required: true, message: " " }],
         cash_ratio: [{ required: true, message: " " }],
        cash_total_max: [{ required: true, message: " " }],
        cash_total_min: [{ required: true, message: " " }],
        coupon_max_day: [{ required: true, message: "" }],
        coupon_min_day: [{ required: true, message: "" }],
        coupon_number_max: [{ required: true, message: "" }],
        coupon_number_min: [{ required: true, message: "" }],
        coupon_price_max: [{ required: true, message: "" }],
        coupon_price_min: [{ required: true, message: "" }],
        coupon_ratio: [{ required: true, message: "" }],
        coupon_total_max: [{ required: true, message: "" }],
        coupon_total_min: [{ required: true, message: "" }],
        state: [{ required: true, message: "" }]
      }
      
    };
  },

  created() {
    this.$api.getredpacketConfig(res => {
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
          this.$api.postredpacketConfig(this.configForm, res => {
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
