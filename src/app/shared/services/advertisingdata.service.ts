import { Injectable } from '@angular/core';
import werbung from './advertising.json';



export interface Werbung {
  id: Number;
  funFactText: String;
}

@Injectable({
  providedIn: 'root'
})
export class AdvertisingdataService {

  constructor() { }

  get werbung(): string {
    return werbung.funFacts[Math.floor(Math.random() * werbung.funFacts.length)];
  }

}
