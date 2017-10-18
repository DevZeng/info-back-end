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
  background-color: rgba(0, 0, 0, .5);
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

.sub-wrap>img {
  max-width: 100%;
}

.sub-wrap>span {
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
      <el-breadcrumb-item>申请兼职</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="part-time-operation">
      <el-tooltip :content="'当前状态：' + SwitchText[partTimeSwitch]" placement="top">
        <el-switch v-model="partTimeSwitch" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0" on-text="打开" off-text="关闭" @change="SwitchFnc">
        </el-switch>
      </el-tooltip>
      <el-button type="primary" @click="chooseAll" style="display: block;margin-top: 20px;">选中</el-button>
    </div>

    <div class="table-list">
      <el-table :data="partTimeList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="昵称">
                <span>{{ props.row.nickname }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="兼职片区">
                <span>{{ props.row.area }}</span>
              </el-form-item>
              <el-form-item label="兼职时间">
                <span>{{ props.row.timeRange }}</span>
              </el-form-item>
              <el-form-item label="回复内容">
                <span>{{ props.row.replay_content || '暂无' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="用户编号" prop="id" sortable>
        </el-table-column>
        <el-table-column label="姓名" prop="name">
        </el-table-column>
        <el-table-column label="电话" prop="phone">
        </el-table-column>
        <el-table-column label="身份证" prop="idCardImg">
          <template slot-scope="scope">
            <el-button type="text" @click="preImgFnc(scope.row.idCardImg)" class="part-time-btn">点击预览</el-button>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" prop="create_time" sortable>
        </el-table-column>
        <el-table-column label="状态" prop="status" sortable>
          <template slot-scope="scope">{{chooseText[scope.row.status]}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleReplay(scope.$index, scope.row)">回复</el-button>
            <el-button size="small" type="primary" @click="handleChoose(scope.$index, scope.row)">选中</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pages">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
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
      preImg: '',

      waittingData: [],

      //页码
      page: 1,
      eachPage: 10,
      count: 100,

      SwitchText: ['关闭', '打开'],
      partTimeSwitch: '1',
      chooseText: ['未选中', '选中'],

      partTimeList: [{
        id: 1,
        nickname: '小猪',
        name: '张毅',
        sex: '男',
        phone: 136125476855,
        area: '广州',
        timeRange: '2017-10-12 ~ 2017-12-05',
        idCardImg: 'http://h.hiphotos.baidu.com/image/pic/item/58ee3d6d55fbb2fbecdc13d2464a20a44723dc7f.jpg',
        create_time: '2017-09-30',
        replay_content: '这是一条回复',
        status: 1,
      }, {
        id: 2,
        nickname: '牛牛',
        name: '陈百强',
        sex: '男',
        phone: 18681245811,
        area: '上海',
        timeRange: '2017-10-12 ~ 2017-12-05',
        idCardImg: '',
        create_time: '2017-09-30',
        replay_content: '',
        status: 0,
      }, {
        id: 3,
        nickname: '瓦伊',
        name: '刘碧峰',
        sex: '女',
        phone: 18651345811,
        area: '北京',
        timeRange: '2017-10-12 ~ 2017-12-05',
        idCardImg: '',
        create_time: '2017-09-30',
        replay_content: '',
        status: 0,
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
    * 切换
    */
    SwitchFnc() {

    },

    /*
    * 选中
    */
    handleSelectionChange(selection) {
      this.waittingData = selection
    },

    /*
    * 选中全部
    */
    chooseAll() {
      const length = this.waittingData.length
      if (!length) {
        this.$message({
          type: 'warning',
          message: '请先选择目标',
          showClose: true
        })
      }

      this.$message({
        type: 'success',
        message: '已全部选中',
        showClose: true
      })
    },

    /*
    * 单个选中
    */
    handleChoose(index, row) {
      this.partTimeList[index].status = 1
    },

    /*
    * 图片预览
    */
    preImgFnc(img) {
      this.isPre = true
      this.preImg = img
    },

    /*
    * 预览关闭
    */
    closePreImg() {
      this.isPre = false
    },

    /*
    * 回复
    */
    handleReplay(index, row) {
      this.$prompt('请输入回复', '提示', {
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
            this.partTimeList[index].replay_content = instance.inputValue
            done()
          } else {
            done()
          }
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: '回复成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },

    /*
    * 页码条数
    */
    handleSizeChange() {

    },

    /*页数*/
    handleCurrentChange() {

    }
  }
}
</script>
