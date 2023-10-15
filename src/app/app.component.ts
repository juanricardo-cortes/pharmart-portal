import { Component } from '@angular/core';
import { ItemManagementService } from './shared/services/item-management/item-management.service';
import { User } from './shared/interfaces/user';
import { AuthManagementService } from './shared/services/auth-management/auth-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private itemManagementService: ItemManagementService,
    private authManagementService: AuthManagementService) {}

  ngOnInit() {
    this.itemManagementService.fetchData();
    this.getUser();
  }

  getUser() {
    const storedString = localStorage.getItem('user');
    if (storedString) {
      const user = JSON.parse(storedString);
      this.authManagementService.cacheUser(user);
    }
  }
}
