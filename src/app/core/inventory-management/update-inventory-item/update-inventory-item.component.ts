import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/shared/interfaces/item';
import { UpdateItemRequest } from 'src/app/shared/interfaces/requests/itemRequest';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';
import { UpdateInventorySnackComponent } from './update-inventory-snack/update-inventory-snack.component';

@Component({
  selector: 'app-update-inventory-item',
  templateUrl: './update-inventory-item.component.html',
  styleUrls: ['./update-inventory-item.component.css']
})
export class UpdateInventoryItemComponent {

  updateItemRequest?: UpdateItemRequest;

  constructor(@Inject(MAT_DIALOG_DATA) public item: Item,
    private itemManagementService: ItemManagementService,
    private _snackBar: MatSnackBar) {}

  updateItem() {
    const formData = new FormData();
    this.updateItemRequest = {
      id: this.item._id,
      description: this.item.description,
      price: this.item.price,
      stock: this.item.stock
    };

    this.itemManagementService.updateData(this.updateItemRequest);
    this._snackBar.openFromComponent(UpdateInventorySnackComponent, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }
}
