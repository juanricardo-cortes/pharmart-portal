import { Component, HostListener, OnInit } from '@angular/core';
import { Item, OrderItem } from 'src/app/shared/interfaces/item';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';

@Component({
  selector: 'app-marketplace-items',
  templateUrl: './marketplace-items.component.html',
  styleUrls: ['./marketplace-items.component.css']
})
export class MarketplaceItemsComponent implements OnInit {

  items: Item[] = [];
  orderItems: OrderItem[] = [];
  cols: number = 1;

  constructor(private itemManagementService: ItemManagementService) {}

  ngOnInit() {
    this.updateCols();
    this.itemManagementService.itemList$.subscribe(data => {
      this.items = data;
      this.getOrderItems();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateCols();
  }

  updateCols(): void {
    const screenWidth = window.innerWidth;
    this.cols = (screenWidth / 410) | 0;
  }

  getOrderItems() {
    for(const item of this.items) {
      const order: OrderItem = {
        item: item,
        quantity: 1
      }
      this.orderItems.push(order)
    }
  }
}
