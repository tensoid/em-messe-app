import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    switch (event.key) {
      case "1": 
        this.router.navigate(['/group-overview']);
        break;

      case "2": 
        this.router.navigate(['/bracket-tree']);
        break;

      case "3": 
        this.router.navigate(['/team-overview']);
        break;

      case "4": 
        this.router.navigate(['/table-overview']);
        break;

      default: 
        break;
    }
    
  }

}
