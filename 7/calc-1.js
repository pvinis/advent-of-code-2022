const fs = require("fs");
const { reduce, intersection, find, last, size } = require("lodash");
const { forEach, toPairs } = require("remeda");

const input = fs.readFileSync("./input-test.txt").toString();

const lines = input.split("\n").slice(0, -1);

let currentPath = "/";

const sizes = {};

let inLS = false;
const wasLSed = {};

lines.forEach((line) => {
  if (line.startsWith("$")) {
    if (inLS) {
      inLS = false;
      wasLSed[currentPath] = true;
    }
    // console.log("running", line);
    if (line.slice(2, 4) === "cd") {
      const loc = line.slice(5);
      if (loc === "/") {
        currentPath = "/";
      } else if (loc === "..") {
        currentPath = currentPath.split("/").slice(0, -1).join("/");
        if (currentPath === "") currentPath = "/";
      } else {
        currentPath =
          currentPath[currentPath.length - 1] === "/"
            ? currentPath + loc
            : currentPath + "/" + loc;
      }
      if (sizes[currentPath] === undefined) sizes[currentPath] = 0;
      // console.log("path", currentPath);
    } else if (line.slice(2, 4) === "ls") {
      // console.log("ls", currentPath);
      inLS = true;
    }
  } else {
    if (line.startsWith("dir")) {
    } else if (inLS && wasLSed[currentPath] === undefined) {
      const [size, name] = line.split(" ");
      sizes[currentPath] = (sizes[currentPath] ?? 0) + parseInt(size);
    }
  }
});

const numberOfSlaces = (path) => path.split("/").length - 1;

const paths = Object.keys(sizes).sort((a, b) => b.length - a.length);
paths.forEach((path) => {
  const numOfExtraSlashes = path === "/" ? 0 : 1;
  const subpaths = paths.filter(
    (p) =>
      p.startsWith(path) &&
      p !== path &&
      numberOfSlaces(p) === numberOfSlaces(path) + numOfExtraSlashes
  );
  // console.log({ path, subpaths }); // maybe filter only the ones with one extra `/`?
  const extraSize = subpaths.reduce((acc, p) => acc + sizes[p], 0);
  sizes[path] += extraSize;
});

// console.log(paths);
// console.log(sizes);
console.log(
  Object.values(sizes)
    .filter((s) => s <= 100_000)
    .reduce((acc, cur) => acc + cur, 0)
);
