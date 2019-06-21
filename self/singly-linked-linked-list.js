class Node {
  constructor (data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  insert (data) {
    if (this.root) {
      let curr = this.root;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = new Node(data);

    }
    else {
      this.root = new Node(data);
    }
  }

  reverse () {
    // If there is no root return null.
    if (!this.root) {
      return null
    }
    // If root is the only node return root.
    if (!this.root.next) {
      return this.root;
    }

    let prev = null;
    let curr = this.root;
    let temp;
    while(curr.next) {
      temp = curr.next;
      console.log('temp is', temp);
      curr.next = prev;
      console.log('curr is', curr);
      prev = curr;
      console.log('prev is', prev);
      curr = temp;
    }
    curr.next = prev;
    this.root = curr;
  }
}

let elements = [
  1, 2, 3
];

let ll = new SinglyLinkedList();
for (let el of elements) {
  console.log('going to add el', el);
  ll.insert(el);
}
console.log('ll is', JSON.stringify(ll));
ll.reverse()
console.log('ll reversed', JSON.stringify(ll));
//Node
// () => x

// LL
// (1) -> (2) -> (3) -> x

// Insert
// (1) -> (2) -> (3) -> x


