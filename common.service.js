const nodemailer = require("nodemailer");


exports.sendMail =  async function(email){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "chinthanamysore17@gmail.com", // generated ethereal user
          pass: "wpzfzayiofnjcdzk", // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: 'chinthanamysore17@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Please verify your email test mail", // plain text body
    // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      return info
}

exports.sendPassword = async (receiver,password)=>{
  console.log("here we need to send password" ,receiver,password )
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "chinthanamysore17@gmail.com", // generated ethereal user
      pass: "wpzfzayiofnjcdzk", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: 'chinthanamysore17@gmail.com', // sender address
    to: receiver, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Your PAssword is ->>>>>>> " + password, // plain text body
// html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info
}


