<style scoped>
.check-in-wrap {
  height: 100%;
  padding: 15px;
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
        <el-form-item label="签到开关" prop="status">
          <el-tooltip :content="'当前状态：' + checkSwitchText[checkInForm.status]" placement="top">
            <el-switch v-model="checkInForm.status" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0" on-text="打开" off-text="关闭" @change="checkIn">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="活动时间" prop="region">
          <el-date-picker v-model.number="checkInForm.region" type="datetimerange" :picker-options="dateRangeOption" placeholder="选择活动时间" align="left" :disabled="checkInForm.status == 0">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签到积分" prop="point">
          <el-input v-model.number="checkInForm.point" placeholder="请输入每次签到积分" :disabled="checkInForm.status == 0">
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
      loading: true,
      checkSwitchText: ['关闭', '打开'],
      checkInForm: {
        status: '1',
        region: '',
        point: null,
      },

      rules: {
        point: [
          { required: true, message: '签到积分不能为空' },
          { type: 'number', message: '签到积分必须为数字' }
        ]
      },

      dateRangeOption: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },

  created() {
    setTimeout(() => {
      this.loading = false
    }, 200)
  },

  methods: {
    /*
    * 提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '提交成功',
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
      })
    },
  },
}
</script>
