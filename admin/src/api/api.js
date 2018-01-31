import axios from 'axios'
import $ from 'jquery'

const baseUrl = '/coin'

//获取七牛token
export const getQiniuToken = params => axios.get('/house/qiniu/test')
//获取用户信息
export const getProfile    = params => axios.get(baseUrl + '/user/profile')
//登录
export const login         = params => axios.post(baseUrl + '/user/login', params)
//注册
export const register         = params => axios.post(baseUrl + '/user/register', params)
//登出
export const logout         = params => axios.post(baseUrl + '/coin/user/logout', params)
//获取菜单
export const getMenu       = params => axios.get('/funds-fund-account/user/getmenu', params)
