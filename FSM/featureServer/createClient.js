const events = require('events');
const JsonSocket = require('json-socket');

const tradesManager = require('../tradesManager');
const barChartManager = require('../barChartManager');

function createFeatureClient({ id, netSocket }) {
    const self = new events.EventEmitter();
    const socket = new JsonSocket(netSocket);

    function endError(err) {
        const wrapError = new Error(JSON.stringify(err));
        socket.sendEndError(wrapError);
        console.log('Sent error to client and disconnected.');
        // A close event will be fired subsequently by the net socket.
    }

    function end() {
        socket.end();
        console.log(`Disconnected client ${id}.`);
        // A close event will be fired subsequently by the net socket.
    }

    function onClientEnd() {
        console.log(`Client ${id} disconnected.`);
        // A close event will be fired subsequently by the net socket.
    }

    function onClientError(err) {
        console.log(`Received client ${id} error: ${err.message}`);
        // A close event will be fired subsequently by the net socket.
    }

    function onClientMessage(message) {
        // console.log(`Received a client message "${JSON.stringify(message, null, 2)}".`);

        return new Promise((resolve, reject) => {
            switch (message.messageName) {
                case 'getHistoricalBarChartData': {
                    return barChartManager.getBuffer().then((barChartData) => {
                        return self.send({ messageName: 'barData', data: currentBarData });
                    });
                }

                case 'subscribeBarChartData': {
                    barChartManager.subscribeBarChart(send);
                    resolve();
                }

                case 'trade': {
                    return tradesManager.addBuffer(JSON.parse(message.data));
                }

                default: {
                    return reject(new Error('Received invalid message from client'));
                }
            }
        });
    }

    function onClientClose() {
        console.log('Client socket closed.');
        self.emit('close');
    }

    function close(err) {
        if (err) {
            endError(err);
        } else {
            end();
        }
    }

    function send(message) {
        return new Promise((resolve, reject) => {
            console.log(`Sending client ${id} message contents: ${JSON.stringify(message, null, 2)}`);
            socket.sendMessage(message, err => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

    (function init() {
        self.close = close;
        self.send = send;

        socket.on('message', onClientMessage);
        socket.on('end', onClientEnd);
        socket.on('error', onClientError);
        socket.on('close', onClientClose);
    }());

    return self;
}

module.exports = createFeatureClient;
