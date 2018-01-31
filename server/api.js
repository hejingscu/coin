const express = require('express')
const cookie = require('cookie-parser');
const router = express.Router()
var expressJwt = require("express-jwt");
const db = require('./db')
var jwt = require('jsonwebtoken');
const app = express()
const mongoose = require('mongoose')
const co = require('co')
mongoose.Promise = global.Promise;  
//app.use(expressJwt({secret: "secret"}).unless({path: ["/login"]}));

app.use(cookie())

//-------公共方法 start --------//
//req是否带有登录token并进行验证
var checkToken = function(req, res, fn){
  if(req.cookies.hjtoken){
    jwt.verify(req.cookies.hjtoken, 'shh', function(err, decoded) {
      if(decoded){
        fn(decoded)//已成功登录
      }else{
        res.send({code: 999, description: '登录状态存在问题，请重新登录'})
      }
    })
  }else{
    res.send(401, {code: 0, description: '您的登录状态已失效，请重新登录'})
  }
}

//-------公共方法 end --------//

var checkUserIsExsit = function(postData){
  return db.User.findOne({ phone: postData.phone })
}

//用户模块api
//查询用户是否存在
router.post('/coin/user/register/exsit', (req, res) => {
  const postData = req.body
  checkUserIsExsit(postData).then( isExsit => {
    if(!isExsit){
      res.json({exsit: false, description: "手机号可使用"})
    }else{
      res.json({exsit: true, description: "用户已存在"})
    }
  })
})

//用户注册
router.post('/coin/user/register', (req, res) => {
  const postData = req.body
  postData.registerTime = new Date().getTime()
  //查询用户是否存在
  checkUserIsExsit(postData).then( isExsit => {
    if(!isExsit){
      db.User.create(postData, (err, doc) => {
        if (err) {
          console.log(err)
        } else if (doc) {
          res.send(JSON.stringify(doc))
        }
      })
    }else{
      res.json({exsit: true, description: "用户已存在"})
    }
  })
})

//用户登录
router.post('/coin/user/login', (req, res) => {
  const postData = req.body
  res.cookie('hjtoken', '', {expires: new Date(0)});//清除之前用户的cookie，若原先就为空，则操作前后无变化
  postData.registerTime = new Date().getTime()
  //查询用户是否存在
  checkUserIsExsit(postData).then( isExsit => {
    if(!isExsit){
      res.json(400, {code: 2, description: "用户不存在"})
    }else{
      if(postData.password !== isExsit.password){
        res.json(400, {code: 1, description: "密码错误"})
        return false
      }
      var token = jwt.sign(postData, 'shh');//写入cookie，将登录手机号与token对应上
      res.cookie('hjtoken', token, {maxAge: 60 * 60 * 1000});
      //res.cookie('mttoken', '123456', { expires: new Date(Date.now() + 900000), httpOnly: true });
      res.json({code: 0, description: "登录成功"})
    }
  })
})

//用户基本信息
router.get('/coin/user/profile', (req, res) => {
  checkToken(req, res, function(decoded){
    db.User.findOne({ phone: decoded.phone} , 'phone registerTime ', (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        res.send(JSON.stringify(doc))
      }
    })
  })
})


module.exports = router