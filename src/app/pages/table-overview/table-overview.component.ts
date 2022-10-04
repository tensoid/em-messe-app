import { Component, OnInit } from '@angular/core';
import { GamedataService, MatchDescription } from 'src/app/shared/services/gamedata.service';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {

  constructor(public dataService: GamedataService) {}

  activeMatches: MatchDescription[];

  ngOnInit(): void {
    this.activeMatches = this.dataService.activeMatches;
  }

  startNextMatches(){
    this.dataService.startNextMatches();
  }
}
