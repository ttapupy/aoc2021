const fs = require('fs');
const os = require('os')

const day = 1;

let start = 0;

const ary = fs.readFileSync(`${day}.txt`).toString().split(os.EOL).map(num => parseInt(num))

ary.slice(1).forEach((curr, idx) => {
  if (curr > ary[idx]) {
    start += 1;
  }
})
console.log('result1', start);

// part 2

start = 0;
let window = ary[0] + ary[1] + ary[2];
ary.forEach((curr, idx) => {
  if (idx < 3) {
    return
  }
  let newWindow = curr + ary[idx-1] + ary[idx-2]
  if (newWindow > window) {
    start += 1;
  }
  window = newWindow
})
console.log('result2', start);

// reduce version of part 2
start = 0;
let window = ary[0] + ary[1] + ary[2];

const reducer = (prev, curr, idx) => {
  
}


const total = ary.reduce(reducer, start)