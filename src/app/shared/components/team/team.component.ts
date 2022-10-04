import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../services/gamedata.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor() { }

  @Input()
  team: Team;

  data: string = "abc";

  ngOnInit(): void {

  }

  dataChanged(_: Event) {

  }
}
