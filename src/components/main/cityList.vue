<style scoped>
.city-list-wrap {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.city-list-operation {
  margin-bottom: 20px;
}

.table-list {
  flex: 1;
  min-height: 250px;
  overflow: auto;
}

.pages {
  text-align: right;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="city-list-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>城市列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="city-list-operation">
      <el-button type="primary" @click="addCity">添加城市</el-button>
    </div>
  
    <div class="table-list">
      <el-table ref="multipleTable" :data="cityList" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="城市名称" prop="name"></el-table-column>
        <el-table-column label="城市坐标" prop="location"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
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
      page: 1,
      eachPage: 10,
      count: 100,

      cityList: [
        {
          id: 1,
          name: "广州",
          location: "(110,123)"
        },
        {
          id: 2,
          name: "北京",
          location: "(131,99)"
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
    * 添加城市
    */
    addCity() {
      this.$router.push("/cityedit");
    },

    /*
    * 删除
    */
    handleDelete(index, row) {
      this.$operation.tableMessageBox("此操作将删除该城市", () => {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.cityList.splice(index, 1);
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

