import { Component, HostListener } from '@angular/core';
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

  winnerOverlayActive: boolean = true;

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent): void {
    if(event.key == "o") {
      this.winnerOverlayActive = !this.winnerOverlayActive;
    }
  }
}
