<template>
  <body id="poster">
    <el-form :rules="rules" class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
      <h3 class="login_title">B612社区</h3>
      <el-form-item prop="account">
        <el-input type="text" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox class="login_remember" label-position="left"><span style="color: #505458">记住密码</span></el-checkbox>
      <a href="#" class="clear-a"><span style="color: #505458">注册</span></a>
      <a href="#" class="clear-a"><span style="color: #505458">忘记密码</span></a>

      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;bordider: none" >登录</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
    export default {
      data(){
          return {
            formName:"login",
            activeName:"login"
          }
      },
      methods:{
      }
    }
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }

  .clear-a{
    text-decoration: none;
  }

  .login-form{
    justify-content: center;
  }

  .title{
    display:inline;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  #poster {
    background:url("../assets/background.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
</style>
