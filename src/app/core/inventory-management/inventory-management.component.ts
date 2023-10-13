import { Component } from '@angular/core';
import { DialogContentService } from 'src/app/shared/services/dialog-content/dialog-content.service';
import { AddInventoryItemComponent } from './add-inventory-item/add-inventory-item.component';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})

export class InventoryManagementComponent {
  constructor(private dialogService: DialogContentService) {

  }
  
  openAddDataDialog() {
    this.dialogService.openDialog(AddInventoryItemComponent);
  }
}
