import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoMatchTableComponent } from './ko-match-table.component';

describe('KoMatchTableComponent', () => {
  let component: KoMatchTableComponent;
  let fixture: ComponentFixture<KoMatchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoMatchTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoMatchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
