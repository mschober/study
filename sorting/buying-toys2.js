let obj = require('./testcase-6');
// console.log(process.argv[2]);
// let inputPrices = JSON.parse(process.argv[2]);
// let k = process.argv[3];

let inputPrices = obj.prices;
let k = obj.k;

console.log('k value is', k);
let sortedPrices = inputPrices.sort((a,b) => a-b);
console.log('sorted prices', sortedPrices);

let i = 0;
let maxCost = k;
let currCost = 0;
let prevPrice = 0;
let currPrice = 0;
let uniqueUpdate = 0;
while (i < sortedPrices.length && currCost + sortedPrices[i] <= maxCost) {
  currPrice = sortedPrices[i];
  if (currPrice !== prevPrice) {
    currCost += currPrice;
    uniqueUpdate++;
    // console.log('currCost incremented to ', currPrice);
  }
  else {
    prevPrice = currPrice
  }
  i++;
  // console.log('currCost is', currCost, k);
}

console.log('prevPrice, currPrice', prevPrice, currPrice);
console.log('maxCost reached ', currCost - currPrice);
console.log(uniqueUpdate);