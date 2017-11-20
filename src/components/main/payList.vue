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
      <el-breadcrumb-item>支付</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="pay-operation">
      <!-- <el-tooltip :content="'当前选项: ' + pay_type" placement="top" style="margin-bottom: 20px;">
        <el-switch v-model="pay_type" off-color="#13ce66" on-value="支付宝" off-value="微信" on-text="支付宝" off-text="微信" :width="80">
        </el-switch>
      </el-tooltip> -->
      <div class="pay-picker">
        <el-select v-model="searchForm.pay_type" placeholder="请选择类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="积分" value="1"></el-option>
          <el-option label="支付宝" value="2"></el-option>
          <el-option label="微信" value="3"></el-option>
        </el-select>
        <el-date-picker v-model="dateRange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="dateOptions">
        </el-date-picker>
        <el-select v-model="searchForm.level" multiple filterable placeholder="请选择会员等级">
          <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <!-- <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市名称" :titles="['已开放城市', '已选择城市']" :button-texts="['取消', '添加']" v-model="city" :data="cities">
        </el-transfer> -->
        <el-button type="primary" icon="search" @click="pickerSearch">搜索</el-button>
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
        <el-table-column prop="number" label="订单号">
        </el-table-column>
        <el-table-column prop="pay_type" label="支付类型" sortable>
          <template slot-scope="scope">
            <span class="success" v-if="scope.row.pay_type == 3">微信</span>
            <span class="info" v-else-if="scope.row.pay_type == 2">支付宝</span>
            <span class="normal" v-else>积分</span>
          </template>
        </el-table-column>
        <el-table-column label="会员等级" prop="member.level" sortable>
          <template slot-scope="scope">{{scope.row.member?levels[scope.row.member.level].name:''}}</template>
        </el-table-column>
        <el-table-column prop="title" label="使用方式" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="price" label="金额（元）" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.price}} 元</span>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="支付时间">
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

      //等级
      levels: this.$common.memberLevels,

      city: [],

      dateOptions: this.$common.dateOptions,

      payList: []
    };
  },

  created() {
    this.$api.getPayOrders("", res => {
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
      const getData = Object.assign({}, this.searchForm, { page });
      this.$api.getPayOrders(getData, res => {
        this.payList = res.data.data;
      });
    }
  }
};
</script>
