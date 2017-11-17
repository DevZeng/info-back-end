<style>
.user-wrap {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.user-wrap .el-input-group__prepend {
  width: 200px;
}

.user-operation {
  margin-bottom: 20px;
  text-align: right;
}

.user-picker > div {
  margin-right: 20px;
}

.user-wrap .table-list {
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
  <section v-else class="user-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="user-operation">
      <div class="text-align: right">
        <el-input placeholder="请输入搜索内容" v-model="selectInput" style="margin-bottom: 20px;width: 900px;" @keyup.enter.native="selectSearch">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="用户名" value="username"></el-option>
            <el-option label="用户编号" value="user_id"></el-option>
          </el-select>
          <el-button slot="append" icon="search" @click="selectSearch"></el-button>
        </el-input>
      </div>
      <div class="user-picker">
        <el-select v-model="searchForm.level" filterable placeholder="请选择会员等级" style="text-align: left;">
          <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <!-- <el-select v-model="searchForm.published" filterable placeholder="是否发布过消息">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select> -->
        <el-date-picker v-model="dateRange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="dateOptions">
        </el-date-picker>
        <el-button type="primary" icon="search" @click="pickerSearch">搜索</el-button>
      </div>
    </div>

    <div class="table-list">
      <el-table ref="multipleTable" :data="userList" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column label="ID" prop="id" sortable>
        </el-table-column>
        <el-table-column prop="username" label="昵称">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column label="会员等级" prop="member.level" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.member?levels[scope.row.member.level].name: ''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="当前积分">
          <template slot-scope="scope">{{scope.row.score + ' 分'}}</template>
        </el-table-column>
        <el-table-column prop="commodity_count" label="发布次数">
          <template slot-scope="scope">{{scope.row.commodity_count + ' 次'}}</template>
        </el-table-column>
        <!-- <el-table-column prop="memberLevel" label="会员等级">
          <template slot-scope="scope">{{levels[scope.row.memberLevel].name}}</template>
        </el-table-column> -->
        <el-table-column prop="phone" label="电话">
        </el-table-column>
        <el-table-column prop="created_at" label="注册时间">
        </el-table-column>
        <!-- <el-table-column prop="publish_times" label="发布次数">
          <template slot-scope="scope">{{scope.row.publish_times + ' 条'}}</template>
        </el-table-column> -->
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span class="success" v-if="scope.row.state == 1">正常</span>
            <span class="warning" v-else>已停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state == 1" size="small" type="danger" @click="handleStop(scope.$index, scope.row)">停用</el-button>
            <el-button v-else size="small" type="info" @click="handleNormal(scope.$index, scope.row)">取消停用</el-button>
            <el-button size="small" type="danger" @click="handleChange(scope.$index, scope.row)">更改等级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>

    <el-dialog title="会员等级提升" center :visible.sync="levelUpDialog">
      <el-select v-model="levelUp.level" filterable placeholder="请选择会员等级" style="text-align: left;">
        <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>

      <el-button type="primary" @click="changeLevel">确定</el-button>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,

      levels: this.$common.memberLevels,

      page: 1,
      eachPage: 10,
      count: 0,

      select: "username",
      selectInput: "",

      searchForm: {
        level: ""
      },
      levelUpDialog: false,

      levelUp: {
        level: "",
        user_id: ""
      },
      currentUserIndex: 0,
      currentUser: {},

      dateRange: "",

      dateOptions: this.$common.dateOptions,

      //数据
      userList: []
    };
  },

  created() {
    this.$api.getUserList("", res => {
      this.userList = res.data.data;
      this.count = res.data.count;
      this.loading = false;
    });
  },

  methods: {
    /*
    * 内容搜索
    */
    selectSearch() {
      const getData = {
        [this.select]: this.selectInput
      };
      this.$api.getUserList(getData, res => {
        this.userList = res.data.data;
        this.count = res.data.count;
      });
    },

    /*
    * 表单搜索
    */
    pickerSearch() {
      if (this.dateRange) {
        this.searchForm.start = new Date(this.dateRange[0]);
        this.searchForm.end = new Date(this.dateRange[1]);
      }
      this.$api.getUserList(this.searchForm, res => {
        this.userList = res.data.data;
        this.count = res.data.count;
      });
    },

    /*
    * 停用
    */
    handleStop(index, row) {
      this.$operation.tableMessageBox("此操作将停用该用户账号", () => {
        this.$api.changeUser(row.id, { state: 0 }, res => {
          this.userList[index].state = 0;
          this.$message({
            type: "success",
            message: "已停用!"
          });
        });
      });
    },

    //取消停用
    handleNormal(index, row) {
      this.$operation.tableMessageBox("此操作将取消停用该用户账号", () => {
        this.$api.changeUser(row.id, { state: 1 }, res => {
          this.userList[index].state = 1;
          this.$message({
            type: "success",
            message: "已恢复!"
          });
        });
      });
    },

    /*
    * 更改等级
    */
    handleChange(index, row) {
      // this.$operation.tableMessageBox("此操作将删除该用户", () => {
      //   this.userList.splice(index, 1);
      //   this.$message({
      //     type: "success",
      //     message: "删除成功!"
      //   });
      // });
      this.levelUpDialog = true;
      this.currentUser = row;
      this.currentUserIndex = index;
    },

    changeLevel() {
      this.levelUp.user_id = this.currentUser.id;
      if (this.levelUp.level) {
        this.$api.postLevelUp(this.levelUp, res => {
          this.levelUpDialog = false;
          this.userList[this.currentUserIndex].member.level = this.levelUp.level;
          this.$message({
            type: "success",
            message: "更改成功"
          });
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择会员等级"
        });
      }
    },

    /*
    * 页数
    */
    handleCurrentChange(page) {
      let getData = {
        page: page
      };
      if (this.selectInput) {
        getData[this.select] = this.selectInput;
      } else {
        getData = Object.assign({ page }, this.searchForm);
      }
      this.$api.getUserList(getData, res => {
        this.userList = res.data.data;
      });
    }
  }
};
</script>
