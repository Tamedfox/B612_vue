import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roles:localStorage.getItem("roles") == null? '':localStorage.getItem("roles"),
    token:localStorage.getItem("token") == null? "":localStorage.getItem("token"),
    username:localStorage.getItem("username") == null? "":localStorage.getItem("username"),
    avatarUrl:localStorage.getItem("avatarUrl") == null ? "":localStorage.getItem("avatarUrl")
  },
  mutations: {
    //登录
    login (state, data) {
      //储存token
      this.state.token = data.token;
      localStorage.setItem("token",this.state.token);
      //储存用户名
      this.state.username=data.username;
      localStorage.setItem("username",data.username)
      //储存角色
      console.log(this.state.role);
      this.state.role = data.role;
      localStorage.setItem("roles",data.roles)
      //储存头像地址
      this.state.avatarUrl = data.avatarUrl;
      localStorage.setItem("avatarUrl",data.avatarUrl)
    },
    //登出
    logout(state){
      localStorage.removeItem("token");
      this.state.token = "";
      localStorage.removeItem("username");
      this.state.username = "";
      localStorage.removeItem("role");
      this.state.role = "";
      localStorage.removeItem("avatarUrl");
      this.state.avatarUrl = "";
    }
  }
})
