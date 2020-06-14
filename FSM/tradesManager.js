let tradesBuffer = [];

function addBuffer(trade) {
    return new Promise((resolve, reject) => {
        tradesBuffer.push(trade);
        return resolve();
    });
}

function getBuffer() {
    return new Promise((resolve, reject) => {
        return resolve(tradesBuffer);
    });
}

function clearBuffer() {
    return new Promise((resolve, reject) => {
        tradesBuffer = [];
        return resolve();
    });
}

module.exports = {
    addBuffer,
    getBuffer,
    clearBuffer
};