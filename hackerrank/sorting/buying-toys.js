let myArray = [1, 3, 10, 4, 8, 6, 2];

let mergeSort = (arr) => {
  let left, right;
  let length = arr.length;
  let mid = Math.ceil(length/2);
  left = sort(arr.slice(0, mid));
  right = sort(arr.slice(mid, length));
  return arr;
}

let mergeSort2 = (arr) => {
  let mid = 0;//Math.ceil(arr.length / 2);
  while(mid < arr.left) {
    mid = Math.ceil()
  }
}

let sort = (subArr) => {
  console.log(subArr);
  return subArr;
}

console.log(mergeSort(myArray));