<template>
    <div class="quesetion-table" style="height: 600px">
      <el-table
        :data="list"
        border
        style="width: 100%" class="my-table">
        <el-table-column
          fixed
          prop="title"
          label="标题"
          width="350">
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="150">
          <template slot-scope="scope">
            <p>{{scope.row.gmtCreate | formatDate}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="修改时间"
          width="150">
          <template slot-scope="scope">
            <p>{{scope.row.gmtModified | formatDate}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="commentCount"
          label="评论数"
          width="70">
        </el-table-column>
        <el-table-column
          prop="likeCount"
          label="点赞数"
          width="70">
        </el-table-column>
        <el-table-column
          prop="viewCount"
          label="浏览数"
          width="70">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editQuestion(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteQuestion(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--以上为table数据-->
      <!--以下为分页控件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" class="pagination">
      </el-pagination>
      <!--以上为分页控件-->
    </div>
</template>

<script>
  import {formatDate} from '@/util/dataFormat.js';
  import question from '@/network/question';

    export default {
      data() {
        return {
          currentPage: 1,
          pageSize: 10,
          list: [],
          total:0
        }
      },
      created() {
        this.getMyQuestionListByPage();
      }
      ,
      methods: {
        getMyQuestionListByPage() {
          question.getMyQuestionsByPage(this.currentPage, this.pageSize).then(response => {
            this.list = response.data.rows;
            this.total=response.data.total;
          })
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.getMyQuestionListByPage();
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.getMyQuestionListByPage();
        },
        editQuestion(row) {
          this.$router.push({
            path:'/editQuestion/' + row.id
          })
        },
        deleteQuestion(row){ //删除问题
          this.$confirm('是否删除此提问，同时将删除所有评论?', '提示', { //提示删除操作
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            question.deleteQuestion(row.id).then(response => { //发送删除请求
              this.message("删除成功");
              this.getMyQuestionListByPage();
            })
          }).catch(() => {
          });

        }
      },
      filters: {
        formatDate(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      }
    }
</script>

<style scoped>

  .quesetion-table{
    margin: 30px 100px;
    background-color: white;
    padding-bottom: 30px;
  }

  .my-table{
    padding: 10px;
  }

  .pagination{
    margin-top: 30px;
  }

</style>
