<style scoped>
.check-in-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.ql-container .ql-editor {
  min-height: 20em;
  padding-bottom: 1em;
  max-height: 25em;
}

.html {
  height: 9em;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  resize: vertical;
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
    </el-breadcrumb>
    <div class="check-in-form">
      <el-form label-position="top" label-width="80px" :model="shareForm" :rules="rules" ref="shareForm">
        <el-form-item label="活动时间" prop="region">
          <el-date-picker v-model.number="shareForm.region" type="datetimerange" :picker-options="dateRangeOption" placeholder="选择活动时间" align="left" :disabled="shareForm.status == 0">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分享积分" prop="point">
          <el-input v-model.number="shareForm.point" placeholder="请输入每次分享积分" :disabled="shareForm.status == 0">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <div style="font-size: 14px;padding-bottom: 10px;color:#48576a;">分享模版</div>
        <div class="quill-editor-example">
          <!-- quill-editor -->
          <quill-editor ref="myTextEditor" v-model="shareForm.content" :options="editorOption">
          </quill-editor>
          <div class="html ql-editor" v-html="shareForm.content"></div>
        </div>
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
      loading: true,
      shareForm: {
        region: "",
        point: null,
        content: ""
      },
      editorOption: {
        placeholder: "在这里输入分享模版，下面会同步显示..."
      },

      rules: {
        point: [
          { required: true, message: "分析积分不能为空" },
          { type: "number", message: "分析积分必须为数字" }
        ]
      },

      dateRangeOption: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
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
    * 开关切换
    */
    sacnSwitchFnc(value) {},

    /*
    * 提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type: "success",
            message: "提交成功",
            showClose: true
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
