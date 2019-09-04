import request from '@/network/request'

export default {

  //上传图片
  uploadImages(formdata){
    return request({
      url:'/image/upload',
      method:'post',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

}
