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
            <el-option v-for="(item,index) in shengs" :key="item.id" :label="item.fullname" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市区：">
          <el-select v-model="cityForm.shi" placeholder="请选择市区" @change="selectShi">
            <el-option v-for="(item,index) in shis" :key="item.id" :label="item.fullname" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="县区：">
          <el-select v-model="cityForm.xian" placeholder="请选择县区"  @change="selectXian">
            <el-option v-for="(item,index) in xians" :key="item.id" :label="item.fullname" :value="index"></el-option>
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
    this.$api.getDistrict(null, (err, data) => {
      if (err) {
        this.$alert(err.message, "错误");
        return false;
      }
      this.shengs = data.result[0];
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

    selectSheng() {
      this.cityForm.shi = "";
      this.cityForm.xian = "";
      this.xians = [];
      this.currentArea = this.shengs[this.cityForm.sheng];
      this.$api.getDistrict(this.currentArea.id, (err, data) => {
        if (err) {
          this.$alert(err.message, "错误");
          return false;
        }
        this.shis = data.result[0];
      });
    },

    /*
    * 市区选择
    */

    selectShi() {
      const shi = this.cityForm.shi;
      if (!shi) {
        return false;
      }
      this.currentArea = this.shis[shi];
      this.$api.getDistrict(this.currentArea.id, (err, data) => {
        if (err) {
          this.$alert(err.message, "错误");
          return false;
        }
        this.xians = data.result[0];
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


