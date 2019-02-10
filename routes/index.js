const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config/config');
const smtpTransport = require('nodemailer-smtp-transport');

const transport = nodemailer.createTransport(smtpTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: config.email,
    pass: config.password
  }
}));

router.get('/', (req, res) => {
  res.render('index');
});

/* GET home page. */
router.get('/member/submit', function(req, res, next) {
  res.render('form', { title: 'Express' });
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
      res.redirect('/member/finish')
    }
    transport.close();
  });
});

router.get('/member/finish', (req, res) => {
  res.render('result');
});

module.exports = router;