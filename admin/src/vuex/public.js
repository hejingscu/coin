import axios from 'axios'
import * as api from '@/api/api'

const state = {
    parentBarNode: {},
    allDepartments: [],
    userProfile: {},
    allPlatform: [],
    menuList: [],
    leftNav: []
}
const normalUrl = '/funds-account-admin'
const ecardUrl = '/funds-ecard-admin'
const checkstandUrl = '/funds-checkstand-admin'

const actions = {
    //框架通用action
    //左导航节点变化
    changeParentBarNode({ commit }, data) {
        commit('changeParentBarNodeMutation', { data: data })
    },
    clearParentBarNode({ commit }) {
        commit('clearParentBarNodeMutation')
    },
    //业务action
    //根据顶部主导航更新左导航(如：e卡、积分、支付中心)
    saveMenuToStore({ commit,params }, data) {
        commit('saveMenuToStoreMutation', { data: data})
    }
}

const mutations = {
    clearParentBarNodeMutation: (state) => {
        state.parentBarNode = {}
    },
    changeParentBarNodeMutation: (state, { data }) => {
        state.parentBarNode = data
    },
    saveMenuToStoreMutation: (state, {data})=> {
        data.forEach(item=>{
            item.isOpen = false
            if(item.menuResults.length>0){
                let childData = item.menuResults
                childData.forEach(childItem=>{
                    childItem.isOpen = false
                })
            }
        })
        state.leftNav = data
    },
    changeLeftNavMutation: (state, {leftNav})=> {
        state.leftNav = leftNav
    }
}

const getters = {
    getParentBarNode: state => {
        return state.parentBarNode
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}