import type { IMatch, EntityResult, Scores, Side } from "../types.js";

/**
 * Evaluates the state of the match, based on defined rules and sets won by players on both sides
 *
 * As per match rules, in a match of 3 sets, player has to win 2 sets first in order to win.
 * For a 5 set match, player has to win 3 sets first in order to win
 *
 * - `1` : Player 1 has won the match
 * - `2` : Player 2 has won the match
 * - `-` : Match is in progress i.e no side has won yet
 */
export const getMatchState = ({ side1, side2 }: Scores, maxSetsToWin: number) => {
	const err = new Error(`Unreachable state ${side1}-${side2}`);
	if (side1 > maxSetsToWin || side2 > maxSetsToWin) throw err;

	const gap = Math.abs(side1 - side2);
	if (side1 === maxSetsToWin || side2 === maxSetsToWin) {
		if (gap === 0) throw err; // both sides can get to maxToWin
		return side1 > side2 ? "1" : "2"; // one reached maxToWin, other dont
	}
	return "-";
};

export type MatchState = ReturnType<typeof getMatchState>;

export class Match implements IMatch<MatchState> {
	#setsWon = { side1: 0, side2: 0 };
	#maxSetsToWin: 2 | 3;
	#isFinished = false;
	#state: MatchState = "-";

	constructor(input: { totalSets: 3 | 5 }) {
		this.#maxSetsToWin = Math.ceil(input.totalSets / 2) as 2 | 3;
	}

	setWonBy(side: 1 | 2, printResult = false) {
		if (this.#isFinished) throw new Error("Match has already finished");
		this.#setsWon[`side${side}`] += 1;
		const result = getMatchState(this.#setsWon, this.#maxSetsToWin);
		if (printResult) console.log(this.getResult());
		if (result === "1" || result === "2") this.#isFinished = true;
		this.#state = result;
		return this.#isFinished;
	}

	getResult(): EntityResult<MatchState> {
		const { side1, side2 } = this.#setsWon;
		const score = `${side1}-${side2}`;
		const state = this.#state;
		if (state === "1" || state === "2") {
			return {
				score,
				state,
				wonBy: Number(state) as Side,
				isFinished: true,
			};
		}
		return { state, score, isFinished: false };
	}
}
