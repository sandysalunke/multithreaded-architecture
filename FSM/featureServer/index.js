const createServer = require('./createServer');
let started = false;

function start(port, host) {
    if (started) {
        return;
    }

    const server = createServer();
    server.listen(port, host);

    started = true;
}

module.exports = start;
