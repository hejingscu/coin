// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import components from './components/' //加载公共组件
import store from './vuex/store.js'
import filter from './utils/filter'
import core from './utils/core'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import _ from 'lodash'

Vue.use(ElementUI)

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'


Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`${name}`, components[key])
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})