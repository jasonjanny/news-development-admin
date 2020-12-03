<template>
  <div class="container">
    <div class="nav">首页 / 文章列表</div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.create_date.split("T")[0]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>
              姓名: {{ scope.row.user.nickname || scope.row.user.username }}
            </p>
            <p>头像：</p>
            <img
              style="width: 60px"
              :src="$axios.defaults.baseURL + scope.row.user.head_img"
              alt=""
            />
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{
                scope.row.user.nickname || scope.row.user.username
              }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },

  created() {
    this.$axios({
      url: "/post",
      Authorization: localStorage.getItem("token"),
    }).then((res) => {
      console.log(res);
      this.tableData = res.data.data;
    });
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
  .el-table {
    line-height: 0;
  }
}
</style>