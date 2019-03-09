<style scoped>
.part-time-wrap {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.part-time-operation {
  margin-bottom: 20px;
  text-align: right;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.part-time-btn {
  color: #666;
}

.part-time-btn:hover {
  color: #20a0ff;
}

.table-list {
  flex: 1;
  overflow: auto;
}

.pages {
  text-align: right;
}

.pre-img-wrap {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.sub-wrap {
  width: 70%;
  text-align: center;
}

.sub-wrap > img {
  max-width: 100%;
}

.sub-wrap > span {
  position: absolute;
  top: 30px;
  right: 30px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}

.pre-img-wrap.active {
  display: flex;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="part-time-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item>账户流水</el-breadcrumb-item>
    </el-breadcrumb>

    

    <div class="table-list">
      <el-table :data="partTimeList" border style="width: 100%">
        
        <!-- <el-table-column type="selection" width="55">
        </el-table-column> -->
        <!-- <el-table-column label="用户编号" prop="id" sortable> -->
        <!-- </el-table-column>        -->
        <el-table-column prop="created_at" label="时间">
        </el-table-column>
        <el-table-column label="金额" prop="price">
        </el-table-column>
        <el-table-column label="类型" prop="type">
        </el-table-column>
        <el-table-column label="备注" prop="title">
        </el-table-column>
        
  
      </el-table>
    </div>

    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>

    <!-- 图片预览 -->
    <div class="pre-img-wrap" :class="{'active': isPre}">
      <div class="sub-wrap">
        <img :src="preImg" alt="暂无图片">
        <span @click="closePreImg">关闭</span>
      </div>
    </div>
    <!-- /图片预览 -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      isPre: false,
      loading: true,
      preImg: "",

      waittingData: [],

      partTimeType: [
        {
          id: 0,
          name: "未处理"
        },
        {
          id: 1,
          name: "已选中"
        },
        {
          id: 2,
          name: "已延期"
        }
      ],

      searchForm: {
        state: ""
      },

      //页码
      page: 1,
      eachPage: 10,
      count: 0,

      // SwitchText: ["关闭", "打开"],
      // partTimeSwitch: "1",
      // chooseText: ["未选中", "选中"],

      partTimeList: []
    };
  },

  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.$api.getAmountRecords(this.id,'', res => {
      this.partTimeList = res.data.data;
      this.loading = false;
      this.count = res.data.count;
    });
  },

  methods: {

    
    //用户跳转
    goToUser(id){
      this.$router.push({name: 'usersingle', params: {id: id}})
    },


    //筛选
    pickerSearch() {
      console.log(1)
      this.$api.getPartTimes(this.searchForm, res => {
        this.partTimeList = res.data.data;
      });
    },

    /*
    * 图片预览
    */
    preImgFnc(img) {
      this.isPre = true;
      this.preImg = img;
    },

    /*
    * 预览关闭
    */
    closePreImg() {
      this.isPre = false;
    },

    //取消选中
    handleCancel(index, row) {
      this.$api.chagePratTime(row.id, { state: 0 }, res => {
        this.partTimeList[index].state = 0;
        this.$message({
          type: "success",
          message: "已取消选中"
        });
      });
    },

    //选中
    handleChoose(index, row) {
      this.$api.chagePratTime(row.id, { state: 1 }, res => {
        this.partTimeList[index].state = 1;
        this.$message({
          type: "success",
          message: "已选中"
        });
      });
    },

    //延期
    handleDelay(index, row) {
      this.$api.chagePratTime(row.id, { state: 2 }, res => {
        this.partTimeList[index].state = 2;
        this.$message({
          type: "success",
          message: "已延期"
        });
      });
    },

    /*页数*/
    handleCurrentChange(page) {
      const getData = {
        page: page,
        state: this.searchForm.state
      };
      this.$api.getAmountRecords(this.id,getData, res => {
      this.partTimeList = res.data.data;
      this.loading = false;
      this.count = res.data.count;
    });
      
    }
  }
};
</script>
