const fs = require("fs");
const { reduce } = require("lodash");

const input = fs.readFileSync("./input-1.txt").toString();

const grouped = reduce(
  input.split("\n").slice(0, -1),
  (acc, n) => {
    // console.log({ acc, n });
    if (n === "") return [...acc, []];
    return [...acc.slice(0, -1), [...(acc.slice(-1)[0] ?? []), parseInt(n)]];
  },
  []
);

const sums = grouped.map((g) => g.reduce((acc, n) => acc + n, 0));

const max = Math.max(...sums);

console.log(max);
