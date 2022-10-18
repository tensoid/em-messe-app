import { TestBed } from '@angular/core/testing';

import { AdvertisingdataService } from './advertisingdata.service';

describe('AdvertisingdataService', () => {
  let service: AdvertisingdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisingdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
