const nodemailer = require('../config/nodemailer');
const ejs = require('ejs');

//If the user forgets the mail, then send the new mail to user

exports.newForgotPasswordMail =(user)=>{
    htmlData =  nodemailer.renderTemplate({user:user} , '/ForgotPassword/forgotpass.ejs');
    nodemailer.transporter.sendMail({
        from:'Codeial Mails',
        to:user.email,
        subject:'Password Reset',
        html:htmlData
    }, (err, info)=>{
        if(err){
            console.log('ERROR SEDING MAIL' , err);
            return;
        }
        else{
            console.log('Mail sent' , info);
            return;
        }
    });
}