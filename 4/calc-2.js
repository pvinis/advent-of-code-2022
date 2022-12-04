const fs = require("fs");
const { reduce, intersection, range } = require("lodash");

const input = fs.readFileSync("./input-1.txt").toString();

const assignments = input.split("\n").slice(0, -1);

const assignments2 = assignments.map((assignment) => {
  const [first, second] = assignment.split(",");
  return [first, second];
});

const assignments3 = assignments2.map(([f, s]) => {
  const [f1, f2] = f.split("-");
  const [s1, s2] = s.split("-");
  return [
    [parseInt(f1), parseInt(f2)],
    [parseInt(s1), parseInt(s2)],
  ];
});

const overlap = (r1, r2) => {
  const [x1, x2] = r1;
  const [y1, y2] = r2;
  return intersection(range(x1, x2 + 1), range(y1, y2 + 1)).length > 0;
};

const contained = assignments3.map(([f, s]) => {
  return overlap(f, s) || overlap(s, f);
});

console.log(contained.filter(Boolean).length);
