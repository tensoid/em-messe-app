import { Component } from '@angular/core';
import { fadeAnimation } from './animations'
import { GamedataService } from './shared/services/gamedata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {

  constructor(public dataService: GamedataService){}

  title = 'juniorenfirma-messe-app';
}

