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

.audit-list-picker > div {
  margin-right: 20px;
}

.audit-pass-list-expand {
  font-size: 0;
}

.audit-pass-list-expand label {
  width: 90px;
  color: #99a9bf;
}

.audit-pass-list-expand .el-form-item {
  margin-right: 0 !important;
  margin-bottom: 0;
  width: 50%;
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
      <el-breadcrumb-item>提现审核</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="banner-operation">
      <el-button type="primary" @click="addConfig">提现设置</el-button>
      <!-- <el-button type="primary" @click="openAD">开启</el-button>
      <el-button type="warning" @click="closeAD">关闭</el-button> -->
    </div>
    <div class="audit-list-operation">
      <div style="text-align:right;">
        <el-input placeholder="请输入搜索内容" v-model="selectInput" style="margin-bottom: 20px;width: 900px;" @keyup.enter.native="selectSearch">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="用户名" value="username"></el-option>
            <el-option label="用户编号" value="user_id"></el-option>
          </el-select>
          <el-button slot="append" icon="search" @click="selectSearch"></el-button>
        </el-input>
      </div>
      <!-- <div class="audit-list-picker">
         <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市名称" :titles="['已开放城市', '已选择城市']" :button-texts="['取消', '添加']" v-model="searchForm.city" :data="cities">
        </el-transfer> -->
        <!-- <el-date-picker v-model="dateRange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="dateOptions"> -->
        <!-- </el-date-picker> -->
        <!-- <el-select v-model="searchForm.status" filterable placeholder="请选择信息种类">
          <el-option label="种类一" value="1"></el-option>
          <el-option label="种类二" value="0"></el-option>
        </el-select>
        <el-select v-model="searchForm.status" filterable placeholder="请选择信息状态">
          <el-option label="正常" value="1"></el-option>
          <el-option label="已推迟" value="0"></el-option>
        </el-select> -->
        <!-- <el-button type="primary" icon="search" @click="pickerSearch">搜索</el-button> -->
      <!-- </div> --> 
    </div>
    <div class="table-list">
      <el-table ref="multipleTable" :data="auditList" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column type="expand">
          
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column prop="title" label="用户名" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="goToList(scope.row.user_id)">{{scope.row.user.username}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="提现金额">
          <template slot-scope="scope">
            <span>{{scope.row.amount}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="审核人">
          <template slot-scope="scope">
            <span>{{scope.row.checker}} </span>
          </template>
        </el-table-column>        
        <el-table-column prop="username" label="提现时间">
          <template slot-scope="scope">
            <span>{{scope.row.created_at}} </span>
            <!-- <el-button type="text" >{{scope.row.created_at}}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="count" label="提现次数">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope" v-if="scope.row.pass==0">
            <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row)">通过</el-button>
            <el-button size="small" type="danger" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>

    <el-dialog title="拒绝原因" :visible.sync="rejectDialog" center>
      <div style="text-alige: center;">
        <el-select v-model="reason" multiple placeholder="请选择拒绝原因">
          <el-option v-for="item in refuses" :key="item.id" :label="item.title" :value="item.id">
          </el-option>
        </el-select>
        <el-button style="margin-left: 20px;" type="text" @click="getMoreRefuse">{{refuseFlag?'没有了更多原因':'加载更多原因'}}</el-button>
        <el-button style="display:block; margin: 30px auto 0;width: 300px;" type="primary" @click="confirmRefuse">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      rejectDialog: false,

      cityForm: {
        sheng: "",
        shi: "",
        xian: ""
      },
      reason: [],

      refuses: [],
      refusePage: 1,
      refuseFlag: false,
      currentRefuseId: "",
      currentRefuseIndex: "",

      shengs: [],
      shis: [],
      xians: [],

      selectInput: "",
      select: "username",

      searchForm: {
        city_id: ""
      },
      dateRange: "",

      dateOptions: this.$common.dateOptions,

      //页码
      page: 1,
      eachPage: 10,
      count: 0,

      //数据
      auditList: []
    };
  },

  created() {
    this.$api.getUsDistrict("", res => {
      this.shengs = res.data.data;
    });
    this.$api.getUnpassWithdrawList("", res => {
      this.auditList = res.data.data;
      this.count = res.data.count;
      this.loading = false;
    });
    this.$api.getRefuse("", res => {
      this.refuses = res.data.data;
    });
  },

  methods: {
    //用户跳转
    goToUser(id) {
      this.$router.push({ name: "usersingle", params: { id: id } });
    },
    //查看单条信息
    addConfig(row) {
      this.$router.push({
        name: "withdrawConfig",
      });
    },
    goToList(id){
      this.$router.push({
        name: "amountList",
        params: { id: id }
      });
    },
    //确认审核
    confirmRefuse() {
      this.$api.changePass(
        this.currentRefuseId,
        { pass: 2, reason: this.reason },
        res => {
          this.$message({
            type: "success",
            message: "已拒绝"
          });
          this.auditList.splice(this.currentRefuseIndex, 1);
          this.rejectDialog = false;
        }
      );
    },

    //获取审核条件
    getMoreRefuse() {
      this.$api.getRefuse({ page: ++this.refusePage }, res => {
        if (res.data.data.length) {
          this.refuses = [...this.refuses, ...res.data.data];
        } else {
          this.refuseFlag = true;
        }
      });
    },
    /*
    * 省份选择
    */

    selectSheng(id) {
      this.cityForm.shi = "";
      this.cityForm.xian = "";
      this.xians = [];
      this.currentArea = this.shengs[this.cityForm.sheng];
      this.searchForm.city_id = id;
      this.$api.getUsDistrict({ pid: id }, res => {
        this.shis = res.data.data;
      });
    },

    /*
    * 市区选择
    */

    selectShi(id) {
      const shi = this.cityForm.shi;
      if (!shi) {
        return false;
      }
      this.currentArea = this.shis[shi];
      this.searchForm.city_id = id;
      this.$api.getUsDistrict({ pid: id }, res => {
        this.xians = res.data.data;
      });
    },

    /*
    * 县区选择
    */

    selectXian(id) {
      const xian = this.cityForm.xian;
      if (!xian) {
        return false;
      }
      this.currentArea = this.xians[xian];
      this.searchForm.city_id = id;
    },
    /*
    * 用户中心跳转
    */
    handlePeople(index, row) {},

    /*
    * input 搜索
    */
    selectSearch() {
      const getData = {
        [this.select]: this.selectInput
      };
      this.$api.getUnpassWithdrawList(getData, res => {
        this.auditList = res.data.data;
        this.count = res.data.count;
      });
    },

    /*
    * form 搜索
    */
    pickerSearch() {
      let getData = {};
      if (this.dateRange) {
        getData.start = new Date(this.dateRange[0]).toLocaleDateString();
        getData.end = new Date(this.dateRange[1]).toLocaleDateString();
      }
      getData.city_id = this.searchForm.city_id;
      this.$api.getUnpassWithdrawList(getData, res => {
        this.auditList = res.data.data;
        this.count = res.data.count;
      });
    },

    /*
    * 通过
    */
    handlePass(index, row) {
      this.$operation.tableMessageBox("此操作将通过该条提现", () => {
        console.log(row)
        this.$api.passWithdraw(row.id, { pass: 1 }, res => {
          this.$message({
            type: "success",
            message: "已通过!"
          });
          this.auditList.splice(index, 1);
        });
      });
    },

    /*
    * 拒绝
    */
    handleReject(index, row) {
      this.$operation.tableMessageBox("此操作将拒绝该条提现", () => {
        console.log(row)
        this.$api.passWithdraw(row.id, { pass: 2 }, res => {
          this.$message({
            type: "success",
            message: "已拒绝!"
          });
          this.auditList.splice(index, 1);
        });
      });
    },

    /*
    * 当前页数
    */
    handleCurrentChange(page) {
      let getData = {
        page: page
      };
      if (this.selectInput) {
        getData[this.select] = this.selectInput;
      } else {
        getData.city_id = this.searchForm.city_id;
        if (this.dateRange) {
          getData.start = new Date(this.dateRange[0]).toLocaleDateString();
          getData.end = new Date(this.dateRange[1]).toLocaleDateString();
        }
      }
      this.$api.getUnpassWithdrawList(getData, res => {
        this.auditList = res.data.data;
      });
    }
  }
};
</script>
