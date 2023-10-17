import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryItemSnackComponent } from './add-inventory-item-snack.component';

describe('AddInventoryItemSnackComponent', () => {
  let component: AddInventoryItemSnackComponent;
  let fixture: ComponentFixture<AddInventoryItemSnackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInventoryItemSnackComponent]
    });
    fixture = TestBed.createComponent(AddInventoryItemSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
