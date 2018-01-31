import Vue from 'vue'
import Router from 'vue-router'

//临时登录
import Login from '@/pages/login'
//首页
import Index from '@/pages/index'

Vue.use(Router)

//  get到数据   字段完整（目前大部分页面缺手机号）  条件查询ok 

export default new Router({
  routes: [
    {path: '/', redirect: '/index'},
    {path: '/index',component: Index},
    {path: '/login',component: Login, name: '登录'}
    ]
})
