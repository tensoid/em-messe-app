import { Component, Input, OnInit } from '@angular/core';
import { MatchDescription, MatchState } from '../../services/interfaces';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {

  constructor() { }

  @Input()
  match: MatchDescription;

  /**
   * Returns the index of the winner in the bracket or -1 if its not yet decided.
   */
  get winnerIndex(): number {

    if(this.match.state != 2) return -1;

    if (this.match.goals[0] > this.match.goals[1]) return 0;
    else return 1;
  }
}
