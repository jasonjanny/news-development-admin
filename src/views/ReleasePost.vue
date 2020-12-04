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
        <VueEditor v-model="form.content" :editorToolbar="customToolbar" />
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

    // 获取文章信息，如果进入发布文章页且带有id,表示是编辑页，需要回显数据
    if (this.$route.query.id) {
      this.$axios({
        url: "/post/" + this.$route.query.id,
      }).then((res) => {
        console.log(res.data);

        // 修复富文本不能接收div标签
        res.data.data.content = res.data.data.content.replace(/div/g, "p");

        // 修改多选框格式
        this.checkList = res.data.data.categories.map((item) => {
          return item.id;
        });
        // 获取到的文章数据赋值给form表单，进行数据回显
        this.form = res.data.data;
      });
    }
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
      // 获取到上传图片的id
      // const id = res.data.id;

      // 将id存入file对象
      file.id = res.data.id;

      // 直接将file对象放入form表单中
      this.form.cover.push({
        file,
      });
    },

    // 图片移除成功
    removeSuccess(file, fileList) {
      console.log(fileList);
      // fileList是已经删除了图片之后的数组，剩下的每张图片都存在一个对象中
      this.form.cover.push({
        fileList,
      });
    },

    // 提交数据
    onSubmit() {
      // console.log(this.form);
      this.$axios({
        method: "post",
        url: "/post",
        data: this.form,
      }).then((res) => {
        // console.log(res);
        this.$router.push("/postlist");
      });
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