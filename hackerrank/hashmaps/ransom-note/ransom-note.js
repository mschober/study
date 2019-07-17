'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function addNoteEntries(note) {
  let noteHash = {};
  let i = 0;
  while (i < note.length) {
    let word = note[i];
    // console.log('i, note', i, word);
    let noteCount = noteHash[word];
    if (!noteCount) {
      noteHash[word] = 1
    }
    else {
      noteCount++;
      noteHash[word] = noteCount;
      // console.log('noteCount is', noteCount);
    }
    i++;
  }
  return noteHash;
}

function updateNoteHash(noteHash, magWord) {
  let noteCount = noteHash[magWord];
  if (Number.isInteger(noteCount)) {
    if (noteCount === 1) {
      // console.log('done looking for', magWord);
      delete noteHash[magWord];
    }
    else {
      // console.log('removing one of', magWord, noteWord);
      noteCount--;
      noteHash[magWord] = noteCount;
    }
  }
  // return Object.keys(noteHash).length;
}

function encodeNote(noteHash, magazine) {
  let i = 0;
  while (i < magazine.length) {
    let magWord = magazine[i];
    updateNoteHash(noteHash, magWord)
    i++;
  }
  let noteHashSize = Object.keys(noteHash).length;
  // console.log('noteHash is', noteHash);
  // console.log('magazine is', magazine.slice(i).length);
  return noteHashSize === 0;
}

// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {
  // bail early if magazine is too small
  if (magazine.length < note.length) {
    return 'No';
  }

  let noteHash = addNoteEntries(note);
  let result = encodeNote(noteHash, magazine);
  if (result) {
    return 'Yes';
  }
  else {
    return 'No';
  }
  // console.log('noteHash is', noteHash);
}

function main() {
    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const magazine = readLine().split(' ');

    const note = readLine().split(' ');

    let resp = checkMagazine(magazine, note);
    console.log(resp);
}
