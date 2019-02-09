const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config/config');
const smtpTransport = require('nodemailer-smtp-transport');

const transport = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
    user: config.email,
    pass: config.password
  }
}));




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/member/submit',  (req, res) => {


  const mailOptions = {
    from: `${req.body.name} <${config.email}>`,
    to: 'baehynebin@naver.com',
    subject: '숭실대학교 ISTeam 23기 가입 지원서',
    html: `<p><img src="http://purplebeen.kr/images/logo.png"/></p>
            <h1>숭실대학교 ISTeam 23기 지원서</h1>
            <p>이름 : ${req.body.name}</p><br>
            <p>이메일 : ${req.body.email}</p><br>
            <p>학번 : ${req.body.studentId}</p><br>
            <p>링크 : ${req.body.link}</p><br>
            <p>메시지 : ${req.body.message}</p><br>
        `};

  transport.sendMail(mailOptions, function(error, response){

    if (error){
      console.log(error);
    } else {
      console.log("Message sent : " + response.message);
      res.render('result', {
        name : req.body.name,
        email : req.body.email,
        studentId : req.body.studentId,
        link : req.body.link,
        message: req.body.message
      })
    }
    transport.close();
  });

});

module.exports = router;