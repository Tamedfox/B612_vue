import request from '@/network/request'

export default {

  //问题编辑上传图片
  uploadImages(formdata){
    return request({
      url:'/image/upload',
      method:'post',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  uploadAvatar(formdata){
    return request({
      url:'/avatar/upload',
      method:'post',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

}
