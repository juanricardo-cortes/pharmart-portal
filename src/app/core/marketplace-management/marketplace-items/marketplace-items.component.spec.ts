import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceItemsComponent } from './marketplace-items.component';

describe('MarketplaceItemsComponent', () => {
  let component: MarketplaceItemsComponent;
  let fixture: ComponentFixture<MarketplaceItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketplaceItemsComponent]
    });
    fixture = TestBed.createComponent(MarketplaceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
