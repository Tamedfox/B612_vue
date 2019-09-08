<template>
  <div style="background-color: white;height: 600px;margin:30px 50px;">
    <el-row>
      <el-col v-for="announce in announceList" :key="announce.id">
        <h1>公告</h1>
        <div class="announce-div">
          <h3>{{announce.title}}</h3>
        <span >{{announce.content}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import announcement from '@/network/announcement'

    export default {
      data(){
        return{
          announceList:[]
        }
      },
      created(){
       this. getAnnoucements();
      },
      methods:{
        getAnnoucements(){
          announcement.getAnnounce().then(response => {
            this.announceList = response.data;
          })

        }
      }
    }

</script>

<style scoped>

  .announce-div{
    width: 600px;
    height: 300px;
    margin: auto;
    border: #0505c8;
    border-style: dashed;
    border-width: 1px;
    padding-bottom:20px;
  }

</style>
