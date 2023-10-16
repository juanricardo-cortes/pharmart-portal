import { Component } from '@angular/core';
import { ItemManagementService } from './shared/services/item-management/item-management.service';
import { AuthManagementService } from './shared/services/auth-management/auth-management.service';
import { CartManagementService } from './shared/services/cart-management/cart-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private itemManagementService: ItemManagementService,
    private authManagementService: AuthManagementService,
    private cartManagementService: CartManagementService) {}

  ngOnInit() {
    this.itemManagementService.fetchData();
    this.getUser();
    this.getCart();
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
}
