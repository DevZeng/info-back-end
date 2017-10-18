<style>
.audit-list-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.breadcrumb {
  margin-bottom: 20px;
}

.table-list {
  flex: 1;
  overflow: auto;
}

.audit-list-wrap .el-input-group__prepend {
  width: 200px;
}

.audit-list-operation {
  margin-bottom: 20px;
  text-align: right;
}

.audit-list-picker {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  text-align: left;
}

.audit-list-picker>div {
  margin-right: 20px;
}

.pages {
  text-align: right;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="audit-list-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>信息处理</el-breadcrumb-item>
      <el-breadcrumb-item>审核相关</el-breadcrumb-item>
      <el-breadcrumb-item>未审核列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="audit-list-operation">
      <el-input placeholder="请输入搜索内容" v-model="selectInput" style="margin-bottom: 20px;" @keyup.enter.native="selectSearch">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户名" value="1"></el-option>
          <el-option label="用户编号" value="2"></el-option>
          <el-option label="信息编号编号" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="selectSearch"></el-button>
      </el-input>
      <div class="audit-list-picker">
        <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市名称" :titles="['已开放城市', '已选择城市']" :button-texts="['取消', '添加']" v-model="searchForm.city" :data="cities">
        </el-transfer>
        <el-date-picker v-model="searchForm.dateRange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="dateOptions">
        </el-date-picker>
        <el-select v-model="searchForm.status" filterable placeholder="请选择信息种类">
          <el-option label="种类一" value="1"></el-option>
          <el-option label="种类二" value="0"></el-option>
        </el-select>
        <el-select v-model="searchForm.status" filterable placeholder="请选择信息状态">
          <el-option label="正常" value="1"></el-option>
          <el-option label="已推迟" value="0"></el-option>
        </el-select>
        <el-button type="primary" icon="search" @click="pickerSearch">搜索</el-button>
      </div>
    </div>
    <div class="table-list">
      <el-table ref="multipleTable" :data="auditList" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="audit-list-expand">
              <el-form-item label="用户名">
                <el-button type="text" @click="handlePeople(scope.$index, scope.row)">{{ props.row.user }}</el-button>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column prop="name" label="信息名称">
        </el-table-column>
        <el-table-column prop="type" label="种类">
        </el-table-column>
        <el-table-column prop="create_time" label="发布时间">
        </el-table-column>
        <el-table-column prop="edit" label="发布性质">
          <template slot-scope="scope">{{editText[scope.row.edit]}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{statusText[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row)">通过</el-button>
            <el-button size="small" type="danger" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
            <el-button size="small" type="warning" @click="handleDelay(scope.$index, scope.row)">推迟</el-button>
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
    const generateCities = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          cities: cities[index]
        })
      })
      return data
    }
    return {
      loading: true,

      editText: ['原始', '已修改'],
      statusText: ['正常', '已推迟'],

      selectInput: '',
      select: '1',

      searchForm: {
        status: '',
        dateRange: '',
        city: [],
      },
      cities: generateCities(),
      filterMethod(query, item) {
        return item.cities.indexOf(query) > -1;
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

      //页码
      page: 1,
      eachPage: 10,
      count: 100,

      //数据
      auditList: [{
        id: 1,
        name: '信息一',
        user: '小张',
        type: '种类一',
        create_time: '2017-10-01',
        address: '广州市番禺市桥XX地址XX号',
        edit: '1',
        status: '1'
      }, {
        id: 2,
        name: '信息二',
        user: '李四端',
        type: '种类二',
        create_time: '2017-10-21',
        address: '广州市番禺市桥XX地址XX号',
        edit: '0',
        status: '0'
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
    * 用户中心跳转
    */
    handlePeople(index, row) {

    },

    /*
    * input 搜索
    */
    selectSearch(){
      
    },

    /*
    * form 搜索
    */
    pickerSearch(){

    },

    /*
    * 通过
    */
    handlePass(index, row) {
      this.$confirm('确定通过该条信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已通过!'
        })
        this.auditList.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },

    /*
    * 拒绝
    */
    handleReject(index, row) {
      this.$prompt('请输入不通过原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            if (!instance.inputValue) {
              this.$message({
                type: 'warning',
                message: '回复不能为空',
                showClose: true
              })
              return false
            }
            done()
          } else {
            done()
          }
        }
      }).then(() => {
        this.auditList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '已拒绝'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },

    /*
    * 推迟
    */
    handleDelay(index, row) {
      this.$confirm('确定推迟该条信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已推迟!'
        })
        this.auditList[index].status = 1
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },

    /*
    * 页码条数
    */
    handleSizeChange() {

    },

    /*
    * 当前页数
    */
    handleCurrentChange() {

    },
  }
}
</script>
