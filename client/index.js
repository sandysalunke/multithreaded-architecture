const connection = require('./connection');

const port = 2114;
const host = 'localhost';

function start() {
    return connection.connect(port, host).then(() => {
        const message = {
            messageName: 'subscribeBarChartData',
        };
        connection.send(message);
    });
}

start();