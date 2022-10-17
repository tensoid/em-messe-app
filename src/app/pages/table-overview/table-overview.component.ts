import { Component, HostListener, OnInit } from '@angular/core';
import { GamedataService } from 'src/app/shared/services/gamedata.service';

//TODO: display country name??
//TODO: auto 0 : 5 if team not set

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss'],
})
export class TableOverviewComponent {
  constructor(public dataService: GamedataService) {}

  /**
   * Formats the input into something sensible and saves them to localStorage.
   * @param event Input Event
   */
  inputChanged(event: Event) {

    // Format and correct input value if necessary
    let element = event.target as HTMLInputElement;
    let changed = false;

    if (element.value.length > 1) {
      element.value = element.value[element.value.length - 1];
      changed = true;
    }
    if (element.value.length == 0) {
      element.value = '0';
      changed = true;
    } else if (parseInt(element.value) < 0) {
      element.value = '0';
      changed = true;
    } else if (parseInt(element.value) > 6) {
      element.value = '6';
      changed = true;
    }

    if (changed) {
      // Needed to properly save the value
      element.dispatchEvent(new Event('input'));
      return;
    }

    this.dataService.saveData();
  }

  /**
   * Returns true if everything regarding the input is ok and false if not.
   * This includes formating as well as goal and score rule violations.
   * Also tells the user what went wrong and how to fix it.
   */
  validateInputs(): boolean {
    let inputElements = document.querySelectorAll('input');

    // prevent wrong input formats
    for(let i = 0; i < inputElements.length; i++) {
      let input = inputElements[i];
      if (
        input.value.length == 0 ||
        input.value.length > 1 ||
        parseInt(input.value) < 0 ||
        parseInt(input.value) > 6
      ) {
        alert("Falsches Eingabeformat der Tore. Bitte überprüfen.");
        return false;
      }
    }

    // prevent even matches in ko phase
    if(this.dataService.groupPhaseDone) {
      for(let i = 0; i < inputElements.length; i+=2) {
        if(inputElements[i].value == inputElements[i+1].value) {
          alert("Gleichstand nicht erlaubt in der K.O. Phase.");
          return false;
        }
      }
    }

    //TODO: prevent even teams in group in group phase

    return true;
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {

    if(this.dataService.KOPhaseDone) return;
    if (!event.shiftKey) return;
    if (!this.validateInputs()) return;

    if (event.key == 'ArrowLeft') {
      this.dataService.returnToPreviousMatches();
    } else if (event.key == 'ArrowRight') {
      this.dataService.startNextMatches();
    }
  }
}
