let { assert } = require('chai');

let tests = [
  // {
  //   k: 3,
  //   contests: [ [ 5, 1 ], [ 2, 1 ], [ 1, 1 ], [ 8, 1 ], [ 10, 0 ], [ 5, 0 ] ],
  //   ans: 29
  // },
  // {
  //   k: 3,
  //   contests: [ [ 5, 1 ] ],
  //   ans: 5
  // },
  // {
  //   k: 0,
  //   contests: [ [ 5, 1 ] ],
  //   ans: -5
  // },
  // {
  //   k: 1,
  //   contests: [ [ 5, 1 ], [ 5, 1 ], [ 5, 1 ], [ 5, 1 ] ],
  //   ans: -10
  // },
  // {
  //   k: 1,
  //   contests: [ [ 5, 0 ], [ 5, 0 ], [ 5, 0 ], [ 5, 0 ] ],
  //   ans: 20
  // },
  // {
  //   k: 2,
  //   contests: [ [ 10, 1 ], [ 10, 1 ], [ 5, 0 ], [ 5, 0 ] ],
  //   ans: 30
  // },
  // {
  //   k: 2,
  //   contests: [ [ 10, 1 ], [ 10, 1 ], [ 5, 1 ], [ 5, 0 ] ],
  //   ans: 20
  // },
  // {
  //   k: 0,
  //   contests: [ [ 10, 0 ] ],
  //   ans: 10
  // },
  // {
  //   k: 0,
  //   contests: [ [ 10, 1 ] ],
  //   ans: -10
  // },
  {
    k: 58,
    contests: require('./testcase8'),
    ans: 10069
  }
]
    // if its not important add it to the luck
    // if it is important then we are looking for the k least luck balances to lose in order to maximize luck 
    // luck is sumOf(luck for unimportant contests) + sumOf(luck for lost contests) - sumOf(luck for won contests)
function luckBalance(k, contests) {
  let i = 0;
  let luckBalance = 0;
  let failContests = [];
  let countOfLosses = 0;

  while(i < contests.length) {
    let contest = contests[i];
    if (contest[1] === 0 ) {
      addUnimportantToLuck(contest);
    }
    else {
      maximizeLuck(contest);
    }
    i++;
  }
  console.log('count of losses after examining contests', countOfLosses);
  console.log('luck balance before maximizing', luckBalance);
  let sortedContests = failContests.sort((a,b) => a-b);
  console.log('sorted contests', sortedContests);
  let failThese = [];
  let winThese = [];
  if (k > sortedContests.length) {
    console.log('failing all');
    failThese = sortedContests;
    countOfLosses += sortedContests.length;
  }
  else {
    failThese = sortedContests.slice(sortedContests.length -k, sortedContests.length);
    countOfLosses += failThese.length;
    winThese = sortedContests.slice(0, sortedContests.length -k);
  }
  console.log('fail these', failThese);
  console.log('win these', winThese);
  console.log('luck balance', luckBalance);
  console.log('count of losses is', countOfLosses);
  if (failThese.length > 0) {
    luckBalance += failThese.reduce((a,b) => a + b);
  }
  if (winThese.length > 0) {
    luckBalance -= winThese.reduce((a,b) => a + b);
  }
  console.log('updated luckBalance', luckBalance);
  return luckBalance;

  function addUnimportantToLuck(contest) {
    countOfLosses += 1;
    luckBalance += contest[0];
  }

  function maximizeLuck(contest) {
    failContests.push(contest[0])
  }
}

for(let test of tests) {
  console.log(`
  `);
  console.log('running test', test);
  assert.equal(luckBalance(test.k, test.contests), test.ans);
}