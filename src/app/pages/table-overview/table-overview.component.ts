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

  dataChanged(event: Event) {

    // Format and correct input value if necessary
    let element = event.target as HTMLInputElement;
    let changed = false;

    if(element.value.length > 1) {
      element.value = element.value[element.value.length - 1];
      changed = true;
    }
    if (element.value.length == 0) {
      element.value = "0";
      changed = true;
    }
    else if(parseInt(element.value) < 0) {
      element.value = "0";
      changed = true;
    }
    else if(parseInt(element.value) > 6) {
      element.value = "6";
      changed = true;
    }
    
    if(changed) {
      // Needed to properly save the value
      element.dispatchEvent(new Event("input"));
      return;
    }

    this.dataService.saveData();
  }

  validateInputs(): boolean {
    let inputElements = document.querySelectorAll('input');

    let valid = true;
    inputElements.forEach((input) => {
      if (!valid) return;
      console.log(parseInt(input.value));
      if (
        input.value.length == 0 ||
        parseInt(input.value) < 0 ||
        parseInt(input.value) > 6
      ) {
        valid = false;
      }
    });

    return valid;
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (!event.shiftKey) return;

    if (!this.validateInputs()) return;

    if (event.key == 'ArrowLeft') {
      this.dataService.returnToPreviousMatches();
    } else if (event.key == 'ArrowRight') {
      this.dataService.startNextMatches();
    }
  }
}
