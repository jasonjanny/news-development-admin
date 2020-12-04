<template>
  <div class="container">
    <div class="nav">首页 / 文章列表</div>

    <el-upload
      :action="$axios.defaults.baseURL + '/upload'"
      list-type="picture-card"
      :headers="{
        Authorization: token,
      }"
      :on-success="uploadSuccess"
      :on-remove="removeSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },

  methods: {
    //  图片上传成功
    uploadSuccess(res, file) {
      console.log(res);
    },

    // 图片移除成功
    removeSuccess(file) {
      console.log("图片移除成功");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .nav {
    height: 40px;
    line-height: 40px;
    margin-bottom: 40px;
    text-align: left;
  }
}
</style>