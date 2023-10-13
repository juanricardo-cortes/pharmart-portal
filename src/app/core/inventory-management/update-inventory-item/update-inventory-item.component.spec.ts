import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventoryItemComponent } from './update-inventory-item.component';

describe('UpdateInventoryItemComponent', () => {
  let component: UpdateInventoryItemComponent;
  let fixture: ComponentFixture<UpdateInventoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateInventoryItemComponent]
    });
    fixture = TestBed.createComponent(UpdateInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
