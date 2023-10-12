import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTableActionsComponent } from './inventory-table-actions.component';

describe('InventoryTableActionsComponent', () => {
  let component: InventoryTableActionsComponent;
  let fixture: ComponentFixture<InventoryTableActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryTableActionsComponent]
    });
    fixture = TestBed.createComponent(InventoryTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
