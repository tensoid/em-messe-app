import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupComponent } from './shared/components/group/group.component';
import { TeamComponent } from './shared/components/team/team.component';
import { BracketComponent } from './shared/components/bracket/bracket.component';
import { GroupOverviewComponent } from './pages/group-overview/group-overview.component';
import { TableOverviewComponent } from './pages/table-overview/table-overview.component';
import { BracketTreeComponent } from './pages/bracket-tree/bracket-tree.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TeamOverviewComponent } from './pages/team-overview/team-overview.component';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    TeamComponent,
    BracketComponent,
    GroupOverviewComponent,
    TableOverviewComponent,
    BracketTreeComponent,
    FooterComponent,
    NavbarComponent,
    TeamOverviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
