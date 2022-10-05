import { Component, Input, OnInit } from '@angular/core';
import { GamedataService, MatchDescription } from '../../services/gamedata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private dataService: GamedataService) { }

  @Input()
  match: MatchDescription;

  ngOnInit(): void {
  }

  dataChanged(_: Event) {
    this.dataService.saveData();
  }

}
