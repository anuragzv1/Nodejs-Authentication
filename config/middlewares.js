const credentials = require('../config/credentials.json');

//this module is a middleware to set flash messages in requests
module.exports.setFlash = function(req , res, next){
    res.locals.flash ={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}

module.exports.setCredentialsInEjs = function(req,res,next){
    res.locals.creds = credentials;
    next();
}