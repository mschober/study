const { assert } = require('chai');
/*
findInIntervals
addInterval
*/


function findInIntervals(intervals, val) {
  function compareFunc(curr, val) {
    console.log('curr, val', curr, val);
    if(val < curr[0]) {
      console.log('left');
      return 1;
    }
    else if (val > curr[1]) {
      console.log('right');
      return -1
    }
    else if (curr[0] <= val && val <= curr[1]) {
      console.log('match');
      return 0;
    }
    else {
      console.log('not in');
      return undefined;
    }
  }

  console.log('intervals', intervals);

  let l = 0;
  let r = intervals.length - 1;

  let m = 0;
  while (l <= r) {
    m = Math.floor( (l + r) / 2);
    let compareResult = compareFunc(intervals[m], val);
    if (!compareResult && compareResult != 0) {
      console.log('compareResult', compareResult);
      return -1;
    }
    if (compareResult < 0) {
      l = m + 1;
    }
    else if (compareResult > 0) {
      r = m - 1;
    }
    else {
      return m;
    }
  }
  return -1;
}

let cases = [
  {
    intervals: [[1,3]],
    val: 1,
    expected: 0
  },
  {
    intervals: [[1,3]],
    val: 4,
    expected: -1
  },
  {
    intervals: [[1, 3], [4, 6], [9, 20]],
    val: 5,
    expected: 1
  },
  {
    intervals: [[1, 3], [4, 6], [9, 20]],
    val: 1,
    expected: 0
  },
  {
    intervals: [[1, 3], [4, 6], [9, 20]],
    val: 20,
    expected: 2
  },
  {
    intervals: [[1,4], [6, 12], [15,20], [22, 25]],
    val: 1,
    expected: 0
  },
  {
    intervals: [[1,4], [6, 12], [15,20], [22, 25]],
    val: 6,
    expected: 1
  },
  {
    intervals: [[1,4], [6, 12], [15,20], [22, 25]],
    val: 17,
    expected: 2
  },
  {
    intervals: [[1,4], [6, 12], [15,20], [22, 25]],
    val: 25,
    expected: 3
  }
];

for (let test of cases) {
  console.log('looking for', test.val);
  assert.equal(findInIntervals(test.intervals, test.val), test.expected);
}