import { Component, OnInit } from '@angular/core';
import { GamedataService} from 'src/app/shared/services/gamedata.service';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {

  constructor(public dataService: GamedataService) {}

  //TODO: after group phase done remove next games with is groupPhaseDone getter

  ngOnInit(): void {}
}
