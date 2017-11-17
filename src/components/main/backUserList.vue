<style>
.breadcrumb {
  margin-bottom: 20px;
}

.back-list-wrap {
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

.back-list-search {
  margin-top: 20px;
}

.back-list-wrap .el-input-group__prepend {
  width: 200px;
}

.pages {
  text-align: right;
}
</style>


<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="back-list-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>分工列表</el-breadcrumb-item>
      <el-breadcrumb-item>具体权限用户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table-list">
      <el-table ref="multipleTable" :data="backList" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="昵称" prop="username">
        </el-table-column>
        <el-table-column label="名称" prop="name">
        </el-table-column>
        <el-table-column prop="phone" label="手机号">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
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

      //数据
      backList: [],
      page: 1,
      eachPage: 10,
      count: 100
    };
  },

  created() {
    const id = this.$route.params.character.id;
    this.$api.getRoleUserList(id, res => {
      this.backList = res.data.data;
      this.loading = false;
    });
  },

  methods: {
    /*
      删除
    */
    handleDelete(index, row) {
      this.$operation.tableMessageBox("此操作将删除该用户的权限", () => {
        const getData = {
          user_id: row.id
        };
        this.$api.delRoleUser(getData, res => {});
        this.backList.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    }
  }
};
</script>
