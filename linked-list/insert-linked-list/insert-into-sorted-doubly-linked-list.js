'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

const DoublyLinkedListNode = class {
    constructor(nodeData) {
        this.data = nodeData;
        this.next = null;
        this.prev = null;
    }
};

const DoublyLinkedList = class {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertNode(nodeData) {
        let node = new DoublyLinkedListNode(nodeData);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
        }

        this.tail = node;
    }
};

function printDoublyLinkedList(node, sep, ws) {
    let toPrint = "";
    while (node != null) {
        ws.write(String(node.data));
        toPrint += String(node.data);
        node = node.next;
        if (node != null) {
            if (node.prev) {
              toPrint += "<"
            }
            toPrint += sep;
            if (node.next) {
              toPrint += ">"
            }
            ws.write(sep);
        }
        else {
          toPrint += '->Null';
        }
    }
    console.log('LL is', toPrint);
}

function printDoublyLinkedListNoStream(node, sep) {
  let toPrint = "";
  while (node != null) {
      toPrint += String(node.data);
      node = node.next;
      if (node != null) {
          if (node.prev) {
            toPrint += "<"
          }
          toPrint += sep;
          if (node.next) {
            toPrint += ">"
          }
      }
      else {
        toPrint += '->Null';
      }
  }
  console.log('LL is', toPrint);
}


// Complete the sortedInsert function below.

/*
 * For your reference:
 *
 * DoublyLinkedListNode {
 *     int data;
 *     DoublyLinkedListNode next;
 *     DoublyLinkedListNode prev;
 * }
 *
 */
function sortedInsert(head, data) {
  let curr = head;
  if (!curr) {
    console.log('did not find head');
    head = new DoublyLinkedList();
    head.insertNode(data);
    return head;
  }
  let prev;
  while (curr && curr.data < data) {
    prev = curr;
    curr = curr.next;
  }
  printDoublyLinkedListNoStream(head, '-');
  console.log('curr is', curr);
  let newNode = new DoublyLinkedListNode(data);
  if (!curr) {
    prev.next = newNode;
    newNode.prev = prev;
    return head;
  }
  
  if (curr.prev) {
    prev = curr.prev;
    prev.next = newNode;
    newNode.prev = prev;
  }
  else {
    head = newNode;
  }
  newNode.next = curr;
  curr.prev = newNode;
  return head;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const llistCount = parseInt(readLine(), 10);

        let llist = new DoublyLinkedList();

        for (let i = 0; i < llistCount; i++) {
            const llistItem = parseInt(readLine(), 10);
            llist.insertNode(llistItem);
        }

        const data = parseInt(readLine(), 10);

        let llist1 = sortedInsert(llist.head, data);
        printDoublyLinkedList(llist1, "-", ws)
        ws.write("\n");
    }

    ws.end();
}
