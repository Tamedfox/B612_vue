import axios from "axios";
import {Message} from "element-ui";
import store from "@/store/index"

//创建axios实例
const service = axios.create({
  baseURL:'/api',
  timeout:15000,//请求超时事件
  header: 'Content-Type:application/x-www-form-urlencoded'
})

//request拦截器
// 添加请求拦截器
service.interceptors.request.use( config =>{
  // alert(store.state.token)
  if(store.state.token != ""){
    config.headers['Authorization'] = store.state.token //携带token的heder
  }
  return config;
},  error =>{
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error);
});

//response拦截器
service.interceptors.response.use(
  response => {
    //拦截所有非code 200的相应，所以相应中不需要在判断code 200
    const  res = response.data
    if ((typeof (res.code) != "undefined" && res.code != 200)) {
      if(res.code == 1008){
        Message({
          message:res.message,
          type:'error'
        })}
      else if(res.code == 1009){
        Message({
          message:res.message,
          type:'error'
        })
      }else if(res.code == 4000){
        Message({
          message:res.message,
          type:'error'
        })
      }else{
        Message({
          message:res.message,
          type:'error'
        })
      }

      return Promise.reject('error')
    }   else {
      return response.data
    }

  },error => {
    console.log('错误：' + error.message)
    Message({
      message:error.message,
      type:'error',
      duration:5*1000
    })
    return Promise.reject(error)
  }
)

export default service
