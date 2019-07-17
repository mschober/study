let { assert } = require('chai');

function collapse(word) {
  let i = 0;
  let occur = {};
  let out = '';
  let prev;
  while (i < word.length) {
    let curr = word[i];
    let temp = occur[curr];
    if(temp) {
      temp++;
      occur[curr] = temp;
    }
    else {
      temp = 1;
      occur[curr] = temp;
    }

    if (temp <= 2) {
      out += curr;
    }

    if (prev && curr !== prev) {
      delete occur[prev];
    }
    prev = curr;
    i++;
  }
  console.log('counts', occur);
  console.log('out', out);
  return out;
}

let cases = [
  {
    word: 'eedaaad',
    expected: 'eedaad'
  },
  {
    word: 'eeee',
    expected: 'ee'
  },
  {
    word: 'eeedeeedddff',
    expected: 'eedeeddff'
  }
];

for (let test of cases) {
  assert.equal(collapse(test.word), test.expected);
}