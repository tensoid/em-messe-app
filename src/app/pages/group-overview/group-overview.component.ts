import { Component, OnInit } from '@angular/core';

export interface Country {
  name: string;
  points: number;
}

export interface Group {
  countries: Country[];
}

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.scss']
})
export class GroupOverviewComponent implements OnInit {

  constructor() { }

  public data: Group[] = [
    {
      countries: [
        {
          name: 'Germany',
          points: 1
        },
        {
          name: 'France',
          points: 2
        },
        {
          name: 'Italy',
          points: 3
        },
        {
          name: 'Spain',
          points: 4
        }
      ]
    },
    {
      countries: [
        {
          name: 'Germany',
          points: 1
        },
        {
          name: 'France',
          points: 2
        },
        {
          name: 'Italy',
          points: 3
        },
        {
          name: 'Spain',
          points: 4
        }
      ]
    },
    {
      countries: [
        {
          name: 'Germany',
          points: 1
        },
        {
          name: 'France',
          points: 2
        },
        {
          name: 'Italy',
          points: 3
        },
        {
          name: 'Spain',
          points: 4
        }
      ]
    },
    {
      countries: [
        {
          name: 'Germany',
          points: 1
        },
        {
          name: 'France',
          points: 2
        },
        {
          name: 'Italy',
          points: 3
        },
        {
          name: 'Spain',
          points: 4
        }
      ]
    },
    {
      countries: [
        {
          name: 'Germany',
          points: 1
        },
        {
          name: 'France',
          points: 2
        },
        {
          name: 'Italy',
          points: 3
        },
        {
          name: 'Spain',
          points: 4
        }
      ]
    },
    {
      countries: [
        {
          name: 'Germany',
          points: 1
        },
        {
          name: 'France',
          points: 2
        },
        {
          name: 'Italy',
          points: 3
        },
        {
          name: 'Spain',
          points: 4
        }
      ]
    },
    {
      countries: [
        {
          name: 'Germany',
          points: 1
        },
        {
          name: 'France',
          points: 2
        },
        {
          name: 'Italy',
          points: 3
        },
        {
          name: 'Spain',
          points: 4
        }
      ]
    },
    {
      countries: [
        {
          name: 'Germany',
          points: 1
        },
        {
          name: 'France',
          points: 2
        },
        {
          name: 'Italy',
          points: 3
        },
        {
          name: 'Spain',
          points: 4
        }
      ]
    }
  ]

  ngOnInit(): void {
  }

}
