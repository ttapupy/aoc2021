// https://adventofcode.com/2021/day/4

const random = [
  23, 91, 18, 32, 73, 14, 20, 4, 10, 55, 40, 29, 13, 25, 48, 65, 2, 80, 22, 16,
  93, 85, 66, 21, 9, 36, 47, 72, 88, 58, 5, 42, 53, 69, 52, 8, 54, 63, 76, 12,
  6, 99, 35, 95, 82, 49, 41, 17, 62, 34, 51, 77, 94, 7, 28, 71, 92, 74, 46, 79,
  26, 19, 97, 86, 87, 37, 57, 64, 1, 30, 11, 96, 70, 44, 83, 0, 56, 90, 59, 78,
  61, 98, 89, 43, 3, 84, 67, 38, 68, 27, 81, 39, 15, 50, 60, 24, 45, 75, 33, 31,
];

const fs = require("fs");
const day = "4";
const boards = fs
  .readFileSync(`${day}.txt`)
  .toString()
  .split(/^$[\r\n]+/gm);

const horizontalBoards = boards.map((board) =>
  board
    .trim()
    .split(/$[\r\n]+/gm)
    .map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((num) => parseInt(num))
    )
);

const verticalBoards = horizontalBoards.map((board) =>
  board[0].map((_, colIndex) => board.map((row) => row[colIndex]))
);

const bingo = (random, horizontalBoards, verticalBoards) => {
  let round = 1,
    sum = 0,
    lastNum = 0;
  winners = new Set();
  while (round < random.length) {
    const boards = [horizontalBoards, verticalBoards];
    for (
      let boardIndex = 0;
      boardIndex < horizontalBoards.length;
      boardIndex++
    ) {
      if (winners.has(boardIndex)) {
        continue;
      }
      for (
        let lineIndex = 0;
        lineIndex < horizontalBoards[boardIndex].length;
        lineIndex++
      ) {
        for (let typeIndex = 0; typeIndex < 2; typeIndex++) {
          if (winners.has(boardIndex)) {
            continue;
          }
          let board = boards[typeIndex][boardIndex];
          if (
            board[lineIndex].every((e) => random.slice(0, round).includes(e))
          ) {
            lastNum = random[round - 1];
            const notMarked = board
              .flat()
              .filter((n) => !random.slice(0, round).includes(n));
            sum =
              notMarked.length > 0
                ? notMarked.reduce((acc, curr) => acc + curr)
                : 0;
            // round = random.length; // exiting with this in part1
            winners.add(boardIndex);
            console.log(
              `Bingo! Last num: ${lastNum}. Board number: ${boardIndex}, line: ${
                typeIndex == 0 ? "horizontal" : "vertical"
              } ${board[lineIndex]}. Remaining board sum: ${sum}. Result: ${
                sum * lastNum
              }`
            );
          }
          if (round >= random.length) {
            return sum * lastNum;
          }
        }
      }
    }

    round++;
  }
  if (round >= random.length) {
    return sum * lastNum;
  }
};

bingo(random, horizontalBoards, verticalBoards);
