import { Component } from '@angular/core';
import { fadeAnimation } from './router-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'juniorenfirma-messe-app';
}

