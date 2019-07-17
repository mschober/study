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
  let seed;
  let clusters = [];
  let clusterIndex = 0;
  while (Object.values(citiesGraph).length > 0) {
    seed = Object.values(citiesGraph)[0];
    let queue = [...seed];
    console.log('starting cluster', seed);
    while (queue.length > 0) {
      let city = queue.shift();
      if (!visited[city]) {
        queue.push(...citiesGraph[city]);
        visited[city] = true;
        if (!clusters[clusterIndex]) clusters[clusterIndex] = [city];
        else clusters[clusterIndex].push(city);
        delete citiesGraph[city];
      }
    }
    clusterIndex++;
  }

  let clusterCount = clusters.length;
  let cityCount = clusters.map(c => c.length).reduce((a,b) => a+b);

  console.log('visited', visited);
  console.log('citiesGraph', citiesGraph);
  console.log('clusters', clusters);
  console.log('clusterCount, cityCount', clusterCount, cityCount);
  let eq1 = c_road * cityCount + c_lib * clusterCount;
  let eq2 = c_lib * cityCount;
  console.log(`c_lib: ${c_lib}; c_road: ${c_road}
eq 1: Cr * numCities + Cl * numClusters ${eq1}
eq 2: Cl * numCities ${eq2}
`)
  let result = Math.min(eq1, eq2);
  console.log('min is', result);
  return result;
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
