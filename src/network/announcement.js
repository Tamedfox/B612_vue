import request from '@/network/request'
import qs from 'qs'

export default {

  getAnnounce(){
    return request({
      url:'/announcement',
      method:'get'
    })
  }

}
