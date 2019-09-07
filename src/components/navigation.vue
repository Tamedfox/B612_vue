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
            <el-input v-model="keyword" placeholder="搜索问题"suffix-icon="el-icon-search"/>
          </div>
          <el-menu-item class="hidden-xs-only" index="">
            <el-button type="text" @click="search" >搜索</el-button>
          </el-menu-item>

          <el-menu-item class="hidden-xs-only" index="" v-if="this.$store.state.token==''">
            <el-button type="text" @click="loginFormVisible = true">登录</el-button>
          </el-menu-item>

          <!--登录dialog-->
          <el-dialog title="登录" :visible.sync="loginFormVisible" width="35%" center>
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
            <el-button type="text" @click="registerFormVisible = true">注册</el-button>
          </el-menu-item>

          <!--注册dialog-->
          <el-dialog title="注册" :visible.sync="registerFormVisible" width="30%" center >
            <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="账号" prop="username">
                <el-input v-model="registerForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="registerForm.nickname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-menu-item class="hidden-xs-only" index="" route="/question"  v-if="this.$store.state.token!==''">
            发布
          </el-menu-item>

          <el-submenu class="hidden-xs-only" index="4" v-if="this.$store.state.token!==''">
            <template slot="title">&nbsp;&nbsp;{{this.$store.state.nickname}}&nbsp;&nbsp;</template>

            <el-menu-item index="4-1" route="/question">&nbsp;&nbsp;&nbsp;
              <i class="el-icon-edit" ></i>
              发布问题
            </el-menu-item>
            <el-menu-item index="4-3" route="/myQuestion">&nbsp;&nbsp;&nbsp;
              <i class="el-icon-s-home"></i>
              我的问题
            </el-menu-item>
            <el-menu-item index="4-2"  route="/userInfo">&nbsp;&nbsp;&nbsp;
              <i class="el-icon-s-tools"></i>
              账号设置
            </el-menu-item>

            <el-menu-item index="4-4" route="/admin">
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
  import question from '@/network/question'

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeIndex: '1',
        loginFormVisible:false,
        loginShowPwd:true,
        registerFormVisible:false,
        keyword:'',
        currentPage:1,
        pageSize:10,
        loginForm:{
          username:'',
          password:''
        },
        registerForm: {
          username:'',
          nickname:'',
          pass: '',
          checkPass: ''
        },
        rules: {
          username:[
            {required: true, message: '请输入账号名称', trigger: 'blur'}
          ],
          nickname:[
            {required: true, message: '请输入昵称', trigger: 'blur'}
          ],
          pass: [
            {required: true, validator: validatePass, trigger: 'blur' },{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur' }
          ]
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
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            user.register(this.registerForm.username,this.registerForm.nickname,this.registerForm.pass).then(response => {
              this.$message({
                message:'注册成功',
                type:'success'
              })
              this.registerFormVisible = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      search(){
        this.$router.push({
          path:'/search/'+this.keyword
        })
      }
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
