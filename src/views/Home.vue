<template>
  <el-container class="container">
    <el-aside width="200px">
      <h5>头条管理</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#555"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="2" @click="$router.push('/postlist')">
          <i class="el-icon-menu"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item index="4" @click="$router.push('/releasepost')">
          <i class="el-icon-setting"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="less">
.container {
  height: 100vh;
  .el-menu {
    border: none;
  }
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333;
  color: #333;
  text-align: center;
  line-height: 100px;
  h5 {
    color: #fff;
    font-size: 20px;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
