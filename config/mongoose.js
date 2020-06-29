const mongoose = require('mongoose');
const e = require('express');
const credentials = require('./credentials.json');



//connect to database using mongooose
mongoose.connect(credentials["mongodb-atlas-uri"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log('Connected to db!');
    }
});

//export DB
module.exports = db;