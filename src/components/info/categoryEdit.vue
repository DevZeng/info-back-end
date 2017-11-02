<style scoped>
.editor-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.el-tag {
  height: auto;
  padding: 10px 15px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<template>
  <section class="editor-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>信息处理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{'path': '/categorylist'}">种类和细节</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-position="top" label-width="80px" :model="categoryForm" :rules="rules" ref="categoryForm">
      <el-form-item label="种类名称" prop="name">
        <el-input v-model="categoryForm.name" placeholder="输入种类名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="种类细节" prop="content">
        <el-input type="textarea" v-model="categoryForm.content" placeholder="这里输入种类细节" :autosize="{minRows: 10}"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-tag type="success" :key="tag" v-for="tag in dynamicTags" closable @close="handleClose(tag)">{{tag}}</el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" @click="showInput">新标签</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('categoryForm')" style="width: 200px;margin: 20px auto 0;display: block;">确定</el-button>
      </el-form-item>
    </el-form>

  </section>
</template>

<script>
export default {
  data() {
    return {
      categoryForm: {
        name: "",
        content: ""
      },

      rules: {
        name: [{ required: true, message: "种类名称不能为空" }]
      },

      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    /*
      提交
    */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            type: "success",
            message: "提交成功",
            showClose: true
          });
          this.$router.push("/auditcondition");
        } else {
          this.$message({
            type: "warning",
            message: "信息输入不正确",
            showClose: true
          });
          return false;
        }
      });
    },

    //删除标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    //展示 input 框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    //处理 input 确定
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },

  created() {
    const category = this.$route.params.category;
    if (category) {
      this.categoryForm.name = category.name;
      this.categoryForm.content = category.content;
    }
  }
};
</script>
