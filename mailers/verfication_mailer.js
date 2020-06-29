const nodemailer = require('../config/nodemailer');
const ejs = require('ejs');

//after the user signsup then send the new verification mail
exports.newVerficationMail =(user)=>{
    htmlData =  nodemailer.renderTemplate({user:user} , '/verification/verification.ejs');
    nodemailer.transporter.sendMail({
        from:'Codeial Mails',
        to:user.email,
        subject:'Verification ✔',
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