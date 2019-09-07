<template>
  <div style="background-color: white;margin:50px 100px;padding: 20px">
    <el-form label-width="80px" >
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadAvatar">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="昵称">
        <span class="info-item">{{nickname}}</span>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="birthday"
          readonly="true"
          type="date"
          placeholder="选择日期"
        style="float: left">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="邮箱">
        <span class="info-item">{{email}}</span>
      </el-form-item>
      <el-form-item label="行业">
        <span class="info-item">{{industry}}</span>
      </el-form-item>
      <el-form-item label="职位">
        <span class="info-item">{{position}}</span>
      </el-form-item>
    </el-form>
    <el-button class="info-item" type="primary" @click="detailFormVisible=true">编辑资料</el-button>

    <!--编辑dialog-->
    <el-dialog title="编辑资料信息" :visible.sync="detailFormVisible" width="50%" center >
      <el-form  status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称">
          <el-input autocomplete="off" v-model="nickname"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="birthday"
            type="date"
            placeholder="选择日期"
            style="float: left">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input autocomplete="off" v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="行业">
          <el-input autocomplete="off" v-model="industry"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input autocomplete="off" v-model="position"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveDetail">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import uploadAPI from '@/network/uploadAPI'
  import user from '@/network/user'

    export default {
      data() {
        return {
          imageUrl: '',
          detailFormVisible:false,
          birthday:'',
          nickname:'',
          email:'',
          industry:'',
          position:''
        };
      },
      created(){
       this.getDetails();
      }
      ,
      methods: {
        beforeAvatarUpload(file) {
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isLt2M;
        },
        uploadAvatar(params){
          let file = params.file;
          let formData = new FormData();
          formData.append("file",file)
          uploadAPI.uploadAvatar(formData).then(response => {
            this.imageUrl = response.data;
            this.$message({
              message: "头像更换成功",
              type: 'success'
            })
          })
        },
        getDetails(){
          user.getUserDetail().then(response => {

            this.nickname = response.data.nickname;
            this.birthday = response.data.userDetail.birthday;
            this.email = response.data.userDetail.email;
            this.industry = response.data.userDetail.industry;
            this.position = response.data.userDetail.position;
            this.imageUrl = response.data.avatarUrl;
          })
        },
        saveDetail(){
          user.saveUserDetail(this.birthday,this.nickname,this.email,this.industry,this.position).then(response =>{
            localStorage.setItem("nickname",this.nickname);
            this.getDetails();
            this.detailFormVisible = false;
          })
        }
      }
    }
</script>

<style scoped>
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 200px;
    margin: 20px
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .info-item{
    float: left;
    margin-left: 20px;
  }

</style>
