let { assert } = require('chai');

function checkForWord(grid, pos, word, visited, key, dirVector, found) {
  
  function outOfBounds() {
    let [i,j] = pos;
    let size = grid.length;
    if (i < 0) {
      console.log('oob up', pos); 
      return true
    }
    
    if (i >= size) {
      console.log('oob down', pos);
      if (dirVector[0] === 1) {
        visited[key] = [];
      }
      return true;
    }
    
    if (j < 0) {
      console.log('oob left', pos);
      return true;
    }
    
    if (j >= size) {
      console.log('oob right', pos, dirVector);
      if (dirVector[1] === 1) {
        visited[key] = [];
      }
      return true;
    }
    return false;
  }
  
  function applyDirectionVector() {
    let [i,j] = pos;
    // console.log('dir is', dirVector);
    let updatedX = i + dirVector[0];
    let updatedY = j + dirVector[1];
    return [updatedX, updatedY];
  }
  
  function alreadyVisited() {
    let entry = visited[key];
    if (entry) {
      console.log('already visited', key)
      return true;
    }
    else {
      return false;
    };
  }
  
  // apply the direction vector and update the pos
  pos = applyDirectionVector()
  // key = computeKey(pos, dirVector);
  if (found.f || outOfBounds()) {
    return found.f; 
  }
  
  let [i,j] = pos;
  let curr = grid[i][j];

  console.log('checking', visited, curr, pos, dirVector);
  let wordIndex = visited[key].length;
  let compareLetter = word[wordIndex];

  if (curr !== compareLetter) {
    console.log('letter mismatch', curr, compareLetter);
    return false;
  }
  
  console.log('matched!', curr, compareLetter);
  visited[key].push(curr);
  console.log('visited updated', visited);

  if (wordIndex === word.length -1) {
    found.f = true;
    console.log('found it!');
    return true;
  }
  
  let directions = [
    // [-1, 0], //up
    
    // [1, 0], //down
    [0, -1], //left
    [0, 1], //right
  ];
  
  let direction = dirVector;
  for (let dir of directions) {
    let hasDirection = ((dirVector[0] + dirVector[1]) !== 0);
    if (!hasDirection) {
      direction = dir;
      key = computeKey(pos, direction);
    }
    checkForWord(grid, pos, word, visited, key, direction, found);
  }
}

function computeKey(pos, dir) {
  // console.log('direction is', dir);
  return pos[0].toString() + '_' +
         pos[1].toString();// + '_' +
         
}

function wordExists(grid, word) {
  let visited = {};
  let found = { f: false };
  let i = 0;
  while (i < grid.length && !found.f) {
    let j = 0;
    while (j < grid.length && !found.f) {
      let dirVector = [0,0];
      let pos = [i,j];
      let key = computeKey(pos, dirVector);
      visited[key] = [];
      console.log('next element to check', grid[i][j], found);
      checkForWord(grid, pos, word, visited, key, dirVector, found);
      j++;
    }
    i++;
  }
  return found.f;
}


let smallGrid = [
  ['a', 'b'],
  ['d', 'e']
];

let smallCases = [
  { //finds across
    word: 'ab',
    success: true
  },
  { //finds down
    word: 'ad',
    success: true
  },
  { //walks off width
    word: 'abb',
    success: false
  },
  { //walks off height
    word: 'add',
    success: false
  }
]

let grid = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['h', 'i', 'j']
];

let cases = [
  // { //base case
  //   word: 'abc',
  //   success: true
  // },
  // { //works down
  //   word: 'adh',
  //   success: true
  // },
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
  // {
  //   word: 'adhj',
  //   success: false
  // },
  {
    word: 'cb',
    success: true
  }
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

