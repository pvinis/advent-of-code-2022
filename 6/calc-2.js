const fs = require("fs");
const { reduce, intersection, find, last } = require("lodash");
const { forEach } = require("remeda");

const input = fs.readFileSync("./input-1.txt").toString();

const lines = input.split("\n");

const signal = lines[0];

const allDifferent = (s) => {
  const letters = s.split("");
  const set = [...new Set(letters)];
  return letters.length === set.length;
};

const len = 14;

let done = false;
let index = 0;
while (!done) {
  const lenLetters = signal.slice(index, index + len);
  const allDiff = allDifferent(lenLetters);
  index++;
  if (allDiff) done = true;
}

console.log(index + len - 1);
