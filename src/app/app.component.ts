import { Component } from '@angular/core';
import { ItemManagementService } from './shared/services/item-management/item-management.service';
import { AuthManagementService } from './shared/services/auth-management/auth-management.service';
import { CartManagementService } from './shared/services/cart-management/cart-management.service';
import { WebSocketService } from './shared/services/web-socket/web-socket.service';
import { OrderManagementService } from './shared/services/order-management/order-management.service';
import { OrderTrackerService } from './shared/services/order-tracker-management/order-tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private itemManagementService: ItemManagementService,
    private authManagementService: AuthManagementService,
    private cartManagementService: CartManagementService,
    private orderManagementService: OrderManagementService,
    private orderTrackerService: OrderTrackerService,
    private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.getItems();
    this.getOrders();
    this.getUser();
    this.getCart();
    this.initializeWebSocket();
    this.getTracks();
  }

  getUser() {
    const storedString = localStorage.getItem('user');
    if (storedString) {
      const user = JSON.parse(storedString);
      this.authManagementService.cacheUser(user);
    }
  }

  getCart() {
    this.cartManagementService.fetchData();
  }

  initializeWebSocket() {
    this.webSocketService.getMessages().subscribe(
      () => {
        this.itemManagementService.fetchData();
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );
  }

  getItems() {
    this.itemManagementService.fetchData();
  }

  getOrders() {
    this.orderManagementService.fetchData();
  }

  getTracks() {
    this.orderTrackerService.fetchData();
  }
}
