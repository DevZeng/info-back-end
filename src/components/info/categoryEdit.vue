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
  vertical-align: middle;
}

.form-wrap {
  width: 900px;
  margin: 0 auto;
}

.span {
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>

<template>
  <section class="editor-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>信息处理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{'path': '/categorylist'}">种类和细节</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="form-wrap">
      <el-form label-position="top" label-width="80px" :model="categoryForm" :rules="rules" ref="categoryForm">
        <el-form-item label="种类名称" prop="title">
          <el-input v-model="categoryForm.title" placeholder="输入种类名称"></el-input>
        </el-form-item>
        <el-form-item label="权重" prop="sort">
          <el-input v-model.number="categoryForm.sort" placeholder="输入种类权重"></el-input>
        </el-form-item>
        <!-- <el-form-item label="种类细节" prop="desc">
          <el-input type="textarea" v-model="categoryForm.desc" placeholder="这里输入种类细节" :autosize="{minRows: 10}"></el-input>
        </el-form-item> -->
        <el-form-item>
          <div class="span" :key="tag.title" v-for="(tag, index) in dynamicTags">
            <el-tag type="success" closable @close.stop="handleClose(tag)" @click.native="showInputInsert(index)">{{tag.title}}</el-tag>
            <el-input class="input-new-tag" autofocus v-if="currentIndex == index&&inputInsertVisible" v-model="inputInsert" ref="saveInsertTagInput" @keyup.enter.native="handleInputInsert(index)" @blur="handleInputInsert(index)">
            </el-input>
          </div>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" @click="showInput">新标签</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('categoryForm')" style="width: 100%;margin: 20px auto 0;display: block;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      categoryForm: {
        title: "",
        desc: [],
        sort: "",
        id: ""
      },

      inputInsert: "",
      inputInsertVisible: false,
      currentIndex: "",

      dynamicTags: [],
      rules: {
        name: [{ required: true, message: "种类名称不能为空" }]
      },

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
          this.$api.postCategory(this.categoryForm, res => {
            this.$message({
              type: "success",
              message: "提交成功",
              showClose: true
            });
            this.$router.push("/categorylist");
          });
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
      const index = this.categoryForm.desc.indexOf(tag.title);
      this.dynamicTags.splice(index, 1);
      this.categoryForm.desc.splice(index, 1);
    },

    //展示 input 框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    //展示 input 框
    showInputInsert(index) {
      this.inputInsertVisible = true;
      this.currentIndex = index;
    },

    //处理 input 确定
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push({ title: inputValue });
        this.categoryForm.desc.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    //处理 input 插入确定
    handleInputInsert(index) {
      let inputValue = this.inputInsert;
      if (inputValue) {
        this.dynamicTags.splice(index + 1, 0, { title: inputValue });
        this.categoryForm.desc.splice(index + 1, 0, inputValue);
      }
      this.inputInsertVisible = false;
      this.inputInsert = "";
    }
  },

  created() {
    const category = this.$route.params.category;
    if (category) {
      this.categoryForm.title = category.title;
      this.categoryForm.sort = category.sort || "";
      this.categoryForm.id = category.id;
      this.dynamicTags = category.descript;
      this.categoryForm.desc = category.descript.reduce((arr, it) => {
        return arr.concat(it.title);
      }, []);
    }
  }
};
</script>
