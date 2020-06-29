//requiring various modules
const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local');
const googleStrategy = require('./config/passport-google-oauth2');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMW  = require('./config/middlewares');
const noty = require('noty');
const cookieParser = require('cookie-parser');

//setting up middlewares & app
const app = express();
app.use('/public' , express.static(path.join(__dirname , 'public')));
const db = require('./config/mongoose');
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//View Engine setup
app.set('views' , path.join(__dirname , 'views'));
app.set('view engine', 'ejs');


//sessions and passport
app.use(session({
    name: 'codial',
    //TODO change secret when deploying to production
    secret: 'codial-cookie',
    store: new MongoStore({ mongooseConnection: db }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);
app.use(flash());
app.use(customMW.setFlash)
app.use(customMW.setCredentialsInEjs);

//setting routes
app.use('/', require('./routes/index'));


//starting app
app.listen(port , function(err){
    if(err){
        return console.log('Error in connecting to the server', err);
    }
    console.log(`server running at port ${port}`);
    
});
