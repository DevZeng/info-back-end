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
      <el-tooltip :content="'当前选项: ' + payType" placement="top" style="margin-bottom: 20px;">
        <el-switch v-model="payType" off-color="#13ce66" on-value="支付宝" off-value="微信" on-text="支付宝" off-text="微信" :width="80">
        </el-switch>
      </el-tooltip>
      <div class="pay-picker">
        <el-date-picker v-model="dateRange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="dateOptions">
        </el-date-picker>
        <el-select v-model="level" multiple filterable placeholder="请选择会员等级">
          <el-option v-for="item in levels" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市名称" :titles="['已开放城市', '已选择城市']" :button-texts="['取消', '添加']" v-model="city" :data="cities">
        </el-transfer>
        <el-button type="primary" icon="search" @click="pickerSearch">搜索</el-button>
      </div>
    </div>

    <div class="table-list">
      <el-table :data="payList" border :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column label="等级" prop="level" sortable>
          <template slot-scope="scope">{{levels[scope.row.level].name}}</template>
        </el-table-column>
        <el-table-column prop="city" label="城市">
        </el-table-column>
        <el-table-column prop="cost" label="金额（元）">
        </el-table-column>
      </el-table>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    const generateCities = _ => {
      const data = [];
      const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          cities: cities[index]
        });
      });
      return data;
    };
    return {
      loading: true,

      //等级
      levels: this.$common.memberLevels,

      level: "",
      city: "",

      cities: generateCities(),
      city: [],
      filterMethod(query, item) {
        return item.cities.indexOf(query) > -1;
      },

      dateRange: "",
      dateOptions: this.$common.dateOptions,

      //支付类型
      payType: "支付宝",

      payList: [
        {
          id: 1,
          level: 1,
          city: "广州市",
          cost: 1000
        },
        {
          id: 1,
          level: 2,
          city: "上海市",
          cost: 1000
        },
        {
          id: 1,
          level: 1,
          city: "北京市",
          cost: 10100
        },
        {
          id: 1,
          level: 3,
          city: "南昌市",
          cost: 2500
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
    pickerSearch() {}
  }
};
</script>
