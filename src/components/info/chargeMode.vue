<style scoped>
.charge-mode-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.charge-mode-operation {
  margin-bottom: 20px;
}

.table-list {
  min-height: 250px;
  overflow: auto;
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

    <div class="charge-mode-operation">
      <el-tooltip :content="'当前状态：' + switchText[chargeSwitch]" placement="top">
        <el-switch v-model="chargeSwitch" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0" on-text="打开" off-text="关闭" @change="chargeModeSwitchFnc">
        </el-switch>
      </el-tooltip>
    </div>

    <div class="table-list">
      <el-table :data="chargeList" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <!-- <el-table-column prop="mode" label="模式">
          <template slot-scope="scope">
            <span v-if="scope.$index != currentIndex">{{chargeMode[scope.row.mode].name}}</span>
            <el-select v-else v-model="scope.row.mode" placeholder="请选择收费模式">
              <el-option v-for="item in chargeMode" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column> -->
        <el-table-column prop="money" label="金额">
          <template slot-scope="scope">
            <span v-if="scope.$index != currentIndex">{{scope.row.money}} 元</span>
            <el-input v-else placeholder="请输入金额" v-model="scope.row.money">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="points" label="积分">
          <template slot-scope="scope">
            <span v-if="scope.$index != currentIndex">{{scope.row.points}} 分</span>
            <el-input v-else placeholder="请输入积分" v-model="scope.row.points">
              <template slot="append">分</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{statusText[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.$index == currentIndex" type="success" size="small" @click="chargeFinish(scope.$index, scope.row)">完成</el-button>
            <el-button v-else type="primary" size="small" @click="chargeEdit(scope.$index, scope.row)">编辑</el-button>
            <!-- <el-button v-if="scope.row.status == 1" type="warning" size="small" @click="chargeClose(scope.$index, scope.row)">关闭</el-button>
            <el-button v-else type="primary" size="small" @click="chargeOpen(scope.$index, scope.row)">打开</el-button> -->
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
      loading: true,
      currentIndex: null,
      chargeMode: this.$common.chargeMode,
      switchText: ["关闭", "打开"],

      chargeSwitch: "1",
      statusText: ["关闭", "打开"],

      chargeList: [
        {
          id: 1,
          name: "图片收费",
          mode: 1,
          money: 21,
          points: 11,
          status: 1
        },
        {
          id: 2,
          name: "联系方式收费",
          mode: 0,
          money: 3,
          points: 11,
          status: 1
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
    * 会员开关
    */
    chargeModeSwitchFnc(value) {
      console.log(value);
      this.$message({
        type: "info",
        message: `当前状态是：${this.switchText[value]}`,
        showClose: true
      });
    },

    /*
    * 编辑
    */
    chargeEdit(index, row) {
      this.currentIndex = index;
    },

    /*
    * 编辑完成
    */
    chargeFinish(index, row) {
      this.currentIndex = null;
    },

    /*
    * 关闭
    */
    // chargeClose(index, row) {
    //   this.$operation.tableMessageBox("此操作关闭收费", () => {
    //     this.$message({
    //       type: "success",
    //       message: "关闭成功!"
    //     });
    //     this.chargeList[index].status = 0;
    //   });
    // },

    /*
    * 打开
    */
    // chargeOpen(index, row) {
    //   this.chargeList[index].status = 1;
    // }
  }
};
</script>
