import { Component, Input, OnInit } from '@angular/core';
import { GamedataService, MatchDescription } from '../../services/gamedata.service';

@Component({
  selector: 'app-group-match-table',
  templateUrl: './group-match-table.component.html',
  styleUrls: ['./group-match-table.component.scss']
})
export class GroupMatchTableComponent implements OnInit {

  constructor(private dataService: GamedataService) { }

  @Input()
  match: MatchDescription;

  ngOnInit(): void {
  }

  dataChanged(_: Event) {
    this.dataService.saveData();
  }
}
