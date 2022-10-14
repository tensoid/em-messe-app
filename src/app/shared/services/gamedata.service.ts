import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import {
  Team,
  Group,
  GroupWithScores,
  MatchDescription,
  KOMatchDescription,
  MatchState,
  Score,
} from './interfaces';

import presets from './presets.json';

@Injectable({
  providedIn: 'root',
})
export class GamedataService {
  private _groups: Group[];
  private _groupPhaseMatches: MatchDescription[];
  private _KOPhaseMatches: KOMatchDescription[][];

  /**
   * This service handles all the data storing and manipulation for the tournament.
   * @param router
   */
  constructor(private router: Router) {
    this.loadData();
  }

  // --- Data Saving / Loading --- //

  /**
   * Saves all the necessary data to localStorage.
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
   * Returns the item for the given key from the localStorage or undefined if it doesn't exist.
   * @param key Name of the key
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

  /**
   * Returns the title of the table overview depending on what phase or KO round is currently being played.
   * @example Gruppenphase, Achtelfinale, Viertelfinale, Halbfinale, Finale
   */
  get tableOverviewTitle(): string {
    if (!this.groupPhaseDone) {
      return 'Gruppenphase';
    } else if (!this.KOPhaseDone && this.groupPhaseDone) {
      if (this.KOPhaseRoundIndex == 0) return 'Achtelfinale';
      if (this.KOPhaseRoundIndex == 1) return 'Viertelfinale';
      if (this.KOPhaseRoundIndex == 2) return 'Halbfinale';
      if (this.KOPhaseRoundIndex == 3) return 'Finale';
    }

    return '';
  }

  get groups(): Group[] {
    return this._groups;
  }

  /**
   * Returns the groups with additional information of the scores for each team.
   */
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

        let score: Score = this.getScoreFromMatches(teamMatches, team.name);

        scores.push(score);
      });

      groupsWithScores.push({
        scores,
        ...group,
      });
    });

    // Sort teams by scores.
    // Done this way because we need to sort both
    // the teams array and the scores array based on the scores.
    groupsWithScores.forEach((group) => {
      //combine
      let combined = [];
      for (let i = 0; i < group.teams.length; i++)
        combined.push({ team: group.teams[i], score: group.scores[i] });

      //sort by points then goal difference then goal Ratio + L + Fell Off
      combined.sort((a, b) => {
        if (a.score.points > b.score.points) return -1;
        if (a.score.points < b.score.points) return 1;

        if (a.score.goalDifference > b.score.goalDifference) return -1;
        if (a.score.goalDifference < b.score.goalDifference) return 1;

        if (a.score.goalRatio[0] > b.score.goalRatio[0]) return -1;
        if (a.score.goalRatio[0] < b.score.goalRatio[0]) return 1;

        return 0;
      });

      //separate again
      for (let j = 0; j < combined.length; j++) {
        group.teams[j] = combined[j].team;
        group.scores[j] = combined[j].score;
      }
    });

    return groupsWithScores;
  }

  /**
   * Returns the score for a team in the given matches.
   * @param matches
   * @param teamName
   */
  getScoreFromMatches(matches: MatchDescription[], teamName: string): Score {
    let score: Score = {
      points: 0,
      goalDifference: 0,
      goalRatio: [0, 0],
    };

    matches.forEach((match) => {
      if (match.state != MatchState.DONE) return;

      let isFirstTeam = match.teamNames[0] == teamName;
      score.points += this.getPointsFromGoals(match.goals, isFirstTeam);

      if (isFirstTeam) {
        score.goalRatio[0] += match.goals[0];
        score.goalRatio[1] += match.goals[1];
      } else {
        score.goalRatio[0] += match.goals[1];
        score.goalRatio[1] += match.goals[0];
      }

      score.goalDifference = score.goalRatio[0] - score.goalRatio[1];
    });

    return score;
  }

  /**
   * Returns the team members of the given team name.
   * @param teamName
   */
  getTeamMembersFromTeamName(teamName: string): [string, string] {
    let team = this.teams.find((team) => team.name === teamName)?.members;
    return team ? team : ['', ''];
  }

  get teams(): Team[] {
    return this._groups.flatMap((group) => group.teams);
  }

  /**
   * Returns the currently playing matches for the Group Phase.
   */
  get activeGroupPhaseMatches(): MatchDescription[] {
    return this._groupPhaseMatches.filter(
      (match) => match.state == MatchState.ONGOING
    );
  }

  /**
   * Returns the currently playing matches for the KO Phase.
   */
  get activeKOMatches(): KOMatchDescription[] {
    if (!this.groupPhaseDone) return [];
    if (this.KOPhaseDone) return [];

    return this._KOPhaseMatches
      .flat()
      .filter((match) => match.state == MatchState.ONGOING);
  }

  /**
   * Returns the next matches formatted for the table-overview.
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

  /**
   * Returns the index of the KO Round.
   */
  get KOPhaseRoundIndex(): number {
    let firstUpcomingMatch = this._KOPhaseMatches
      .flat()
      .find((match) => match.state != MatchState.DONE);

    if (firstUpcomingMatch == undefined) return 3;
    return this._KOPhaseMatches.findIndex((matches) =>
      matches.includes(firstUpcomingMatch as KOMatchDescription)
    );
  }

  /**
   * Returns next 4 or less upcoming group phase matches.
   */
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
   * Returns the winning teamName from a KO Match.
   * @param {KOMatchDescription} match
   */
  private getWinnerFromKOMatch(match: KOMatchDescription): string {
    let winCountTeam1 = match.goals.filter(
      (goals) => goals[0] > goals[1]
    ).length;

    if (winCountTeam1 > 1) return match.teamNames[0];
    else return match.teamNames[1];
  }

  /**
   * Returns the calculated points for a given match and team.
   * @param goals
   * @param isFirstTeam
   */
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

  // --- Controlling --- //

  /**
   * Starts either the next group phase or KO phase matches depending on what phase is currently being played.
   * Also starts the KO phase if the group phase is finished.
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

    if (nextMatches.length == 0) {
      this.startKOPhase();
    }
  }

  private startNextKOPhaseMatches() {
    if (this.KOPhaseDone) return;

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

  /**
   * Returns to the previous matches. This only works in the group phase.
   */
  returnToPreviousMatches() {
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

  /**
   * Populates the first KO. round with the group phase winners and starts the first 4 matches.
   */
  private startKOPhase() {
    if (environment.production) {
      this.router.navigate(['/group-overview']);
    }

    let groupsWithScores = this.groupsWithScores;

    for (let i = 0; i < groupsWithScores.length; i += 2) {
      let winnersGroup1 = groupsWithScores[i].teams.slice(0, 2);
      let winnersGroup2 = groupsWithScores[i + 1].teams.slice(0, 2);

      this.KOPhaseMatches[0][i].teamNames[0] = winnersGroup1[0].name;
      this.KOPhaseMatches[0][i].teamNames[1] = winnersGroup2[1].name;
      this.KOPhaseMatches[0][i + 1].teamNames[0] = winnersGroup1[1].name;
      this.KOPhaseMatches[0][i + 1].teamNames[1] = winnersGroup2[0].name;
    }

    //set first 4 to ongoing
    for (let i = 0; i < 4; i++) {
      this._KOPhaseMatches[0][i].state = MatchState.ONGOING;
    }
  }

  /**
   * Advances to the next KO Round.
   */
  private startNextKOPhaseRound() {
    if (environment.production) {
      this.router.navigate(['/bracket-tree']);
    }

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

  //TODO: is last ist first match getter to hide buttons
  // for this ^ just check if next matches length is zero and if groupPhaseDone or not, should work
  //TODO: 12 dots to go to match random match / goToMatchN func
}
