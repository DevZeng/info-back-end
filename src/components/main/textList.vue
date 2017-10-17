<style scoped>
.text-list-wrap {
  height: 100%;
  padding: 15px;
  overflow-y: scroll;
}

.breadcrumb {
  margin-bottom: 20px;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="text-list-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>文本列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table-list">
      <el-table ref="multipleTable" :data="textList" border stripe tooltip-effect="dark" style="width: 100%">
        <el-table-column label="类型ID" prop="type">
        </el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="更新时间" prop="update_time"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      textList: [
        {
          name: '关于',
          update_time: '2017-10-11',
          type: 1
        },
        {
          name: '使用条款',
          update_time: '2017-10-11',
          type: 2
        },
        {
          name: '充值协议',
          update_time: '2017-10-11',
          type: 3
        },
        {
          name: '常见骗术',
          update_time: '2017-10-11',
          type: 4
        },
        {
          name: '举报原因列表',
          update_time: '2017-10-11',
          type: 5
        },
        {
          name: '申请兼职公告',
          update_time: '2017-10-11',
          type: 6
        },
        {
          name: '会员升级说明',
          update_time: '2017-10-11',
          type: 7
        },
        {
          name: '发布信息图片引导',
          update_time: '2017-10-11',
          type: 8
        },
        {
          name: '发布信息更多详情引导',
          update_time: '2017-10-11',
          type: 9
        },
        {
          name: '请选择查看方式的付费温馨提示',
          update_time: '2017-10-11',
          type: 10
        }
      ]
    }
  },

  created(){
    setTimeout(() => {
      this.loading = false
    }, 200)
  },

  methods: {

    /*
        文本列表编辑
    */
    handleEdit(index, row) {
      this.$router.push({ name: 'textedit', params: { text: row } })
    },

  }
}
</script>
