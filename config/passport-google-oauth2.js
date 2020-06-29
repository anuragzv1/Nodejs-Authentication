const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user').User;
const credentials = require('../config/credentials.json');

passport.use(new googleStrategy({
    clientID: credentials["google-client-id"],
    clientSecret: credentials["google-client-secret"],
    callbackURL: credentials["google-oauth-callbackurl"]
}, function (accessToken, refreshToken, profile, done) {
    //finding the user with the google email
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if (err) {
            console.log('Error in Google Oauth ');
            return;
        }
        console.log(profile);
        //if user is found req.user = user
        if (user) return done(null, user);

        //if user is not found then create a user and then set req.user = user
        else {
            User.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                password: crypto.randomBytes(16).toString('hex'),
                verificationCode: crypto.randomBytes(16).toString('hex'),
                verified:1
            }, function (error, new_user) {
                if (error) {
                    console.log('Error creating user with Google-OAuth2');
                    return;
                }
                return done(null, new_user);
            });
        }

    });
}));


module.exports = passport;