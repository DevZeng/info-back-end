<style scoped>
.wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}
.breadcrumb {
  margin-bottom: 20px;
}

.single-content {
  max-width: 900px;
  margin: 0 auto 20px;
}

.single-basic {
  width: 100%;
  background-color: #fbfdff;
  color: #99a9bf;
  padding: 20px;
  border: 1px solid #eee;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.single-basic-item {
  margin-bottom: 20px;
  width: 50%;
}

.single-basic-item-100 {
  width: 100%;
}

.single-title {
  text-align: center;
}

.single-time {
  font-size: 14px;
  color: #666;
}

.inline-block {
  display: inline-block;
  margin: 0 20px 20px 0;
  cursor: pointer;
  text-align: center;
}

.single-img {
  height: 200px;
  margin-top: 10px;
}

.single-img-pre {
  width: 100%;
}

.single-content {
  font-size: 16px;
  word-break: break-all;
}

.single-article-btns {
  text-align: right;
  padding: 10px 20px;
}

.single-list {
  margin-top: 30px;
}
</style>

<template>
  <section class="wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>会员</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>单一用户</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="single-content">
      <div class="single-basic">
        <div class="single-basic-item">姓名： {{info.name || '未实名'}}</div>
        <div class="single-basic-item">昵称：  {{info.username}}</div>
        <div class="single-basic-item">电话号码： {{info.phone}}</div>
        <div class="single-basic-item">会员等级： {{info.level?levels[info.level].name: ''}}</div>
        <div class="single-basic-item">当前积分： {{info.score || 0}}</div>
        <div class="single-basic-item">发布次数： {{info.commodity_count || 0}}</div>
        <div class="single-basic-item">上架次数： {{info.enable_count || 0}}</div>
        <div class="single-basic-item">下架次数： {{info.disable_count || 0}}</div>
        <div class="single-basic-item">地址： {{info.address}}</div>
      </div>

    <div class="single-list">
      <el-table :data="payList" border style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="ID" sortable>
        </el-table-column>
        <el-table-column prop="username" label="用户">
        </el-table-column>
        <el-table-column prop="number" label="订单号">
        </el-table-column>
        <el-table-column prop="pay_type" label="支付类型" sortable>
          <template slot-scope="scope">
            <span class="success" v-if="scope.row.pay_type == 3">微信</span>
            <span class="info" v-else>支付宝</span>
          </template>
        </el-table-column>
        <el-table-column label="会员等级" prop="member.level" sortable>
          <template slot-scope="scope">{{scope.row.member?levels[scope.row.member.level].name:''}}</template>
        </el-table-column>
        <el-table-column prop="title" label="使用方式" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="price" label="金额（元）" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.price}} 元</span>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="支付时间">
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
      info: {},

      levels: this.$common.memberLevels,

      payList: [],
      user_id: "",

      page: 1,
      count: 0,
      eachPage: 10
    };
  },

  created() {
    const id = this.$route.params.id;
    this.user_id = id;
    this.$api.getSingleUser(id, res => {
      this.info = res.data.data;
    });

    this.$api.getPayOrders({ user_id: id }, res => {
      this.payList = res.data.data;
      this.count = res.data.count;
    });
  },

  methods: {
    handleCurrentChange(page) {
      this.$api.getPayOrders({ user_id: this.user_id, page: page }, res => {
        this.payList = res.data.data;
      });
    }
  }
};
</script>
