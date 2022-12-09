const fs = require("fs")
const { reduce, intersection, find, last, size } = require("lodash")
const { forEach, toPairs } = require("remeda")

const input = fs.readFileSync("./input-test.txt").toString()

const lines = input.split("\n").slice(0, -1)

const perimeter = lines.length * 2 + lines[0].length * 2 - 4
let visibleInner = 0

for (let i = 1; i < lines.length - 1; i++) {
	for (let j = 1; j < lines[i].length - 1; j++) {
		const currTree = lines[i][j]
		// console.log(currTree)
		let visible = false

		const leftTrees = lines[i]
			.slice(0, j)
			.split("")
			.map((s) => parseInt(s))
		visible =
			visible || leftTrees.filter((tree) => tree >= currTree).length === 0
		if (visible) {
			visibleInner++
			continue
		}

		const rightTrees = lines[i]
			.slice(j + 1)
			.split("")
			.map((s) => parseInt(s))
		visible =
			visible || rightTrees.filter((tree) => tree >= currTree).length === 0
		if (visible) {
			visibleInner++
			continue
		}

		const upTrees = lines
			.map((line) => line.split("")[j])
			.slice(0, i)
			.map((s) => parseInt(s))
		visible = visible || upTrees.filter((tree) => tree >= currTree).length === 0
		if (visible) {
			visibleInner++
			continue
		}

		const downTrees = lines
			.map((line) => line.split("")[j])
			.slice(i + 1)
			.map((s) => parseInt(s))
		visible =
			visible || downTrees.filter((tree) => tree >= currTree).length === 0
		if (visible) {
			visibleInner++
			continue
		}
	}
}

console.log(perimeter + visibleInner)
