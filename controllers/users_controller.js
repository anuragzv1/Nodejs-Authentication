const express = require('express');
const crypto = require('crypto');
const User = require('../models/user').User;
const queue = require('../config/kue');
const verificationMailWorker = require('../workers/verfication_mail_worker');
const forgotPasswordMailWorker = require('../workers/forgot_password_mail_worker');
const forgotPassWordMailer = require('../mailers/forgot_password_mailer').newForgotPasswordMail;

//this function is used to register the user after checking if the user already exists or not
module.exports.register = function (req, res) {
    User.find({ email: req.query.email }, (err, usr) => {
        // console.log('*****OLD*****',usr);

        if (err) { res.end('ERR'); return; }
        if (usr.length != 0) {
            res.end('AR');
        }
        else {
            req.query.verificationCode = crypto.randomBytes(16).toString('hex');
            const unencrypted = req.query.password;
            req.query.password = crypto.createHash('md5').update(unencrypted).digest('hex');

            User.create(req.query, function (error, createduser) {
                if (error) {
                    res.end('ERR');
                    return;
                }
                //adding the task to send mail to the worker verificationMailer
                let job = queue.create('verification_mails', createduser).save(function (err) {
                    if (err) {
                        console.log('error adding task to queue');
                        return res.end('ERR');
                    }
                    else {
                        console.log('Job added to queue ' + job.id);
                    }
                });
                res.send(JSON.stringify(createduser));
                console.log('*****NEW*****', createduser);
            });
        }
    });
}


//this function redirects the user to the profile page after successfull authentication by passport.js
module.exports.signin = function (req, res) {
    console.log('User logged in!');
    req.flash('success', 'Logged in');
    return res.redirect('/profile');
};


//this function logs out the user, destroys the session with the help of passport js
module.exports.logout = function (req, res) {
    req.logout();
    req.flash('success', 'Logged out');
    return res.send('loggedout');
}


//this function is fired when the user clicks on forgot password from index (homepage)
module.exports.forgotpass = async function (req, res) {
    var email = req.body.email;
    console.log(req.body);

    try {
        var user = await User.findOne({ email: email });
        if (user) {

            user.resetCode =  crypto.randomBytes(16).toString('hex');

            await user.save();
            forgotPassWordMailer(user);
            res.status(200).json({ "status": "success", "message": "Password reset link sent to mail!" });
        }
        else {
            res.status(200).json({ "status": "success", "message": "Invalid email " });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ "status": "error" });
    }


}

//this function is fired when the forgot mail link's clicked code is checked and accordingly user is redirected
module.exports.resetpassword = async function (req, res) {
    console.log(req.params);
    var resetCode = req.params.code;
    try {
        var userByCode = await User.findOne({ resetCode: resetCode });
        if (userByCode) {
            res.render('resetpage', {
                user: userByCode
            });
            return;
        }
        else return res.redirect('/');

    } catch (error) {
        console.log(error);
        res.status(500).send('<h1>Internal Server Error</h1>');
    }
    res.send("resetted!");
}

//this function will take 2 passwords check them and if same , reset the logged in user's password!
module.exports.changepassword = async function (req, res) {
    console.log(req.body);
    const pass1 = req.body.pass;
    const pass2 = req.body.passConfirm;
    if (pass1 != pass2) {
        res.status(200).json({ "status": "mismatch", "message": "Passwords do not match" });
    }
    else {
        const userByCode = await User.findOne({ resetCode: req.body.code });
        userByCode.password = crypto.createHash('md5').update(pass1).digest('hex');
        userByCode.resetCode = "";
        userByCode.save();
        res.status(200).json({ "status": "changed", "message": "Password Changed" });
    }
}


//if the User is loggedin then he/she dosent need email to change the password only the old password is required
module.exports.loggedinpasschange = async function (req, res) {
    const user_id = req.body.user_id;
    try {

        let user = await User.findById(user_id);
        let encryptedPass = crypto.createHash('md5').update(req.body.current_pass).digest('hex');

        if (!user) {
            res.status(200).json({ "status": "error" });
        }
        else if (user.password != encryptedPass) {
            res.status(200).json({ "status": "unauthorized" });
        }
        else if (user.password == encryptedPass) {
            user.password = crypto.createHash('md5').update(req.body.new_pass).digest('hex');
            user.save();
            res.status(200).json({ "status": "success" });
        }
    } catch (error) {
        if (error) {
            res.status(200).json({ "status": "error" });
        }
    }
}