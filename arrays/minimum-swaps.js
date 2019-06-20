
let tests = [
  {
    arr: [7, 1, 3, 2, 4, 5, 6],
    ans: 5
  }
]
function minimumSwaps(arr) {
  return arr.length;
}

for (let test of tests) {
  assert.deepEual(minimumSwaps(test.arr), test.ans);
}