<style scoped>
.breadcrumb {
  margin-bottom: 20px;
}

.banner-list {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-list {
  overflow-y: scroll;
  flex: 1;
}

.banner-operation {
  margin-bottom: 20px;
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
  <section class="banner-list">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>广告位</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="banner-operation">
      <el-button type="primary" @click="addAD">新增广告</el-button>
      <el-button type="primary" @click="openAD">开启</el-button>
      <el-button type="warning" @click="closeAD">关闭</el-button>
    </div>
    <div class="table-list">
      <el-table ref="multipleTable" :data="bannerList" border stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelection">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column label="名称" prop="name">
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img v-if="scope.row.img" :src="scope.row.img" alt="点击预览" title="点击预览" style="height: 40px; vertical-align: middle; cursor: pointer;" @click="preImgFnc(scope.row.img)">
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column label="跳转链接" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.link || '暂无'}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" :formatter="statusFnc">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <img :src="preImg" alt="图片">
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

      //图片预览
      isPre: false,
      preImg: '',

      //开启、关闭 暂存
      waittingData: [],

      //数据
      bannerList: [{
        id: 1,
        name: '首页',
        img: 'http://h.hiphotos.baidu.com/image/pic/item/58ee3d6d55fbb2fbecdc13d2464a20a44723dc7f.jpg',
        link: 'https://www.baidu.com',
        status: 0
      }, {
        id: 2,
        name: '签到页',
        img: '',
        link: '',
        status: 1
      }],
      page: 1,
      eachPage: 100,
      count: 1000,
    }
  },

  methods: {

    /*
      状态格式化函数
    */
    statusFnc(row, column, cellValue) {
      return cellValue === 0 ? '开启' : '关闭'
    },

    /*
      新增广告
    */
    addAD() {
      this.$router.push({ name: 'bannerchange', params: { img: null } })
    },

    /*
      多选
    */
    handleSelection(selection) {
      this.waittingData = selection
    },

    /*
      广告打开
    */
    openAD() {
      const length = this.waittingData.length
      if (!length) {
        this.$message({
          message: '请先选择！',
          showClose: true,
          type: 'warning'
        })
      }
      let idGroup = []
      for (let i = 0; i < length; i++) {
        idGroup.push(this.waittingData[i].id)
      }
      console.log(idGroup)
    },

    /*
      广告关闭
    */
    closeAD() {
      const length = this.waittingData.length
      if (!length) {
        this.$message({
          message: '请先选择！',
          showClose: true,
          type: 'warning'
        })
      }
      let idGroup = []
      for (let i = 0; i < length; i++) {
        idGroup.push(this.waittingData[i].id)
      }
      console.log(idGroup)
    },

    /*
    * 图片预览
    */
    preImgFnc(img) {
      console.log(img)
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
      广告名称、图片修改
    */
    handleChange(index, row) {
      this.$router.push({ name: 'bannerchange', params: { img: row } })
    },

    /*
      广告文本编辑
    */
    handleEdit(index, row) {
      this.$router.push({ name: 'banneredit', params: { id: row.id } })
    },

    /*
      广告删除
    */
    handleDelete(index, row) {
      this.$confirm('此操作将删除该 Banner, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.bannerList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    /*
      页数改变
    */
    handleCurrentChange() {

    },

    /*
      每页显示数量改变
    */
    handleSizeChange() {

    },
  }
}
</script>
