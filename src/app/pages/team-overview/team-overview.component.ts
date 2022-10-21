import { Component, OnInit } from '@angular/core';
import { GamedataService } from 'src/app/shared/services/gamedata.service';
import { Team } from 'src/app/shared/services/interfaces';

import { fadeAnimationEnter } from 'src/app/animations';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss'],
  animations: [fadeAnimationEnter]
})
export class TeamOverviewComponent implements OnInit {

  constructor(private dataService: GamedataService) { }

  teams: Team[];

  ngOnInit(): void {
    this.teams = this.dataService.teams;
  }

}
