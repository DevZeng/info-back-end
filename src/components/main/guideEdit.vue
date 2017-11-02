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
</style>

<template>
  <section class="editor-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{'path': '/textlist'}">文本列表</el-breadcrumb-item>
      <el-breadcrumb-item>文本编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-position="top" label-width="80px" :model="guideForm">
      <el-form-item label="名称">
        <el-input v-model="guideForm.name"></el-input>
      </el-form-item>
    </el-form>

    <div class="quill-editor-example">
      <!-- quill-editor -->
      <quill-editor ref="myTextEditor" v-model="guideForm.content" :options="editorOption" @ready="onEditorReady($event)">
      </quill-editor>
      <div class="html ql-editor" v-html="guideForm.content"></div>
    </div>

    <el-button type="primary" @click="onSubmit()" style="width: 200px;margin: 20px auto 0;display: block;">提交</el-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      guideForm: {
        name: "",
        content: ""
      },
      editorOption: {
        placeholder: "在这里输入，下面会同步显示..."
      }
    };
  },
  methods: {
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },

    /*
      提交
    */
    onSubmit() {
      if (this.guideForm.content && this.guideForm.name) {
        console.log(this.guideForm.content);
        this.$message({
          message: "提交成功",
          showClose: true,
          type: "success"
        });
        this.$router.go(-1);
      } else {
        this.$message({
          message: "不能为空！",
          showClose: true,
          type: "warning"
        });
      }
    }
  },

  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    }
  },

  mounted() {
    console.log("this is my editor", this.editor);
  },

  created() {
    const guide = this.$route.params.guide;
    if (guide) {
      this.guideForm.name = guide.name;
    }
  }
};
</script>
