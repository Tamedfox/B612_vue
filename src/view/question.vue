<template>
  <div>
    <el-row class="question-detail">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="left-part">
        <el-row>
          <h2 class="left"><i class="el-icon-plus"></i> 发起问题</h2>
        </el-row>
        <el-divider></el-divider>

        <div style="margin: 20px;"></div>
        <!--form表单-->
        <el-form :label-position="labelPosition" :hide-required-asterisk="true">
          <el-form-item label="请简洁的输入问题标题" class="form-control">
            <el-input placeholder="请输入问题标题" v-model="title"></el-input>
          </el-form-item>
          <el-form-item label="问题内容" class="form-control">
            <div style="clear: both"></div>
            <mavon-editor ref=md v-model="description" placeholder="请输入问题内容" @imgAdd="$imgAdd" @imgDel="$imgDel"/>

          </el-form-item>
          <el-form-item label="添加标签" class="form-control">
            <div style="clear: both"></div>
            <div style="margin-top: 20px;margin-left: 0px" class="left">
              <el-checkbox-group v-model="checkboxGroup" size="small">
                <el-checkbox-button v-for="tag in tags" :label="tag.id" :key="tag.id">{{tag.name}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>

        <el-button type="primary" class="right" @click="sendQuestion">发布</el-button>

      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="right-part">
        <div class="grid-content bg-purple-light">
          <h2>问题发布指南</h2>
          <div class="left">
            • 问题标题: 请用精简的语言描述您发布的问题，不超过25字 <br>
            • 问题补充: 详细补充您的问题内容，并确保问题描述清晰直观, 并提供一些相关的资料<br>
            • 选择标签: 选择一个或者多个合适的标签，用逗号隔开，每个标签不超过10个字<br>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LabelWrap from "element-ui/packages/form/src/label-wrap";
  import question from '@/network/question'
  import uploadAPI from '@/network/uploadAPI'
  import tag from '@/network/tag'

  export default {
    components: {LabelWrap},
    data() {
      return {
        labelPosition: 'left',
        title:'',
        description:'',
        checkboxGroup: [],
        tags:[]
      }
    },
    created(){
        this.loadTags();
    },
    methods:{
      sendQuestion(){
        if(this.title.length <= 0 | this.description.length <= 0 | this.checkboxGroup.length <= 0 ){
          this.$message({
            message:"请填写完整信息",
            type:'error'
          })
          return ;
        }

        let tags = this.checkboxGroup;
        let tagsStr = '';
        for( let i = 0 ; i < tags.length ; i++){
          if( i != tags.length - 1){
            tagsStr = tagsStr + tags[i] + ',';
          }else{
            tagsStr = tagsStr + tags[i];
          }
        }

        question.sendQuestion(this.title,this.description,tagsStr).then(response => {
          this.$message({
            message:response.message,
            type:'success'
          });
          this.$router.push("/");
        }).catch(err => {
          console.log(err) // 这里catch到错误timeout
        })
      },
      $imgDel(pos){
        delete this.img_file[pos];
      },
      $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        let formdata = new FormData();
        formdata.append('file', $file);
        uploadAPI.uploadImages(formdata).then(response => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, response.data);
        })
      },
      loadTags(){
        tag.getTags().then(response => {
          this.tags = response.data;
        })
      }

    }
  }
</script>

<style scoped>
  .question-detail {
    background-color: white;
    margin: 50px;
  }

  .question-detail .left-part {
    border: 1px solid #e6e6e6;
    border-width: 0px 1px 0px 0px;

  }

  .form-control {
    margin: 10px 30px;
  }

  .form-control > :first-child {
    font-size: 20px;
    color: #333;
    font-family: Helvetica Neue;
  }

  .left {
    float: left;
    margin: 30px 30px 5px 30px;
  }

  .right{
    float: right;
    margin: 30px 30px 5px 30px;
  }
</style>
