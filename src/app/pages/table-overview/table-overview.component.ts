import { Component, HostListener, OnInit } from '@angular/core';
import { GamedataService } from 'src/app/shared/services/gamedata.service';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss'],
})
export class TableOverviewComponent implements OnInit {
  constructor(public dataService: GamedataService) {}

  ngOnInit(): void {}

  dataChanged(_: Event) {
    this.dataService.saveData();
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.key == 'ArrowLeft') {
      this.dataService.returnToPreviousMatches();
    } else if (event.key == 'ArrowRight') {
      this.dataService.startNextMatches();
    }
  }
}
