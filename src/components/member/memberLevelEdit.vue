<style scoped>
.level-edit-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 60px;
}

.level-edit-form {
  width: 600px;
  margin: 0 auto;
}
</style>

<template>
  <section class="level-edit-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item :to="{'path': '/memberlevellist'}">会员等级</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="level-edit-form">
      <el-form label-position="top" label-width="80px" :model="levelForm" :rules="rules" ref="levelForm">
        <el-form-item label="会员等级" prop="level">
          <el-select v-model="levelForm.level" placeholder="请选择会员等级">
            <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员名称" prop="title">
          <el-input v-model="levelForm.title" placeholder="请输入会员显示名称">
          </el-input>
        </el-form-item>
        <el-form-item label="会员价格" prop="price">
          <el-input v-model.number="levelForm.price" placeholder="请输入会员价格（元）">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="有效期" prop="time">
          <el-input v-model.number="levelForm.time" placeholder="请输入会员有效期（天）">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="每天发布信息次数" prop="send_daily">
          <el-input v-model.number="levelForm.send_daily" placeholder="请输入每天发布信息次数（条）">
            <template slot="append">条</template>
          </el-input>
        </el-form-item>
        <el-form-item label="总发布信息次数" prop="send_max">
          <el-input v-model.number="levelForm.send_max" placeholder="请输入总发布信息次数（条）">
            <template slot="append">条</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('levelForm')" style="width: 100%;margin-top: 10px;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      levels: this.$common.memberLevels,
      levelForm: {
        level: null,
        price: "",
        time: "",
        send_daily: "",
        send_max: ""
      },
      rules: {
        level: [{ required: true, message: "请选择会员等级" }],
        title: [{ required: true, message: "请填写会员名称" }],
        price: [
          { required: true, message: "请填写会员价格" },
          { type: "number", message: "价格必须为数值" }
        ],
        time: [
          { required: true, message: "请填写会员有效期" },
          { type: "number", message: "有效期必须为数值" }
        ],
        send_daily: [
          { required: true, message: "请填写会员每天发布信息次数" },
          { type: "number", message: "该值必须为数值" }
        ],
        send_max: [
          { required: true, message: "请填写会员总发布信息次数" },
          { type: "number", message: "该值必须为数值" }
        ]
      }
    };
  },
  methods: {
    /*
    * 提交
    */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.memberLevelEdit(this.levelForm, () => {
            this.$message({
              type: "success",
              message: "提交成功",
              showClose: true
            });
            this.$router.push("/memberlevellist");
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
