const connection = require('./connection');

let tradesBuffer = [];

function sendTrades() {

    function send(trade) {
        const message = {
            messageName: 'trade',
            data: JSON.stringify(trade)
        };

        connection.send(message);
    }

    let index = 0;
    setInterval(function () {
        if (index < tradesBuffer.length) {
            send(tradesBuffer[index]);
            index++;
        }
    }, 200);
}

function init() {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('trades.json')
    });

    lineReader.on('line', function (line) {
        tradesBuffer.push(JSON.parse(line));
    });

    sendTrades();
}

module.exports = {
    init,
    sendTrades
};