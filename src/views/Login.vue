<template>
  <el-row type="flex" justify="center" align="middle" class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        // 校验用户名
        username: [
          {
            trigger: "blur",
            message: "请输入用户名",
            required: true,
          },
        ],
        // 校验密码
        password: [
          {
            trigger: "blur",
            message: "请输入密码",
            required: true,
          },
        ],
      },
    };
  },

  methods: {
    onSubmit() {
      // 验证整个表单
      this.$refs.form.validate((isVal) => {
        if (isVal) {
          this.$axios({
            method: "post",
            url: "/login",
            data: this.form,
          }).then((res) => {
            // console.log(res);
            // 存储token
            localStorage.setItem("token", res.data.data.token);

            if (res.data.message === "登录成功") {
              this.$message.success(res.data.message);
            } else {
              this.$message.fail(res.data.message);
            }

            this.$router.push("/");
          });
        }
      });
    },
    reset() {
      this.form = {
        username: "",
        password: "",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
}
</style>