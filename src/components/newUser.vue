<template>
    <div style="margin-top:50px;">
      <h1>最新用户</h1>
      <el-row>
        <el-col v-for="newUser in newUserList" :key="newUser.id" >
          <el-avatar shape="square" :size="50" :src="newUser.avatarUrl" class="new-user"></el-avatar>
          <span class="new-user-name">{{newUser.nickname}}</span>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import user from '@/network/user'

    export default {
      data(){
        return {
          newUserList:{}
        }
      },
      created(){
        this.getNewUsers();
      },
      methods:{
        getNewUsers(){
          user.getNewUser().then(response => {
            this.newUserList = response.data;
          })
        }
      }
    }
</script>

<style scoped>
  .new-user{
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .new-user-name{
    float: left;
    margin-left: 25px;
    margin-top:33px;
  }

</style>
