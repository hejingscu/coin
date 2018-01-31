import Vue from 'vue'
import moment from 'moment'
import * as api from 'src/api/api'

//删除对象中的空串和空数组
Vue.prototype.deps= function(obj){
    let object = Vue.prototype.copy(obj);
    for (var i in object) {
        var value = object[i];
        // sodino.com
        // console.log('typeof object[' + i + ']', (typeof value));
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                if (value.length == 0) {
                    delete object[i];
                    //console.log('delete Array', i);
                    continue;
                }
            }
            //this.deleteEmptyProperty(value);
            if (isEmpty(value)) {
                //console.log('isEmpty true', i, value);
                delete object[i];
                //console.log('delete a empty object');
            }
        } else {
            if (value === '' || value === null || value === undefined) {
                delete object[i];
                //console.log('delete ', i);
            } else {
                //console.log('check ', i, value);
            }
        }
    }
    return object
}

Vue.prototype.formatTime = function(str){
    return moment(str).format('YYYY-MM-DD')
}

Vue.prototype.quickDateFormat = function(obj,num){
    switch(num){
        case 1:
            obj.startDate = ''
            obj.endDate = ''
            break;
        case 2:
            obj.startDate = obj.endDate = moment(new Date()).subtract('days',1)
            break;
        case 3:
            obj.startDate = moment(new Date()).subtract('days',6)
            obj.endDate = new Date()
            break;
        case 4:
            obj.startDate = moment(new Date()).subtract('days',30)
            obj.endDate = new Date()
            break;
        default: 
            break;
    }
}

//格式化起止时间
Vue.prototype.formatTwoTime = function(obj){
    obj.startDate ? (obj.startDate = moment(obj.startDate).format('YYYY-MM-DD') + ' 00:00:00') : ''
    obj.endDate ? (obj.endDate = moment(obj.endDate).format('YYYY-MM-DD') + ' 23:59:59') : ''
}

//将filterOption的xx-xx-xx转换至毫秒
Vue.prototype.toMsec = function(obj){
    obj.startDate && (obj.startDate = new Date(obj.startDate + ' 00:00:00').getTime())
    obj.endDate && (obj.endDate = new Date(obj.endDate + ' 23:59:59').getTime())
    delete obj.startDate
    delete obj.endDate
    return obj;
}

//引用对象  浅复制
Vue.prototype.copy = function(obj){
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

//局部复制
Vue.prototype.littleCopy = function(obj, option){
    var newobj = {};
    //遍历需要的key，局部复制完成后，给在源对象中不存在单需要的key赋空值，若不传option则复制全部
    if(option){
        //遍历对象key，复制需要的key
        for ( var attr in obj) {
            if(option.indexOf(attr) !== -1){
                newobj[attr] = obj[attr];
            }
        }
        option.forEach( item => {
            if(!obj[item])
                newobj[item] = ''
        })
    }else{
        for ( var attr in obj) {
            newobj[attr] = obj[attr];
        }
    }
    return newobj;
}

//将查询项filterOption打入url
Vue.prototype.pushUrlPrams = function(obj){
    let urlParam = '', href = window.location.href
    for ( let key in obj) {
        if(obj[key]!==''){
            urlParam = urlParam + key + "=" + obj[key] + "&";
        }
    }
    if(href.indexOf("?")!==-1){
        urlParam = href.substring(0, href.indexOf("?")+1) + urlParam.substring(0,urlParam.length-1);
    }else{
        urlParam = href + '?' + urlParam.substring(0,urlParam.length-1);
    }
    return urlParam;
}
//获取url参数并返回为对象
Vue.prototype.getUrlPrams = function(){
    let hash = window.location.hash,url = hash.substring(hash.indexOf('?')+1, hash.length);
    let urlString = url.split('&');
    var res = {};
    for(var i = 0;i<urlString.length;i++){
        var str = urlString[i].split('=');
        res[str[0]]=str[1];
    }
    return res;
}

//验证表单必填项有无空值
Vue.prototype.checkFormEmpty = function(obj, required){
    let result = false
    for(var i in obj){
        if(required){
            if(required.indexOf(i) !== -1){
                if(obj[i] && obj[i] !== ''){ 
                    result = true 
                }
                else{ 
                    result = false; 
                    return false;
                }
            }
        }else{
            if(obj[i] && obj[i] !== ''){ 
                result = true 
            }
            else{ 
                result = false; 
                return false;
            }
        }
    }
    return result;
}


function isEmpty(object) {
    for (var name in object) {
        return false;
    }
    return true;
}

//统一导出功能
//params（筛选条件 obj类型）， url（接口地址，string），时间是否必传
Vue.prototype.pubDownload = function(params, url, needTime){
    if((params.startDate && params.endDate && needTime) || !needTime){
        let urlParam = ""
        for(var key in params){
            urlParam = urlParam + key + "=" + params[key] + "&";
        }
        urlParam=urlParam.substring(0,urlParam.length-1);
        window.open('/score-admin/' + url + params.platformCode + '?' + urlParam);
    }else{
        this.$message({type: 'error',message: '请选择起止时间!'});
    }
}
//拼接url
Vue.prototype.concatUrl = function(params){
    let option = params,urlParam = ""
    for(let key in option){
        urlParam = urlParam + key + "=" + option[key] + "&"
    }
    return urlParam.substring(0,urlParam.length-1)
}

Vue.prototype.transferPageOption = function(obj){
    return {limit:obj.pageSize,skip:(obj.pageNo-1)*obj.pageSize+1}
}


//组装分页请求接口req参数
// Vue.prototype.concatReqParams = function(pageOption, filterOption){
//     return Vue.prototype.deps($.extend(Vue.prototype.transferPageOption(pageOption),filterOption))
// }