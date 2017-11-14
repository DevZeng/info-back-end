<style scoped>
.member-level-wrap {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.member-level-operation {
  margin-bottom: 20px;
}

.table-list {
  flex: 1;
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
  <section v-else class="member-level-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item>会员等级</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="member-level-operation">
      <!-- <el-tooltip :content="'当前状态：' + levelSwitchText[levelSwitch]" placement="top">
        <el-switch v-model="levelSwitch" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0" on-text="打开" off-text="关闭" @change="memberLevelSwitchFnc">
        </el-switch>
      </el-tooltip> -->
      <el-button type="primary" @click="addLevel" style="display: block;margin-top: 20px;">新增等级</el-button>
    </div>

    <div class="table-list">
      <el-table ref="multipleTable" :data="memberLevelList" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column label="ID" prop="id" sortable>
        </el-table-column>
        <el-table-column label="等级" prop="level" sortable>
          <template slot-scope="scope">
            <span>{{levelsText[scope.row.level].name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="description">
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">{{scope.row.price + ' 元'}}</template>
        </el-table-column>
        <el-table-column prop="time" label="有效期">
          <template slot-scope="scope">{{(scope.row.time / 3600) + ' 时'}}</template>
        </el-table-column>
        <el-table-column prop="send_daily" label="每天发布次数">
          <template slot-scope="scope">{{scope.row.send_daily + ' 条'}}</template>
        </el-table-column>
        <el-table-column prop="send_max" label="总发布次数">
          <template slot-scope="scope">{{scope.row.send_max + ' 条'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!-- 
    <div class="pages">
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
      levelSwitchText: ["关闭", "打开"],
      levelSwitch: "1",
      levelsText: this.$common.memberLevels,

      // page: 1,
      // eachPage: 10,
      // count: 100,

      memberLevelList: []
    };
  },

  created() {
    this.$api.memberLevelList(res => {
      this.memberLevelList = res.data.data;
      this.loading = false;
    });
  },
  methods: {
    /*
    * 会员开关
    */
    memberLevelSwitchFnc(value) {
      this.$message({
        type: "info",
        message: `当前状态是：${this.levelSwitchText[value]}`,
        showClose: true
      });
    },

    /*
    * 新增会员
    */
    addLevel() {
      this.$router.push({ name: "memberleveledit", params: { level: null } });
    },

    /*
    * 页数变化
    */
    // handleCurrentChange(currentPage) {},

    /*
    * 每页展示数量
    */
    // handleSizeChange() {},

    /*
    * 编辑
    */
    handleEdit(index, row) {
      this.$router.push({ name: "memberleveledit", params: { level: row } });
    },

    /*
    * 删除
    */
    handleDelete(index, row) {
      this.$operation.tableMessageBox("此操作将删除该等级设置", () => {
        this.$api.memberLevelDelete(row.id, res => {
          this.memberLevelList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      });
    }
  }
};
</script>
