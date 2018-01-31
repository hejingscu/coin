<template>
  <div class="text-center" style="line-height: 400px">
    欢迎来到资金服务管理系统<span v-if="!userProfile.phone">，请<a href="javascript:;" style="color: #27a1e5;margin: 0 4px;" @click="toLogin">登录</a></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
  	...mapGetters(['userProfile'])
  },
  methods: {
  	toLogin(){
  		if( document.location.host.indexOf('trc.com') != -1 ) {
          document.location.href = 'http://passport.trc.com/login?redirectUrl=' + window.location.href;
        }else {
          this.$router.push("/login")
        }
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
