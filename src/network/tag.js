import request from '@/network/request'


export default {

  getTags(){
    return request({
      url:'/tag',
      method:'get'
    })
  }

}
