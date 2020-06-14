const events = require('events');
const net = require('net');
const _ = require('lodash');
const createClient = require('./createClient');

function createFeatureServer() {
    const self = {};
    const eventEmitter = new events.EventEmitter();
    const server = net.createServer();
    const clients = new Map();
    let nextClientId = 1;

    function onClientConnection(socket) {
        const clientId = nextClientId++;
        console.log(`Feature client connected and given ID ${clientId}.`);

        const client = createClient({
            id: clientId,
            netSocket: socket
        });

        clients.set(clientId, client);

        client.on('close', function () {
            console.log(`Feature client with ID ${clientId} disconnected.`);
            clients.delete(clientId);
        });
    }

    function listen(port, host) {
        console.log('Starting feature server.');
        server.listen(port, host);
    }

    function closeClients(err) {
        console.log('Closing feature client connections.');

        for (const client of clients.values()) {
            client.close(err);
        }

        clients.clear();
    }

    function closeServer() {
        if (server.listening) {
            console.log('Stopping feature server.');
            server.close();
        }
    }

    function close(err) {
        closeClients(err);
        closeServer();
    }

    (function init() {
        self.listen = listen;
        self.close = close;

        server.on('connection', onClientConnection);
    }());

    return self;
}

module.exports = createFeatureServer;
