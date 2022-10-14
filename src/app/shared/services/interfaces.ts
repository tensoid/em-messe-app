export interface Team {
  name: string;
  members: [string, string];
}

export interface Score {
  points: number;
  goalRatio: [number, number];
  goalDifference: number;
}

export interface Group {
  name: string;
  teams: Team[];
}

export interface GroupWithScores extends Group {
  scores: Score[];
}

export enum MatchState {
  UPCOMING,
  ONGOING,
  DONE,
}

export interface MatchDescription {
  teamNames: [string, string];
  goals: [number, number];
  state: MatchState;
}

export interface KOMatchDescription extends Omit<MatchDescription, 'goals'> {
  round: number;
  goals: Array<[number, number]>;
}
