import { TestBed } from '@angular/core/testing';

import { ItemManagementService } from './item-management.service';

describe('InventoryManagementService', () => {
  let service: ItemManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
