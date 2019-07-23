function mergeSort(arr, start, end) {
  function merge(arr, start, mid, end) {
    let p = start;
    let q = mid + 1;
    let tgt = [];
    //TODO: understand the =
    for( let i = start; i <= end; i++ ) {
      if (p > mid) {
        // put the rest of q
        tgt.push(arr[q++]);
      }
      else if (q > end) {
        // put the rest of p
        tgt.push(arr[p++]);
      }
      else if (arr[p] < arr[q]) {
        // put p
        tgt.push(arr[p++]);
      }
      else {
        // put q
        tgt.push(arr[q++]);
      }
    }
    for (let j = 0; j < tgt.length; j++) {
      arr[start++] = tgt[j];
    }
  }

  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }
  return arr;
}

let theArray = [8,1,3,2,4,9];
console.log(mergeSort(theArray, 0, theArray.length - 1));

