import { describe, expect, it } from "vitest";
import { getSetState } from "../src/entities/set.js";

const setDataSet = [
	{
		side1: 8,
		side2: 8,
		result: null,
	},
	{
		side1: 0,
		side2: 8,
		result: null,
	},
	{
		side1: 8,
		side2: 0,
		result: null,
	},
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
		result: "-",
	},
	{
		side1: 0,
		side2: 6,
		result: "2",
	},
	{
		side1: 0,
		side2: 7,
		result: null,
	},
	{
		side1: 5,
		side2: 7,
		result: "2",
	},
	{
		side1: 6,
		side2: 6,
		result: "TIE_BREAKER",
	},
	{
		side1: 1,
		side2: 0,
		result: "-",
	},
	{
		side1: 3,
		side2: 0,
		result: "-",
	},
	{
		side1: 6,
		side2: 0,
		result: "1",
	},
	{
		side1: 7,
		side2: 0,
		result: null,
	},
	{
		side1: 6,
		side2: 7,
		result: "2",
	},
	{
		side1: 7,
		side2: 6,
		result: "1",
	},
];

describe("Set - Test", () => {
	for (const setScore of setDataSet) {
		const { result: expected, side1, side2 } = setScore;
		const testName = `state for ${side1}-${side2} should be ${expected ?? "ERROR"}`;
		it(testName, () => {
			let result: string | null;
			try {
				result = getSetState(setScore);
			} catch {
				result = null;
			}
			expect(result).to.be.eq(expected);
		});
	}
});
