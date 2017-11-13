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
  margin: 0 auto;
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

.single-img {
  height: 200px;
  margin: 0 20px 20px 0;
  cursor: pointer;
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
</style>

<template>
  <section class="wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>信息处理</el-breadcrumb-item>
      <el-breadcrumb-item>审核相关</el-breadcrumb-item>
      <el-breadcrumb-item>信息详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="single-content">
      <div class="single-basic">
        <div class="single-basic-item">姓名： {{info.name || '未实名'}}</div>
        <div class="single-basic-item">昵称：  {{info.username}}</div>
        <div class="single-basic-item">电话号码： {{info.phone}}</div>
        <div class="single-basic-item">价格： {{info.price}}元</div>
        <div class="single-basic-item">QQ： {{info.QQ || '无'}}</div>
        <div class="single-basic-item">微信： {{info.WeChat || '无'}}</div>
        <div class="single-basic-item">地址： {{info.address}}</div>
        <div class="single-basic-item-100">
          种类细节：
          <el-tag v-for="tag in info.descriptions" :key="tag" style="margin: 0 10px 10px 0;">{{tag}}</el-tag>
        </div>
      </div>

      <div class="single-article">
        <div class="single-state">
          <span class="normal" v-if="state == 0">未处理</span>
          <span class="warning" v-else-if="state == 1">已拒绝</span>
          <div v-else>
            <h3 class="warning">这是一条举报信息</h3>
            <p><b>举报原因</b></p>
            <div>
              <el-tag v-for="tag in info.reports" :key="tag" style="margin: 0 10px 10px 0;">{{tag}}</el-tag>
            </div>
            <p><b>举报原因补充</b></p>
            <p>{{info.description}}</p>
          </div>
        </div>
        <div class="single-article-btns">
            <el-button v-if="state == 0" size="small" type="primary" @click="handlePass">通过</el-button>
            <el-button v-else-if="state != 3" size="small" type="danger" @click="handleReject">拒绝</el-button>
            <el-button v-if="state == 3" size="small" type="primary" @click="handle">处理</el-button>
            <el-button v-if="state == 3" size="small" type="warning" @click="handleDelay">延期</el-button>
        </div>
        <h1 class="single-title">{{info.title}}</h1>
        <p class="single-time">发布时间： {{info.created_at}}</p>
        <p class="single-content">{{info.detail}}</p>
        <div class="single-picture">
          <img class="single-img" v-for="(img, index) in info.pictures" :key="img.id" :src="img.url" :alt="title" :title="title" @click="preImg(img)">
        </div>
      </div>
    </div>

    <el-dialog title="图片预览" :visible.sync="preImgFlag">
        <img class="single-img-pre" :src="currentImg" :alt="currentImgName">
    </el-dialog>

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
      info: {},

      preImgFlag: false,
      rejectDialog: false,
      currentImg: "",
      currentImgName: "",
      state: 0,
      refuses: [],
      refusePage: 1,
      refuseFlag: false
    };
  },

  created() {
    this.info = this.$route.params.info;
    this.state = this.$route.params.state;
    this.$api.getRefuse("", res => {
      this.refuses = res.data.data;
    });
  },

  methods: {
    //预览
    preImg(img) {
      this.currentImg = img.url;
      this.preImgFlag = true;
      this.currentImgName = img.title;
    },

    /*
    * 通过
    */
    handlePass() {
      this.$operation.tableMessageBox("此操作将通过该条信息", () => {
        this.$api.changePass(this.info.id, { pass: 1 }, res => {
          this.$message({
            type: "success",
            message: "已通过!"
          });
        });
      });
    },

    /*
    * 拒绝
    */
    handleReject() {
      this.$api.changePass(
        this.info.id,
        { pass: 2, reason: this.reason },
        res => {
          this.$message({
            type: "success",
            message: "已拒绝"
          });
          this.rejectDialog = false;
        }
      );
    },

    /*
    * 处理举报信息
    */
    handle(index, row) {
      this.$operation.tableMessageBox("此操作将处理该举报信息", () => {
        this.$api.changeReport(row.id, res => {
          this.reportList[index].state = 1;
          this.$message({
            type: "success",
            message: "已处理"
          });
        });
      });
    },

    /*
    * 延期处理
    */
    handleDelay(index, row) {
      this.$operation.tableMessageBox("此操作将延期该举报信息", () => {
        this.$api.changeReport(row.id, res => {
          this.reportList[index].state = 2;
          this.$message({
            type: "success",
            message: "已延期"
          });
        });
      });
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
    }
  }
};
</script>
