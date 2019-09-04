import Vue from 'vue'
import Router from 'vue-router'

import index from '@/view/questionIndex'
import login from '@/components/Login'
import question from '@/view/question'
import questionDetail from '@/view/questionDetail'
import myQuestion from '@/view/myQuestion'
import editQuestion from "@/view/editQuestion"


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
    }

  ]
})
