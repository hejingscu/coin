<template lang="html">
  <span class="download"  @click="download()">
    <i class="fa fa-arrow-down"></i>导出
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '@/api/api'
import * as moment from 'moment'
export default {
    data(){
      return {
      }
    },
    props:{
      //管理后台类别 (e卡，收银台，积分等)
      mainType: {
        type: String,
        default: ''
      },
      //导出种类（绑定、红包、退款记录等）
      reportType: {
        type: String,
        default: ''
      },
      //其他筛选项（日期、手机号等）
      filterOption: {
        type: Object,
        default: {}
      }
    },
    methods: {
      download() {
        var params = {reportType: this.reportType, mainType: this.mainType}
        if(!this.filterOption.startDate && !this.filterOption.endDate){
          params.month = moment(new Date()).format('YYYYMM')
        }else if(this.filterOption.startDate && this.filterOption.endDate){
          params.month = moment(this.filterOption.startDate).format('YYYYMM')
          params.toMonth = moment(this.filterOption.endDate).format('YYYYMM')
        }else{
          this.filterOption.startDate ? (params.month = moment(this.filterOption.startDate).format('YYYYMM')) : ''
          this.filterOption.endDate ? (params.month = moment(this.filterOption.endDate).format('YYYYMM')) : ''
        }
        console.log(params)
        var url = '/funds-report-admin/' + params.mainType + '/' + params.reportType + '/' + params.month + (params.toMonth ? ('/' + params.toMonth) : '')
        window.open(url)
      }
    },
    created: function(){
    },
    watch: {

    }
}
</script>