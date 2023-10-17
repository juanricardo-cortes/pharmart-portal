import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/shared/interfaces/item';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';
import { DeleteInventorySnackComponent } from './delete-inventory-snack/delete-inventory-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-inventory-item',
  templateUrl: './delete-inventory-item.component.html',
  styleUrls: ['./delete-inventory-item.component.css']
})
export class DeleteInventoryItemComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public item: Item,
    private itemManagementService: ItemManagementService,
    private _snackBar: MatSnackBar) {}

  deleteItem() {
    this.itemManagementService.deleteData(this.item._id);
    this._snackBar.openFromComponent(DeleteInventorySnackComponent, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }
}
