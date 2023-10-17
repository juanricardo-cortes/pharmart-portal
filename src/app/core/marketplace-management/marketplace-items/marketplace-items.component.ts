import { Component, HostListener, OnInit } from '@angular/core';
import { Item, OrderItem } from 'src/app/shared/interfaces/item';
import { CartManagementService } from 'src/app/shared/services/cart-management/cart-management.service';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';
import { AddToCartSnackComponent } from './add-to-cart-snack/add-to-cart-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-marketplace-items',
  templateUrl: './marketplace-items.component.html',
  styleUrls: ['./marketplace-items.component.css']
})
export class MarketplaceItemsComponent implements OnInit {

  items: Item[] = [];
  orderItems: OrderItem[] = [];
  cartItems: OrderItem[] = [];
  cols: number = 1;
  colSpan: string = "410px";

  constructor(private itemManagementService: ItemManagementService,
    private cartManagementService: CartManagementService,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.updateCols();
    this.itemManagementService.itemList$.subscribe(data => {
      this.items = data;
      this.getOrderItems();
    });

    this.cartManagementService.orderItemList$.subscribe(data => {
      this.cartItems = data;
    })
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
        itemId: item._id,
        quantity: 1
      }
      this.orderItems.push(order)
    }
  }

  addToCart(orderItem: OrderItem) {
    const item = this.items.find(item => item._id === orderItem.itemId);
    if (item) {
      const cartItem = this.cartItems.find(c => c.itemId === item._id)
        if(cartItem) {
          if (cartItem.quantity+orderItem.quantity <= item.stock)
            this.cartManagementService.postData(orderItem);

            this._snackBar.openFromComponent(AddToCartSnackComponent, {
              horizontalPosition: 'start',
              verticalPosition: 'bottom',
              duration: 2000,
            });
        } else {
          if (orderItem.quantity <= item.stock)
            this.cartManagementService.postData(orderItem);

            this._snackBar.openFromComponent(AddToCartSnackComponent, {
              horizontalPosition: 'start',
              verticalPosition: 'bottom',
              duration: 2000,
            });
        }
    }
  }

  addQuantity(orderItem: OrderItem) {
    const item = this.items.find(item => item._id === orderItem.itemId);
    if (item) {
      const cartItem = this.cartItems.find(c => c.itemId === item._id)
        if(cartItem) {
          if (cartItem.quantity+orderItem.quantity < item.stock)
            orderItem.quantity++;
        } else {
          if (orderItem.quantity < item.stock)
            orderItem.quantity++;
        }
    }
  }

  subQuantity(orderItem: OrderItem) {
    if (orderItem.quantity > 1) {
      orderItem.quantity--;
    }
  }

  getItemName(orderItem: OrderItem) {
    const item = this.items.find(item => item._id === orderItem.itemId);
    if (item) {
      return item.name
    }
    return '';
  }

  getItemDescription(orderItem: OrderItem) {
    const item = this.items.find(item => item._id === orderItem.itemId);
    if (item) {
      return item.description
    }
    return '';
  }

  getItemPrice(orderItem: OrderItem) {
    const item = this.items.find(item => item._id === orderItem.itemId);
    if (item) {
      return item.price
    }
    return 0;
  }

  getItemStock(orderItem: OrderItem) {
    const item = this.items.find(item => item._id === orderItem.itemId);
    if (item) {
      return item.stock
    }
    return 0;
  }

  getItemImage(orderItem: OrderItem) {
    const item = this.items.find(item => item._id === orderItem.itemId);
    if (item) {
      return item.image
    }
    return '';
  }
}
