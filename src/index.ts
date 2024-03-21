import { MatchManager } from "./match-manager.js";
import { createSimulator } from "./simulator.js";

const match = new MatchManager({ side1: "P1", side2: "P2", totalSets: 3 });
const simulator = createSimulator(match);

simulator.playRegularSet(1); // set1: 6-2
// match.score();

simulator.playSetWithTieBreakerGame(2); // set2: 6-7
// match.score();

// match.pointWonBy(1);
// match.pointWonBy(1);
// match.pointWonBy(1);
// match.pointWonBy(2);
// match.pointWonBy(2);
// match.pointWonBy(2);
// match.pointWonBy(1);

simulator.playRegularSet(1); // set3: 6-2
match.score(); // match won by player 1
// match.printMatchData(); // PRINT rich json
