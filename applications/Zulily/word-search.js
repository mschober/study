let { assert } = require('chai');

function checkForWord(grid, pos, word, visited, dirVector, key, found, calls) {
  function outOfBounds() {
    let [i,j] = pos;
    let size = grid.length;
    if (i < 0) {
      console.log('oob up', pos); 
      return true
    }
    
    if (i >= size) {
      console.log('oob down', pos);
      return true;
    }
    
    if (j < 0) {
      console.log('oob left', pos);
      return true;
    }
    
    if (j >= size) {
      console.log('oob right', pos, dirVector);
      return true;
    }
    return false;
  }
  
  function applyDirectionVector(pos, dir) {
    let [i,j] = pos;
    // console.log('dir is', dirVector);
    let updatedX = i + dir[0];
    let updatedY = j + dir[1];
    return [updatedX, updatedY];
  }

  function checkForFound() {
    // console.log('word.length, key, visited', word.length, key, visited[key]);
    if (visited[key] && word.length === visited[key].length) {
      console.log('found it!');
      found.f = true;
      return true;
    }
    else {
      console.log('not found');
      return false;
    }
  }

  function alreadyVisited() {
    return (visited[key] && visited[key] > 0);
  }
  
  // let key = computeKey(pos, dirVector);
  if (outOfBounds() || alreadyVisited() || calls > 5) {
    return found; 
  }
  if (checkForFound()) {
    console.log('exit beginning');
    return found;
  }

  calls++;
  console.log('calls are', calls);
  let startPos = pos;
  
  let [i,j] = pos;
  let curr = grid[i][j];

  console.log('checking', curr, visited, pos, dirVector);
  let wordIndex;
  if (visited[key]) {
    wordIndex = visited[key].length;
    console.log('get word index', wordIndex, key);
    let compareLetter = word[wordIndex];

    if (curr !== compareLetter) {
      console.log('letter mismatch', curr, compareLetter);
      return found;
    }
    
    console.log('matched!', curr, compareLetter);
    visited[key].push(curr);
    console.log('visited updated', visited);
    pos = applyDirectionVector(pos, dirVector)
    checkForWord(grid, pos, word, visited, dirVector, key, found, calls);
  }
  else {
    console.log('initialize visited', key);
    visited[key] = [];
    checkForWord(grid, pos, word, visited, dirVector, key, found, calls);
  }

  // recurs until bounds or mismatched letters or found
  if (checkForFound()) {
    console.log('exit end');
    return found;
  }
  let directions = [
    // [-1, 0], //up
    [1, 0], //down
    [0, -1], //left
    // [0, 1], //right
  ];
  
  for (let dir of directions) {
    // delete visited[key];
    key = computeKey(startPos, dir);
    // visited[key] = [];
    pos = applyDirectionVector(startPos, dir);
    // pos = startPos;
    console.log('direction updated!', dir);
    checkForWord(grid, startPos, word, visited, dir, key, found, calls);
  }
  return found;
}

function computeKey(pos, dir) {
  // console.log('direction is', dir);
  return pos[0].toString() +
         pos[1].toString() + '_' +
         dir[0].toString() + dir[1].toString();
         
}

function wordExists(grid, word) {
  let visited = {};
  let i = 0;
  let found = { f: false };
  while (i < grid.length && !found.f) {
    let j = 0;
    while (j < grid.length && !found.f) {
      let dirVector = [0,1];
      let pos = [i,j];
      let key = computeKey(pos, dirVector);
      // if (!visited[key]) {
      //   visited[key] = [];
      // };
      console.log('next element to check', grid[i][j], found);
      found = checkForWord(grid, pos, word, visited, dirVector, key, found, 0);
      console.log('did i find it', found);
      j++;
    }
    // break;
    i++;
    console.log('new row started', i);
  }
  console.log('finished!');
  return found.f;
}


let smallGrid = [
  ['a', 'b', 'c', 'd'],
  ['d', 'e'],
  ['d', 'e'],
  ['d', 'e']
];

let smallCases = [
  { //finds across
    word: 'ab',
    success: true
  },
  { //finds across backwards
    word: 'cb',
    success: true
  }
  // { //finds down
  //   word: 'ad',
  //   success: true
  // },
  // { //walks off width
  //   word: 'abb',
  //   success: false
  // },
  // { //walks off height
  //   word: 'add',
  //   success: false
  // },
  // {
  //   word: 'ba',
  //   success: true
  // }
]

let grid = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['h', 'i', 'j']
];

let cases = [
  { //base case
    word: 'abc',
    success: true
  },
  { //backwards horizontal
    word: 'cba',
    success: true
  },
  // { //too far forwards horizontal
  //   word: 'abcd',
  //   success: false
  // },
  // { //too far backwards horizontal
  //   word: 'cbaz',
  //   success: false
  // },
  // { //forwars different row
  //   word: 'def',
  //   success: true
  // },
  // { //wrong letters 3rd row
  //   word: 'hii',
  //   success: false
  // },
  // {
  //   word: 'adh',
  //   success: true
  // }

  // { //fails when last letter doesn't match
  //   word: 'dee',
  //   success: false
  // },
  // { //checks the last row
  //   word: 'hij',
  //   success: true
  // },
  // { //fails for unknown character
  //   word: 'abcl',
  //   success: false
  // },
  // { //fails because of direction and too many characters
  //   word: 'abcd',
  //   success: false
  // },
  // { //works down
  //   word: 'adh',
  //   success: true
  // },
  // {
  //   word: 'adhj',
  //   success: false
  // },
  // {
  //   word: 'cb',
  //   success: true
  // }
]

for (let testCase of cases) {
  console.log();
  console.log('word is', testCase.word);
  assert.equal(wordExists(grid, testCase.word), testCase.success);
}


/* 
Your previous Plain Text content is preserved below:

This is just a simple shared plaintext pad, with no execution capabilities.

When you know what language you'd like to use for your interview,
simply choose it from the dropdown in the top bar.

You can also change the default language your pads are created with
in your account settings: https://coderpad.io/settings

Enjoy your interview!

https://www.puzzles-to-print.com/printable-word-search/PDFs/star-wars-word-search.pdf

 */

