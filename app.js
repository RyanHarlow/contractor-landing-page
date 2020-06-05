const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()
const nodemailer = require('nodemailer');


var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD // naturally, replace both with your real credentials or an application-specific password
   }
});

app.post('/mail', (req, res) => {

   let {name, phone, email, message} = req.body
   let messageText =
       `name: ${name}\n
        phone: ${phone}\n
        email: ${email}\n
        message: ${message}`
   console.log(req.body)
   const mailOptions = {
      from: process.env.EMAIL,
      to: 'ryanharlow95@gmail.com',
      subject: 'New Lead',
      text: messageText
   };

   transporter.sendMail(mailOptions, function(error, info){
      if (error) {
         console.log(error);
         res.status(500).send({err: 'message not sent'})
      } else {
         console.log('Email sent: ' + info.response);
         res.status(200).send({ success: "message sent" });
      }
   });
})

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(3000, () => {
   console.log(`app listening on port 3000`)
});






