import { Injectable } from "@angular/core";

export interface Team {
  name: string,
  member1: string,
  member2: string
}

export interface Group {
  name: string,
  teams: Team[]
}

@Injectable({
  providedIn: 'root'
})
export class GamedataService {


  private groupList: Group[] = [
    {
      name: 'Gruppe A',
      teams: [
        {
        name: 'Ecuador',
        member1: '',
        member2: ''
        },
        {
        name: 'Niederlande',
        member1: '',
        member2: ''
        },
        {
        name: 'Katar',
        member1: '',
        member2: ''
        },
        {
        name: 'Senegal',
        member1: '',
        member2: ''
        }
      ],
    },
    {
      name: 'Gruppe B',
      teams: [
        {
        name: 'England',
        member1: '',
        member2: ''
        },
        {
        name: 'Iran',
        member1: '',
        member2: ''
        },
        {
        name: 'USA',
        member1: '',
        member2: ''
        },
        {
        name: 'Wales',
        member1: '',
        member2: ''
        }
      ],
    },
    {
      name: 'Gruppe C',
      teams: [
        {
        name: 'Argentinien',
        member1: '',
        member2: ''
        },
        {
        name: 'Mexiko',
        member1: '',
        member2: ''
        },
        {
        name: 'Polen',
        member1: '',
        member2: ''
        },
        {
        name: 'Saudi_Arabien',
        member1: '',
        member2: ''
        }
      ],
    },
    {
      name: 'Gruppe D',
      teams: [
        {
        name: 'Australien',
        member1: '',
        member2: ''
        },
        {
        name: 'Dänemark',
        member1: '',
        member2: ''
        },
        {
        name: 'Frankreich',
        member1: '',
        member2: ''
        },
        {
        name: 'Tunesien',
        member1: '',
        member2: ''
        }
      ],
    },
    {
      name: 'Gruppe E',
      teams: [
        {
        name: 'Costa Rica',
        member1: '',
        member2: ''
        },
        {
        name: 'Deutschland',
        member1: '',
        member2: ''
        },
        {
        name: 'Japan',
        member1: '',
        member2: ''
        },
        {
        name: 'Spanien',
        member1: '',
        member2: ''
        }
      ],
    },
    {
      name: 'Gruppe F',
      teams: [
        {
        name: 'Belgien',
        member1: '',
        member2: ''
        },
        {
        name: 'Kanada',
        member1: '',
        member2: ''
        },
        {
        name: 'Kroatien',
        member1: '',
        member2: ''
        },
        {
        name: 'Marokko',
        member1: '',
        member2: ''
        }
      ],
    },
    {
      name: 'Gruppe G',
      teams: [
        {
        name: 'Brasilien',
        member1: '',
        member2: ''
        },
        {
        name: 'Kamerun',
        member1: '',
        member2: ''
        },
        {
        name: 'Serbien',
        member1: '',
        member2: ''
        },
        {
        name: 'Schweiz',
        member1: '',
        member2: ''
        }
      ],
    },
    {
      name: 'Gruppe H',
      teams: [
        {
        name: 'Ghana',
        member1: '',
        member2: ''
        },
        {
        name: 'Portugal',
        member1: '',
        member2: ''
        },
        {
        name: 'Republik Korea',
        member1: '',
        member2: ''
        },
        {
        name: 'Uruguay',
        member1: '',
        member2: ''
        }
      ],
    },
  ];

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

  constructor() { }

  get groups(): Group[] {
    return this.groupList;
  }

  get teams(): Team[] {
    return this.groupList.flatMap(group => group.teams);
  }

  // getId() {
    
  // }

}
