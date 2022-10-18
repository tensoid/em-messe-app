import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/animations';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [fadeAnimation],
})
export class FooterComponent implements OnInit {
  constructor(private adService: AdService) {}

  ad: string;

  ngOnInit(): void {
    this.ad = this.adService.ad;

    setInterval(() => {
      this.ad = this.adService.ad;
    }, 4000);
  }
}
