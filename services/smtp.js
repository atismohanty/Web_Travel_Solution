const nodemailer = require("nodemailer");
const config = require('config');

async function SendEmail(body) {
  console.log('request body', config.get("emailAddress"), config.get("passKey"));
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: config.get("smtpServer"),
    port: config.get("port"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.get("emailAddress"), // generated ethereal user
      pass: config.get("passKey"), // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.get("emailAddress"), // sender address
    to:  'atismohanty8711@gmail.com', // list of receivers
    subject: "There is an enquiry request from :" + body.name, // Subject line
    text: "", // plain text body
    html: "<b>Dear "+ config.get("adminName") +",</b><br/><p>There is an enquiry request made by " + body.name + " . Please kindly get in touch with" +
    " the person. Additional information listed below</p>" +
    " <br/> <p>Contact No : " +body.contactNo + "</p> <p>Email Address : " +body.email + "</p>" +
    "<p> Additional Info. : " +body.comments +
    "<p>Thanks</p>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports= {sendMail: SendEmail};