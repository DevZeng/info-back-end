<style>
#root {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */

#header {
  height: 64px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #324157;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-staff {
  cursor: pointer;
  color: #fff;
}

.header-staff .welcome {
  margin-right: 20px;
}

/* 内容样式 */

#content {
  flex: 1;
  position: relative;
}

.flex-bug {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
}

.nav-wrap {
  height: 100%;
  background-color: #324157;
  overflow: auto;
}

.nav-wrap-ul {
  width: 200px;
}

.content-router {
  height: 100%;
  flex: 1;
  overflow: hidden;
}

.loading {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading i {
  font-size: 30px;
}

.el-table__body-wrapper {
  overflow: hidden !important;
}

/* 底部样式 */

#footer {
  background-color: #324157;
  color: #fff;
  text-align: center;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>

<template>
  <div id="root">

    <!-- 头部 -->
    <header id="header">
      <div class="header-logo">Logo</div>
      <el-dropdown class="header-staff">
        <span class="el-dropdown-link">
          <i class="welcome">欢迎</i> SHINING</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
    <!-- /头部 -->

    <!-- 内容 -->
    <section id="content">
      <div class="flex-bug">
        <!-- 导航 -->
        <nav class="nav-wrap">
          <el-menu :default-active="routerActive" class="nav-wrap-ul" theme="dark" :unique-opened="true" :router="true">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>首页
              </template>
              <el-menu-item-group>
                <el-menu-item v-if="role.logo" index="/logoedit">LOGO</el-menu-item>
                <el-menu-item v-if="role.advert" index="/bannerlist">广告位</el-menu-item>
                <el-menu-item v-if="role.article" index="/textlist">文本表</el-menu-item>
                <el-menu-item v-if="role.guide" index="/guidelist">用户指南</el-menu-item>
                <!-- <el-menu-item index="/citylist">城市列表</el-menu-item> -->
              </el-menu-item-group>
              <el-submenu index="1-1">
                <template slot="title">支付</template>
                <el-menu-item index="/paylist">支付流水</el-menu-item>
                <!-- <el-menu-item index="/backcharacterlist">支付帐号</el-menu-item> -->
              </el-submenu>
              <el-submenu index="1-2">
                <template slot="title">举报与投诉</template>
                <el-menu-item v-if="role.reportlist" index="/reportlist">举报列表</el-menu-item>
                <el-menu-item v-if="role.reportreason" index="/report/type/list">举报原因列表</el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <template slot="title">后台管理</template>
                <!-- <el-menu-item index="/backlist">分工列表</el-menu-item> -->
                <el-menu-item index="/backcharacterlist">角色列表</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-star-on"></i>会员
              </template>
              <el-menu-item-group>
                <el-menu-item v-if="role.memberlevel" index="/memberlevellist">会员等级</el-menu-item>
                <!-- <el-menu-item index="/qrcontrol">二维码开关</el-menu-item> -->
                <el-menu-item v-if="role.parttimelist" index="/parttimelist">申请兼职</el-menu-item>
                <el-menu-item v-if="role.userlist" index="/userlist">用户列表</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-1" v-if="role.activity">
                <template slot="title">会员功能</template>
                <el-menu-item index="/membercheckin">签到</el-menu-item>
                <el-menu-item index="/memberscan">扫一扫</el-menu-item>
                <el-menu-item index="/membershare">分享</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-message"></i>信息处理
              </template>
              <el-menu-item-group>
                <el-menu-item v-if="role.type" index="/categorylist">种类和细节</el-menu-item>
                <!-- <el-menu-item index="/chargemode">信息收费管理</el-menu-item> -->
                <!-- <el-menu-item index="/sms">短信反馈</el-menu-item> -->
                <el-menu-item v-if="role.luancher" index="/startpagelist">启动页面</el-menu-item>
                <el-menu-item v-if="role.config" index="/config">系统设置</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-1">
                <template slot="title">审核相关</template>
                <el-menu-item v-if="role.unpasslist" index="/auditList">未审核列表</el-menu-item>
                <el-menu-item index="/auditpasslist">审核通过列表</el-menu-item>
                <el-menu-item v-if="role.rejectreason" index="/auditcondition">审核条件</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </nav>
        <!-- /导航 -->

        <!-- 正文内容 -->
        <section class="content-router">
          <router-view></router-view>
        </section>
        <!-- /正文内容 -->
      </div>
    </section>
    <!-- /内容 -->

    <!-- 底部 -->
    <footer id="footer"> 2017 &copy; Sennki All Rights Reserved</footer>
    <!-- /底部 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerActive: this.$route.path,
      role: {}
    };
  },

  created() {
    this.role = this.$route.params.role;
  },

  methods: {
    /*
      退出登录
    */
    logout() {
      sessionStorage.clear("username");
      this.$router.push("/login");
    }
  }
};
</script>