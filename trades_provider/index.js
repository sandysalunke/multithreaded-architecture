const connection = require('./connection');
const trades = require('./trades');

const port = 2114;
const host = 'localhost';

function start() {
    return connection.connect(port, host).then((conn) => {
        console.log('Connected to feature server and now subscribing for trades');
        trades.init(conn);
    });
}

start();