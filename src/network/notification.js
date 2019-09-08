import request from '@/network/request'
import qs from 'qs'

export default {

  getNotifications(page,size){
    return request({
      url:'/notification/' + page + '/' + size,
      method:'get'
    })
  },
  upadteNotificationStatus(id){
    return request({
      url:'/notification/read/' + id,
      method:'get'
    })
  }

}
