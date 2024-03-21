import { randomUUID } from "node:crypto";
import type { GameInfo, GameType, MatchData, MatchManagerInput, SetData } from "./types.js";

const pointMap = {
	0: 0,
	1: 15,
	2: 30,
	3: 40,
} as const;

export const getPoint = (value: number) => {
	const v = pointMap[value as keyof typeof pointMap];
	if (v == null) throw new Error("Unknown point");
	return v;
};

export const initiateMatchData = (params: MatchManagerInput): MatchData => {
	return {
		info: {
			matchId: params.matchId ?? randomUUID(),
			sides: { 1: params.side1, 2: params.side2 },
			status: "IN_PROGRESS",
			score: "",
			totalSets: params.totalSets,
		},
		sets: [
			{
				info: {
					id: randomUUID(),
					number: 1,
					score: "0-0",
					status: "IN_PROGRESS",
					gamesPlayed: 1,
				},
				games: [
					{
						id: randomUUID(),
						number: 1,
						score: "0-0",
						status: "IN_PROGRESS",
						type: "REGULAR",
					},
				],
			},
		],
	};
};

export const initiateNewGameData = (input: { gameNumber: number; type: GameType }): GameInfo => {
	return {
		id: randomUUID(),
		number: input.gameNumber,
		score: "0-0",
		status: "IN_PROGRESS" as const,
		type: input.type,
	};
};

export const initiateNewSetWithGame = (input: { setNumber: number }): SetData => {
	return {
		info: {
			id: randomUUID(),
			number: input.setNumber,
			score: "0-0",
			status: "IN_PROGRESS" as const,
			gamesPlayed: 1,
		},
		games: [initiateNewGameData({ gameNumber: 1, type: "REGULAR" })],
	};
};

export const setDataToJson = (set: SetData) => {
	const setInfoRaw = set.info;

	const setInfo = {
		setNumber: setInfoRaw.number,
		score: setInfoRaw.score,
		isFinished: setInfoRaw.status === "COMPLETE",
		wonBy: setInfoRaw.wonBy,
	};
	if (setInfoRaw.wonBy) setInfo.wonBy = setInfoRaw.wonBy;

	const games = set.games.map((i) => {
		return {
			gameNumber: i.number,
			score: i.score,
			type: i.type,
			wonBy: i.wonBy,
			isFinished: i.status === "COMPLETE",
		};
	});

	return { ...setInfo, games };
};

export const matchDataToJson = (match: MatchData) => {
	const matchInfoRaw = match.info;

	const matchInfo = {
		matchId: matchInfoRaw.matchId,
		score: matchInfoRaw.score,
		isFinished: matchInfoRaw.status === "COMPLETE",
		wonBy: matchInfoRaw.wonBy,
	};

	const sets = match.sets.map(setDataToJson);

	return { ...matchInfo, sets };
};
