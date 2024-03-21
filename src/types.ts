/**
 * Possible Sides in a Tennis game
 */
export type Side = 1 | 2;
export type EntityResult<State = string> =
	| {
			/** state of "1"|"2" indicates which side has won */
			state: "1" | "2";
			/** the score which can be displayed */
			score: string;
			/** has entity(match,set,game) has finished */
			isFinished: true;
			/** for entity=regular-game, additional points field */
			points?: string;
			/** which side won the entity(match,set,game) (isFinished=true) */
			wonBy: Side;
	  }
	| {
			/** state of entity; represent current state */
			state: State;
			/** the score which can be displayed */
			score: string;
			/** isFinished=false; discriminatedUnion */
			isFinished: false;
			/** for entity=regular-game, additional points field */
			points?: string;
	  };

/**
 * Interface to be implemented for Game implementation
 */
export type IGame<State = string> = {
	/**
	 * Adds the winning point to the player on either side
	 * @param side Tennis game side
	 * @param printResult Whether to evaluate and print result
	 */
	pointWonBy(side: 1 | 2, printResult?: boolean): boolean;

	/**
	 * Creates the game result
	 */
	getResult(): EntityResult<State>;
};

/**
 * Interface to be implemented for Set implementation
 */
export type ISet<State = string> = {
	/**
	 * Adds a winning game to the player on either side
	 * @param side Tennis game side
	 * @param printResult Whether to evaluate and print result
	 */
	gameWonBy(side: 1 | 2, printResult?: boolean): boolean;

	/**
	 * Creates the Set result
	 */
	getResult(): EntityResult<State>;
};

/**
 * Interface to be implemented for Match implementation
 */
export type IMatch<State = string> = {
	/**
	 * Adds a winning set to the player on either side
	 * @param side Tennis game side
	 * @param printResult Whether to evaluate and print result
	 */
	setWonBy(side: 1 | 2, printResult?: boolean): boolean;

	/**
	 * Creates the Match result
	 */
	getResult(): EntityResult<State>;
};

export type Scores = {
	side1: number;
	side2: number;
};

export type Status = "IN_PROGRESS" | "COMPLETE";
export type GameType = "REGULAR" | "TIE_BREAKER";

export type EntityReference = {
	score: string;
	wonBy?: Side;
	status: Status;
	points?: string;
};

type MatchInfo = {
	matchId: string;
	sides: { 1: string; 2: string };
	totalSets: number;
} & EntityReference;

type SetInfo = {
	number: number;
	id: string;
	gamesPlayed: number;
} & EntityReference;

export type GameInfo = {
	number: number;
	id: string;
	type: GameType;
} & EntityReference;

export type SetData = { info: SetInfo; games: GameInfo[] };

export type MatchData = {
	info: MatchInfo;
	sets: SetData[];
};

export type MatchManagerInput = {
	matchId?: string;
	side1: string;
	side2: string;
	totalSets: 3 | 5;
};
