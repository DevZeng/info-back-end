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
      <el-breadcrumb-item>举报与投诉</el-breadcrumb-item>
      <el-breadcrumb-item>举报原因列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="banner-operation">
      <el-button type="primary" @click="addCondition">添加</el-button>
      <!-- <el-button type="danger" @click="deleteAll">删除</el-button> -->
    </div>
    <div class="table-list">
      <el-table ref="multipleTable" :data="reportTypeList" border stripe tooltip-effect="dark" style="width: 100%">
        <!-- <el-table-column type="selection">
        </el-table-column> -->
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="名称" prop="content">
        </el-table-column>
        <!-- <el-table-column label="详细描述" prop="content" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,

      //开启、关闭 暂存
      waittingData: [],

      //数据
      reportTypeList: [],
      page: 1,
      eachPage: 10,
      count: 0
    };
  },

  created() {
    this.$api.getReportReasons("", res => {
      this.reportTypeList = res.data.data;
      this.count = res.data.count;
      this.loading = false;
    });
  },

  methods: {
    /*
      新增
    */
    addCondition() {
      this.$router.push({
        name: "reporttypeedit",
        params: { report: null }
      });
    },

    /*
      多选
    */
    // handleSelection(selection) {
    //   this.waittingData = selection;
    // },

    /*
      删除所有
    */
    // deleteAll() {
    //   const length = this.waittingData.length;
    //   if (!length) {
    //     this.$message({
    //       message: "请先选择！",
    //       showClose: true,
    //       type: "warning"
    //     });
    //   }
    //   let idGroup = [];
    //   for (let i = 0; i < length; i++) {
    //     idGroup.push(this.waittingData[i].id);
    //   }
    // },
    /*
      编辑
    */
    handleEdit(index, row) {
      this.$router.push({
        name: "reporttypeedit",
        params: { report: row }
      });
    },

    /*
      删除
    */
    handleDelete(index, row) {
      this.$operation.tableMessageBox("此操作将删除该审核条件", () => {
        this.$api.deleteRefuse(row.id, res => {
          this.reportTypeList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      });
    },

    /*
      页数改变
    */
    handleCurrentChange(page) {
      this.$api.getReportReasons({ page }, res => {
        this.reportTypeList = res.data.data;
      });
    }
  }
};
</script>
