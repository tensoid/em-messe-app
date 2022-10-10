import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupComponent } from './shared/components/group/group.component';
import { GroupMatchTableComponent } from './shared/components/group-match-table/group-match-table.component';
import { TeamComponent } from './shared/components/team/team.component';
import { BracketComponent } from './shared/components/bracket/bracket.component';
import { GroupOverviewComponent } from './pages/group-overview/group-overview.component';
import { TableOverviewComponent } from './pages/table-overview/table-overview.component';
import { BracketTreeComponent } from './pages/bracket-tree/bracket-tree.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TeamOverviewComponent } from './pages/team-overview/team-overview.component';
import { FormsModule } from '@angular/forms';
import { KoMatchTableComponent } from './shared/components/ko-match-table/ko-match-table.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    GroupMatchTableComponent,
    TeamComponent,
    BracketComponent,
    GroupOverviewComponent,
    TableOverviewComponent,
    BracketTreeComponent,
    FooterComponent,
    NavbarComponent,
    TeamOverviewComponent,
    KoMatchTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
