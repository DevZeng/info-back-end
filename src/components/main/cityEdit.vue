<style scoped>
.city-edit-wrap {
  height: 100%;
  padding: 15px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 60px;
}

.city-eidt-form {
  /* width: 600px; */
  display: flex;
  justify-content: center;
}
</style>

<template>
  <section class="city-edit-wrap">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/citylist'}">城市列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加</el-breadcrumb-item>
    </el-breadcrumb>
    

    <div class="city-eidt-form">
      <el-form :inline="true" :model="cityForm" class="demo-form-inline">
        <el-form-item label="省份：">
          <el-select v-model="cityForm.sheng" placeholder="请选择省份" @change="selectSheng">
            <el-option v-for="(item,index) in shengs" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市区：">
          <el-select v-model="cityForm.shi" placeholder="请选择市区" @change="selectShi">
            <el-option v-for="(item,index) in shis" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="县区：">
          <el-select v-model="cityForm.xian" placeholder="请选择县区"  @change="selectXian">
            <el-option v-for="(item,index) in xians" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cityForm: {
        sheng: "",
        shi: "",
        xian: ""
      },

      shengs: [],
      shis: [],
      xians: [],

      //存放当前选择区域
      currentArea: null
    };
  },

  created() {
    this.$api.getUsDistrict("", res => {
      this.shengs = res.data.data;
    });
  },

  methods: {
    /*
    * 提交
    */
    onSubmit() {
      console.log(this.currentArea);
    },

    /*
    * 省份选择
    */

    selectSheng(id) {
      this.cityForm.shi = "";
      this.cityForm.xian = "";
      this.xians = [];
      this.currentArea = this.shengs[this.cityForm.sheng];
      this.$api.getUsDistrict({ pid: id }, res => {
        this.shis = res.data.data;
      });
    },

    /*
    * 市区选择
    */

    selectShi(id) {
      const shi = this.cityForm.shi;
      if (!shi) {
        return false;
      }
      this.currentArea = this.shis[shi];
      this.$api.getUsDistrict({ pid: id }, res => {
        this.xians = res.data.data;
      });
    },

    /*
    * 县区选择
    */

    selectXian() {
      const xian = this.cityForm.xian;
      if (!xian) {
        return false;
      }
      this.currentArea = this.xians[xian];
    }
  }
};
</script>


