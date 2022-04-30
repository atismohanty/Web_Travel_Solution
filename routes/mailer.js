var express = require('express');
var router = express.Router();
var smtpjs =  require("../services/smtp");

router.post('/', function(req, res, next) {
  const body = req.body;
  console.log('request body',req.body);
  smtpjs.sendMail(body).then(() => {
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json({message: 'Mail sent successfully'});
  }).catch(err => 
    {
      console.log('mail error ', err);
      return res.status(500).json({message: 'something went wrong', debug: err});
    });
    
});

module.exports = router;
