import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartSnackComponent } from './add-to-cart-snack.component';

describe('AddToCartSnackComponent', () => {
  let component: AddToCartSnackComponent;
  let fixture: ComponentFixture<AddToCartSnackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToCartSnackComponent]
    });
    fixture = TestBed.createComponent(AddToCartSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
