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

.banner-operation {
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
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>指南列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="banner-operation">
      <el-button type="primary" @click="addGuide">新增指南</el-button>
      <!-- <el-button type="danger" @click="deleteGuide">删除</el-button> -->
    </div>
    <div class="table-list">
      <el-table ref="multipleTable" :data="guideLists" border stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelection">
        <!-- <el-table-column type="selection">
        </el-table-column> -->
        <el-table-column label="ID" prop="id" sortable>
        </el-table-column>
        <el-table-column label="名称" prop="title">
        </el-table-column>
        <el-table-column label="权重" prop="sort" sortable>
        </el-table-column>
        <el-table-column prop="updated_at" label="更新时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      //全选等待操作
      waittingData: [],

      //数据
      guideLists: [],
      page: 1,
      eachPage: 100,
      count: 1000
    };
  },

  created() {
    this.$api.getGuides(res => {
      this.guideLists = res.data.data;
      this.loading = false;
    });
  },

  methods: {
    /*
        新增
    */
    addGuide() {
      this.$router.push({ name: "guideedit", params: { guide: null } });
    },

    // deleteGuide() {
    //   if (!this.waittingData.length) {
    //     this.$message({
    //       type: "warning",
    //       message: "请先选择！",
    //       showClose: true
    //     });
    //     return false;
    //   }
    //   this.$confirm("此操作将删除选中的所有指南, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },

    /*
        多选
    */
    handleSelection(selection) {
      this.waittingData = selection;
    },

    /*
        编辑
    */
    handleEdit(index, row) {
      this.$router.push({ name: "guideedit", params: { guide: row } });
    },

    /*
        删除
    */
    handleDelete(index, row) {
      this.$operation.tableMessageBox("此操作将删除该指南", () => {
        this.$api.delGuide(row.id, res => {
          this.guideLists.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      });
    }

    /*
        页数改变
    */
    // handleCurrentChange() {},
  }
};
</script>
