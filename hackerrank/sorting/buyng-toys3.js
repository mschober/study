'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the maximumToys function below.
function maximumToys(prices, k) {
    // console.log(process.argv[2]);
    // let inputPrices = JSON.parse(process.argv[2]);

    // let sortedPrices = prices.sort((a, b) => a - b);
    // console.log('sorted prices', sortedPrices);

    let i = 0;
    let maxCost = k;
    let currCost = 0;
    let prevPrice = 0;
    let currPrice = 0;
    let uniqueUpdate = 0;
    let sortedPrices = [];
    while (i < prices.length) {
        if (i === 0) {
          sortedPrices.push(prices[i]);
        }

        currPrice = sortedPrices[i];
        if (currPrice !== prevPrice) {
            currCost += currPrice;
            uniqueUpdate++;
            // console.log('currCost incremented to ', currPrice);
        }
        prevPrice = currPrice
        i++;
    }
    return uniqueUpdate;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const prices = readLine().split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

    let result = maximumToys(prices, k);

    ws.write(result + "\n");

    ws.end();
}
