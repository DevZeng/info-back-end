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

.user-picker>div {
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
      <el-input placeholder="请输入搜索内容" v-model="selectInput" style="margin-bottom: 20px;" @keyup.enter.native="selectSearch">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户名" value="1"></el-option>
          <el-option label="用户编号" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="selectSearch"></el-button>
      </el-input>
      <div class="user-picker">
        <el-select v-model="searchForm.level" multiple filterable placeholder="请选择会员等级" style="text-align: left;">
          <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="searchForm.published" filterable placeholder="是否发布过消息">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
        <el-date-picker v-model="searchForm.dateRange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="dateOptions">
        </el-date-picker>
        <el-button type="primary" icon="search" @click="pickerSearch">搜索</el-button>
      </div>
    </div>

    <div class="table-list">
      <el-table ref="multipleTable" :data="userList" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="名称" prop="name">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称">
        </el-table-column>
        <el-table-column prop="points" label="当前积分">
          <template slot-scope="scope">{{scope.row.points + ' 分'}}</template>
        </el-table-column>
        <el-table-column prop="memberLevel" label="会员等级">
          <template slot-scope="scope">{{levels[scope.row.memberLevel].name}}</template>
        </el-table-column>
        <el-table-column prop="phone" label="电话">
        </el-table-column>
        <el-table-column prop="register_time" label="注册时间">
        </el-table-column>
        <el-table-column prop="publish_times" label="发布次数">
          <template slot-scope="scope">{{scope.row.publish_times + ' 条'}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{scope.row.status == '1'?'已停用':'正常'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button size="small" :type="scope.row.status == '1'?'warning':'primary'" @click="handleStop(scope.$index, scope.row)">{{scope.row.status == '1'?'取消停用':'停用'}}</el-button>
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

      levels: this.$common.memberLevels,

      page: 1,
      eachPage: 10,
      count: 100,

      select: '1',
      selectInput: '',

      searchForm: {
        level: '',
        published: '',
        dateRange: '',
      },

      dateOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },

      //数据
      userList: [{
        id: 1,
        name: '张毅',
        nickname: '小猪',
        points: 123,
        memberLevel: 1,
        phone: 13654165455,
        register_time: '2017-10-01',
        publish_times: 21,
        status: 1,
      }, {
        id: 2,
        name: '张毅',
        nickname: '小猪',
        points: 10,
        memberLevel: 1,
        phone: 13645916223,
        register_time: '2017-10-01',
        publish_times: 2,
        status: 0,
      }],
    }
  },

  created() {
    setTimeout(() => {
      this.loading = false
    }, 200)
  },

  methods: {

    /*
    * 内容搜索
    */
    selectSearch() {

    },

    /*
    * 表单搜索
    */
    pickerSearch() {

    },

    /*
    * 停用
    */
    handleStop(index, row) {
      this.$confirm('此操作将切换用户状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userList[index].status == 1 ? this.userList[index].status = 0 : this.userList[index].status = 1
        this.$message({
          type: 'success',
          message: '切换成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },

    /*
    * 删除
    */
    handleDelete(index, row) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    /*
    * 页码条数
    */
    handleSizeChange() {

    },

    /*
    * 页数
    */
    handleCurrentChange() {

    },
  }
}
</script>
