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
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="banner-operation">
      <el-button type="primary" @click="addUser">新增分工用户</el-button>
      <el-button type="danger" @click="deleteUser">删除</el-button>
      <div class="back-list-search">
        <el-select v-model="currentCharacter" clearable placeholder="请选择权限角色进行搜素" @change="characterSelect">
          <el-option v-for="item in characters" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-input placeholder="请输入搜索内容" v-model="selectInput" style="margin-top: 20px;" @keyup.enter.native="selectSearch">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="用户名" value="1"></el-option>
            <el-option label="用户编号" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="search" @click="selectSearch"></el-button>
        </el-input>
      </div>
    </div>
    <div class="table-list">
      <el-table ref="multipleTable" :data="backList" border stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelection">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="权限角色" prop="character">
        </el-table-column>
        <el-table-column label="名称" prop="name">
        </el-table-column>
        <el-table-column prop="password" label="密码">
        </el-table-column>
        <el-table-column prop="authority" label="权限" show-overflow-tooltip :formatter="formatAuthority">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      //全选等待操作
      waittingData: [],

      currentCharacter: "",
      select: "1",
      selectInput: "",
      characters: [
        {
          id: 1,
          name: "角色一"
        },
        {
          id: 2,
          name: "角色二"
        }
      ],

      //数据
      backList: [],
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
    * 格式化权限输出
    */
    formatAuthority(row, column, cellValue) {
      const str = cellValue.reduce((sum, value) => {
        return sum + this.$common.authorities[value].name + "、";
      }, "");
      return str;
    },

    /*
      新增
    */
    addUser() {
      this.$router.push({ name: "backedit", params: { user: null } });
    },

    deleteUser() {
      if (!this.waittingData.length) {
        this.$message({
          type: "warning",
          message: "请先选择！",
          showClose: true
        });
        return false;
      }
      this.$confirm("此操作将删除选中的所有指南, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
      权限搜索
    */
    characterSelect() {
      console.log(this.currentCharacter);
    },

    selectSearch() {},

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
      this.$router.push({ name: "backedit", params: { user: row } });
    },

    /*
      删除
    */
    handleDelete(index, row) {
      this.$operation.tableMessageBox("此操作将删除该指南", () => {
        this.backList.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!"
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
