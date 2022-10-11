import { Injectable } from '@angular/core';

import presets from './presets.json';

export interface Team {
  name: string;
  members: [string, string];
}

export interface Score {
  points: number;
  //goals: number;
  //goal_difference: number;
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

@Injectable({
  providedIn: 'root',
})
export class GamedataService {
  private _groups: Group[];
  private _groupPhaseMatches: MatchDescription[];
  private _KOPhaseMatches: KOMatchDescription[][];

  constructor() {
    this.loadData();
  }

  /**
   * Saves all important information to localStorage
   */
  saveData() {
    this.saveLocalStorageItem('groupPhaseMatches', this._groupPhaseMatches);
    this.saveLocalStorageItem('groups', this._groups);
    this.saveLocalStorageItem('KOPhaseMatches', this._KOPhaseMatches);
  }

  /**
   * Loads the stored data from the localStorage or loads the
   * preset data if the localStorage is emtpy or corrupt.
   */
  private loadData() {
    // this._groupPhaseMatches
    let groupPhaseMatches =
      this.getLocalStorageItem<MatchDescription[]>('groupPhaseMatches');
    this._groupPhaseMatches = groupPhaseMatches
      ? groupPhaseMatches
      : (presets.groupPhaseMatches as MatchDescription[]);

    // this._groups
    let groups = this.getLocalStorageItem<Group[]>('groups');
    this._groups = groups ? groups : (presets.groups as Group[]);

    // this._KOPhaseMatches
    let KOPhaseMatches =
      this.getLocalStorageItem<KOMatchDescription[][]>('KOPhaseMatches');
    this._KOPhaseMatches = KOPhaseMatches
      ? KOPhaseMatches
      : (presets.KOPhaseMatches as KOMatchDescription[][]);
  }

  /**
   * Gets an item from the localStorage
   * @param key Name of the key
   * @returns {T} The Item of of the given key or undefined if it doesn't exist
   */
  private getLocalStorageItem<T>(key: string): T | undefined {
    let item = localStorage.getItem(key);
    if (!item) return undefined;

    return JSON.parse(item) as T;
  }

  /**
   * Saves an item to the localStorage
   * @param key Name of the key
   */
  private saveLocalStorageItem<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- Getters --- //

  get tableOverviewTitle(): string {
    
    if(!this.groupPhaseDone) {
      return "Gruppenphase"
    }
    else if(!this.KOPhaseDone && this.groupPhaseDone) {
      if(this.KOPhaseRoundIndex == 0) return "Achtelfinale";
      if(this.KOPhaseRoundIndex == 1) return "Viertelfinale";
      if(this.KOPhaseRoundIndex == 2) return "Halbfinale";
      if(this.KOPhaseRoundIndex == 3) return "Finale";
    }

    return "";
  }

  get groups(): Group[] {
    return this._groups;
  }

  get groupsWithScores(): GroupWithScores[] {
    let groups: Group[] = this._groups;
    let groupsWithScores: GroupWithScores[] = [];

    // Calculate scores for teach team
    // Win: 3 Points
    // Even: 1 Points
    // Loss: 0 Points
    groups.forEach((group) => {
      let scores: Score[] = [];

      group.teams.forEach((team) => {
        let teamMatches = this._groupPhaseMatches.filter((match) =>
          match.teamNames.includes(team.name)
        );

        let score: Score = {
          points: 0,
        };
        teamMatches.forEach((match) => {
          if (match.state != MatchState.DONE) return;

          let isFirstTeam = match.teamNames[0] == team.name;
          score.points += this.getPointsFromGoals(match.goals, isFirstTeam);
        });

        scores.push(score);
      });

      groupsWithScores.push({
        scores,
        ...group,
      });
    });

    // Sort teams by scores
    // Done this way because we need to sort both
    // the teams array and the scores array based on the scores
    groupsWithScores.forEach((group) => {
      //combine
      let combined = [];
      for (let i = 0; i < group.teams.length; i++)
        combined.push({ team: group.teams[i], score: group.scores[i] });

      //sort
      //TODO: sort by points then goal difference then total goals
      combined.sort((a, b) => {
        return b.score.points - a.score.points;
      });

      //separate again
      for (let j = 0; j < combined.length; j++) {
        group.teams[j] = combined[j].team;
        group.scores[j] = combined[j].score;
      }
    });

    return groupsWithScores;
  }

  getTeamMembersFromTeamName(teamName: string): [string, string] {
    let team = this.teams.find(team => team.name === teamName)?.members;
    return team ? team : ["", ""];
  }

  get teams(): Team[] {
    return this._groups.flatMap((group) => group.teams);
  }

  get activeGroupPhaseMatches(): MatchDescription[] {
    return this._groupPhaseMatches.filter(
      (match) => match.state == MatchState.ONGOING
    );
  }

  get activeKOMatches(): KOMatchDescription[] {
    if (!this.groupPhaseDone) return [];
    if (this.KOPhaseDone) return [];

    return this._KOPhaseMatches
      .flat()
      .filter((match) => match.state == MatchState.ONGOING);
  }

  /**
   * Returns the next matches formatted for the table-overview
   * @example Team1 vs Team2, Team3 vs Team4 ...
   */
  get nextMatchesAsFormattedString(): string {
    if (this.groupPhaseDone) return '';

    return this.nextGroupPhaseMatches
      .map((match) => `${match.teamNames[0]} vs. ${match.teamNames[1]}`)
      .join(', ');
  }

  get KOPhaseMatches(): KOMatchDescription[][] {
    return this._KOPhaseMatches;
  }

  get groupPhaseDone(): boolean {
    return this.activeGroupPhaseMatches.length == 0;
  }

  get KOPhaseDone(): boolean {
    return (
      this._KOPhaseMatches
        .flat()
        .filter(
          (match) =>
            match.state == MatchState.ONGOING ||
            match.state == MatchState.UPCOMING
        ).length == 0
    );
  }

  /**
   * Returns the round number for the group-phase or KO-phase depending on which phase the tournament is in.
   * Returns -1 if no round is being played.
   */
  get currentRound(): number {
    if (!this.groupPhaseDone) {
      return (
        Math.floor(
          this._groupPhaseMatches.findIndex(
            (match) => match.state == MatchState.ONGOING
          ) / 4
        ) + 1
      );
    }

    let activeKOMatches = this.activeKOMatches;
    if (activeKOMatches.length == 0) return -1;

    return activeKOMatches[0].round;
  }

  get KOPhaseRoundIndex(): number {
    let firstUpcomingMatch = this._KOPhaseMatches
      .flat()
      .find((match) => match.state != MatchState.DONE);

    if (firstUpcomingMatch == undefined) return 3;
    return this._KOPhaseMatches.findIndex((matches) =>
      matches.includes(firstUpcomingMatch as KOMatchDescription)
    );
  }

  private get nextGroupPhaseMatches(): MatchDescription[] {
    if (this.groupPhaseDone) return [];

    let firstActiveMatchIndex = this._groupPhaseMatches.findIndex(
      (match) => match.state == MatchState.ONGOING
    );

    if (firstActiveMatchIndex == this._groupPhaseMatches.length - 4) return [];

    return this._groupPhaseMatches.slice(
      firstActiveMatchIndex + 4,
      firstActiveMatchIndex + 8
    );
  }

  /**
   * Returns the winner or an empty string if KOPhase is not over yet.
   */
  get KOPhaseWinner(): string {
    if (!this.KOPhaseDone) return '';

    return this.getWinnerFromKOMatch(this._KOPhaseMatches[3][0]);
  }

  /**
   * Starts either the next group phase or KO phase matches depending on what phase is currently being played
   * Also starts the KO phase if the group phase is finished
   */
  startNextMatches() {
    if (!this.groupPhaseDone) this.startNextGroupPhaseMatches();
    else this.startNextKOPhaseMatches();

    this.saveData();
  }

  private startNextGroupPhaseMatches() {
    if (this.groupPhaseDone) return;

    let activeMatches = this.activeGroupPhaseMatches;
    let nextMatches = this.nextGroupPhaseMatches;

    for (let match of activeMatches) {
      match.state = MatchState.DONE;
    }

    for (let match of nextMatches) {
      match.state = MatchState.ONGOING;
    }
  }

  private startNextKOPhaseMatches() {
    if (this.KOPhaseDone) return;

    // Between Group Phase and KO Phase
    if (this.KOPhaseRoundIndex == 0 && this.activeKOMatches.length == 0) {
      this.startKOPhase();
      return;
    }

    let upcomingMatchesInKORound = this._KOPhaseMatches[
      this.KOPhaseRoundIndex
    ].filter((match) => match.state == MatchState.UPCOMING);
    let activeMatches = this.activeKOMatches;
    let activeMatchesRound = activeMatches[0].round;

    // Not all match rounds for currently competing teams done
    // so increase the round count by 1
    if (activeMatchesRound < 3) {
      for (let match of activeMatches) {
        match.round++;
      }

      return;
    }

    // All 3 match rounds for currently competing teams done
    // Set ongoing matches to done
    for (let match of activeMatches) {
      match.state = MatchState.DONE;
    }

    // No more teams left to compete in KO round so start next KO round
    // This automatically starts the next koround because of the KORoundIndex getter
    if (upcomingMatchesInKORound.length == 0) {
      this.startNextKOPhaseRound();
      return;
    }

    // More teams left to compete in KO round so
    for (let match of upcomingMatchesInKORound) {
      match.state = MatchState.ONGOING;
    }
  }

  returnToPreviousMatches() {
    //TODO: return in KO Phase matches allowed?
    if (this.groupPhaseDone) return;

    let firstOngoingMatchIndex = this._groupPhaseMatches.findIndex(
      (match) => match.state == MatchState.ONGOING
    );

    // All matches done
    if (firstOngoingMatchIndex == -1) {
      for (
        let i = this._groupPhaseMatches.length - 4;
        i < this._groupPhaseMatches.length;
        i++
      ) {
        this._groupPhaseMatches[i].state = MatchState.ONGOING;
      }

      return this.saveData();
    }

    // No matches played so far
    if (firstOngoingMatchIndex == 0) {
      return;
    }

    // Anything in between
    for (let i = firstOngoingMatchIndex; i < firstOngoingMatchIndex + 4; i++) {
      this._groupPhaseMatches[i].state = MatchState.UPCOMING;
      this._groupPhaseMatches[i - 4].state = MatchState.ONGOING;
    }

    this.saveData();
  }

  private getPointsFromGoals(
    goals: [number, number],
    isFirstTeam: boolean
  ): number {
    if (goals[0] == goals[1]) {
      return 1;
    } else if (goals[0] > goals[1] && isFirstTeam) {
      return 3;
    } else if (goals[1] > goals[0] && !isFirstTeam) {
      return 3;
    } else {
      return 0;
    }
  }

  private startKOPhase() {
    // populate with group phase winners
    let groupsWithScores = this.groupsWithScores;

    groupsWithScores.forEach((group, i) => {
      let winningTeamsInGroup = group.teams.slice(0, 2);

      this.KOPhaseMatches[0][i].teamNames[0] = winningTeamsInGroup[0].name;
      this.KOPhaseMatches[0][i].teamNames[1] = winningTeamsInGroup[1].name;
    });

    //set first 4 to ongoing
    for (let i = 0; i < 4; i++) {
      this._KOPhaseMatches[0][i].state = MatchState.ONGOING;
    }
  }

  private startNextKOPhaseRound() {
    if (this.KOPhaseDone) return;

    let matchesInPreviousKORound =
      this._KOPhaseMatches[this.KOPhaseRoundIndex - 1];

    // Populate next matches with winners from previous matches
    matchesInPreviousKORound.forEach((match, i) => {
      let winnerTeamName = this.getWinnerFromKOMatch(match);

      let matchIndex = Math.floor(i / 2);
      let teamIndex = i % 2;

      this._KOPhaseMatches[this.KOPhaseRoundIndex][matchIndex].teamNames[
        teamIndex
      ] = winnerTeamName;

      //TODO: do not allow even goals in ko phase table view
    });

    //set first 4 to ongoing
    for (
      let i = 0;
      i < Math.min(4, this._KOPhaseMatches[this.KOPhaseRoundIndex].length);
      i++
    ) {
      this._KOPhaseMatches[this.KOPhaseRoundIndex][i].state =
        MatchState.ONGOING;
    }
  }

  /**
   *
   * @param {KOMatchDescription} match
   * @returns {string} teamName
   */
  private getWinnerFromKOMatch(match: KOMatchDescription): string {
    let winCountTeam1 = match.goals.filter(
      (goals) => goals[0] > goals[1]
    ).length;

    if (winCountTeam1 > 1) return match.teamNames[0];
    else return match.teamNames[1];
  }

  //TODO: is last ist first match getter to hide buttons
  // for this ^ just check if next matches length is zero and if groupPhaseDone or not, should work
  //TODO: 12 dots to go to match random match / goToMatchN func
  //TODO: fix flag images / crop them round
}
