import { describe, expect, it } from "vitest";
import { getMatchState } from "../src/entities/match.js";

const matchDataSet3 = [
	{
		side1: 0,
		side2: 0,
		result: "-",
	},
	{
		side1: 0,
		side2: 1,
		result: "-",
	},
	{
		side1: 0,
		side2: 2,
		result: "2",
	},
	{
		side1: 1,
		side2: 1,
		result: "-",
	},
	{
		side1: 1,
		side2: 2,
		result: "2",
	},
	{
		side1: 2,
		side2: 1,
		result: "1",
	},
	{
		side1: 2,
		side2: 0,
		result: "1",
	},
	{
		side1: 3,
		side2: 3,
		result: null,
	},
	{
		side1: 3,
		side2: 0,
		result: null,
	},
	{
		side1: 0,
		side2: 3,
		result: null,
	},
];

const matchDataSet5 = [
	{
		side1: 0,
		side2: 0,
		result: "-",
	},
	{
		side1: 0,
		side2: 1,
		result: "-",
	},
	{
		side1: 0,
		side2: 3,
		result: "2",
	},
	{
		side1: 1,
		side2: 1,
		result: "-",
	},
	{
		side1: 1,
		side2: 2,
		result: "-",
	},
	{
		side1: 1,
		side2: 3,
		result: "2",
	},
	{
		side1: 2,
		side2: 1,
		result: "-",
	},
	{
		side1: 2,
		side2: 0,
		result: "-",
	},
	{
		side1: 2,
		side2: 3,
		result: "2",
	},
	{
		side1: 3,
		side2: 2,
		result: "1",
	},
	{
		side1: 3,
		side2: 3,
		result: null,
	},
	{
		side1: 3,
		side2: 0,
		result: "1",
	},
	{
		side1: 0,
		side2: 4,
		result: null,
	},
	{
		side1: 4,
		side2: 0,
		result: null,
	},
];

describe("Match (3 sets) - Test", () => {
	for (const item of matchDataSet3) {
		const { result: expected, side1, side2 } = item;
		const testName = `state for ${side1}-${side2} should be ${expected ?? "ERROR"}`;
		it(testName, () => {
			let result: string | null;
			try {
				result = getMatchState(item, 2);
			} catch {
				result = null;
			}
			expect(result).to.be.eq(expected);
		});
	}
});

describe("Match (5 sets) - Test", () => {
	for (const item of matchDataSet5) {
		const { result: expected, side1, side2 } = item;
		const testName = `state for ${side1}-${side2} should be ${expected ?? "ERROR"}`;
		it(testName, () => {
			let result: string | null;
			try {
				result = getMatchState(item, 3);
			} catch {
				result = null;
			}
			expect(result).to.be.eq(expected);
		});
	}
});
