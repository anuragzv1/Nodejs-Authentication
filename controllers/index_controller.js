const { User } = require("../models/user");

module.exports.index = function(req , res){
    if(req.user){
        return res.render('profile');
    }
    else return res.render('index');
}
