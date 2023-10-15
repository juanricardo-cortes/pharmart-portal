import { Component } from '@angular/core';
import { DialogContentService } from 'src/app/shared/services/dialog-content/dialog-content.service';
import { AddInventoryItemComponent } from './add-inventory-item/add-inventory-item.component';
import { AuthManagementService } from 'src/app/shared/services/auth-management/auth-management.service';
import { filter } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})

export class InventoryManagementComponent {
  user?: User | null;

  constructor(private dialogService: DialogContentService,
    private authManagementService: AuthManagementService,
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

  openAddDataDialog() {
    this.dialogService.openDialog(AddInventoryItemComponent);
  }
}
