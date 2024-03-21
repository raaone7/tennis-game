import { Match, type MatchState } from "./entities/match.js";
import { GameSet, type SetState } from "./entities/set.js";
import { RegularGame } from "./entities/game/regular-game.js";
import { TieBreakerGame } from "./entities/game/tie-breaker-game.js";
import {
	initiateMatchData,
	initiateNewGameData,
	initiateNewSetWithGame,
	matchDataToJson,
} from "./utils.js";
import type {
	EntityResult,
	IGame,
	IMatch,
	ISet,
	MatchData,
	EntityReference,
	SetData,
	MatchManagerInput,
} from "./types.js";

export class MatchManager {
	data: MatchData;
	match: IMatch<MatchState>;
	currentSet: ISet<SetState>;
	currentGame: IGame;

	constructor(input: MatchManagerInput) {
		this.data = initiateMatchData(input);
		this.match = new Match({ totalSets: input.totalSets });
		this.currentSet = new GameSet();
		this.currentGame = new RegularGame();
	}

	pointWonBy(player: 1 | 2) {
		const { currentSetGames, gameInfo, matchInfo, setInfo, matchSets } = this.#basicDataCheck();

		// >> Play a game and update the json based on game, set and match results
		this.currentGame.pointWonBy(player);
		const gameResult = this.currentGame.getResult();
		this.#updateJson(gameInfo, gameResult);
		let setResult: EntityResult<SetState> | undefined;
		let matchResult: EntityResult<MatchState> | undefined;
		if (gameResult.isFinished) {
			this.currentSet.gameWonBy(gameResult.wonBy);
			setResult = this.currentSet.getResult();
			this.#updateJson(setInfo, setResult);
			if (setResult.isFinished) {
				this.match.setWonBy(setResult.wonBy);
				matchResult = this.match.getResult();
				this.#updateJson(matchInfo, matchResult);
			}
		}

		// 1. game not finished
		// Action: do nothing
		if (!gameResult.isFinished) return;

		// 2. Game finished, set not finished
		// Action: add new game in current set
		if (!setResult?.isFinished) {
			const nextGameType = setResult?.state === "TIE_BREAKER" ? "TIE_BREAKER" : "REGULAR";
			const newGameInfo = initiateNewGameData({
				gameNumber: currentSetGames.length + 1,
				type: nextGameType,
			});

			setInfo.gamesPlayed += 1;
			this.currentGame = nextGameType === "TIE_BREAKER" ? new TieBreakerGame() : new RegularGame();
			currentSetGames.push(newGameInfo);
			return;
		}

		// 3. Game finished, Set finished, match not finished
		// ACTION: add new set and new game
		if (!matchResult?.isFinished) {
			const newSetInfo = initiateNewSetWithGame({ setNumber: matchSets.length + 1 });

			matchSets.push(newSetInfo);
			this.currentSet = new GameSet();
			this.currentGame = new RegularGame();
		}

		// 4. Game finished, Set finished, match finished
		// ACTION: do nothing; drive back to your home :)
		return true;
	}

	#basicDataCheck() {
		// validations
		if (this.data.info.status === "COMPLETE") throw new Error("Match has already finished");
		const i = this.data.sets.at(-1);
		if (!i) throw new Error("current set ref not found");

		const gameInfo = i.games.at(-1);
		if (!gameInfo) throw new Error("current gameInfo not found");
		const setInfo = i.info;
		if (!setInfo) throw new Error("current setInfo not found");
		const matchInfo = this.data.info;
		if (!matchInfo) throw new Error("matchInfo not found");
		const currentSetGames = i.games;
		if (!currentSetGames) throw new Error("current set games ref not found");

		const matchSets = this.data.sets;
		return { gameInfo, setInfo, matchInfo, currentSetGames, matchSets };
	}

	#updateJson(ref: EntityReference, result: EntityResult) {
		ref.score = result.score;
		if (result.points) ref.points = result.points;
		if (result.isFinished) {
			ref.status = "COMPLETE";
			ref.wonBy = result.wonBy;
		}
	}

	printMatchData() {
		console.log(JSON.stringify(matchDataToJson(this.data), null, 2));
	}

	getPrintableSetScore(set: SetData) {
		const setRef = set.info;
		const gameRef = set.games.at(-1);
		if (!gameRef) throw new Error("latest game ref not found");

		const setNumber = setRef.number;
		const gameNumber = gameRef.number;
		const currentSetScore = setRef.score;
		const currentGameScore = gameRef.score;

		if (setRef.status === "COMPLETE") {
			const result = `>> SET ${setNumber} (Finished) <<
   Score: ${currentSetScore}
`;
			return result;
		}

		const result = `>> SET ${setNumber} (In Progress) <<
   Score: ${currentSetScore}

  !! GAME ${gameNumber} in SET ${setNumber} !!
     Score: ${currentGameScore}
`;

		return result;
	}

	score() {
		const sets = this.data.sets;
		if (!sets) throw new Error("sets ref not found");
		const wonBy = this.data.info.wonBy;

		const result = `### MATCH (${sets.length} Sets) (${wonBy ? "Finished" : "IN PROGRESS"}) ###
${wonBy ? `Player on the side ${wonBy} wins! 🎉` : ""}
`;
		console.log(result);
		for (const set of sets) {
			const setResult = this.getPrintableSetScore(set);
			console.log(setResult);
		}
	}
}
