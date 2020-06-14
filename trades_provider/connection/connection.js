const JsonSocket = require('json-socket');
const net = require('net');
//const Promise = require('bluebird');

function Connection() {
    const socket = new JsonSocket(new net.Socket());

    function connect(port, host) {
        return new Promise(function (resolve, reject) {
            socket.connect(port, host, resolve);
            socket.on('error', reject);
        });
    }

    function getSocket() {
        return socket;
    }

    function send(data) {
        socket.sendMessage(data);
    }

    function disconnect() {
        console.log('closing socket connection');
        socket.end();
    }

    return {
        connect,
        send,
        disconnect,
        getSocket
    };
}

module.exports = Connection;
