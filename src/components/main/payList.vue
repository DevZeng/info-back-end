<style>
.report-wrap {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.breadcrumb {
  margin-bottom: 20px;
}

.report-operation {
  margin-bottom: 20px;
  /* text-align: right; */
}

.report-picker {
  /* text-align: right; */
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}


.report-picker>div {
  margin-right: 20px;
}

.report-wrap .table-list {
  flex: 1;
  overflow-y: scroll;
}

.report-wrap .el-input-group__prepend {
  width: 200px;
}
</style>


<template>
  <section class="report-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>举报与申诉</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="report-operation">
      <el-tooltip :content="'当前选项: ' + payType" placement="top" style="margin-bottom: 20px;">
        <el-switch v-model="payType" on-color="" off-color="#13ce66" on-value="支付宝" off-value="微信" on-text="支付宝" off-text="微信" :width="80">
        </el-switch>
      </el-tooltip>
      <div class="report-picker">
        <el-date-picker v-model="dateRange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="dateOptions">
        </el-date-picker>
        <el-select v-model="level" multiple filterable placeholder="请选择会员等级">
          <el-option v-for="item in levels" :key="item" :label="levels[item]" :value="item">
          </el-option>
        </el-select>
        <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市名称" :titles="['已开放城市', '已选择城市']" :button-texts="['取消', '添加']" v-model="city" :data="cities" >
        </el-transfer>
        <el-button type="primary" icon="search" @click="pickerSearch">搜索</el-button>
      </div>
    </div>

    <div class="table-list">
      <el-table :data="payList" border :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column label="等级" prop="level" sortable>
          <template slot-scope="scope">{{levels[scope.row.level]}}</template>
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
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      // const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          // pinyin: pinyin[index]
          cities: cities[index]
        })
      })
      return data
    }
    return {

      //等级
      levels: {
        1: '一星会员',
        2: '二星会员',
        3: '三星会员',
        4: '四星会员',
        5: '五星会员',
      },

      level: '',
      city: '',

      cities: generateCities(),
      city: [],
      filterMethod(query, item) {
        return item.cities.indexOf(query) > -1;
      },

      dateRange: '',
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


      //支付类型
      payType: '支付宝',

      payList: [{
        id: 1,
        level: 1,
        city: '广州市',
        cost: 1000
      }, {
        id: 1,
        level: 2,
        city: '上海市',
        cost: 1000
      }, {
        id: 1,
        level: 1,
        city: '北京市',
        cost: 10100
      }, {
        id: 1,
        level: 3,
        city: '南昌市',
        cost: 2500
      }]
    }
  },

  methods: {

    /*
    * 金额统计
    */
    getSummaries(param) {
      const { columns, data } = param;
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '统计'
          return;
        } else if (column.property === 'cost') {
          const values = data.map(item => Number(item.cost))
          sums[index] = values.reduce((sum, value) => {
            return sum + value
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = '/'
        }
      })

      return sums
    },

    /*
    * 搜索
    */
    pickerSearch() {

    },
  }
}
</script>
