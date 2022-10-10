import { Component, Input } from '@angular/core';
import { GamedataService, KOMatchDescription } from '../../services/gamedata.service';

@Component({
  selector: 'app-ko-match-table',
  templateUrl: './ko-match-table.component.html',
  styleUrls: ['./ko-match-table.component.scss']
})
export class KoMatchTableComponent {

  constructor(private dataService: GamedataService) { }

  @Input()
  match: KOMatchDescription;

  dataChanged(_: Event) {
    this.dataService.saveData();
  }
}
