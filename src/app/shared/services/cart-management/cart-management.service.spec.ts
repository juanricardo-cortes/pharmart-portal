import { TestBed } from '@angular/core/testing';

import { CartManagementService } from './cart-management.service';

describe('CartManagementService', () => {
  let service: CartManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
