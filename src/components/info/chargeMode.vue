<style scoped>
.charge-mode-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.table-list {
  min-height: 250px;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="charge-mode-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>信息处理</el-breadcrumb-item>
      <el-breadcrumb-item>信息收费管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="table-list">
      <el-table :data="chargeList" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="mode" label="模式">
          <template slot-scope="scope">
            <span v-if="scope.$index != currentIndex">{{chargeMode[scope.row.mode].name}}</span>
            <el-select v-else v-model="scope.row.mode" placeholder="请选择收费模式">
              <el-option v-for="item in chargeMode" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="收费">
          <template slot-scope="scope">
            <span v-if="scope.$index != currentIndex">{{scope.row.money}} 元</span>
            <el-input v-else placeholder="请输入金额" v-model="scope.row.money">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{statusText[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.$index == currentIndex" type="success" size="small" @click="chargeFinish(scope.$index, scope.row)">完成</el-button>
            <el-button v-else type="primary" size="small" @click="chargeEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status == 1" type="warning" size="small" @click="chargeClose(scope.$index, scope.row)">关闭</el-button>
            <el-button v-else type="primary" size="small" @click="chargeOpen(scope.$index, scope.row)">打开</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: null,
      chargeMode: this.$common.chargeMode,

      statusText: ['关闭', '打开'],

      chargeList: [{
        id: 1,
        name: '图片收费',
        mode: 1,
        money: 21,
        status: 1,
      }, {
        id: 2,
        name: '联系方式收费',
        mode: 0,
        money: 3,
        status: 1,
      }]
    }
  },
  methods: {

    /*
    * 编辑
    */
    chargeEdit(index, row) {
      this.currentIndex = index
    },

    /*
    * 编辑完成
    */
    chargeFinish(index, row) {
      this.currentIndex = null
    },

    /*
    * 关闭
    */
    chargeClose(index, row) {
      this.$confirm('此操作关闭收费, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '关闭成功!'
        })
        this.chargeList[index].status = 0
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },

    /*
    * 打开
    */
    chargeOpen(index, row) {
      this.chargeList[index].status = 1
    }
  }
}
</script>
