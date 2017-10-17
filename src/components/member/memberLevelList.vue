<style scoped>
.member-level-wrap {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.breadcrumb {
  margin-bottom: 20px;
}

.member-level-operation {
  margin-bottom: 20px;
}

.table-list {
  flex: 1;
  overflow-y: scroll;
}

.pages {
  text-align: right;
}
</style>

<template>
  <section class="member-level-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item>会员等级</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="member-level-operation">
      <el-tooltip :content="'当前状态：' + levelSwitchText[levelSwitch]" placement="top">
        <el-switch v-model="levelSwitch" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0" on-text="打开" off-text="关闭" @change="memberLevelSwitchFnc">
        </el-switch>
      </el-tooltip>
      <el-button type="primary" @click="addLevel" style="display: block;margin-top: 20px;">新增等级</el-button>
    </div>

    <div class="table-list">
      <el-table ref="multipleTable" :data="memberLevelList" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="名称" prop="name">
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">{{scope.row.price + ' 元'}}</template>
        </el-table-column>
        <el-table-column prop="cycle" label="有效期">
          <template slot-scope="scope">{{scope.row.cycle + ' 天'}}</template>
        </el-table-column>
        <el-table-column prop="daily_publish" label="每天发布次数">
          <template slot-scope="scope">{{scope.row.daily_publish + ' 条'}}</template>
        </el-table-column>
        <el-table-column prop="monthly_publish" label="总发布次数">
          <template slot-scope="scope">{{scope.row.monthly_publish + ' 条'}}</template>
        </el-table-column>
        <el-table-column label="操作">
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
      levelSwitchText: ['关闭', '打开'],
      levelSwitch: '1',

      page: 1,
      eachPage: 10,
      count: 100,

      memberLevelList: [{
        id: 1,
        name: '等级一',
        price: 3,
        cycle: 30,
        daily_publish: 10,
        monthly_publish: 300,
      }, {
        id: 2,
        name: '等级二',
        price: 6,
        cycle: 30,
        daily_publish: 12,
        monthly_publish: 320,
      }, {
        id: 2,
        name: '等级三',
        price: 9,
        cycle: 30,
        daily_publish: 15,
        monthly_publish: 350,
      }
      ],
    }
  },
  methods: {

    /*
    * 会员开关
    */
    memberLevelSwitchFnc(value) {
      console.log(value)
      this.$message({
        type: 'info',
        message: `当前状态是：${this.levelSwitchText[value]}`,
        showClose: true,
      })
    },

    /*
    * 新增会员
    */
    addLevel() {
      this.$router.push({ name: 'memberleveledit', params: { level: null } })
    },

    /*
    * 页数变化
    */
    handleCurrentChange(currentPage) {

    },

    /*
    * 每页展示数量
    */
    handleSizeChange() {

    },

    /*
    * 编辑
    */
    handleEdit(index, row) {
      this.$router.push({ name: 'memberleveledit', params: { level: row } })
    },

    /*
    * 删除
    */
    handleDelete(index, row) {
      this.$confirm('此操作将删除该等级设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.memberLevelList.splice(index, 1)
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
    }
  }
}
</script>
