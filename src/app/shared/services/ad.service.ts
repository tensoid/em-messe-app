import { Injectable } from '@angular/core';
import ads from './ads.json';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private adIndex: number = 0;
  
  get ad(): string {
    let ad = ads.funFacts[this.adIndex];
    this.adIndex = this.adIndex == ads.funFacts.length - 1 ? 0 : this.adIndex + 1;
    return ad;
  }
}
