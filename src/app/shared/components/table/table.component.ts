import { Component, Input, OnInit } from '@angular/core';
import { MatchDescription } from '../../services/gamedata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  @Input()
  match: MatchDescription;

  ngOnInit(): void {
  }
}
