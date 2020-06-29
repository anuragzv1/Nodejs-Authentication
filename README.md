# Nodejs-Authentication
A complete authentication system which can be used as a starter code for creating any
new application.

### Try the Deployed project here :  https://enigmatic-dawn-54438.herokuapp.com/

This is a complete authentication system built majorly using Node.js, Ejs , Redis and MongoDB.  
## To Set up this App on your Local Device 

1) Clone the project using from https://github.com/anuragzv1/Nodejs-Authentication
2) Extract the Zip and navigate to the root of the extracted folder
3) Open /config/credentials.json and Fill all the fields in the josn, the description of each feild is given below:  
 `google-client-id` : Google OAuth Client ID obtainable from https://console.developers.google.com/  
 `google-client-secret` : Google Oauth Client secret obtainable from https://console.developers.google.com/  
 `google-oauth-callbackurl`: Google Oauth callbak url  
 `nodemailer-email-username`: Nodemailer email's username  
 `nodemailer-email-password` : Nodemailer email's Password   
 `mongodb-atlas-uri`: MongoDB URI  
 `recaptcha-site-key` : Recaptcha site key obtainable from https://www.google.com/recaptcha/intro/v3.html  
 `recaptcha-secret-key`: Recaptcha site secret obtainable from https://www.google.com/recaptcha/intro/v3.html   
 `redis-port`: Port on which redis will run  
 `redis-host`: Redis's host  
 `redis-password` : The password of redis database  
4) Open Terminal
5) Type `npm install` (Make sure node is installed on your System);
6) Run the app using npm start
7) Go to the browser and type localhost:3000

### Salient Features

1) Uses Parallel Job server to reduce load on the Main Server
2) Scalable directory Structure
3) Easily Deployable
4) Includes Google OAuth2
5) Includes Mail Verification of new accounts
6) Intelligent Redirects

### Directory Structure

1) `config` : Contains various cofig files like Kue, Mongoose, Passport local and Google Oauth Strategies etc  
2) `controllers` : Controllers for various pages like index_controller , profile_controller etc
3) `mailers` : Contains Mailers for Reset password and Verify User
4) `public` : All the public css , html , javascript is present in public
5) `routes` : All the routes properly distributed by index.js
6) `views` : All the .ejs files and also Email templates are present here
7) `workers` : Workers for parallel/delayed Jobs 

### Visual

![Homepage / login](/gitimages/login.png)

## Thankyou!

