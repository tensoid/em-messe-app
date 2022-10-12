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
  keyUpEvent(event: KeyboardEvent) {

    if(!event.shiftKey) return;

    switch (event.code) {

      case "Digit1": 
        this.router.navigate(['/group-overview']);
        break;

      case "Digit2": 
        this.router.navigate(['/bracket-tree']);
        break;

      case "Digit3": 
        this.router.navigate(['/team-overview']);
        break;

      case "Digit4": 
        this.router.navigate(['/table-overview']);
        break;

      default: 
        break;
    }
    
  }

}
