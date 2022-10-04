import { Component, OnInit } from '@angular/core';
import { GamedataService, Team } from 'src/app/shared/services/gamedata.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit {

  constructor(private dataService: GamedataService) { }

  teams: Team[];

  ngOnInit(): void {
    this.teams = this.dataService.teams;
  }

}
