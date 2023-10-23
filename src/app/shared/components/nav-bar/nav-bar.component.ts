import { Component } from '@angular/core';
import { AuthManagementService } from '../../services/auth-management/auth-management.service';
import { filter } from 'rxjs';
import { User } from '../../interfaces/user';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {
  user?: User | null;
  showToolbar: boolean = false;

  constructor(private authManagementService: AuthManagementService,
    private router: Router) {
    this.authManagementService.user$
      .pipe(filter(user => user !== null))
      .subscribe((user) => {
        this.user = user;
      });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current URL and decide whether to hide the toolbar
        this.showToolbar = event.url !== '/login'; // Replace '/login' with your actual login URL
      }
    });
  }

  logout() {
    this.authManagementService.logOutUser();
    localStorage.removeItem('user');
    this.user = null;
  }
}

