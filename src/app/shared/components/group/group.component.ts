import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/pages/group-overview/group-overview.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor() { }

  @Input()
  group: Country[];

  ngOnInit(): void {
  }

}
