<template>
  <div>
    手机号<input type="text" v-model="formData.phone">
    <br>
    密码<input type="password" name="" id="" v-model="formData.password">
    <br>
    <button @click="login()">登录</button>
    <button @click="register()">注册</button>
  </div>
</template>
<script>
import * as api from 'src/api/api'
export default {
  data(){
    return{
      formData:{
        phone: '18512341234',
        password: '123456'
      }
    }
  },
  methods:{
    jump(){
      this.$router.push('/index')
      this.$store.dispatch("getProfile",()=>{
        this.$store.dispatch("getMenu")
      })
    },
    login(){
      api.login($.param(this.formData)).then(res=>{
        this.$message({message: '登录成功',type: 'success'});
        this.jump()
      })
    },
    register(){
      api.register($.param(this.formData)).then(res=>{
        this.$message({message: '注册成功',type: 'success'});
      })
    }
  },
  created(){

  }
}
</script>

