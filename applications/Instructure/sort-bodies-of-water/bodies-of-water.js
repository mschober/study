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


function countBodies(arr, pos, bodySize, bodies, visited) {
  function inBounds() {
    let [x,y] = pos;
    return (x >= 0 && y >= 0 && x < arr.length && y < arr.length);
  }

  function isNewWaterLocation() {
    let [x,y] = pos;
    let curr = arr[x][y];
    console.log('curr is', curr, visited, !visited[x][y]);
    let shouldRecur = (curr === 0 && !visited[x][y]);
    visited[x][y] = true;
    console.log('should recur', shouldRecur);
    return shouldRecur;
  }

  function recurInAllDirections() {
    let [x,y] = pos;
    bodySize++;
    console.log('bodySize is', bodySize);
    let directions = [
      [x-1,y],
      [x,y+1],
      [x+1,y],
      [x,y-1]
    ]
    for (let thisPos of directions) {
      bodies.push(countBodies(arr, thisPos, bodySize, bodies, visited));
    }
    console.log('done with body of water');
    return bodySize;
  }

  if (!inBounds() || !isNewWaterLocation()) {
    return;
  }
  else {
    return recurInAllDirections();
  }
}

function sortCountedBodies(arr) {
  let visited = [];
  for (let i = 0; i < arr.length; i++) { 
    let row = [...Array(arr.length)].map((_, i) => false);
    visited.push(row);
  }
  console.log('visited is', visited);
  let bodies = [];
  countBodies(arr, [0,0], 0, bodies, visited);
  // console.log('bodies are', bodies);
  return bodies;
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
