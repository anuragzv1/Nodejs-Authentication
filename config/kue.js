const kue = require('kue');
const creds = require('../config/credentials.json');
const queue = kue.createQueue({
    prefix: 'q',
    redis: {
        port: creds["redis-port"],
        host: creds["redis-host"],
        auth: creds["redis-password"],
        db:'codeial'
    }
});

module.exports = queue;
