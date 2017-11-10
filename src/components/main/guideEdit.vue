<style scoped>
.editor-wrap {
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

.form-wrap {
  max-width: 900px;
  margin: 0 auto;
}
</style>

<template>
  <section class="editor-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{'path': '/guidelist'}">用户指南</el-breadcrumb-item>
      <el-breadcrumb-item>指南编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="form-wrap">
      <el-form label-position="top" label-width="80px" :model="guideForm">
        <el-form-item label="名称">
          <el-input v-model="guideForm.title" placeholder="请输入指南名称"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-input v-model.number="guideForm.sort" placeholder="请输入权重排序（数字，最大为10）"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :rows="10" v-model="guideForm.content" placeholder="请输入指南内容"></el-input>
        </el-form-item>
      </el-form>

      <!-- <div class="quill-editor-example">
        <quill-editor ref="myTextEditor" v-model="guideForm.content" :options="editorOption" @ready="onEditorReady($event)">
        </quill-editor>
        <div class="html ql-editor" v-html="guideForm.content"></div>
      </div> -->

      <el-button type="primary" @click="onSubmit()" style="width: 200px;margin: 20px auto 0;display: block;">提交</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      guideForm: {
        title: "",
        content: "",
        sort: "",
        id: ""
      }
      // editorOption: {
      //   placeholder: "在这里输入，下面会同步显示..."
      // }
    };
  },

  created() {
    const guide = this.$route.params.guide;
    if (guide) {
      this.guideForm.title = guide.title;
      this.guideForm.content = guide.content;
      this.guideForm.sort = guide.sort;
      this.guideForm.id = guide.id;
    }
  },
  methods: {
    /*
      提交
    */
    onSubmit() {
      if (this.guideForm.content && this.guideForm.title) {
        this.$api.postGuide(this.guideForm, res => {
          this.$message({
            message: "提交成功",
            showClose: true,
            type: "success"
          });
        });
        this.$router.push('/guidelist');
      } else {
        this.$message({
          message: "名称和内容不能为空！",
          showClose: true,
          type: "warning"
        });
      }
    }
  }

  // computed: {
  //   editor() {
  //     return this.$refs.myTextEditor.quill;
  //   }
  // },

  // mounted() {
  //   console.log("this is my editor", this.editor);
  // },
};
</script>
