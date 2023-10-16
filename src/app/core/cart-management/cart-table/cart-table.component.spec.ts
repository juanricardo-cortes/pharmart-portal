import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTableComponent } from './cart-table.component';

describe('CartTableComponent', () => {
  let component: CartTableComponent;
  let fixture: ComponentFixture<CartTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartTableComponent]
    });
    fixture = TestBed.createComponent(CartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
