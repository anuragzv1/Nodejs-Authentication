const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user').User;
const crypto = require('crypto');


//this function creates a new Local strategy and initializes passport js to use it
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, usr) {
            if (err) {
                console.log(err);
                return done(err);
            }
            else if (usr == null || usr.length == 0 || usr.password != crypto.createHash('md5').update(password).digest('hex')) {
                console.log('wrong pass or user not found');
                return done(null, false, { message: 'invalid username / password' });
            }
            else {
                console.log('user authenticated');
                return done(null, usr);
            }
        });
    }
));



//setting the req.user
passport.serializeUser(function (usr, done) {
    return done(null, usr.id);
});


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, usr) {
        if (err) return done(err);
        return done(null, usr);
    });
});


//middleware to check if the user is authenticated or not instead of writing common code again and again
passport.checkAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

//if the user is logged in that is req.user exitst then then this middleware redirects the user to the profile page
passport.redirectToProfile = function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    next();
}


//sets locals to be used in EJS to req.user
passport.setAuthUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains current signed in user and we are sending to to local for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;