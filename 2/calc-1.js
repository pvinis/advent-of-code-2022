const fs = require("fs");
const { reduce } = require("lodash");

const input = fs.readFileSync("./input-1.txt").toString();

const scores = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
  lose: 0,
  draw: 3,
  win: 6,
};

const rounds = input.split("\n").slice(0, -1);

const points = rounds.map((round) => {
  let points = 0;
  const [team1, team2] = round.split(" ");
  points += scores[team2];
  if (scores[team1] === scores[team2]) {
    points += scores.draw;
  }
  if (
    (team2 === "X" && team1 === "C") ||
    (team2 === "Y" && team1 === "A") ||
    (team2 === "Z" && team1 === "B")
  ) {
    points += scores.win;
  }
  return points;
});

const totalPoints = points.reduce((acc, curr) => acc + curr, 0);

console.log(totalPoints);
