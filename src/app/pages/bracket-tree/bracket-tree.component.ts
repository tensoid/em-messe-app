import { Component } from '@angular/core';
import { GamedataService } from 'src/app/shared/services/gamedata.service';

@Component({
  selector: 'app-bracket-tree',
  templateUrl: './bracket-tree.component.html',
  styleUrls: ['./bracket-tree.component.scss']
})
export class BracketTreeComponent {

  constructor(public dataService: GamedataService) {  }
}
