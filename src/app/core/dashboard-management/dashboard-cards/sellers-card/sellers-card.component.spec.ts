import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersCardComponent } from './sellers-card.component';

describe('SellersCardComponent', () => {
  let component: SellersCardComponent;
  let fixture: ComponentFixture<SellersCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellersCardComponent]
    });
    fixture = TestBed.createComponent(SellersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
