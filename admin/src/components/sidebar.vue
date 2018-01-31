<template lang="html">
  <div class="sidebar" style="font-size: 13px;"><!--  ### {{ggg}} ### -->
    <!-- {{navList}} -->
      <ul class="root-item">
        <li v-for="(item, index) in leftNav" class="li-nav">
          <a v-bind:href="item.menuUrl || 'javascript:;'" @click="toggle(leftNav,index)" :class="{ current: item.childOpen}">
            <i class="fa" :class="{ 'fa-calendar': !item.iconEmpty, 'fa-android': item.icon }"></i>
            {{item.menuName}}
            <div class="arrow" v-if="item.menuResults && item.menuResults.length > 0">
              <i v-if="item.isOpen" class="fa fa-angle-down"></i>
              <i v-else class="fa fa-angle-right"></i>
            </div>
          </a>
          <transition name="slide-fade">
            <ul class="child-item ul-nav" v-if="item.menuResults && (item.menuResults.length > 0) && item.isOpen">
              <li v-for="(child, index) in item.menuResults" class="li-nav">
                <a v-bind:href="child.menuUrl || 'javascript:;'" :class="{ current: child.isOpen }">
                  <i class="fa fa-circle"></i>{{child.menuName}}
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
  </div>
</template>

<script>
import router from '../router'
import {mapGetters} from 'vuex'
export default {
    data(){
      return {
            baseList: [{ menuUrl: '#/index', text: '主页', isOpen: false}]
      }
    },
    computed: {
      ...mapGetters(['leftNav'])
    },
    methods: {
      //展开/收起 父级菜单
      toggle(list, index){
        var postList = Array.prototype.slice.call(JSON.parse(JSON.stringify(list)))
        if(postList[index].isOpen){
          postList[index].isOpen = false
        }else{
          postList[index].isOpen = true
        }
        this.$store.commit("changeLeftNavMutation", {leftNav: postList})
      },
      //构建菜单栏
      createFun(text){
        if(!!this.$route.path && this.$route.path !== '/'){
          for(let i = 0;i<this.leftNav.length;i++){
            if((('#' + this.$route.path).indexOf(this.leftNav[i].menuUrl) !== -1) && (this.leftNav[i].menuUrl !== '')){
              //对当前路由下的 导航父级菜单做处理
              this.leftNav[i].isOpen = true;
              //针对三级菜单,目前最多允许三级菜单（如列表下的详情页，详情页tab在左导航是不存在的，但在页面的头部面包屑导航中存在 首页●xx列表页●xx详情页）
              if((('#' + this.$route.path) !== this.leftNav[i].menuUrl) && (this.leftNav[i].menuUrl !== '')){
                this.$store.dispatch("changeParentBarNode",this.leftNav[i])
              }
            }
            if(this.leftNav[i].menuResults){
              for(let j=0;j<this.leftNav[i].menuResults.length;j++){
                //对当前路由下的 导航子级菜单做处理
                if((('#' + this.$route.path).indexOf(this.leftNav[i].menuResults[j].menuUrl) !== -1)  && (this.leftNav[i].menuResults[j].menuUrl !== '')){
                  this.leftNav[i].menuResults[j].isOpen = true;
                  this.leftNav[i].childOpen = true;
                  this.leftNav[i].isOpen = true;
                  //同上
                  if((('#' + this.$route.path) !== this.leftNav[i].menuResults[j].menuUrl) && (this.leftNav[i].menuResults[j].menuUrl !== '')){
                    this.$store.dispatch("changeParentBarNode",this.leftNav[i].menuResults[j])
                  }
                }
              }
            }
          }
          if(text == 'byRouteChange'){
            this.$store.commit("changeLeftNavMutation", {leftNav: Array.prototype.slice.call(this.leftNav)})
          }
          
        }else{
          let firstRouter = this.leftNav[0]
          firstRouter.isOpen = true
          this.$router.push(firstRouter.menuUrl.substring(1))
        }
      },
      preCreate(text){
        let that = this
        router.beforeEach((to, from, next) => {
          that.leftNav.forEach( item => {
              //重置父级菜单
              item.isOpen = false
              item.childOpen = false
              if(item.menuResults){
                item.menuResults.forEach(childItem =>{
                  //重置子级菜单
                  childItem.isOpen = false
                })
              }
            }) 
          next()
        })
        this.createFun(text)
      }
    },
    created: function(){
      let that = this
    },
    watch: {
      //路由变化时重新构建菜单栏
      '$route.path': {
        handler(newVal,oldVal){
          this.preCreate('byRouteChange')
        }
      },
      'leftNav': {
        handler(newVal,oldVal){
          if(oldVal.length<1){
            this.preCreate()
          }
        },
        deep: true
      }
    }
}
</script>

<style lang="scss" scoped>

.sidebar{
      overflow: hidden;
      .root-item{
            .current,.current:link,.current:visited,.current:hover,.current:active{
                  background: #36c6d3;
            }
      }
      .child-item{
            .current,.current:link,.current:visited,.current:hover,.current:active{
                  background: #3e4b5c;
            }
      }
      .li-nav{
            position: relative;
            line-height: 40px;
            border-top: 1px solid #3d4957;
            cursor: pointer;
            .arrow{
                  display: inline-block;
                  position: absolute;
                  top: 0;
                  right: 4px;
            }
            .ul-nav{
                  .li-nav{
                        a{
                              padding-left: 32px;
                        }
                  }
            }
            a{
                  padding-left: 20px;
                  color: #fff;
                  line-height: 40px;
                  height: 40px;
                  display: inline-block;
                  width: 100%;
                  &:hover{
                        background: #2c3542;
                  }
            }
      }
}

//动画
.slide-fade-enter-active {
  transition: all .5s ease;
}

.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>