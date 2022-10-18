import { Component } from '@angular/core';
import { GamedataService } from 'src/app/shared/services/gamedata.service';

import { reverseStaggerFadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-bracket-tree',
  templateUrl: './bracket-tree.component.html',
  styleUrls: ['./bracket-tree.component.scss'],
  animations: [reverseStaggerFadeAnimation]

})
export class BracketTreeComponent {

  constructor(public dataService: GamedataService) {  }
}
