const Connection = require('./connection');

function ConnectionManager() {
    let connection = null;

    function onConnect() {
        console.log('Connected to feature server');
    }

    function onClose(had_error) {
        if (had_error) {
            console.log('Connection to feature server closed due to socket error');
        } else {
            console.log('Connection to feature server closed');
        }
    }

    function onError(err) {
        console.log('Error connecting to feature server', err);
    }

    function onBarData(message) {
        // console.log('>>>>>>>>>>>>>>', message);
    }

    function setupConnection() {
        const socket = connection.getSocket();

        socket.on('connect', onConnect);
        socket.on('close', onClose);
        socket.on('error', onError);
        socket.on('message', onBarData)
    }

    function createConnection() {
        if (connection) {
            return connection;
        }

        connection = new Connection();
        setupConnection();

        return connection;
    }

    return {
        createConnection: createConnection
    };
}

module.exports = new ConnectionManager();
