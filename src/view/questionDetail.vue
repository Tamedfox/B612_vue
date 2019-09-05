<template>
  <div>
    <el-row class="question-detail">

      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="left-part">
        <span style="display: none">{{questionId = this.$route.params.questionId}}</span>
        <el-row>
          <h2 class="title"><i class="el-icon-question"></i> 问题详情</h2>
        </el-row>
        <el-divider></el-divider>

        <!--提问详细内容开始-->
        <h3><span class="left" v-text="title"></span></h3>
        <div style="clear: both"></div>
        <div class="content left">• 发布于 <span>{{user.cmtCreate | formatDate}}</span> | 阅读数 <span v-text="viewCount"></span></div>
        <div style="clear: both"></div>
        <el-divider></el-divider>
        <div class="markdown">
          <mavon-editor v-model="description" id="editor" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" :boxShadow="false" :ishljs = "true"/>
        </div>
        <el-tag v-for="tag in tags" :key="tag.id" class="des-tag">{{tag.name}}</el-tag>
        <div style="clear: both"></div>
        <el-divider></el-divider>
        <div class="content left"><i class="el-icon-thumb question-tag"><el-button type="text" class="little-function" @click="addLike">点赞 {{likeCount}}</el-button></i> <span class="el-icon-s-comment question-tag">添加评论</span>  </div>
        <!--提问详细内容结束-->

        <div style="clear: both"></div>
        <div class="left">
          <h2>{{commentCount}}条评论</h2>
        </div>
        <div style="clear: both"></div>

        <!--以下为评论内容-->
        <el-row class="question" v-for="comment in commentList" :key="comment.id">
          <el-col :span="3">
            <div class="block"><el-avatar shape="square" :size="50" :src="comment.userDTO.avatarUrl"></el-avatar></div>
          </el-col>
          <el-col :span="21">
            <div class="left"><span v-text="comment.userDTO.nickname">回复人</span></div>
            <div style="clear: both"></div>
            <div class="left"><span v-text="comment.content">回复内容</span></div>
          </el-col>
          <div style="clear: both"></div>
          <div class="content left"><i class="el-icon-thumb question-tag"><el-button type="text" class="little-function" @click="addCommentLike(comment)">点赞 {{comment.likeCount}}</el-button></i> <span class="el-icon-s-comment question-tag">添加评论</span>  </div>
          <div style="clear: both"></div>
          <el-divider></el-divider>
        </el-row>

        <!--评论内容结束-->

        <!--回复评论框内容-->
        <div style="clear: both"></div>
        <el-divider></el-divider>
        <div>
          <h4 class="left">请输入评论内容</h4>
        </div>
        <div style="clear: both"></div>
        <div class="grid-content bg-purple-light">
          <el-row class="left">
            <el-col :span="3">
              <div class="block"><el-avatar shape="square" :size="50" :src="user.avatarUrl"></el-avatar></div>
            </el-col>
            <el-col :span="21">
              <div style="clear: both;height: 15px"></div>
              <div style="margin-left: 20px"><span>{{user.nickname}}</span>  </div>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <div>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入评论内容" class="comment" v-model="commentBody"></el-input>
          </div>
        </el-row>
        <el-button type="primary" class="right" @click="sendComment">回复</el-button>
        <!--回复评论框内容结束-->
      </el-col>

      <!--右侧-->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="right-part">
        <div class="grid-content bg-purple-light">
          <h2>发起人</h2>
          <el-row class="left">
            <el-col :span="3">
              <div class="block"><el-avatar shape="square" :size="50" :src="user.avatarUrl"></el-avatar></div>
            </el-col>
            <el-col :span="21">
              <div style="clear: both;height: 15px"></div>
              <div style="margin-left: 20px"><span>{{user.nickname}}</span>  </div>
            </el-col>
          </el-row>
        </div>
        <div style="clear: both"></div>
        <el-divider></el-divider>
        <h2>相似话题</h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {formatDate} from '@/util/dataFormat.js';
    import question from '@/network/question'
    import comment from '@/network/comment'

    export default {
      data(){
        return {
          questionId:'',
          question:{},
          viewCount:'',
          description:'',
          commentCount:'',
          title:'',
          likeCount:'',
          tags:'',
          commentList:[
          ],
          commentBody:'',
          user:{}
        }
      },
      mounted(){
        this.getQuestion();
        this.getComments();
      }
      ,
      methods:{
        getQuestion(){
          question.getQuestionById(this.questionId).then(response => {
            this.viewCount=response.data.viewCount
            this.description=response.data.description
            this.commentCount=response.data.commentCount
            this.title=response.data.title
            this.likeCount=response.data.likeCount
            this.user=response.data.userDTO
            this.tags = response.data.tags;
          })
        },
        getComments(){
          comment.getComments(this.questionId).then(response => {
            this.commentList = response.data
          })
        },
        sendComment(){
          comment.sendComment(this.questionId,this.commentBody).then(response => {
            this.getComments();
            this.commentBody=""
          })
        },
        addLike(){ //问题点赞
          question.updateQuestionLike(this.questionId).then(response => {
            this.likeCount = response.data;
          })
        },
        addCommentLike(obj){ //评论点赞
          comment.updateCommentLike(obj.id).then(response => {
            obj.likeCount = response.data;
          })
        }

      },
      filters: {
        formatDate(time) {
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      }
    }
</script>

<style scoped>
  .question-detail {
    background-color: white;
    margin: 50px;
  }

  .question-detail .left-part {
    border: 1px solid #e6e6e6;
    border-width: 0px 1px 0px 0px;

  }

  .little-function{
    color:#000;
  }

  .des-tag{
    margin-top: 30px;
    margin-right: 10px;
  }

  .question-tag {
    margin-right: 10px;
  }

  .form-control > :first-child {
    font-size: 20px;
    color: #333;
    font-family: Helvetica Neue;
  }

  .title {
    float: left;
    margin: 30px 30px 5px 30px;
  }

  .comment{
    margin: 10px 30px;
    width: 94%;
  }

  .left {
    float: left;
    margin-left: 30px;
    margin-top:10px;
  }

  .right{
    float: right;
    margin: 30px 30px 5px 30px;
  }
</style>
