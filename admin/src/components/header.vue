<template lang="html">
  <div class="header" style="font-size: 14px;padding: 0">
    <div class="project-name fl" style="padding-left: 20px;">
      <img src="../img/logo.jpg" height="30" width="30" alt="" style="margin-right: 6px;position: relative;top: -2px;">
      coin系统
    </div>
    <div style="margin-left: 20px;background: #2b3643;position: relative;z-index: 10;">
      <div class="fr user-menu">
        <li class="li-item ui-dropdown userInfo" v-if="userProfile.phone"  @click="toLogin()">
          <a href="javascript:;">
            退出登录
          </a>
        </li>
        <li class="li-item ui-dropdown userInfo" v-if="userProfile.phone">
          <a href="javascript:;">
            欢迎你，<span>{{userProfile.phone}}&nbsp;</span><span class="touxiang"><img :src="userProfile.avatar"></span>
          </a>
        </li>
        <!-- <li class="li-item ui-dropdown userInfo" v-if="!userProfile.phone"  @click="toLogin()">
          <a href="javascript:;" style="color: #27a1e5 !important">
            当前尚未登录，请登录
          </a>
        </li> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '@/api/api'
export default {
    data(){
      return {
        showTab: -1
      }
    },
    computed: {
      ...mapGetters(['userProfile'])
    },
    methods: {
      toLogin(){
        api.logout().then(res=>{
          this.$router.push("/login")
        })
      }
    },
    created: function(){
      let that = this
      this.$store.dispatch("getProfile", ()=>{})
    }
}
</script>

<style lang="scss" scoped>
.project-name{
  font-size: 18px;
  font-weight: bold;
  line-height: 50px;
}
.header .li-item:hover{
  background: #364150;
}
.header{
  .droplist{
    background: #fefefe;
    position: absolute;
    width: 100%;
    z-index: 80000;
    text-align: center;
    border: 1px solid #e9e9e9;
    li{
      width: 100%;
      &:hover{
        background: #f3f3f3;
      }
    }
    li,a{
      color: #515151;
      font-size: 14px;
      font-weight: normal;
    }
  }
  ul,li,a{
    color: #fff;
  },
  .li-item{
    //padding: 0 14px;
    text-align: center;
    min-width: 100px;
    display: block;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    float: right;
    vertical-align: middle;
    height: auto;
    position: relative;
  }
  .touxiang{
    margin-left: 20px;
    height: 40px;
    width: 40px;
    display: inline-block;
    img{
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
}

.ui-dropdown-menu{
  width: 100%;
  position: absolute;
  top: 50px;
  right: 0;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
}
//动画
.slide-fade-enter-active {
  transition: all .5s ease;
}

.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}

.main-menu{
  margin-left: 40px;
  li{
    width: 180px;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
  }
}
.user-menu{
  li{
    min-width: 180px;
    text-align: center;
    padding: 0 20px;
  }
}
</style>
