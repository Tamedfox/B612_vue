import request from '@/network/request'
import qs from 'qs'

export default {

  getIndexQuestion(){ //获取列表页问题--不分页
    return request({
      url:'/question/index',
      method:'get'
      })
    },
  getQuestionById(questionId){ //根据问题id查找问题详情
    return request({
      url:'/question/'+questionId,
      method: 'get'
    })
  },
  sendQuestion(title,description,tagsStr){ //发布问题
    console.log(qs.stringify({
      'title':title,
      'description':description,
      'tag':tagsStr
    }))
    //解析为以下内容title=123&description=123&tag%5B0%5D=3&tag%5B1%5D=5&tag%5B2%5D=6，tag格式需变更
    return request({
      url:'/question',
      method:'post',
      data:qs.stringify({
        'title':title,
        'description':description,
        'tag':tagsStr
      })
    })
  },
  getIndexListByPage(page,size){ //首页问题展示--分页
    return request({
      url:'/question/' + page + '/' + size,
      method:'get'
    })
  },
  updateQuestionLike(questionId){ //点赞
    return request({
      url:'/question/like/' + questionId,
      method:'get'
    })
  },
  getMyQuestionsByPage(page,size){ //分页查找当前用户的问题
    return request({
      url:'/question/myquestion/' + page + '/' + size,
      method:'get'
    })
  },
  deleteQuestion(id){ //删除问题
    return request({
      url:'/question/' + id,
      method:'delete'
    })
  },
  updateQuestionById(id,title,description,tag){//更新问题
    return request({
      url:'/question/' + id,
      method:'put',
      data: qs.stringify({
        'title':title,
        'description':description,
        "tag":tag
      })
    })

  }

}
