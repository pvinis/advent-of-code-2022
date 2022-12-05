const fs = require("fs");
const { reduce, intersection, find, last } = require("lodash");
const { forEach } = require("remeda");

const input = fs.readFileSync("./input-1.txt").toString();

const lines = input.split("\n");

const numbers = find(lines, (line) => !line.includes("["))
  .split(" ")
  .filter(Boolean)
  .map(Number);

const stacks = lines
  .filter((line) => line.includes("["))
  .reduce((acc, line) => {
    const stackBoxes = line.match(/(.{1,3})./g);
    forEach.indexed((box, index) => {
      if (box === "    ") return;
      acc[index] = acc[index] ?? [];
      acc[index].push(box.slice(1, 2));
    })(stackBoxes);
    return acc;
  }, new Array(numbers.length).fill(undefined))
  .map((stack) => stack.reverse());

const moves = lines
  .filter((line) => line.startsWith("move"))
  .map((line) => {
    console.log({ line });
    const [_, amount, from, to] = line.match(/move (.*) from (.*) to (.*)/);
    return { amount, from, to };
  });

console.log(stacks);

forEach(moves, (move) => {
  const { amount, from, to } = move;
  stacks[to - 1].push(...stacks[from - 1].splice(-amount));
  console.log(stacks);
});

console.log(stacks);

console.log(stacks.map((stack) => last(stack)).join(""));
