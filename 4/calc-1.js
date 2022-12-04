const fs = require("fs");
const { reduce, intersection } = require("lodash");

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

const fullyContained = (r1, r2) => {
  if (r1[0] <= r2[0] && r1[1] >= r2[1]) {
    return true;
  }
  return false;
};

const contained = assignments3.map(([f, s]) => {
  return fullyContained(f, s) || fullyContained(s, f);
});

console.log(contained.filter(Boolean).length);
