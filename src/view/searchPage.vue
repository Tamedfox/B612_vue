<template>
  <div style="background-color: white;height: 800px">
    <p style="display: none">{{keyword = this.$route.params.keyword}}</p>
    <el-row v-for="search in searchList" :key="search.id">
      <h2 ><router-link :to="'/question/' + search.id" class="search_title">{{search.title}}</router-link></h2>
      <div style="clear: both"></div>
      <div class="markdown" style="height: 150px">
        <mavon-editor v-model="search.description" id="editor" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" :boxShadow="false" :ishljs = "true" class="search_content"/>
      </div>
      <div style="clear: both"></div>
      <el-divider></el-divider>
    </el-row>

    <!--以下是导航栏-->
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>

  </div>
</template>

<script>
  import question from "@/network/question"

    export default {

      data(){
        return {
          keyword:'',
          currentPage:1,
          pageSize:10,
          searchList:[],
          total:0
        }
      },
      watch:{
        keyword(){
          this.search();
        }
      }
      ,
      methods:{
        search(){
          question.search(this.keyword,this.currentPage,this.pageSize).then(response => {
            this.searchList = response.data.rows;
            this.total = response.data.total;
          })
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.search();
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.search();
        },
      }

    }
</script>

<style scoped>
  .search_title{
    text-decoration: none;
    color: black;
    float: left;
    margin-left: 50px;
  }

  .search_title:hover{

    color: #409EFF;
  }

  .search_content{
    float: left;
    margin-top: 10px;
    margin-left: 80px;
    width: 80%;
    min-height: 50px;
    height: 80px;
    font-size: 15px;
  }


</style>
