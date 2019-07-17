let obj = require('./alt-chars');

let inputString = obj.input;

function alternatingCharacters(s) {
  let i = 0;
  prev = '';
  let deletes = 0;
  while(i < s.length) {
    let curr = s[i];
    if (curr === prev) {
      // delete curr;
      deletes++;
      // increment deletes
    }
    else {
      //??
    }
    let prev = curr;
    i++;
  }
  return deletes;
}

alternatingCharacters(inputString);