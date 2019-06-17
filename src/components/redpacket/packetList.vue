<style>
.report-wrap {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.pay-operation {
  margin-bottom: 20px;
}

.pay-picker {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.pay-picker > div {
  margin-right: 20px;
}

.report-wrap .table-list {
  flex: 1;
  overflow: auto;
}

.report-wrap .el-input-group__prepend {
  width: 200px;
}

.table-list {
  flex: 1;
}

.pages {
  text-align: right;
}
</style>


<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="report-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>红包管理</el-breadcrumb-item>
      <el-breadcrumb-item>审核相关</el-breadcrumb-item>
      <el-breadcrumb-item>审核通过列表</el-breadcrumb-item>
      <el-breadcrumb-item>红包详细流水</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="pay-operation">
      <!-- <el-tooltip :content="'当前选项: ' + pay_type" placement="top" style="margin-bottom: 20px;">
        <el-switch v-model="pay_type" off-color="#13ce66" on-value="支付宝" off-value="微信" on-text="支付宝" off-text="微信" :width="80">
        </el-switch>
      </el-tooltip> -->
      <div class="pay-picker">
    
      </div>
    </div>

    <div class="table-list">
      <el-table :data="payList" border style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="ID" sortable>
        </el-table-column>
        <el-table-column prop="username" label="用户">
          <template slot-scope="scope">
            <el-button type="text" @click="goToUser(scope.row.user_id)">{{scope.row.username}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="金额（元）" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.price}} 元</span>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="领取时间">
        </el-table-column>
      </el-table>
    </div>

    <div class="pages">
      <el-pagination  @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,

      searchForm: {
        level: "",
        pay_type: "",
        start: "",
        end: ""
      },
      dateRange: "",

      count: 0,
      page: 1,
      eachPage: 10,
      id:0,

      //等级
      levels: this.$common.memberLevels,

      city: [],

      dateOptions: this.$common.dateOptions,

      payList: []
    };
  },

  created() {
    const id = this.$route.params.id;
    this.id = id;
    this.$api.getRedpacketList(id, res => {
      this.payList = res.data.data;

        this.count = res.data.count;
      this.loading = false;
    });
  },


  methods: {
    //用户跳转
    goToUser(id) {
      this.$router.push({ name: "usersingle", params: { id: id } });
    },
    /*
    * 金额统计
    */
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "统计";
          return;
        } else if (column.property === "cost") {
          const values = data.map(item => Number(item.cost));
          sums[index] = values.reduce((sum, value) => {
            return sum + value;
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "/";
        }
      });

      return sums;
    },

    /*
    * 搜索
    */
    pickerSearch() {
      if (this.dateRange) {
        this.searchForm.start = new Date(
          this.dateRange[0]
        ).toLocaleDateString();
        this.searchForm.end = new Date(this.dateRange[1]).toLocaleDateString();
      }
      this.$api.getPayOrders(this.searchForm, res => {
        this.payList = res.data.data;
        this.count = res.data.count;
      });
    },

    //页码改变
    handleCurrentChange(page) {
      const getData = this.id+'/page='+page;
      this.$api.getRedpacketList(getData, res => {
      this.payList = res.data.data;
    });
    }
  }
};
</script>
