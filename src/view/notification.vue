<template>
    <div style="background-color: white;margin: 30px 50px;padding-top: 20px;height: 600px">
      <div>
        <el-row v-for="notification in notifications" :key="notification.id" style="margin-bottom: 15px">
          <el-col >
            <div style="float: left;margin-left: 50px;">
              <span style="font-size: 20px">{{notification.notifierName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>{{notification.type}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span ><router-link v-on:click.native="readNotification(notification.id)" :to="'/question/'+notification.outerId" class="notifi_title">{{notification.outerTitle}}</router-link></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button size="small" style="color: red;font-size: 15px" v-if="notification.status == 0">未读</el-button>
            </div>
          </el-col>
        </el-row>

      </div>
      <h3 v-if="this.$store.state.notificationNum == 0">没有新的通知</h3>
      <el-pagination
        layout="prev, pager, next"
        :total=this.$store.state.notificationNum>
      </el-pagination>
    </div>
</template>

<script>
    import notification from '@/network/notification'

    export default {
      data(){
        return{
          notifications:[],
          currentPage:1,
          pageSize:10,
        }
      },
     created(){
      this.getNotifis();
     },
      methods:{
        getNotifis(){
          notification.getNotifications(this.currentPage,this.pageSize).then(response => {
            this.notifications = response.data.rows;
            this.$store.state.notificationNum = response.data.total;
          })
        },
        readNotification(id){
          notification.upadteNotificationStatus(id).then(response => {
            this.getNotifis();
          })
        }
      }
    }
</script>

<style scoped>
  .notifi_title{
    text-decoration: none;
    color: black;
    font-size: 20px;
  }
  .notifi_title:hover{
    cursor: pointer;
    color:#428bca;
  }


</style>
