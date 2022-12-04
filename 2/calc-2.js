const fs = require("fs");
const { reduce } = require("lodash");

const input = fs.readFileSync("./input-1.txt").toString();

const scores = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 0, // lose
  Y: 3, // draw
  Z: 6, // win
};

const rounds = input.split("\n").slice(0, -1);

const points = rounds.map((round) => {
  let points = 0;
  const [team1, team2] = round.split(" ");
  points += scores[team2];
  if (team2 === "Y") {
    // draw
    points += scores[team1];
  }
  if (team2 === "Z") {
    // win
    const morePoints = (scores[team1] + 1) % 3;
    points += morePoints === 0 ? 1 : morePoints;
  }
  if (team2 === "X") {
    // lose
    const morePoints = (scores[team1] - 1 + 3) % 3;
    points += morePoints === 0 ? 3 : morePoints;
  }
  return points;
});

const totalPoints = points.reduce((acc, curr) => acc + curr, 0);

console.log(totalPoints);
