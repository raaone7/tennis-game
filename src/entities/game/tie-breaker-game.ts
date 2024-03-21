import type { EntityResult, IGame, Scores, Side } from "../../types.js";

/**
 * Evaluates the state of the tie-breaker game, based on defined rules and the points scored by players on both sides
 *
 * As per the tie-breaker game rules, a player on either side should have at-least 7 points while maintaining a score gap of 2 with opponent in order to win
 *
 * - `1` : Player 1 has won the game
 * - `2` : Player 2 has won the game
 * - `-` : Game is in progress i.e no side has won yet
 */
export const getGameState = ({ side1, side2 }: Scores) => {
	const gap = Math.abs(side1 - side2);
	if (side1 > 7 || side2 > 7) {
		if (gap > 2) throw new Error(`Unreachable state ${side1}-${side2}`);
		if (gap === 2) return side1 > side2 ? "1" : "2";
		return "-";
	}
	if (side1 === 7 || side2 === 7) {
		if (gap >= 2) return side1 > side2 ? "1" : "2";
		return "-";
	}
	return "-";
};

export type TieBreakerGameState = ReturnType<typeof getGameState>;

export class TieBreakerGame implements IGame<TieBreakerGameState> {
	#scores = { side1: 0, side2: 0 };
	#isFinished = false;
	#state: TieBreakerGameState = "-";

	pointWonBy(side: 1 | 2, printResult = false) {
		if (this.#isFinished) throw new Error("Game has already finished");
		this.#scores[`side${side}`] += 1;
		const result = getGameState(this.#scores);
		if (printResult) console.log(this.getResult());
		if (result === "1" || result === "2") this.#isFinished = true;
		this.#state = result;
		return this.#isFinished;
	}

	getResult(): EntityResult<TieBreakerGameState> {
		const { side1, side2 } = this.#scores;
		const score = `${side1}-${side2}`;
		const state = this.#state;
		if (state === "1" || state === "2") {
			return {
				state,
				score,
				wonBy: Number(state) as Side,
				isFinished: true,
			};
		}
		return { state, score, isFinished: false };
	}
}
