<template>
  <div>
    <h1>热门问题</h1>
    <div v-for="(hotQuestion,index) in hotQuestions" :key="index" style="margin-top: 10px">
      <router-link :to="'/question/' + hotQuestion.id" class="hotQ_title hotQ_left">{{hotQuestion.title}}</router-link>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
  import question from '@/network/question'

    export default {
      data(){
        return {
          hotQuestions:''
        }
      },
      created(){
        this.getHotQuestions();
      },
      methods:{
        getHotQuestions(){
          question.hotQuestions().then(response => {
            this.hotQuestions = response.data;
          })
        }
      }

    }
</script>

<style scoped>
  .hotQ_left{
    float: left;
    margin-left: 30px;
  }
  .hotQ_title{
    font-size: 20px;
    color:#155faa;
    text-decoration: none;
  }

  .hotQ_title:hover{
    cursor: pointer;
    color:#428bca;
  }

</style>
