<template>
  <div id="app">
    <header-bar></header-bar>
    <side-bar></side-bar>
    <div id="loading" v-if="ajaxRequestNum>0">
      <img src="./img/loading.gif" alt="">
    </div>
    <div class="page">
        <page-bar></page-bar>
        <router-view style="margin-top: 10px;min-height: 800px;"></router-view>
    </div>
  </div>
</template>

<script>
import sidebar from 'components/sidebar.vue'
import header from 'components/header.vue'
import pagebar from 'components/pagebar.vue'

import axios from 'axios'
import $ from 'jquery'
import router from './router'
import * as api from 'api/api'

export default {
  name: 'app',
  components:{
    'side-bar': sidebar,'header-bar': header, 'page-bar': pagebar
  },
  data(){
    return {
      ajaxRequestNum: 0
    }
  },
  methods:{
    
  },
  mounted(){
    //$("#app").css("minHeight",document.body.scrollHeight)
  },
  created: function(){
    let that = this

    // api.getMenu().then(res=>{
      
    // })

    //每次路由变更时做一些事情
    router.beforeEach((to, from, next) => {
      if(to.name !== from.name){
        that.ajaxRequestNum = 0
      }
      next()
    })

    //添加一个请求拦截器
    axios.interceptors.request.use(function(config){
      //在请求发出之前进行一些操作
      that.ajaxRequestNum++
      return config;
    },function(error){
      //Do something with request error
      return Promise.reject(error);
    });
    //添加一个响应拦截器
    axios.interceptors.response.use(function(res){
      //在这里对返回的数据进行处理
      that.ajaxRequestNum--
      return res;
    },function(error){
      //Do something with response error
      that.ajaxRequestNum--
      if (error.response) {
        switch (error.response.status) {
          case 401:  //401
            that.$message.error('您的登录状态已失效，请重新登录',3);
            if(window.location.origin.indexOf("trc.com") !== -1){
              window.location.href = 'http://passport.trc.com/login?redirectUrl=' + window.location.href;
            }else{
              that.$router.push('/login')
            }
            break;
          case 404:
            that.$message.error('接口地址找不到了，若无影响，请忽略',3);
            break;
          case 502:
            that.$message.error('服务器正在重启',3);
            break;
          case 504:
            that.$message.error('请求超时',3);
            break;
          default:
            that.$message.error(error.response.data.error.description,3);
            break;
        }
      }
      return Promise.reject(error);
    })
  }
}
</script>



<style lang="scss">
html{background: #364150;}
html,body,#app{min-height: 100%;height: 100%;}
#app {
  font-family: Microsoft Yahei,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #364150;
  .header{
    width: 100%;
    background: #2b3643;
    //height: 50px;
    color: #fff;
    position: relative;
    z-index: 101;
  }
  .sidebar{
    width: 220px;
    float: left;
    a{
      color: #fff;
    }
  }
  #footer{
    height: 30px;
  }
}
.w100{
  width: 100% !important;
}
.w600{
  width: 600px;
}
.page{
  background: #fff;
  padding: 50px 20px 10px 20px;
  margin-left: 220px;
  font-size: 12px;
  height: auto;
  //position: relative;
  z-index: 100;
  .page-bar{
    line-height: 42px;
    border-bottom: 1px solid #e7ecf1;
    background-color: #fff;
    position: relative;
    padding: 0 20px;
    margin-left:-20px;
  }
  .el-dialog__body{
    .panel-box{
      min-height: 0;
      max-height: 600px;
      overflow-y: scroll;
    }
  }
  .footer-btn-box{
    .btn{
      margin-right: 10px;
    }
  }
}
ul,li{
  list-style: none;
}
p,div,ul,li{
    margin: 0;padding: 0;box-sizing: border-box;
}
a{
  &:link,&:visited,&:hover,&:active{
    text-decoration: none !important;
    text-underline: none !important;
  }
}
.c-999{color: #999;}
.c-f25a2b{color: #f25a2b}
.c-35{color: #353535;}
.c-8b{color: #8b8b8b;}
.c-27a1e5{color: #27a1e5 !important}
.c-ccc{color: #ccc;}
.c-f00{color: #ff0 !important;}
.c-fa525b{color: #fa525b !important;}
.c-fff{color: #fff !important}
.required{color: red !important;position: relative;left: 6px;font-size: 14px;}//必填项标记
.text-center{text-align: center;}
.text-left{text-align: left;}
.fl{float: left;}
.fr{float: right;}
.f-s-13{font-size: 13px;}
.f-s-14{font-size: 14px;}
.f-s-24{font-size: 24px;}
.w80{width: 80%;}

.fa{margin-right: 8px;}
.ivu-modal-footer{
  .btn{
    margin: 0 10px;
  }
}
.btn-disabled{
  opacity: .6;
}
//*   UI   *//
.cursor-pointer{
  cursor: pointer;
}
.select-box{
  border: 1px solid #e7ecf1;
  padding: 2px 20px 2px;
  text-align: left;
  .caption-box{
    margin: 4px 0;
    border-bottom: 1px solid #eef1f5;
    .caption{
      padding: 8px 0;
      display: inline-block;
      color: #666;
      font-size: 16px;
      margin-left: 15px;
      font-weight: bold;
    }
  }
  .select-date{
    margin: 16px 10px;
    height: 34px;
  }
  .filter-box{
    margin: 18px -4px;
    height: 34px;
  }
}
.chart-box{
  height: 600px;
}
.panel-box{
  margin-top: 20px;
  margin-bottom: 20px;
    border: 1px solid #34495e;
    padding-bottom: 6px;
    min-height: 600px;
  .panel-title{
    height: 40px;
    line-height: 20px;
    text-align: left;
    font-size: 14px;
    padding: 10px 18px;
    background: #34495E;
    color: #fff;
  }
  .panel-body{
    padding: 15px;
    table{
      word-wrap: break-word;
      word-break: break-all;
      td{
        padding: 5px;
        vertical-align: middle;
        line-height: 30px;
      }
    }
    thead{
      background: #eee;
      color: #333;
      font-weight: bold;
    }
    .select-item{
      width: 100px;border-radius: 5px;height: 25px;
    }
  }
}

#loading{
  // height: 100px;
  // // width: 150px;
  // padding-top: 10px;
  position: absolute;
  text-align: center;
  // font-size: 14px;
  // color: #515151;
  z-index: 100;
  top: 40%;
  left: 50%;
  // line-height: 40px;
  // background: rgba(250,250,250,0.9);
  // border-radius: 10px;
}


//修改bootstrap样式
.control-label{
  padding: 0 !important;
  font-weight: 500;
}
.ui-dropdown{
  position: relative;
}

//子页面，通过z-index将母页面遮挡住
.child-page{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 202;
  background: #f4f4f4;
}

//modal样式
.modal-normal-row{
  padding-left: 30px;
  margin-bottom: 20px;
  line-height: 34px;
}
.el-form-item__label{
  text-align: left;
}

.download{
  cursor: pointer;
}
</style>
