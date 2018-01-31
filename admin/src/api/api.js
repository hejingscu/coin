import axios from 'axios'
import $ from 'jquery'

const ecardUrl = '/funds-ecard-admin'

//获取七牛token
export const getQiniuToken = params => axios.get('/house/qiniu/test')
//获取用户信息
export const getProfile    = params => axios.get('/account/user/profile')
//登录
export const login         = params => axios.post('/account/user/login', params)
//登出
export const logout         = params => axios.post('/account/user/logout', params)
//获取菜单
export const getMenu       = params => axios.get('/funds-fund-account/user/getmenu', params)
