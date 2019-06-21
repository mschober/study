class Node {
  constructor (data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  insert (root, data) {
    if (!root) {
      return new Node(data);
    }
    else {
      let curr = null;
      if (data <= root.data) {
        curr = this.insert(root.left, data);
        root.left = curr;
      }
      else {
        curr = this.insert(root.right, data);
        root.right = curr;
      }
    }
    return root;
  }
}

let elements = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];
let bt = new BinaryTree();
let root = new Node(5);
for (let el of elements) {
  root = bt.insert(root, el);
}

console.log('bt is', JSON.stringify(root));