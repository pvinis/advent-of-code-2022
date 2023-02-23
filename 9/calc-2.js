const fs = require("fs")
const { reduce, intersection, find, last, size } = require("lodash")
const { forEach, toPairs } = require("remeda")

const input = fs.readFileSync("./input-test.txt").toString()

const lines = input.split("\n").slice(0, -1)

let maxScenic = 0

for (let i = 1; i < lines.length - 1; i++) {
	for (let j = 1; j < lines[i].length - 1; j++) {
		const currTree = lines[i][j]
		// console.log(currTree)
		let scenic = []

		const leftTrees = lines[i]
			.slice(0, j)
			.split("")
			.map((s) => parseInt(s))
			.reverse()
		let index = leftTrees.findIndex((tree) => tree >= currTree)
		scenic.push(index === -1 ? leftTrees.length : index + 1)

		const rightTrees = lines[i]
			.slice(j + 1)
			.split("")
			.map((s) => parseInt(s))
		index = rightTrees.findIndex((tree) => tree >= currTree)
		scenic.push(index === -1 ? rightTrees.length : index + 1)

		const upTrees = lines
			.map((line) => line.split("")[j])
			.slice(0, i)
			.map((s) => parseInt(s))
			.reverse()
		index = upTrees.findIndex((tree) => tree >= currTree)
		scenic.push(index === -1 ? upTrees.length : index + 1)

		const downTrees = lines
			.map((line) => line.split("")[j])
			.slice(i + 1)
			.map((s) => parseInt(s))
		index = downTrees.findIndex((tree) => tree >= currTree)
		scenic.push(index === -1 ? downTrees.length : index + 1)

		// console.log(scenic)

		const scenicScore = scenic.reduce((acc, curr) => acc * curr, 1)
		if (scenicScore > maxScenic) maxScenic = scenicScore
	}
}

console.log(maxScenic)
