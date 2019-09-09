import request from '@/network/request'
import qs from 'qs'

export default {
  login(username,password){ //登录
    return request({
      url:'/user/login',
      method:'post',
      data:qs.stringify({"username":username,"password":password})
    })
  },
  register(username,nickname,pass,phone,code){ //注册
    return request({
      url:'/user/register',
      method: 'post',
      data:qs.stringify({"username":username,"password":pass,'nickname':nickname,'phone':phone,'code':code})
    })
  },
  getPhoneCode(phone){
    return request({
      url:'/user/code/'+phone,
      method:'get'
    })
  },
  logout(){ //注销
    return request({
      url:'/user/logout',
      method:'get'
    })
  },
  getUserDetail(){ //获取用户详细信息
    return request({
      url:'/userDetail',
      method:'get'
    })
  },
  saveUserDetail(birthday,nickname,eMail,industry,position){ //保存用户detail信息
    return request({
      url:'/userDetail',
      method:'put',
      headers: { 'Content-Type': 'application/json' },
      data:{
        "birthday":birthday,
        "nickname":nickname,
        "email":eMail,
        "industry":industry,
        "position":position
      }
    })
  },
  getNewUser(){ //获取最新用户
    return request({
      url:'user/near',
      method:'get'
    })
  }
}
