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

function traverseCells(matrix, pos, regionsMap, key) {
  let [x,y] = pos;
  // console.log('matrix is', matrix);
  console.log('regions map is', regionsMap);
  function recurInAllDirections() {
    let [x,y] = pos;
    let directions = [
      [x-1,y],   //left
      [x-1,y+1], //top-left
      [x,y+1],   //top
      [x+1,y+1], //top-right
      [x+1,y],   //right
      [x+1,y-1], //bottom-right
      [x,y-1],   //bottom
      [x-1,y-1]  //bottom-left
    ]
    for (let pos of directions) {
      // console.log('recur in', pos);
      traverseCells(matrix, pos, regionsMap, key);
    }
  }

  if(outOfBounds() || notInRegion()) {
    return regionsMap;
  }

  function outOfBounds() {
    let [x,y] = pos;
    let oob = (
        x < 0 ||
        y < 0 ||
        x > matrix[x].length ||
        y > matrix[y].length
      )
    // console.log('oob is', oob, pos);
    return oob;
  }

  function notInRegion() {
    let curr = matrix[x][y];
    let nir = curr !== 1;
    // console.log('nir is', nir);
    return nir;
  }

  regionsMap[key] += 1;
  matrix[x][y] = 0;
  recurInAllDirections();
}

// Complete the connectedCell function below.
function connectedCell(matrix) {
  console.log('matrix is', matrix);
  let regionsMap = {};
  for (let i = 0; i < matrix.length; i++) {
    let width = matrix[i].length;
    for (let j = 0; j < width; j++) {
      let key = `${i}_${j}`;
      regionsMap[key] = 0;
      return traverseCells(matrix, [i,j], regionsMap, key);
    }
  }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let matrix = Array(n);

    for (let i = 0; i < n; i++) {
        matrix[i] = readLine().split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    let result = connectedCell(matrix);
    console.log('result is', result);
    ws.write(result + "\n");

    ws.end();
}
