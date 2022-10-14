import { Component, Input, OnInit } from '@angular/core';
import { KOMatchDescription, MatchState } from '../../services/interfaces';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {

  constructor() { }

  @Input()
  match: KOMatchDescription;

  /**
   * Returns the index of the winner in the bracket or -1 if its not yet decided.
   */
  get winnerIndex(): number {

    if(this.match.state != 2) return -1;

    let winCountTeam1 = this.match.goals.reduce((winCount, goals) => winCount + (goals[0] > goals[1] ? 1 : 0), 0);

    return winCountTeam1 > 1 ? 0 : 1;
  }
}
