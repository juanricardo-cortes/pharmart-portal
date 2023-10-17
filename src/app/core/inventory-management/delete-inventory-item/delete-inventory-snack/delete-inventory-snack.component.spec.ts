import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInventorySnackComponent } from './delete-inventory-snack.component';

describe('DeleteInventorySnackComponent', () => {
  let component: DeleteInventorySnackComponent;
  let fixture: ComponentFixture<DeleteInventorySnackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteInventorySnackComponent]
    });
    fixture = TestBed.createComponent(DeleteInventorySnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
