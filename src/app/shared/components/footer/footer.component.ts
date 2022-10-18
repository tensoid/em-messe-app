import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AdvertisingdataService } from '../../services/advertisingdata.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})



export class FooterComponent implements OnInit {

  constructor(public advertisingdata: AdvertisingdataService) { }

 
  werbung : String;
  ngOnInit(): void {
       
    setInterval(() => {
      this.werbung = this.advertisingdata.werbung;
    }, 4000);
  }


}
