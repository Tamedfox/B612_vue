<template>
  <div>
  <el-form-item>
    <el-input type="text" v-model="loginForm.username"
              auto-complete="off" placeholder="账号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input type="password" v-model="loginForm.password"
              auto-complete="off" placehlder="密码"></el-input>
  </el-form-item>
  <el-form-item style="width: 100%">
    <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
  </el-form-item>
  </div>
</template>

<script>
  export default {

  }

</script>

<style scoped>


</style>
