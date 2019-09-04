<template>
  <el-card class="navigation">
    <div>
      <el-row :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-menu :default-active="activeIndex" class="el-menu-demo" :router="true" mode="horizontal"
                 @select="handleSelect">


          <el-menu-item index="1" route="/">B612社区</el-menu-item>
          <el-menu-item index="2" style="margin-left: 2%" route="/message">留言板</el-menu-item>
          <el-menu-item index="3" style="margin-left: 2%" route="/announcement">本站公告</el-menu-item>


          <el-menu-item index="" class="hidden-xs-only space"/>
          <!--<el-menu-item/>-->


          <div style="width: 20%;float: left;margin: 10px 2% 0px -5%" class="hidden-xs-only search-btn">
            <el-input placeholder="搜索博客"suffix-icon="el-icon-search"/>
          </div>
          <el-menu-item class="hidden-xs-only" index="">
            <el-button type="text">搜索</el-button>
          </el-menu-item>

          <el-menu-item class="hidden-xs-only" index="" v-if="this.$store.state.token==''">
            <el-button type="text" @click="loginFormVisible = true">登录</el-button>
          </el-menu-item>

          <!--登录dialog-->
          <el-dialog title="登录" :visible.sync="loginFormVisible" width="30%" center>
            <el-form>
              <el-form-item >
                <el-input placeholder="用户名" v-model="loginForm.username" prefixIcon="el-icon-user-solid"/>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="密码" v-model="loginForm.password"
                          prefixIcon="el-icon-lock" :show-password="loginShowPwd"/>
              </el-form-item>
              <el-button @click="login">登录&nbsp;&nbsp;<i class="el-icon-check"></i></el-button>
              <router-link to="/forgetPwd">
                <el-button>忘记密码&nbsp;&nbsp;<i class="el-icon-right"></i></el-button>
              </router-link>
            </el-form>
          </el-dialog>

          <el-menu-item class="hidden-xs-only" index="" v-if="this.$store.state.token==''">
            <el-button type="text">注册</el-button>
          </el-menu-item>

          <el-menu-item class="hidden-xs-only" index="" route="/question"  v-if="this.$store.state.token!==''">
            发布
          </el-menu-item>

          <el-submenu class="hidden-xs-only" index="4" v-if="this.$store.state.token!==''">
            <template slot="title">&nbsp;&nbsp;{{this.$store.state.username}}&nbsp;&nbsp;</template>

            <el-menu-item index="4-1" route="/question">&nbsp;&nbsp;&nbsp;
              <i class="el-icon-edit" ></i>
              写博客
            </el-menu-item>
            <el-menu-item index="4-3" route="/myQuestion">&nbsp;&nbsp;&nbsp;
              <i class="el-icon-s-home"></i>
              我的博客
            </el-menu-item>
            <el-menu-item index="4-2">&nbsp;&nbsp;&nbsp;
              <i class="el-icon-s-tools"></i>
              账号设置
            </el-menu-item>


            <el-menu-item index="4-4">
              &nbsp;&nbsp;&nbsp;
              <i class="el-icon-loading"></i>管理后台
            </el-menu-item>

            <el-menu-item @click="logout">&nbsp;&nbsp;&nbsp;
              <i class="el-icon-switch-button" />退出登录
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-row>

    </div>

  </el-card>
</template>

<script>
  import user from '@/network/user'

  export default {
    data() {
      return {
        activeIndex: '1',
        loginFormVisible:false,
        loginShowPwd:true,
        loginForm:{
          username:'',
          password:''
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        if(key != null && key !== ""){
          this.activeIndex = key;
        }
      },
      login() { //登录
        if (this.loginForm.username.length <= 0 || this.loginForm.password.length <= 0) {
          this.$message({
            message: "请输入完整用户名和密码",
            type: 'error'
          })
          return;
        }
        user.login(this.loginForm.username, this.loginForm.password).then(response => {
          this.loginForm.password = ''
          this.$store.commit('login', response.data)//储存token等用户信息
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.loginFormVisible = false
        })
      },
      logout(){ //退出
        user.logout().then(response => {
          this.$store.commit('logout') //清除token
          this.$message({
            message: '成功推出',
            type: 'success'
          })
          this.$route.push({
            path:'/'  //跳转至首页
          })
        })
      }
      // register(){ //注册
      //   user.register()
      // }
    }
  }
</script>


<style scoped>
  .navigation {
    margin-top: -20px;
    margin-bottom: 0px;
    font-size: 15px;
  }
  .space {
    width:30%;
  }
  .search-btn{
    margin: 5px auto;
    width: 20%;
  }


</style>
