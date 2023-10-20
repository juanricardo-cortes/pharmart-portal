import { TestBed } from '@angular/core/testing';

import { OrderTrackerService } from './order-tracker.service';

describe('OrderTrackerService', () => {
  let service: OrderTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
