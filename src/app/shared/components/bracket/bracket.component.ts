import { Component, Input, OnInit } from '@angular/core';
import { KOMatchDescription, MatchState } from '../../services/gamedata.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {

  constructor() { }

  @Input()
  match: KOMatchDescription;

  get winnerIndex(): number {

    if(this.match.state != 2) return -1;

    let team1Goals = this.match.goals.reduce((sum, goals) => sum + goals[0], 0);
    let team2Goals = this.match.goals.reduce((sum, goals) => sum + goals[1], 0);

    return team1Goals > team2Goals ? 0 : 1;
  }
}
