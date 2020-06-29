const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const credentails = require('../config/credentials.json');


//transporter configs!
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:'587',
    secure:false,
    auth:{
        user:credentails["nodemailer-email-username"],
        pass:credentails["nodemailer-email-password"]
    }
});

//template render engine configurations
let renderTemplate = (data , relativePath)=>{
    let mailHtml;
    ejsPath = path.join(__dirname , '../views/mailers' , relativePath);
    console.log(ejsPath);
     ejs.renderFile(
        ejsPath,
        data,
        function(err ,template){
            if(err){
                console.log('Error in rending template in nodemailer' ,err);
                return ;
            }
            console.log('successfully rendered template');
            mailHtml = template;
        }
    );
    return mailHtml;
}

//exporting transporter and Renderer
module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}