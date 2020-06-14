const _ = require('lodash');
const tradesManager = require('./tradesManager');

let barChartBuffer = [];
let initiated = false;
let barNumber = 0;

function getBuffer() {
    return new Promise((resolve, reject) => {
        return resolve(barChartBuffer);
    });
}

function createBar() {
    let currentBarData = [];
    return tradesManager.getBuffer().then((trades) => {
        if (trades.length) {
            barNumber++;
            let barData = [];
            
            let p = o = h = l = c = v = 0;

            trades.forEach((trade) => {
                p = trade.P;
                v = trade.Q;

                if (barData[trade.sym]) {
                    if (!barData[trade.sym].o) {
                        barData[trade.sym].o = p
                    }

                    if (p > barData[trade.sym].h) {
                        barData[trade.sym].h = p;
                    }

                    if (p < barData[trade.sym].l) {
                        barData[trade.sym].l = p;
                    }

                    barData[trade.sym].c = p;
                    barData[trade.sym].volume += v;
                } else {
                    barData[trade.sym] = {
                        o: p,
                        h: p,
                        l: p,
                        c: p,
                        volume: v,
                        event: 'ohlc_notify',
                        symbol: trade.sym,
                        bar_num: barNumber
                    };
                }
            });


            for (let key in barData) {
                if (barData.hasOwnProperty(key)) {
                    value = barData[key];
                    currentBarData.push(value);
                }
            }
        }
        return currentBarData;
    });
}

function subscribeBarChart(sendMessage) {
    return setInterval(() => {
        return createBar().then((currentBarData) => {
            sendMessage({ messageName: 'barData', data: currentBarData }).then(() => {
                return tradesManager.clearBuffer();
            });
        });
    }, 15000);
}

module.exports = {
    subscribeBarChart,
    getBuffer
};