import request from '@/network/request'
import qs from 'qs'

export default {
  login(username,password){
    return request({
      url:'/user/login',
      method:'post',
      data:qs.stringify({"username":username,"password":password})
    })
  },
  register(username,nickname,pass){
    return request({
      url:'/user/register',
      method: 'post',
      data:qs.stringify({"username":username,"password":pass,'nickname':nickname})
    })
  },
  logout(){
    return request({
      url:'/user/logout',
      method:'get'
    })
  }
}
