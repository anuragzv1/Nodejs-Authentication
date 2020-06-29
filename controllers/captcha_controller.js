
const request = require('request');
const credentials = require('../config/credentials.json')

//this function pings the Google servers to Check the Authenticity of the captcha
module.exports.verifyCaptcha = function(req , res){
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${credentials["recaptcha-secret-key"]}&response=${req.body.captcha}`;
    request(verifyUrl,(err,response,body)=>{
        
        body = JSON.parse(body);
        console.log(body);
        
        if(err){
            console.log(err);
            res.json({"status":"error"});
        }
        if(body.success==false || body.score < 0.4){
            return res.json({"status":"error"});
        }
        return res.json({"status":"success"});

    });
}