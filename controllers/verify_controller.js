const User = require('../models/user').User;
const queue = require('../config/kue');
const verificationMailWorker = require('../workers/verfication_mail_worker');
module.exports.index = function (req, res) {
    var vcode = req.params.code;
    console.log(vcode);
    if (vcode == 'notverified') {
        if (req.user) {
            return res.render('verify', {
                notverified: true,
                user: req.user
            });
        }
        else {
            return res.redirect('/');
        }
    }
    else {
        User.findOne({ verificationCode: vcode }, function (err, user) {
            if (err) {
                console.log('Error verifying user with vcode: ' + vcode);
                return res.render('error');
            }
            if (!user) {
                return res.redirect('/');
            }
            user.verified = 1;
            user.save();
            req.flash('success', 'Verified , now Log in');
            return res.redirect('/');
        });
    }

}

module.exports.resendverification = async function (req, res) {
    try {
        console.log(req.body);
        let user = await User.findById(req.body.id);
        // console.log(user);
        let verifyMail = queue.create('verification_mails', user).save(function(error){
            if(error){
                console.log('error in sending mail'+ error);
                return;
            }
            else console.log('verification mail sent , with job ID '+verifyMail.id);
            
        });
        res.send(200, { status: "success", message: "mail sent successfully" });

    } catch (err) {
        return res.send(200, { "status": "error", "message": "error in sending mail" });
    }
}