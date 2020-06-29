const forgotPasswordMailer = require('../mailers/forgot_password_mailer');
const queue = require('../config/kue');


//this is the forgot password email sender worker!!

queue.process('forgot_password_mails',function(job, done){
    console.log('Email worker is processing a job! '+ job.data);
    forgotPasswordMailer.newForgotPasswordMail(job.data);
    done();
});