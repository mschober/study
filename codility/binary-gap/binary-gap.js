let { assert } = require('chai');

// convert to binary
// 9*10^0

// 9/2 = 4 1
// 4/2 = 2 0
// 2/2 = 1 0
// 1/2 = 0 1

function binGap2(num) {
  let bin = [];
  let quot = num;
  let remain;
  let prev;
  let currGap = 0;
  let gaps = [];
  while (quot > 0) {
    remain = quot % 2;
    if (remain === 0) {
      if (gaps[currGap]){
        gaps[currGap] += 1;
      }
      else {
        gaps.push(1);
      }
    }
    else {
      if (prev && prev === 0) {
        currGap++;
      }
    }
    quot = Math.floor(quot/2);
    bin.push(remain);
    prev = remain;
  }
  console.log('bin is', bin);
  console.log('gaps are', gaps);
  return gaps;
}

function binGap(bin) {
  // let bin = num.toString(2);
  let i = 0;
  let curr = parseInt(bin[i]);
  console.log('check', bin, curr);
  let cnt;
  let counts = [0];
  while(i < bin.length && i < 10) {
    console.log('i is', i, cnt, curr);
    if (curr === 1 && i > 0) {
      console.log('push to counts', cnt, curr, i);
      counts.push(cnt);
    }
    while(curr === 1) {
      i++;
      curr = parseInt(bin[i]);
      console.log('increment i to skip 1', i);
    }
    cnt = 0
    while(curr === 0) {
      i++;
      cnt += 1;
      curr = parseInt(bin[i]);
      console.log('increment i to count 0', i);
    }
  }
  if (curr === 1 && i > 0) {
    console.log('push to counts', cnt, curr, i);
    counts.push(cnt);
  }
  console.log('counts are', counts);
  return Math.max(...counts);
}


let cases = [
  // {
  //   num: '1001',
  //   expected: 2
  // },
  {
    num: '10001001000000001',
    expected: 8
  },
  {
    num: '100',
    expected: 0
  }
];
for (let test of cases) {
  assert.equal(binGap(test.num), test.expected);
}