const featureServer = require('./featureServer');

const port = 2114;
const host = 'localhost';

function start() {
    return featureServer(port, host)
}

start();