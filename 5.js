const { input } = require("./parseToArray.js");

const coords = input(5).map((v) => {
  const [startX, startY, endX, endY] = v.split(/[,(\s->\s)]+/gm);
  return {
    start: { x: parseInt(startX), y: parseInt(startY) },
    end: { x: parseInt(endX), y: parseInt(endY) },
  };
});
const considered = coords.filter(
  (coo) => coo.start.x == coo.end.x || coo.start.y == coo.end.y
);

let horizontals = {};

// or for considered in part1
for (const { start, end } of coords) {
  let incrY = start.y < end.y;
  let incrX = start.x < end.x;

  // part2
  if (start.x != end.x && start.y != end.y) {
    for (
      let [x, y] = [start.x, start.y];
      (incrY ? y <= end.y : y >= end.y) && (incrX ? x <= end.x : x >= end.x);
      (incrY ? y++ : y--) && (incrX ? x++ : x--)
    ) {
      horizontals[x] ? horizontals[x].push(y) : (horizontals[x] = [y]);
    }
    // part1
  } else {
    for (let y = start.y; incrY ? y <= end.y : y >= end.y; incrY ? y++ : y--) {
      for (
        let x = start.x;
        incrX ? x <= end.x : x >= end.x;
        incrX ? x++ : x--
      ) {
        horizontals[x] ? horizontals[x].push(y) : (horizontals[x] = [y]);
      }
    }
  }
}

const repeated = (list) => {
  const uniq = new Set(list);
  const dups = list.filter((elem) => {
    if (uniq.has(elem)) {
      uniq.delete(elem);
    } else {
      return elem;
    }
  });
  return [...new Set(dups)].length;
};

let res = 0;
for (const h of Object.values(horizontals)) {
  res += repeated(h);
}

console.log(res);
