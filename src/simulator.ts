import type { MatchManager } from "./match-manager.js";

/**
 * Creates methods for different kind of game play simulations
 * @param match Match Manager instance, where games are simulated
 * @returns Returns different methods to simulate game plays
 */
export const createSimulator = (match: MatchManager) => {
	/**
	 * Simulates a regular game, with winner as the player on the chosen side
	 * @param winner Side of the winning player
	 */
	const playRegularGame = (winner: 1 | 2) => {
		const loser = winner === 1 ? 2 : 1;
		match.pointWonBy(winner); // 15-0
		match.pointWonBy(loser); // 15-15
		match.pointWonBy(winner); // 30-15
		match.pointWonBy(winner); // 40-15
		match.pointWonBy(loser); // 40-30
		match.pointWonBy(loser); // 40-40 (DEUCE)
		match.pointWonBy(winner); // ADVANTAGE_PLAYER_1/2
		match.pointWonBy(winner); // Player 1 or 2 won
	};

	/**
	 * Simulates a tie-breaker game, with winner as the player on the chosen side
	 * @param winner Side of the winning player
	 */
	const playTieBreakerGame = (winner: 1 | 2) => {
		const loser = winner === 1 ? 2 : 1;
		match.pointWonBy(winner); // 1-0
		match.pointWonBy(loser); // 1-1
		match.pointWonBy(winner); // 2-1
		match.pointWonBy(winner); // 3-1
		match.pointWonBy(loser); // 3-2
		match.pointWonBy(loser); // 3-3
		match.pointWonBy(winner); // 4-3
		match.pointWonBy(winner); // 5-3
		match.pointWonBy(winner); // 6-3
		match.pointWonBy(winner); // 7-3
	};

	/**
	 * Simulates a regular set, with winner as the player on the chosen side
	 * @param winner Side of the winning player
	 */
	const playRegularSet = (winner: 1 | 2) => {
		const loser = winner === 1 ? 2 : 1;
		playRegularGame(winner);
		playRegularGame(winner);

		playRegularGame(loser);
		playRegularGame(winner);
		playRegularGame(winner);

		playRegularGame(loser);
		playRegularGame(winner);
		playRegularGame(winner);
	};

	/**
	 * Simulates a set with a tie-breaker game, with winner as the player on the chosen side
	 * @param winner Side of the winning player
	 */
	const playSetWithTieBreakerGame = (winner: 1 | 2) => {
		const loser = winner === 1 ? 2 : 1;
		for (let i = 0; i < 6; i++) {
			playRegularGame(winner);
			playRegularGame(loser);
		}
		playTieBreakerGame(winner);
	};

	return {
		playRegularGame,
		playTieBreakerGame,
		playRegularSet,
		playSetWithTieBreakerGame,
	};
};
