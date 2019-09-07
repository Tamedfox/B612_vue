<template>
  <div class="hot-tag">
    <h1>热门标签</h1>
    <div v-for="(hotTag,index) in hotTags" :key="index">
    <span class="hotT" >{{hotTag}}</span>
    </div>
  </div>
</template>

<script>
    import tag from '@/network/tag'

    export default {
      data(){
        return {
          hotTags:[]
        }
      },
      created() {
        this.getHotTags();
      }
      ,
      methods:{
        getHotTags(){
          tag.getHotTags().then(response => {
            this.hotTags = response.data;
          })
        }
      }
    }
</script>

<style scoped>

  .hot-tag{
    margin-top: 50px;
  }

  .hotT{
    float: left;
    margin-left: 40px;
    margin-top: 10px;
  }


</style>
