<template lang="html">
  <div class="page-bar">
      <a href="#/index">首页</a>
      <span v-if="sysMap[sysText]"><i class="fa fa-circle"></i><a href="javascript:;">{{sysMap[sysText]}}</a></span>
      <span v-if="getParentBarNode.text"><i class="fa fa-circle"></i><a v-bind:href="getParentBarNode.url">{{getParentBarNode.text}}</a></span>
      <i class="fa fa-circle"></i><a href="javascript:;">{{name}}</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import router from '../router'
export default {
    data(){
      return {
        name: this.$route.name,
        sysText: '',
        sysMap: {
          'checkstand': '收银台管理',
          'ecard': 'e卡管理',
          'score': '积分管理'
        }
      }
    },
    computed: {
        ...mapGetters(['getParentBarNode'])
    },
    mounted(){

    },
    created: function(){
      this.sysText = window.location.hash.split('/')[1]
      router.beforeEach((to, from, next) => {
        this.sysText = to.path.split('/')[1]
        if(to.path !== from.name){this.name = to.name}
        if(this.getParentBarNode.text){
          this.$store.dispatch("clearParentBarNode")
        }
        next()
      })
    },
    watch: {
      
    }
}
</script>

<style lang="scss" scoped>
.fa-circle{
  margin: 0 6px;
}
.page-bar{
  a{
    color: #515151;
  }
}
</style>