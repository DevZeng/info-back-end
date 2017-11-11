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
        <div class="single-basic-item">姓名： {{info.name}}</div>
        <div class="single-basic-item">昵称：  {{info.username}}</div>
        <div class="single-basic-item">电话号码： {{info.phone}}</div>
        <div class="single-basic-item">价格： {{info.price}}元</div>
        <div class="single-basic-item">QQ： {{info.QQ || '无'}}</div>
        <div class="single-basic-item">微信： {{info.WeChat || '无'}}</div>
        <div class="single-basic-item">地址： {{info.address}}</div>
      </div>

      <div class="single-article">
        <h1 class="single-title">{{info.title}}</h1>
        <p class="single-time">发布时间： {{info.created_at}}</p>
        <div class="single-picture">
          <img class="single-img" v-for="(img, index) in info.pictures" :key="index" :src="img" alt="图片" @click="preImg(img)">
        </div>
        <p class="single-content">{{info.detail}}</p>
      </div>
    </div>

    <el-dialog title="图片预览" :visible.sync="preImgFlag">
        <img class="single-img-pre" :src="currentImg" alt="图片">
    </el-dialog>

  </section>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      pictures: [
        "http://n.sinaimg.cn/news/20170927/x_sX-fymesmp1710897.jpg",
        "http://img.kemeitu.com/UpImg/FengJing/2016/1115/84484150709261.jpg",
        "https://img1.qunarzz.com/travel/poi/1501/37/3726b30a08c952e2cdb.jpg_r_480x360x95_6bdc567f.jpg"
      ],

      preImgFlag: false,
      currentImg: ""
    };
  },

  created() {
    this.info = this.$route.params.info;
  },

  methods: {
    //预览
    preImg(img) {
      this.currentImg = img;
      this.preImgFlag = true;
    }
  }
};
</script>
