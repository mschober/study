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

class City {
  constructor (value, visited) {
    this.value = value;
    this.visited = false;
  }
}

function addCity(graph, road) {
  let origin = road[0];
  let dest = road[1];

  if (!graph[origin]) {
    graph[origin] = [dest];
  }
  else {
    graph[origin].push(dest);
  }

  if (!graph[dest]) {
    graph[dest] = [origin];
  }
  else {
    graph[dest].push(origin);
  }
}

// Complete the roadsAndLibraries function below.
function roadsAndLibraries(n, c_lib, c_road, roads) {
  let citiesGraph = {};
  let i = 0;
  while(i < roads.length) {
    addCity(citiesGraph, roads[i]);
    i++;
  }
  console.log('citiesGraph', citiesGraph);
  let visited = {};
  let seed = Object.values(citiesGraph)[0];
  let queue = [...seed];
  while (queue.length > 0) {
    let city = queue.shift();
    if (!visited[city]) {
      queue.push(...citiesGraph[city]);
      visited[city] = true;
    }
  }
  console.log('visited', visited);
  console.log('citiesGraph', citiesGraph);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const nmC_libC_road = readLine().split(' ');

        const n = parseInt(nmC_libC_road[0], 10);

        const m = parseInt(nmC_libC_road[1], 10);

        const c_lib = parseInt(nmC_libC_road[2], 10);

        const c_road = parseInt(nmC_libC_road[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine().split(' ').map(citiesTemp => parseInt(citiesTemp, 10));
        }

        const result = roadsAndLibraries(n, c_lib, c_road, cities);

        ws.write(result + '\n');
    }

    ws.end();
}
