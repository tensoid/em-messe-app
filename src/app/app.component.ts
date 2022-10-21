import { Component, HostListener } from '@angular/core';
import { fadeAnimationEnter } from './animations'
import { GamedataService } from './shared/services/gamedata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimationEnter]
})
export class AppComponent {

  constructor(public dataService: GamedataService){}

  showAds: boolean = true;

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if(!event.shiftKey) return;

    if(event.code == "KeyA") {
      this.showAds = !this.showAds;
      return;
    }

    if(!event.ctrlKey) return;
    if(!event.altKey) return;
    if(event.code != "KeyR") return;

    let answer: boolean = confirm("Wollen Sie wirklich alle Daten löschen?");
    if(!answer) return;

    answer = confirm("Dies kann nicht rückgängig gemacht werden!");
    if(!answer) return;

    this.dataService.resetData();
  }
}

