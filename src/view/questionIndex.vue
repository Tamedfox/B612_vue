<template>
<div>
  <el-row class="question-list">
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="left-part">
      <el-row>
        <h2 class="left"><i class="el-icon-s-grid"></i>  发现</h2>
      </el-row>
      <el-divider></el-divider>

      <!--以下是数据列表-->
      <el-row class="question" v-for="(question,index) in list" :key="index">
        <el-col :span="3">
          <div class="block"><el-avatar shape="square" :size="50" :src="question.userDTO.avatarUrl"></el-avatar></div>
        </el-col>
        <el-col :span="21">
          <div ><router-link :to="'/question/' + question.id" class="title">{{question.title}}</router-link></div>
          <div style="clear: both"></div>
          <div class="content"><span>作者：{{question.userDTO.nickname}}</span>  •  <span>{{question.commentCount}}</span> 个回复 • <span>{{question.viewCount}}</span> 次浏览 • <span>{{question.gmtCreate | timeage}}</span></div>
        </el-col>
      </el-row>
      <!--以上是数据列表-->
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="right-part">
      <div class="grid-content bg-purple-light">
        <!--热门问题-->
        <hotQuestion></hotQuestion>
        <!--热门标签-->
        <hotTag></hotTag>
        <div style="clear: both"></div>
        <!--最新用户-->
        <newUser></newUser>
     </div>
    </el-col>
  </el-row>

</div>
</template>


<script>
  import timeage from '@/util/timeago'
  import question from '@/network/question'
  import hotQuestion from '@/components/hotQuestion'
  import hotTag from "@/components/hotTag"
  import newUser from '@/components/newUser'

export default {

  data(){
    return {
      list:[], //当页数据列表
      currentPage: 1, //页数
      pageSize:10, //每页数量
      total:0 //总数
    }
  },
  created(){
    this.getIndexListByPage();
  },
  methods:{
    getList(){
      question.getIndexQuestion().then(response => {
        this.list = response.data;
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getIndexListByPage()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getIndexListByPage()
    },
    getIndexListByPage(){
      question.getIndexListByPage(this.currentPage,this.pageSize).then(response => {
          this.total = response.data.total;
          this.list = response.data.rows
      })
    }
  },
  components:{
    //注册组件
    hotQuestion,hotTag,newUser
  },
  filters:{
    timeage(time){
      return timeage.timeago(time);
    }
  }

}
</script>

<style scoped>

  .question-list{
    background-color: white;
    margin: 50px;
  }

  .question-list .left-part{
    border: 1px solid #e6e6e6;
    border-width: 0px 1px 0px 0px;

  }

  .question-list .content{
    font-size: 12px;
    font-weight: normal;
    color: #999;
    float: left;
    margin: 3px 0;
  }

  .question-list .title:hover{
    cursor: pointer;
    color:#428bca;
  }


  .question-list .title{
    color: black;;
    float: left;
    font-size: 16px;
    margin: 3px 0;
    text-decoration: none;
  }

  .question-list .question{
    margin: 10px 0 20px 0;
  }

  .left{
    float: left;
    margin: 30px 30px 5px 30px;
  }


</style>
