<style scoped>
.breadcrumb {
  margin-bottom: 20px;
}

.banner-list {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.table-list {
  overflow: auto;
  flex: 1;
}

.category-list-operation {
  margin-bottom: 20px;
}

.pages {
  text-align: right;
}
</style>


<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="banner-list">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>信息处理</el-breadcrumb-item>
      <el-breadcrumb-item>种类和细节</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="category-list-operation">
      <el-button type="primary" @click="addCategory">添加</el-button>
      <el-button type="danger" @click="deleteAll">删除</el-button>
    </div>
    <div class="table-list">
      <el-table ref="multipleTable" :data="categoryList" border stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelection">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="种类名称" prop="name">
        </el-table-column>
        <el-table-column label="种类细节" prop="content" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">{{scope.row.status == 1 ? '打开':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.status == 1" type="warning" @click="handleClose(scope.$index, scope.row)">关闭</el-button>
            <el-button size="small" v-else type="success" @click="handleOpen(scope.$index, scope.row)">打开</el-button>
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,

      //图片预览
      isPre: false,
      preImg: "",

      //开启、关闭 暂存
      waittingData: [],

      //数据
      categoryList: [
        {
          id: 1,
          name: "条件一",
          content: "这是细节一·····",
          status: 1
        },
        {
          id: 2,
          name: "条件二",
          content: "这是细节二········",
          status: 0
        }
      ],
      page: 1,
      eachPage: 100,
      count: 1000
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
    addCategory() {
      this.$router.push({
        name: "categoryedit",
        params: { category: null }
      });
    },

    /*
      多选
    */
    handleSelection(selection) {
      this.waittingData = selection;
    },

    /*
      删除所有
    */
    deleteAll() {
      const length = this.waittingData.length;
      if (!length) {
        this.$message({
          message: "请先选择！",
          showClose: true,
          type: "warning"
        });
      }
      let idGroup = [];
      for (let i = 0; i < length; i++) {
        idGroup.push(this.waittingData[i].id);
      }
    },
    /*
      编辑
    */
    handleEdit(index, row) {
      this.$router.push({
        name: "categoryedit",
        params: { category: row }
      });
    },

    //关闭
    handleClose(index, row) {
      this.categoryList[index].status = 0;
      this.$message({
        type: "info",
        message: "已关闭",
        showClose: true
      });
    },

    //打开
    handleOpen(index, row) {
      this.categoryList[index].status = 1;
      this.$message({
        type: "info",
        message: "已打开",
        showClose: true
      });
    },

    /*
      删除
    */
    handleDelete(index, row) {
      this.$confirm("此操作将删除该审核条件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.categoryList.splice(index, 1);
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
    },

    /*
      页数改变
    */
    handleCurrentChange() {},

    /*
      每页显示数量改变
    */
    handleSizeChange() {}
  }
};
</script>
