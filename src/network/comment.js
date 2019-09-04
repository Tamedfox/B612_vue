import request from '@/network/request'
import qs from 'qs'

export default {

  getComments(questionId){
    return request({
      url:'/comment/list/'+ questionId,
      method:'get'
    })
  },
  sendComment(parentId,content){
    return request({
      url:'/comment',
      method: 'post',
      data:qs.stringify({
        'parentId':parentId,
        'content':content
      })
    })
  },
  updateCommentLike(commentId){
    return request({
      url:'comment/like/' + commentId,
      method:'get'
    })
  }

}
