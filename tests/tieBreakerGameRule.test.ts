import { describe, expect, it } from "vitest";
import { getGameState } from "../src/entities/game/tie-breaker-game.js";

const gameDataSet = [
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
		result: "-",
	},
	{
		side1: 0,
		side2: 7,
		result: "2",
	},
	{
		side1: 6,
		side2: 7,
		result: "-",
	},
	{
		side1: 6,
		side2: 8,
		result: "2",
	},
	{
		side1: 7,
		side2: 7,
		result: "-",
	},
	{
		side1: 9,
		side2: 9,
		result: "-",
	},
	{
		side1: 9,
		side2: 12,
		result: null,
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
		result: "-",
	},
	{
		side1: 7,
		side2: 6,
		result: "-",
	},
	{
		side1: 8,
		side2: 6,
		result: "1",
	},
	{
		side1: 9,
		side2: 6,
		result: null,
	},
];

describe("Tie-breaker Game - Test", () => {
	for (const gameScore of gameDataSet) {
		const { result: expected, side1, side2 } = gameScore;
		const testName = `state for ${side1}-${side2} should be ${expected ?? "ERROR"}`;
		it(testName, () => {
			let result: string | null;
			try {
				result = getGameState(gameScore);
			} catch {
				result = null;
			}
			expect(result).to.be.eq(expected);
		});
	}
});
