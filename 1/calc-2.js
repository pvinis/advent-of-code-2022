const fs = require("fs");
const { reduce, sortBy } = require("lodash");

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

const sorted = sortBy(sums).reverse();

const max3 = sorted.slice(0, 3);

const sum = max3.reduce((acc, n) => acc + n, 0);

console.log(sum);
