const queue = require('../config/kue');

const verificationMailer = require('../mailers/verfication_mailer');
//this is the verification code email sender worker!!

queue.process('verification_mails', function (job, done) {
    console.log('Email worker is processing a job! ' + job.data);
    verificationMailer.newVerficationMail(job.data);
    done();
});