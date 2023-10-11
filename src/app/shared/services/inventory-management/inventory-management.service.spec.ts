import { TestBed } from '@angular/core/testing';

import { InventoryManagementService } from './inventory-management.service';

describe('InventoryManagementService', () => {
  let service: InventoryManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
