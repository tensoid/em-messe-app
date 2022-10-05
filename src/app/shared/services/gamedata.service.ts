import { Injectable } from '@angular/core';

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
    //this.loadData();
  }

  private _groups: Group[] = [
    {
      name: 'Gruppe A',
      teams: [
        {
          name: 'Ecuador',
          members: ['', ''],
        },
        {
          name: 'Niederlande',
          members: ['', ''],
        },
        {
          name: 'Katar',
          members: ['', ''],
        },
        {
          name: 'Senegal',
          members: ['', ''],
        },
      ],
    },
    {
      name: 'Gruppe B',
      teams: [
        {
          name: 'England',
          members: ['', ''],
        },
        {
          name: 'Iran',
          members: ['', ''],
        },
        {
          name: 'USA',
          members: ['', ''],
        },
        {
          name: 'Wales',
          members: ['', ''],
        },
      ],
    },
    {
      name: 'Gruppe C',
      teams: [
        {
          name: 'Argentinien',
          members: ['', ''],
        },
        {
          name: 'Mexiko',
          members: ['', ''],
        },
        {
          name: 'Polen',
          members: ['', ''],
        },
        {
          name: 'Saudi-Arabien',
          members: ['', ''],
        },
      ],
    },
    {
      name: 'Gruppe D',
      teams: [
        {
          name: 'Australien',
          members: ['', ''],
        },
        {
          name: 'Dänemark',
          members: ['', ''],
        },
        {
          name: 'Frankreich',
          members: ['', ''],
        },
        {
          name: 'Tunesien',
          members: ['', ''],
        },
      ],
    },
    {
      name: 'Gruppe E',
      teams: [
        {
          name: 'Costa Rica',
          members: ['', ''],
        },
        {
          name: 'Deutschland',
          members: ['', ''],
        },
        {
          name: 'Japan',
          members: ['', ''],
        },
        {
          name: 'Spanien',
          members: ['', ''],
        },
      ],
    },
    {
      name: 'Gruppe F',
      teams: [
        {
          name: 'Belgien',
          members: ['', ''],
        },
        {
          name: 'Kanada',
          members: ['', ''],
        },
        {
          name: 'Kroatien',
          members: ['', ''],
        },
        {
          name: 'Marokko',
          members: ['', ''],
        },
      ],
    },
    {
      name: 'Gruppe G',
      teams: [
        {
          name: 'Brasilien',
          members: ['', ''],
        },
        {
          name: 'Kamerun',
          members: ['', ''],
        },
        {
          name: 'Serbien',
          members: ['', ''],
        },
        {
          name: 'Schweiz',
          members: ['', ''],
        },
      ],
    },
    {
      name: 'Gruppe H',
      teams: [
        {
          name: 'Ghana',
          members: ['', ''],
        },
        {
          name: 'Portugal',
          members: ['', ''],
        },
        {
          name: 'Republik Korea',
          members: ['', ''],
        },
        {
          name: 'Uruguay',
          members: ['', ''],
        },
      ],
    },
  ];

  private _matches: MatchDescription[] = [
    {
      teams: ['Katar', 'Ecuador'],
      points: [0, 0],
      state: MatchState.ONGOING,
    },
    {
      teams: ['England', 'Iran'],
      points: [0, 0],
      state: MatchState.ONGOING,
    },
    {
      teams: ['Senegal', 'Niederlande'],
      points: [0, 0],
      state: MatchState.ONGOING,
    },
    {
      teams: ['USA', 'Wales'],
      points: [0, 0],
      state: MatchState.ONGOING,
    },
    {
      teams: ['Argentinien', 'Saudi-Arabien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Dänemark', 'Tunesien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Mexiko', 'Polen'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Frankreich', 'Australien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Marokko', 'Kroatien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Deutschland', 'Japan'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Spanien', 'Costa Rica'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Belgien', 'Kanada'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Schweiz', 'Kamerun'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Uruguay', 'Republik Korea'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Portugal', 'Ghana'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Brasilien', 'Serbien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Wales', 'Iran'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Katar', 'Senegal'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Niederlande', 'Ecuador'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['USA', 'England'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Tunesien', 'Australien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Polen', 'Saudi-Arabien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Frankreich', 'Dänemark'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Argentinien', 'Mexiko'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Japan', 'Costa Rica'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Belgien', 'Marokko'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Kroatien', 'Kanada'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Spanien', 'Deutschland'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Kamerun', 'Serbien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Republik Korea', 'Ghana'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Brasilien', 'Schweiz'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Portugal', 'Uruguay'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Ecuador', 'Senegal'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Niederlande', 'Katar'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Iran', 'USA'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Wales', 'England'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Tunesien', 'Frankreich'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Australien', 'Dänemark'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Polen', 'Argentinien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Saudi-Arabien', 'Mexiko'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Kroatien', 'Belgien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Kanada', 'Marokko'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Japan', 'Spanien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Costa Rica', 'Deutschland'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Republik Korea', 'Portugal'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Ghana', 'Uruguay'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Serbien', 'Schweiz'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
    {
      teams: ['Kamerun', 'Brasilien'],
      points: [0, 0],
      state: MatchState.UPCOMING,
    },
  ];

  saveData() {
    localStorage.setItem('matches', JSON.stringify(this._matches));
    localStorage.setItem('groups', JSON.stringify(this._groups));
  }

  loadData() {
    let matches = localStorage.getItem('matches');
    if (matches) {
      let parsed = JSON.parse(matches);
      if (parsed) {
        this._matches = parsed;
      }
    }

    let groups = localStorage.getItem('groups');
    if (groups) {
      let parsed = JSON.parse(groups);
      if (parsed) {
        this._groups = parsed;
      }
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
  }

  //TODO: england flagge ändern
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
