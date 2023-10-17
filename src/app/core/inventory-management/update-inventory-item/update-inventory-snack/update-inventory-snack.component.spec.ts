import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventorySnackComponent } from './update-inventory-snack.component';

describe('UpdateInventorySnackComponent', () => {
  let component: UpdateInventorySnackComponent;
  let fixture: ComponentFixture<UpdateInventorySnackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateInventorySnackComponent]
    });
    fixture = TestBed.createComponent(UpdateInventorySnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
