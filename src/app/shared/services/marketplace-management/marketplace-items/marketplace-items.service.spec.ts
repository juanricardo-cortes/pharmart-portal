import { TestBed } from '@angular/core/testing';

import { MarketplaceItemsService } from './marketplace-items.service';

describe('MarketplaceItemsService', () => {
  let service: MarketplaceItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketplaceItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
