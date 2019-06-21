let { assert } = require('chai');

let tests = [
  {
    arr: [7, 1, 3, 2, 4, 5, 6],
    ans: 5
  },
  {
    arr: [4, 3, 1, 2],
    ans: 3
  }
]

function minimumSwaps(arr) {

  let i = 0;
  let swapCount = 0;
  while (i < arr.length && swapCount < 10) {
    console.log('outer loop', swapCount);
    while (i < arr.length && arr[i] === i +1) {
      console.log('increment i', i);
      i++;  
    }
    if (i === arr.length) {
      break;
    }    
    console.log('current list', i, arr);
    let curr = arr[i]; // 5
    console.log('currVal is', curr);
    let targetValue = arr[curr - 1];
    console.log('targetVal is', targetValue);
    let target = arr[targetValue - 1*i];
    console.log('target is', target);
    swap(i, target, arr);
  }

  function swap(curr, target, arr) {
    console.log(`swapped ${arr[curr]} with ${arr[target]}`);
    let temp = arr[target];
    arr[target] = arr[curr];
    arr[curr] = temp;
    swapCount++;
  }
  return swapCount;
}

for (let test of tests) {
  assert.deepEqual(minimumSwaps(test.arr), test.ans);
}