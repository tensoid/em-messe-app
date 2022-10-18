import { Component } from '@angular/core';
import { GamedataService } from 'src/app/shared/services/gamedata.service';

import { bracketTreeStaggerFadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-bracket-tree',
  templateUrl: './bracket-tree.component.html',
  styleUrls: ['./bracket-tree.component.scss'],
  animations: [bracketTreeStaggerFadeAnimation]

})
export class BracketTreeComponent {

  constructor(public dataService: GamedataService) {  }
}
