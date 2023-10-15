import { Component } from '@angular/core';
import { AuthManagementService } from '../../services/auth-management/auth-management.service';
import { filter } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {
  user?: User | null;

  constructor(private authManagementService: AuthManagementService) {
    this.authManagementService.user$
      .pipe(filter(user => user !== null))
      .subscribe((user) => {
        this.user = user;
      });
  }

  logout() {
    this.authManagementService.logOutUser();
    localStorage.removeItem('user');
    this.user = null;
  }
}

