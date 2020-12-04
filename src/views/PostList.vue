<template>
  <div class="container">
    <div class="nav">首页 / 文章列表</div>

    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next, total, sizes"
      :total="total"
      :page-sizes="[2, 5, 10, 20]"
      @current-change="currentChange"
      @size-change="sizeChange"
      :page-size="pageSize"
    >
    </el-pagination>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
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

      <el-table-column label="缩略图" width="150">
        <template slot-scope="scope">
          <img
            class="thumbnail"
            :src="scope.row.cover[0].url"
            alt=""
            v-if="scope.row.cover.length > 0"
          />
          <img class="thumbnail" v-else src="../assets/logo.png" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
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
      pageIndex: 1,
      pageSize: 5,
      total: 0,
    };
  },

  created() {
    this.loadPage();
  },

  methods: {
    loadPage() {
      this.$axios({
        url: "/post",
        Authorization: localStorage.getItem("token"),
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    currentChange(newPageIndex) {
      this.pageIndex = newPageIndex;
      this.loadPage();
    },

    sizeChange(newPageSize) {
      this.pageSize = newPageSize;
      this.loadPage();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .el-pagination {
    padding-left: 0;
  }
  .nav {
    height: 40px;
    line-height: 40px;
    margin-bottom: 40px;
    text-align: left;
  }
  .el-table {
    line-height: 0;
  }
  .thumbnail {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
}
</style>