<template>
  <div class="container">
    <div class="nav">首页 / 文章列表</div>
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 标题 -->
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <!-- 富文本框 -->
      <el-form-item label="内容">
        <VueEditor v-model="content" :editorToolbar="customToolbar" />
      </el-form-item>

      <!-- 栏目 -->
      <el-form-item label="栏目">
        <el-checkbox
          v-model="checkList"
          :label="list.id"
          v-for="list in categoryList"
          :key="list.id"
          >{{ list.name }}</el-checkbox
        >
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item label="封面">
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
      </el-form-item>

      <!-- 文章类型 -->
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
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
      categoryList: [],
      checkList: [],
    };
  },

  components: {
    VueEditor,
  },

  created() {
    this.$axios({
      url: "/category",
    }).then((res) => {
      // console.log(res.data);
      // 去除关注和头条栏目
      res.data.data.splice(0, 2);
      this.categoryList = res.data.data;
    });
  },

  watch: {
    // 监听栏目选中，转换格式放入form表单
    checkList(newVal) {
      this.form.categories = this.checkList.map((item) => {
        return {
          id: item,
        };
      });
    },
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