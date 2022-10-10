import { Component, Input, OnInit } from '@angular/core';
import { KOMatchDescription, MatchState } from '../../services/gamedata.service';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {

  constructor() { }

  @Input()
  match: KOMatchDescription;

  ngOnInit(): void {
  }

}
