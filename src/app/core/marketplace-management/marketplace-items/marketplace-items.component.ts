import { Component, HostListener, OnInit } from '@angular/core';
import { Item, OrderItem } from 'src/app/shared/interfaces/item';
import { CartManagementService } from 'src/app/shared/services/cart-management/cart-management.service';
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
  colSpan: string = "410px";

  constructor(private itemManagementService: ItemManagementService,
    private cartManagementService: CartManagementService) {}

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

    const div = document.getElementById('grid-list');
    if (div) {
      const width = 410 * this.cols;
      div.style.width = width.toString() + 'px';
    }
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

  addToCart(orderItem: OrderItem) {
    this.cartManagementService.postData(orderItem);
  }

  addQuantity(orderItem: OrderItem) {
    if (orderItem.quantity < orderItem.item.stock) {
      orderItem.quantity++;
    }
  }

  subQuantity(orderItem: OrderItem) {
    if (orderItem.quantity > 1) {
      orderItem.quantity--;
    }
  }
}
