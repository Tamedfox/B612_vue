import request from '@/network/request'


export default {

  getTags(){
    return request({
      url:'/tag',
      method:'get'
    })
  },
  getHotTags(){
    return request({
      url:'/hot/hotTags',
      method:'get'
    })
  }

}
