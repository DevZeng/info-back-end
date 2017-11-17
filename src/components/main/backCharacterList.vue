<style scoped>
.back-character-list {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.banner-operation {
  margin-bottom: 20px;
}

.breadcrumb {
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
  <section v-else class="back-character-list">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="banner-operation">
      <el-button type="primary" @click="addUser">新增分工用户</el-button>
      <el-button type="primary" @click="addCharacter">新增角色</el-button>
      <!-- <el-button type="danger" @click="deleteCharacter">删除</el-button> -->
    </div>

    <div class="table-list">
      <el-table ref="multipleTable" :data="backCharacterList" border stripe tooltip-effect="dark" style="width: 100%">
        <!-- <el-table-column type="selection">
        </el-table-column> -->
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="角色名" prop="display_name">
        </el-table-column>
        <el-table-column prop="perms" label="权限" show-overflow-tooltip :formatter="formatAuthority">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
      waittingData: "",

      page: 1,
      eachPage: 10,
      count: 100,

      backCharacterList: []
    };
  },

  created() {
    this.$api.getRoleList("", res => {
      this.backCharacterList = res.data.data;
      this.count = res.data.count;
      this.loading = false;
    });
  },

  methods: {
    /*
      新增
    */
    addUser() {
      this.$router.push({ name: "backedit", params: { user: null } });
    },
    /*
    * 格式化权限输出
    */
    formatAuthority(row, column, cellValue) {
      const str = cellValue.reduce((sum, value) => {
        return sum + value.display_name + "、";
      }, "");
      return str;
    },

    /*
      新增
    */
    addCharacter() {
      this.$router.push("/backcharacteredit");
    },

    // deleteCharacter() {
    //   if (!this.waittingData.length) {
    //     this.$message({
    //       type: "warning",
    //       message: "请先选择！",
    //       showClose: true
    //     });
    //     return false;
    //   }
    //   this.$confirm("此操作将删除选中的所有角色, 是否继续?", "提示", {
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
    // handleSelection(selection) {
    //   this.waittingData = selection;
    // },

    /*
      编辑
    */
    // handleEdit(index, row) {
    //   this.$router.push({
    //     name: "backcharacteredit",
    //     params: { character: row }
    //   });
    // },

    /*
      删除
    */
    handleDelete(index, row) {
      this.$operation.tableMessageBox("此操作将删除该角色", () => {
        this.$api.deleteCharacter(row.id, res => {
          this.backCharacterList.splice(index, 1);
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
      this.$api.getRoleList({ page: page }, res => {
        this.backCharacterList = res.data.data;
      });
    },

    /*
      每页显示数量改变
    */
    handleSizeChange() {}
  }
};
</script>

