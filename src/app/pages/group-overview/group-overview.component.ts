import { Component, OnInit } from '@angular/core';
import { GamedataService } from 'src/app/shared/services/gamedata.service';
import { GroupWithScores } from 'src/app/shared/services/interfaces';

import { staggerFadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.scss'],
  animations: [staggerFadeAnimation]
})
export class GroupOverviewComponent implements OnInit {

  constructor(private dataService: GamedataService) { }

  groups: GroupWithScores[];

  
  ngOnInit(): void {
    this.groups = this.dataService.groupsWithScores;
  }
}
