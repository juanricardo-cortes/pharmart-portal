import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { AuthManagementService } from 'src/app/shared/services/auth-management/auth-management.service';

@Component({
  selector: 'app-dashboard-management',
  templateUrl: './dashboard-management.component.html',
  styleUrls: ['./dashboard-management.component.css']
})
export class DashboardManagementComponent {
  user?: User | null;

  constructor(private authManagementService: AuthManagementService,
    private router: Router) {
    this.authManagementService.user$
    .pipe(filter(user => user !== null))
    .subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    if (!this.user) {
      this.router.navigateByUrl('/');
    }
  }
}
