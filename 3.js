// https://adventofcode.com/2021/day/3

const fs = require("fs");
const os = require("os");
const day = "3";

const report = fs.readFileSync(`${day}.txt`).toString().split(os.EOL);
const binLength = report[0].length;

let gamma = [],
  epsilon = [];
let n = 0;
for (let i = 0; i < binLength; i++) {
  n = report.reduce((acc, val) => {
    return acc + (val.charAt(i) == "1" ? 1 : -1);
  }, 0);
  if (n >= 0) {
    gamma.push(1);
    epsilon.push(0);
  } else {
    gamma.push(0);
    epsilon.push(1);
  }
}

const g = parseInt(gamma.join(""), 2);
const e = parseInt(epsilon.join(""), 2);
console.log("gamma", g);
console.log("epsilon", e);
console.log("part1", g * e);


// part 2
const mostCommon = (report, index, common) => {
  const size = report.length
  const freq = report.reduce((acc, val) => {
    return val.charAt(index) === '1' ? {...acc, one: acc.one + 1} : {...acc, zero: acc.zero + 1};
  }, {one: 0, zero: 0});

  if (freq.one == size) {
    return '1'
  } else if (freq.zero == size) {
    return '0'
  } else if (common) {
    return freq.one >= freq.zero ? '1' : '0'
  } else {
    return freq.one >= freq.zero ? '0' : '1'
  }
};

const f32 = (report, index, common) => {
  const binLength = report[0].length;
  const n = mostCommon(report, index, common)
  const newReport = report.filter(binary => binary[index] === n )

  if (newReport.length == 1 || index +1 == binLength) {
    return newReport[0];
  } else {
    return f32(newReport, index + 1, common)
  }
};

const oxygen = f32(report, 0, true)
const co2 = f32(report, 0, false)
console.log(oxygen)
console.log(co2)
console.log('part2', parseInt(oxygen, 2) * parseInt(co2, 2))
