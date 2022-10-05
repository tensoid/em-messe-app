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
  teams: [string, string];
  points: [number, number];
  state: MatchState;
}

@Injectable({
  providedIn: 'root',
})
export class GamedataService {
  constructor() {
    this.loadData();
  }

  private _groups: Group[];

  private _matches: MatchDescription[];

  saveData() {
    localStorage.setItem('matches', JSON.stringify(this._matches));
    localStorage.setItem('groups', JSON.stringify(this._groups));
  }

  /**
   * Loads the stored data from the localStorage or loads the
   * preset data if the localStorage is emtpy or corrupt.
   */
  loadData() {
    let matches = localStorage.getItem('matches');
    if (matches) {
      let parsed = JSON.parse(matches);
      if (parsed) {
        this._matches = parsed;
      }
    }

    if (!this._matches) {
      this._matches = presets.matches as MatchDescription[];
    }

    let groups = localStorage.getItem('groups');
    if (groups) {
      let parsed = JSON.parse(groups);
      if (parsed) {
        this._groups = parsed;
      }
    }

    if (!this._groups) {
      this._groups = presets.groups as Group[];
    }
  }

  get groups(): Group[] {
    return this._groups;
  }

  get groupsWithScores(): GroupWithScores[] {
    let groups: Group[] = this.groups;
    let groupsWithScores: GroupWithScores[] = [];

    // Calculate scores for teach team
    // Win: 3 Points
    // Even: 1 Points
    // Loss: 0 Points
    groups.forEach((group) => {
      let scores: Score[] = [];

      group.teams.forEach((team) => {
        let teamMatches = this._matches.filter((match) =>
          match.teams.includes(team.name)
        );

        let score: Score = {
          points: 0,
        };
        teamMatches.forEach((match) => {
          if (match.state != MatchState.DONE) return;

          let isFirstTeam = match.teams[0] == team.name;

          // First team won
          if (match.points[0] > match.points[1]) {
            score.points += isFirstTeam ? 3 : 0;
          }
          // Even goals
          else if (match.points[0] == match.points[1]) {
            score.points += 1;
          }
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

  get activeMatches(): MatchDescription[] {
    return this._matches.filter((match) => match.state == MatchState.ONGOING);
  }

  get nextMatches(): MatchDescription[] {
    let firstUpcomingMatchIndex = this._matches.findIndex(
      (match) => match.state == MatchState.UPCOMING
    );

    if (firstUpcomingMatchIndex == -1) return [];

    return this._matches.slice(
      firstUpcomingMatchIndex,
      firstUpcomingMatchIndex + 4
    );
  }

  startNextMatches() {
    let firstActiveMatch = this._matches.find(
      (match) => match.state == MatchState.ONGOING
    );

    // No matches played so far
    if (firstActiveMatch == undefined) {
      return;
    }

    let lastPlayedMatchIndex = this._matches.indexOf(firstActiveMatch) + 3;

    // All matches done
    if (lastPlayedMatchIndex == this._matches.length - 1) {
      for (let i = this._matches.length - 4; i < this._matches.length; i++) {
        this._matches[i].state = MatchState.DONE;
      }

      return;
    }

    // Anything in between
    for (let i = lastPlayedMatchIndex + 1; i < lastPlayedMatchIndex + 5; i++) {
      this._matches[i].state = MatchState.ONGOING;
      this._matches[i - 4].state = MatchState.DONE;
    }

    this.saveData();
  }

returnToPreviousMatch() {
    let firstOngoingMatch = this._matches.find(
      (match) => match.state == MatchState.ONGOING
    );

    if (firstOngoingMatch == undefined) {
      return;
    }

    let firstDonePlayedMatchIndex = this._matches.indexOf(firstOngoingMatch);
  
    if (firstDonePlayedMatchIndex == this._matches.length - 3) {
      for (let i = this._matches.length - 3; i < this._matches.length; i++) {
        this._matches[i].state = MatchState.UPCOMING;
      }
      return;
    }

    for (let i = firstDonePlayedMatchIndex - 4; i < firstDonePlayedMatchIndex ; i++) {
      this._matches[i].state = MatchState.ONGOING;
      this._matches[i + 4].state = MatchState.UPCOMING;
    }
  }

  //TODO: fix flag images / crop them round
}


//Mannschaft A erzielte 6 Tore und erhielt 2 Gegentore
//Goalquotient = 6/2=3
//Goaldifference = 6-2=4
/* private teamGroupPhase: Team[] = [{
  points: 0,
  goalQuotient: 0,
  goalDifference: 0,
  winner: false,
}];

private teamEliminationPhase16: Team[] = [{
  points: 0,
  goalQuotient: 0,
  goalDifference: 0,
  winner: false,
}];
*/
