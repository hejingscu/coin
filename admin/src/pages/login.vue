<template>
  <div>
    手机号<input type="text" v-model="formData.phone">
    <br>
    密码<input type="password" name="" id="" v-model="formData.password">
    <br>
    <button @click="submit()">提交</button>
  </div>
</template>
<script>
import * as api from 'src/api/api'
export default {
  data(){
    return{
      formData:{
        phone: '18112341234',
        password: '123456'
      }
    }
  },
  methods:{
    submit(){
      api.login($.param(this.formData)).then(res=>{
        this.$router.push('/index')
        this.$store.dispatch("getProfile",()=>{
          this.$store.dispatch("getMenu")
        })
      })
    }
  },
  created(){
    // var data = "[{a:1,b:2},{a:3,b:4}]";
    // var data1 = JSON.stringify([{a:1,b:2},{a:3,b:4}]);
    // $.ajax({
    //   url: '/house/qiniu/test',
    //   type: 'POST',
    //   dataType: 'json',
    //   contentType: 'application/json; charset=UTF-8',
    //   data: {"test": data},
    //   success: function(){

    //   },
    //   error: function(){

    //   }
    // })
  }
}
</script>

