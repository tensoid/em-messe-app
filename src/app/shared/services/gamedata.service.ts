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
  private _KOPhaseRoundIndex: number = 0;
  private _groupPhaseDone: boolean = false;
  private _KOPhaseDone: boolean = false;

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
    this.saveLocalStorageItem('KOPhaseRoundIndex', this._KOPhaseRoundIndex);
    this.saveLocalStorageItem('groupPhaseDone', this._groupPhaseDone);
    this.saveLocalStorageItem('KOPhaseDone', this._KOPhaseDone);
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

    // this._KOPhaseRoundIndex
    let KOPhaseRoundIndex =
      this.getLocalStorageItem<number>('KOPhaseRoundIndex');
    this._KOPhaseRoundIndex = KOPhaseRoundIndex ? KOPhaseRoundIndex : 0;

    // this._groupPhaseDone
    let groupPhaseDone = this.getLocalStorageItem<boolean>('groupPhaseDone');
    this._groupPhaseDone = groupPhaseDone ? groupPhaseDone : false;

    // this._KOPhaseDone
    let KOPhaseDone = this.getLocalStorageItem<boolean>('KOPhaseDone');
    this._KOPhaseDone = KOPhaseDone ? KOPhaseDone : false;
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

  get teams(): Team[] {
    return this._groups.flatMap((group) => group.teams);
  }

  get activeGroupPhaseMatches(): MatchDescription[] {
    if (this.groupPhaseDone) return [];

    return this._groupPhaseMatches.filter(
      (match) => match.state == MatchState.ONGOING
    );
  }

  get activeKOMatches(): KOMatchDescription[] {
    if (!this.groupPhaseDone) return [];
    if (this._KOPhaseDone) return [];

    return this._KOPhaseMatches[this.KOPhaseRoundIndex].filter(
      (match) => match.state == MatchState.ONGOING
    );
  }

  get nextMatches(): MatchDescription[] {
    //TODO: next matches
    throw Error('Not implemented');

    let firstUpcomingMatchIndex = this._groupPhaseMatches.findIndex(
      (match) => match.state == MatchState.UPCOMING
    );

    if (firstUpcomingMatchIndex == -1) return [];

    return this._groupPhaseMatches.slice(
      firstUpcomingMatchIndex,
      firstUpcomingMatchIndex + 4
    );
  }

  get KOPhaseMatches(): KOMatchDescription[][] {
    return this._KOPhaseMatches;
  }

  get groupPhaseDone(): boolean {
    return this._groupPhaseDone;
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
    return this._KOPhaseRoundIndex;
  }

  /**
   * Returns the winner or an empty string if KOPhase is not over yet.
   */
  get KOPhaseWinner(): string {
    if (!this._KOPhaseDone) return '';

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
    if (this._groupPhaseDone) return;

    let firstActiveMatchIndex = this._groupPhaseMatches.findIndex(
      (match) => match.state == MatchState.ONGOING
    );

    // This should not happen due to the preset setting the first 4 matches to ONGOING
    if (firstActiveMatchIndex == -1) {
      return;
    }

    // All matches done
    if (firstActiveMatchIndex == this._groupPhaseMatches.length - 4) {
      for (
        let i = this._groupPhaseMatches.length - 4;
        i < this._groupPhaseMatches.length;
        i++
      ) {
        this._groupPhaseMatches[i].state = MatchState.DONE;
      }

      this._groupPhaseDone = true;

      return;
    }

    // Anything in between
    for (let i = firstActiveMatchIndex; i < firstActiveMatchIndex + 4; i++) {
      this._groupPhaseMatches[i].state = MatchState.DONE;
      this._groupPhaseMatches[i + 4].state = MatchState.ONGOING;
    }
  }

  private startNextKOPhaseMatches() {
    if (this._KOPhaseDone) return;

    // Between Group Phase and KO Phase
    if (
      this._KOPhaseRoundIndex == 0 &&
      this._KOPhaseMatches[0].filter(
        (match) => match.state == MatchState.ONGOING
      ).length == 0
    ) {
      this.startKOPhase();
      return;
    }

    let matchesInCurrentKORound = this._KOPhaseMatches[this._KOPhaseRoundIndex];
    let ongoingMatches = matchesInCurrentKORound.filter(
      (match) => match.state == MatchState.ONGOING
    );

    let matchRound = ongoingMatches[0].round;

    // Not all match rounds for currently competing teams done
    if (matchRound < 3) {
      // not all match rounds done increase round counter by one
      for (let match of ongoingMatches) {
        match.round++;
      }

      return;
    }

    // All 3 match rounds for currently competing teams done
    // Set ongoing matches to done
    for (let match of ongoingMatches) {
      match.state = MatchState.DONE;
    }

    let upcomingMatchesInKORound = matchesInCurrentKORound.filter(
      (match) => match.state === MatchState.UPCOMING
    );

    // No more teams left to compete in KO round so start next KO round
    // This automatically starts the next koround because of the KORoundIndex getter
    if (upcomingMatchesInKORound.length == 0) {
      // No more KO rounds left
      if (this._KOPhaseRoundIndex == 3) {
        this._KOPhaseDone = true;

        return;
      }

      this.startNextKOPhaseRound();
      return;
    }

    // More teams left to compete in KO round so
    // set next 4 matches in KO round to ongoing
    if (upcomingMatchesInKORound.length > 4) {
      for (let i = 0; i < 4; i++) {
        upcomingMatchesInKORound[i].state = MatchState.ONGOING;
      }
    } else {
      for (let match of upcomingMatchesInKORound) {
        match.state = MatchState.ONGOING;
      }
    }
  }

  returnToPreviousMatches() {
    //TODO: return in KO Phase matches allowed?
    if (this._groupPhaseDone) return;

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
    let matchesInCurrentKORound = this._KOPhaseMatches[this._KOPhaseRoundIndex];
    let nextKORoundIndex = this._KOPhaseRoundIndex + 1;

    // Populate next matches with winners from previous matches
    matchesInCurrentKORound.forEach((match, i) => {
      let winnerTeamName = this.getWinnerFromKOMatch(match);

      let matchIndex = Math.floor(i / 2);
      let teamIndex = i % 2;

      this._KOPhaseMatches[nextKORoundIndex][matchIndex].teamNames[teamIndex] =
        winnerTeamName;

      //TODO: do not allow even goals in ko phase table view
    });

    //set first 4 to ongoing
    for (
      let i = 0;
      i < Math.min(4, this._KOPhaseMatches[nextKORoundIndex].length);
      i++
    ) {
      this._KOPhaseMatches[nextKORoundIndex][i].state = MatchState.ONGOING;
    }

    this._KOPhaseRoundIndex++;
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
