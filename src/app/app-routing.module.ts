import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BracketTreeComponent } from './pages/bracket-tree/bracket-tree.component';
import { GroupOverviewComponent } from './pages/group-overview/group-overview.component';
import { TableOverviewComponent } from './pages/table-overview/table-overview.component';
import { TeamOverviewComponent } from './pages/team-overview/team-overview.component';

const routes: Routes = [
  { path: "group-overview", component: GroupOverviewComponent },
  { path: "bracket-tree", component: BracketTreeComponent },
  { path: "team-overview", component: TeamOverviewComponent },
  { path: "table-overview", component: TableOverviewComponent },
  { path: '**', redirectTo: '/group-overview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
