<style scoped>
.breadcrumb {
  margin-bottom: 20px;
}

.banner-list {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.table-list {
  overflow: auto;
  flex: 1;
  min-height: 250px;
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
  <section v-else class="banner-list">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>广告位</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="banner-operation">
      <el-button type="primary" @click="addAD">新增广告</el-button>
      <!-- <el-button type="primary" @click="openAD">开启</el-button>
      <el-button type="warning" @click="closeAD">关闭</el-button> -->
    </div>
    <div class="table-list">
      <el-table ref="multipleTable" :data="bannerList" border stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelection">
        <!-- <el-table-column type="selection">
        </el-table-column> -->
        <el-table-column label="类型" prop="type">
          <template slot-scope="scope">
            <span>{{typeText[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" align="center" prop="url">
          <template slot-scope="scope">
            <img v-if="scope.row.url" :src="scope.row.url" alt="点击预览" title="点击预览" style="height: 40px; vertical-align: middle; cursor: pointer;" @click="preImgFnc(scope.row.url)">
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column label="所属城市" prop="city" align="center">
          <template slot-scope="scope">{{scope.row.city?scope.row.city.name:'全部'}}</template>
        </el-table-column>
        <el-table-column label="跳转链接" show-overflow-tooltip prop="link_url">
          <template slot-scope="scope">{{scope.row.link_url || '暂无'}}</template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 1" class="success">开启中</span>
            <span v-else class="warning">已关闭</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
            <el-button v-if="scope.row.state == 0" type="primary" size="small" @click="openAD(scope.$index, scope.row)">开启</el-button>
            <el-button v-else type="danger" size="small" @click="closeAD(scope.$index, scope.row)">关闭</el-button>
            <!-- <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
      loading: true,

      //图片预览
      isPre: false,
      preImg: "",

      stateText: {
        1: "开启",
        0: "关闭"
      },
      typeText: {
        1: "首页",
        2: "签到",
        3: "信息详情"
      },

      //开启、关闭 暂存
      waittingData: [],

      //数据
      bannerList: [
        {
          id: 1,
          name: "首页",
          img:
            "http://h.hiphotos.baidu.com/image/pic/item/58ee3d6d55fbb2fbecdc13d2464a20a44723dc7f.jpg",
          link: "https://www.baidu.com",
          status: 0
        },
        {
          id: 2,
          name: "签到页",
          img: "",
          link: "",
          status: 1
        }
      ],
      page: 1,
      eachPage: 10,
      count: 0
    };
  },

  created() {
    this.$api.getAdverts("", res => {
      this.bannerList = res.data.data;
      this.count = res.data.count;
      this.loading = false;
    });
  },

  methods: {
    /*
      新增广告
    */
    addAD() {
      this.$router.push({ name: "bannerchange", params: { img: null } });
    },

    /*
      多选
    */
    handleSelection(selection) {
      this.waittingData = selection;
    },

    /*
      广告打开
    */
    openAD(index, row) {
      let postData = row;
      postData.state = 1;
      this.$api.postAdvert(postData, res => {
        this.$message({
          type: "success",
          message: "开启成功"
        });
        this.bannerList[index].state = 1;
      });
    },

    /*
      广告关闭
    */
    closeAD(index, row) {
      let postData = row;
      postData.state = 0;
      this.$api.postAdvert(postData, res => {
        this.$message({
          type: "success",
          message: "关闭成功"
        });
        this.bannerList[index].state = 0;
      });
    },

    /*
    * 图片预览
    */
    preImgFnc(img) {
      console.log(img);
      this.isPre = true;
      this.preImg = img;
    },

    /*
    * 预览关闭
    */
    closePreImg() {
      this.isPre = false;
    },

    /* 
      广告名称、图片修改
    */
    handleChange(index, row) {
      this.$router.push({ name: "bannerchange", params: { img: row } });
    },

    /*
      广告文本编辑
    */
    // handleEdit(index, row) {
    //   this.$router.push({ name: "banneredit", params: { id: row.id } });
    // },

    /*
      广告删除
    */
    handleDelete(index, row) {
      this.$operation.tableMessageBox("此操作将删除该广告", () => {
        this.$api.deleteAdvert(row.id, res => {
          this.count--;
          this.bannerList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      });
    },

    /*
      页数改变
    */
    handleCurrentChange(page) {
      this.$api.getAdverts({ page }, res => {
        this.bannerList = res.data.data;
      });
    }
  }
};
</script>
