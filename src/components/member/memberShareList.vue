<style scoped>
.start-page-list-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.breadcrumb {
  margin-bottom: 20px;
}

.start-page-list-operation {
  margin-bottom: 20px;
}

.table-list {
  min-height: 250px;
  flex: 1;
  overflow: auto;
}
</style>

<template>
  <section v-if="loading" class="loading">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="start-page-list-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item>会员功能</el-breadcrumb-item>
      <el-breadcrumb-item>分享</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="start-page-list-operation">
      <el-button type="primary" @click="addShare">新增分享</el-button>
    </div>

    <div class="table-list">
      <el-table :data="shareList" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID" sortable>
        </el-table-column>
        <el-table-column label="活动时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.start}} 至 {{scope.row.end}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分享积分">
          <template slot-scope="scope">
            <span>{{scope.row.score}} 分</span>
          </template>
        </el-table-column>
        <el-table-column prop="daily_max" label="每天积分上限">
          <template slot-scope="scope">
            <span>{{scope.row.daily_max}} 分</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="H5文本内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="image" label="H5图片链接" show-overflow-tooltip>
          <template slot-scope="scope">
            <a :href="scope.row.image" target="_blank">{{scope.row.image}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="rule" label="APP分享规则">
        </el-table-column>
        <!-- <el-table-column prop="id" label="ID" sortable>
        </el-table-column>
        <el-table-column label="活动时间">
          <template slot-scope="scope">
            <span>{{scope.row.start}} 至 {{scope.row.end}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="签到积分">
          <template slot-scope="scope">
            <span>{{scope.row.number}} 分</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="link_url" label="跳转链接" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="state" label="状态" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.state == 0" class="warning">已过期</span>
            <span v-else class="success">当前活动</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,

      shareList: [],
      count: 10,
      eachPage: 10,
      page: 1
    };
  },

  created() {
    this.$api.getShare("", res => {
      this.shareList = res.data.data;
      this.count = res.data.count;
      this.loading = false;
    });
  },

  methods: {
    /*
      新增
    */
    addShare() {
      this.$router.push({
        name: "membershare"
      });
    },

    /*
    * 页数
    */
    handleCurrentChange(page) {
      this.$api.getShare({ page }, res => {
        this.shareList = res.data.data;
      });
    }
  }
};
</script>
