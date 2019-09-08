import Vue from 'vue'
import Router from 'vue-router'

import index from '@/view/questionIndex'
import login from '@/components/Login'
import question from '@/view/question'
import questionDetail from '@/view/questionDetail'
import myQuestion from '@/view/myQuestion'
import editQuestion from "@/view/editQuestion"
import adminManage from '@/view/adminManage'
import messageBoard from '@/view/messageBoard'
import announcement from '@/view/announcement'
import search from '@/view/searchPage'
import userInfo from "@/view/userInfo"
import notification from '@/view/notification'
import error from '@/components/404'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: index,
      meta:{
        title:'B612'
      }
    },
    {
      path:'/question',
      component:question
    },
    {
      path:'/question/:questionId',
      component:questionDetail
    },
    {
      path:'/myQuestion',
      component:myQuestion
    },
    {
      path:'/editQuestion/:questionId',
      component:editQuestion
    },
    {
      path:'/admin',
      component:adminManage
    },
    {
      path:'/message',
      component:messageBoard
    },
    {
      path:'/announcement',
      component:announcement
    },
    {
      path:'/search/:keyword',
      component:search
    },
    {
      path:'/userInfo',
      component:userInfo
    },
    {
      path:'/notification',
      component:notification
    },
    {
      path:'/*',
      component:error
    }
  ]
})
