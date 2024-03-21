import { describe, expect, it } from "vitest";
import { getGameState } from "../src/entities/game/regular-game.js";

const gameDataSet = [
	{
		side1: 0,
		side2: 0,
		result: "-",
	},
	{
		side1: 0,
		side2: 2,
		result: "-",
	},
	{
		side1: 2,
		side2: 0,
		result: "-",
	},
	{
		side1: 0,
		side2: 4,
		result: "2",
	},
	{
		side1: 0,
		side2: 5,
		result: null,
	},
	{
		side1: 4,
		side2: 4,
		result: "DEUCE",
	},
	{
		side1: 5,
		side2: 6,
		result: "ADVANTAGE_PLAYER_2",
	},
	{
		side1: 10,
		side2: 10,
		result: "DEUCE",
	},
	{
		side1: 10,
		side2: 11,
		result: "ADVANTAGE_PLAYER_2",
	},
	{
		side1: 10,
		side2: 12,
		result: "2",
	},
	{
		side1: 10,
		side2: 13,
		result: null,
	},
	{
		side1: 4,
		side2: 0,
		result: "1",
	},
	{
		side1: 6,
		side2: 5,
		result: "ADVANTAGE_PLAYER_1",
	},
	{
		side1: 8,
		side2: 7,
		result: "ADVANTAGE_PLAYER_1",
	},
	{
		side1: 9,
		side2: 7,
		result: "1",
	},
	{
		side1: 10,
		side2: 7,
		result: null,
	},
];

describe("Regular Game - Test", () => {
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
