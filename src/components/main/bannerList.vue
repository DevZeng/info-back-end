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
        <el-table-column prop="img" label="图片">
        </el-table-column>
        <el-table-column prop="link" label="跳转链接" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="status" label="状态" :formatter="statusFnc">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
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
  </section>
</template>

<script>
export default {
  data() {
    return {

      //开启、关闭 暂存
      waittingData: [],

      //数据
      bannerList: [{
        id: 1,
        name: '首页',
        img: '',
        link: '',
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
    addAD(){
      this.$router.push({name: 'bannerchange', params: {img: null}})
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
      let idGroup = []
      for (let i = 0; i < this.waittingData.length; i++) {
        idGroup.push(this.waittingData[i].id)
      }
      console.log(idGroup)
    },

    /*
      广告关闭
    */
    closeAD() {
      let idGroup = []
      for (let i = 0; i < this.waittingData.length; i++) {
        idGroup.push(this.waittingData[i].id)
      }
      console.log(idGroup)
    },
    /* 
      广告名称、图片修改
    */
    handleChange(index, row) {
      this.$router.push({name: 'bannerchange', params: {img: row}})
    },

    /*
      广告文本编辑
    */
    handleEdit() {

    },

    /*
      广告删除
    */
    handleDelete() {

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
