<style scoped>
.start-page-list-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.breadcrumb {
  margin-bottom: 20px;
}

.start-page-list-operation {
  margin-bottom: 20px;
}

.table-list {
  min-height: 250px;
  flex: 1;
  overflow: auto;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="start-page-list-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>信息处理</el-breadcrumb-item>
      <el-breadcrumb-item>启动页面</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="start-page-list-operation">
      <el-button type="primary" @click="addStartPage">添加</el-button>
    </div>

    <div class="table-list">
      <el-table :data="startPageList" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="link" label="跳转链接" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{statusText[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status == 1" type="warning" size="small" @click="chargeClose(scope.$index, scope.row)">关闭</el-button>
            <el-button v-else type="primary" size="small" @click="chargeOpen(scope.$index, scope.row)">打开</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,

      statusText: ["关闭", "打开"],

      startPageList: [
        {
          id: 1,
          name: "启动页一",
          link: "http://www.test.com",
          status: 1
        },
        {
          id: 2,
          name: "启动页二",
          link: "http://www.test.com",
          status: 1
        }
      ]
    };
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, 200);
  },

  methods: {
    /*
      新增
    */
    addStartPage() {
      this.$router.push({
        name: "startpageedit",
        params: { startPage: null }
      });
    },

    /*
    * 编辑
    */
    handleEdit(index, row) {
      this.$router.push({ name: "startpageedit", params: { startPage: row } });
    },

    /*
    * 关闭
    */
    chargeClose(index, row) {
      this.$confirm("此操作关闭关闭该启动页, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "warning",
            message: "已关闭"
          });
          this.startPageList[index].status = 0;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    /*
    * 打开
    */
    chargeOpen(index, row) {
      this.$message({
        type: "success",
        message: "打开成功!"
      });
      this.startPageList[index].status = 1;
    },

    /*
      删除
    */
    handleDelete(index, row) {
      this.$confirm("此操作将删除该启动页面条件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.startPageList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
