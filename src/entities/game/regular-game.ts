import { getPoint } from "../../utils.js";
import type { EntityResult, IGame, Scores, Side } from "../../types.js";

/**
 * Evaluates the state of the game, based on defined rules and the points scored by players on both sides
 *
 * As per the regular game rules, a player on either side should have at-least 4 points while maintaining a score gap of 2 with opponent in order to win
 *
 * - `1` : Player 1 has won the game
 * - `2` : Player 2 has won the game
 * - `ADVANTAGE_PLAYER_1` : Player 1 has advantage after deuce
 * - `ADVANTAGE_PLAYER_2` : Player 2 has advantage after deuce
 * - `DEUCE` : It is a deuce (40-40 or other same points > 40)
 * - `-` : Scores are 40-0, 40-15, 40-30, 30-0, 30-15, 30-30, 30-40, 15-0,15-15,15-30,15-40
 */
export const getGameState = ({ side1, side2 }: Scores) => {
	const gap = Math.abs(side1 - side2);
	if (side1 > 4 || side2 > 4) {
		if (gap > 2) throw new Error(`Unreachable state ${side1}-${side2}`);
		if (gap === 2) return side1 > side2 ? "1" : "2";
		if (gap === 1) return side1 > side2 ? "ADVANTAGE_PLAYER_1" : "ADVANTAGE_PLAYER_2";
		return "DEUCE";
	}
	if (side1 === 4 || side2 === 4) {
		if (gap >= 2) return side1 > side2 ? "1" : "2";
		if (gap === 1) return side1 > side2 ? "ADVANTAGE_PLAYER_1" : "ADVANTAGE_PLAYER_2";
		return "DEUCE";
	}
	if (gap === 0 && side1 === 3) return "DEUCE"; // 40-40
	return "-";
};

export type RegularGameState = ReturnType<typeof getGameState>;

export class RegularGame implements IGame<RegularGameState> {
	#scores = { side1: 0, side2: 0 };
	#isFinished = false;
	#state: RegularGameState = "-";

	pointWonBy(side: 1 | 2, printResult = false) {
		if (this.#isFinished) throw new Error("Game has already finished");
		this.#scores[`side${side}`] += 1;
		const result = getGameState(this.#scores);
		if (result === "1" || result === "2") this.#isFinished = true;
		if (printResult) console.log(this.getResult());
		this.#state = result;
		return this.#isFinished;
	}

	getResult(): EntityResult<RegularGameState> {
		const { side1: p1, side2: p2 } = this.#scores;
		const state = this.#state;
		const points = `${p1}-${p2}`;
		if (state === "1" || state === "2") {
			return {
				score: "GAME",
				points,
				state,
				wonBy: Number(state) as Side,
				isFinished: true,
			};
		}
		if (state === "-") {
			const standardScore = `${getPoint(p1)}-${getPoint(p2)}`;
			return {
				score: standardScore,
				points,
				state,
				isFinished: false,
			};
		}
		return {
			score: state,
			points,
			state,
			isFinished: false,
		};
	}
}
