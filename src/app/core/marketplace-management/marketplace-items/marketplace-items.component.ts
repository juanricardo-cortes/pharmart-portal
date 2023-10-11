import { Component, HostListener, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/interfaces/Item';
import { MarketplaceItemsService } from 'src/app/shared/services/marketplace-management/marketplace-items/marketplace-items.service';

@Component({
  selector: 'app-marketplace-items',
  templateUrl: './marketplace-items.component.html',
  styleUrls: ['./marketplace-items.component.css']
})
export class MarketplaceItemsComponent implements OnInit {

  items?: Item[];
  cols: number = 1;

  constructor(private marketplaceItemService: MarketplaceItemsService) {}

  ngOnInit() {
    this.updateCols();
    this.marketplaceItemService.getData().subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateCols();
  }

  updateCols(): void {
    const screenWidth = window.innerWidth;
    this.cols = (screenWidth / 410) | 0;
  }
}
