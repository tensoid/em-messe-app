import { Injectable } from "@angular/core";

export interface Team {
  name: string,
  members: [string, string]
}

export interface Group {
  name: string,
  teams: Team[]
}

export enum MatchState {
  UPCOMING,
  ONGOING,
  DONE,
}

export interface MatchDescription {
  teams: [string, string],
  points: [number, number],
  state: MatchState,
}

@Injectable({
  providedIn: 'root'
})
export class GamedataService {

  constructor() { 
    this.loadData();
  }

  private _groups: Group[] = [
    {
      name: 'Gruppe A',
      teams: [
        {
        name: 'Ecuador',
        members: ["", ""]
        },
        {
        name: 'Niederlande',
        members: ["", ""]
        },
        {
        name: 'Katar',
        members: ["", ""]
        },
        {
        name: 'Senegal',
        members: ["", ""]
        }
      ],
    },
    {
      name: 'Gruppe B',
      teams: [
        {
        name: 'England',
        members: ["", ""]
        },
        {
        name: 'Iran',
        members: ["", ""]
        },
        {
        name: 'USA',
        members: ["", ""]
        },
        {
        name: 'Wales',
        members: ["", ""]
        }
      ],
    },
    {
      name: 'Gruppe C',
      teams: [
        {
        name: 'Argentinien',
        members: ["", ""]
        },
        {
        name: 'Mexiko',
        members: ["", ""]
        },
        {
        name: 'Polen',
        members: ["", ""]
        },
        {
        name: 'Saudi-Arabien',
        members: ["", ""]
        }
      ],
    },
    {
      name: 'Gruppe D',
      teams: [
        {
        name: 'Australien',
        members: ["", ""]
        },
        {
        name: 'Dänemark',
        members: ["", ""]
        },
        {
        name: 'Frankreich',
        members: ["", ""]
        },
        {
        name: 'Tunesien',
        members: ["", ""]
        }
      ],
    },
    {
      name: 'Gruppe E',
      teams: [
        {
        name: 'Costa Rica',
        members: ["", ""]
        },
        {
        name: 'Deutschland',
        members: ["", ""]
        },
        {
        name: 'Japan',
        members: ["", ""]
        },
        {
        name: 'Spanien',
        members: ["", ""]
        }
      ],
    },
    {
      name: 'Gruppe F',
      teams: [
        {
        name: 'Belgien',
        members: ["", ""]
        },
        {
        name: 'Kanada',
        members: ["", ""]
        },
        {
        name: 'Kroatien',
        members: ["", ""]
        },
        {
        name: 'Marokko',
        members: ["", ""]
        }
      ],
    },
    {
      name: 'Gruppe G',
      teams: [
        {
        name: 'Brasilien',
        members: ["", ""]
        },
        {
        name: 'Kamerun',
        members: ["", ""]
        },
        {
        name: 'Serbien',
        members: ["", ""]
        },
        {
        name: 'Schweiz',
        members: ["", ""]
        }
      ],
    },
    {
      name: 'Gruppe H',
      teams: [
        {
        name: 'Ghana',
        members: ["", ""]
        },
        {
        name: 'Portugal',
        members: ["", ""]
        },
        {
        name: 'Republik Korea',
        members: ["", ""]
        },
        {
        name: 'Uruguay',
        members: ["", ""]
        }
      ],
    },
  ];

  private _matches: MatchDescription[] = [
    {
      teams: ["Katar", "England"],
      points: [0, 0],
      state: MatchState.UPCOMING
    },
    {
      teams: ["Katar", "England"],
      points: [0, 0],
      state: MatchState.UPCOMING
    },
    {
      teams: ["Katar", "England"],
      points: [0, 0],
      state: MatchState.UPCOMING
    },
    {
      teams: ["Katar", "England"],
      points: [0, 0],
      state: MatchState.UPCOMING
    },
    {
      teams: ["Katar", "England"],
      points: [0, 0],
      state: MatchState.UPCOMING
    },
    {
      teams: ["Katar", "England"],
      points: [0, 0],
      state: MatchState.UPCOMING
    },
    {
      teams: ["Katar", "England"],
      points: [0, 0],
      state: MatchState.UPCOMING
    },
    {
      teams: ["Katar", "England"],
      points: [0, 0],
      state: MatchState.UPCOMING
    },
  ];

  saveData(){
    localStorage.setItem('matches', JSON.stringify(this._matches));
    localStorage.setItem('groups', JSON.stringify(this._groups));
  }

  loadData(){
    let matches = localStorage.getItem('matches');
    if(matches){
      let parsed = JSON.parse(matches);
      if(parsed) {
        this._matches = parsed;
      }
    }

    let groups = localStorage.getItem('groups');
    if(groups){
      let parsed = JSON.parse(groups);
      if(parsed) {
        this._groups = parsed;
      }
    }
  }
  
  get groups(): Group[] {
    return this._groups;
  }
  
  get teams(): Team[] {
    return this._groups.flatMap(group => group.teams);
  }
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
}];*/