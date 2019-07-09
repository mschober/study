/**
 * Given an NxN matrix consisting of integers between 0-100, count the size of "bodies of water".
 * A body of water is any contiguous set of 0's who are connected horizontally, vertically, diagonally.
 * Return the counts of bodies of water in sorted order, ascending order.
 */

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
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}


function countBodies(arr, pos, bodySize, bodiesMap, data) {
  let [xNot,yNot] = data;
  console.log('pos is', pos, bodiesMap);
  bodySize++;
  function inBounds() {
    let [x,y] = pos;
    return (x >= 0 && y >= 0 && x < arr.length && y < arr.length);
  }

  function isNewWaterLocation() {
    let [x,y] = pos;
    let curr = arr[x][y];
    let shouldRecur = (curr === 0);
    return shouldRecur;
  }

  function recurInAllDirections(data) {
    let [x,y] = pos;
    arr[x][y] = -1;
    bodiesMap[`${xNot}_${yNot}`] += 1;
    console.log(`pos (${x},${y}), arr`, arr, bodySize);
    let directions = [
      [x-1,y],
      [x-1,y+1],
      [x,y+1],
      [x+1,y+1],
      [x+1,y],
      [x+1,y-1],
      [x,y-1],
      [x-y,y-1]
    ]
    for (let thisPos of directions) {
      countBodies(arr, thisPos, bodySize, bodiesMap, data);
    }
  }

  if (!inBounds() || !isNewWaterLocation()) {
    return bodySize;
  }
  recurInAllDirections(data);
}

function sortCountedBodies(arr) {
  let bodies = [];
  let bodiesMap = {};
  for (let col = 0; col < arr.length; col++) {
    for (let row = 0; row < arr.length; row++) {
      bodiesMap[`${row}_${col}`] = 0;
      bodies.push(countBodies(arr, [row, col], 0, bodiesMap, [row,col]));
    }
  }
  console.log('final bodiesMap', bodiesMap);
  return Object.values(bodiesMap).filter((v) => v > 0 )
  .sort();
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let lineCount = parseInt(readLine().trim());

    let arr = [];
    for (let i = 0; i < lineCount; i++) {
      let line = readLine();
        arr.push(line.split(' ').map(arrTemp => parseInt(arrTemp)));
    }

    let result = sortCountedBodies(arr);
    console.log('result is', result);
    ws.write(result + "\n");

    ws.end();
}
