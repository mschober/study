let { assert } = require('chai');

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function swap(arr, curr, tgt) {
  let temp = arr[tgt];
  arr[tgt] = arr[curr];
  arr[curr] = temp;
}
// Complete the minimumSwaps function below.

function minimumSwaps(arr) {
  let i = 0;
  let swaps = 0;
  while (i < arr.length) {
    while (arr[i] === i + 1) {
      // console.log(arr[i], i);
      i++;
    }
    // console.log('i', i);
    if (i === arr.length) {
      // console.log('break!');
      return swaps;
    }
    // console.log('arr is', arr);
    let curr = arr[i];
    // console.log(`${curr} wants to be at ${curr - 1}`);
    // PERFECT SWAP!
    if (arr[arr[curr - 1] - 1] === arr[i]) {
      // console.log('perfect swap!');
      swap(arr, i, curr - 1);
    }
    else {
      let swapSpot = arr[curr - 1] - 1;
      // console.log(`swap spot is ${swapSpot}`);
      // console.log(`${arr[curr - 1]} wants to be at ${arr[curr - 1] - 1}`)
      // console.log(`swap ${arr[i]} with ${arr[arr[curr - 1] -1]}`);
      swap(arr, i, swapSpot);
    }
    swaps++;
    // break;
  }
  return swaps;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}


// let tests = [
//   {
//     arr: [7, 1, 3, 2, 4, 5, 6],
//     ans: 5
//   },
//   {
//     arr: [4, 3, 1, 2],
//     ans: 3
//   },
//   {
//     arr: [7, 3, 1, 2, 6, 4, 5],
//     ans: 6
//   }
// ]

// for (let test of tests) {
//   assert.deepEqual(minimumSwaps(test.arr), test.ans);
// }