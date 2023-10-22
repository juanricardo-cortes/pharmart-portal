import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersGraphComponent } from './orders-graph.component';

describe('OrdersGraphComponent', () => {
  let component: OrdersGraphComponent;
  let fixture: ComponentFixture<OrdersGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersGraphComponent]
    });
    fixture = TestBed.createComponent(OrdersGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
