import type { ISet, Scores, EntityResult, Side } from "../types.js";

/**
 * Evaluates the state of the set, based on defined rules and the games won by players on both sides
 *
 * As per the SET rules, a player has to win at-least 6 games and 2 more than their opponent
 * and if score reaches 6-6 i.e 6 games won by each player, the players need to play a tie-breaker game
 * and after tie-breaker game set ends with a decision based on the score of `7-6` or `6-7`
 *
 * - `1` : Player 1 has won the match
 * - `2` : Player 2 has won the match
 * - `TIE_BREAKER` : Set has reached a score of 6-6
 * - `-` : Set is in progress i.e no side has won yet
 */
export const getSetState = ({ side1, side2 }: Scores) => {
	const error = new Error(`Unreachable state ${side1}-${side2}`);
	const gap = Math.abs(side1 - side2);

	// 1. no sides can win more than 7 games
	if (side1 > 7 || side2 > 7) throw error;

	// 2. one of the sides won 7 games
	if (side1 === 7 || side2 === 7) {
		// 7-5, 7-6
		if (gap === 1 || gap === 2) return side1 > side2 ? "1" : "2";
		// 7-4 is error
		// 7-7 is error
		throw error;
	}

	// 3. one of sides won 6 games (other one less than 6)
	if (side1 === 6 || side2 === 6) {
		if (gap === 0) return "TIE_BREAKER"; // 6-6
		if (gap === 1) return "-";
		return side1 > side2 ? "1" : "2"; // gap >= 2
	}

	// 4. both sides won less than 6 games
	return "-";
};

export type SetState = ReturnType<typeof getSetState>;

export class GameSet implements ISet<SetState> {
	#gamesWon = { side1: 0, side2: 0 };
	#isFinished = false;
	#state: SetState = "-";

	gameWonBy(side: 1 | 2, printResult = false) {
		if (this.#isFinished) throw new Error("Set has already finished");
		this.#gamesWon[`side${side}`] += 1;
		const result = getSetState(this.#gamesWon);
		if (printResult) console.log(this.getResult());
		if (result === "1" || result === "2") this.#isFinished = true;
		this.#state = result;
		return this.#isFinished;
	}

	getResult(): EntityResult<SetState> {
		const { side1, side2 } = this.#gamesWon;
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
		return { score, state, isFinished: false };
	}
}
