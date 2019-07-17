let { assert } = require('chai');

function smallestGap(seq) {
  let i = 0;
  let integers = [];
  let prev;
  let stopper = 5;
  let gapIndex = 1;
  while (i < seq.length && i < stopper) {
    curr = seq[i];
    if (prev && curr-prev === 1) {
      integers[0] = curr;
    }
    else {
      let j = 0;
      while (j < integers.length && curr > integers[j]){
        j++;
      }
      console.log('j is', j, curr);
      integers.splice(j, 0, curr);
    }
    // let k = 0;
    // while (k < integers.length -1) {
    //   if (integers[k+1] - integers[k] === 1){
    //     integers[k] = integers[k+1];
    //   }
    //   k++;
    // }
    prev = curr;
    console.log('integers', gapIndex, integers);
    i++;
  }
}

let cases = [
  {
    seq: [1,2,3],
    expected: null
  }
]

for (let test of cases) {
  assert.equal(smallestGap(test.seq), test.expected);
}