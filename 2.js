const fs = require('fs');
const os = require('os')
const day = 2;

const ary = fs.readFileSync(`${day}.txt`).toString().split(os.EOL).map(cmd => [cmd.split(' ')[0], parseInt(cmd.split(' ')[1])])
// console.log(ary)

const res1 = ary.reduce((acc, value) => {
  if (value[0] in acc) {
    acc[value[0]] = acc[value[0]] + value[1]
  } else {
    acc[value[0]] = value[1]
  }

  return (
    acc
  )
}, {})

console.log('res1', res1)
console.log((res1.down - res1.up) * res1.forward)

// part 2

const res2 = ary.reduce((acc, value) => {
  switch (value[0]) {
    case 'down':
      acc.aim = acc.aim + value[1]
      break;
    case 'up':
      acc.aim = acc.aim - value[1]
      break;
    case 'forward':
      acc.forward = acc.forward + value[1]
      acc.depth = acc.depth + (acc.aim * value[1])
      break;  
    default:
      break;
  }

  return (
    acc
  )
}, {forward: 0, depth: 0, aim: 0})
console.log('res2', res2)
console.log(res2.depth * res2.forward)