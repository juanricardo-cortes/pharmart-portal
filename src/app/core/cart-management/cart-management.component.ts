import { Component } from '@angular/core';
import { OrderItem } from 'src/app/shared/interfaces/item';
import { CartManagementService } from 'src/app/shared/services/cart-management/cart-management.service';
import { OrderManagementService } from 'src/app/shared/services/order-management/order-management.service';

@Component({
  selector: 'app-cart-management',
  templateUrl: './cart-management.component.html',
  styleUrls: ['./cart-management.component.css']
})
export class CartManagementComponent {

  cart: OrderItem[] = [];

  constructor(private cartManagementService: CartManagementService,
    private orderManagementService: OrderManagementService) {}

  ngOnInit() {
    this.cartManagementService.orderItemList$.subscribe(orderItems => {
      this.cart = orderItems;
    });
  }

  checkout() {
    this.orderManagementService.postData(this.cart);
    this.cartManagementService.emptyData();
  }
}
