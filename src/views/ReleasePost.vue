<template>
  <div class="container">
    <div class="nav">首页 / 文章列表</div>
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <!-- 富文本框 -->
    <VueEditor v-model="content" :editorToolbar="customToolbar" />
    {{ content }}

    <!-- 图片上传 -->
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
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      content: "",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
    };
  },

  components: {
    VueEditor,
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

    // 提交数据
    onSubmit() {
      console.log(this.form);
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