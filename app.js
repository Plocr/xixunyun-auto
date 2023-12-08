const axios = require('axios')
const qs = require('./utils/qs')
const sendEmail = require('./utils/email') //需要邮件通知请配置CODE和EMAIL，自己发给自己，并且下面注释打开
const data = qs.data
const signdata = qs.signdata
const headers = qs.headers
const loginApi = qs.loginApi

//登录
function login() {
  return new Promise((resolve, reject) => {
    axios.post(loginApi, data, { headers }).then((res) => {
      if (res && res.data && res.data.data) {
        resolve(res.data.data.token)
      } else {
        reject()
      }
    })
  })
}

//签到提交
function sign(token) {
  const signApi = qs.signApi(token)
  axios.post(signApi, signdata, { headers }).then((res) => {
    if (res && res.data) {
      console.log(res.data.code + ',' + res.data.message)
      wechatSend('习讯云签到提交', res.data.message)
      // sendEmail('习讯云签到提交', res.data.message)
    }
  })
}

//发送邮件
function sendEmail(type,msg){
    mailOptions.subject += type
    mailOptions.text = msg
    tansporter.sendMail(mailOptions,(err,data) => {
        if(err){
            console.log("发送邮件失败");
        }else{
            console.log("发送邮件成功");
        }
    })
}
