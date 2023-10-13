import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/shared/interfaces/Item';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';

@Component({
  selector: 'app-delete-inventory-item',
  templateUrl: './delete-inventory-item.component.html',
  styleUrls: ['./delete-inventory-item.component.css']
})
export class DeleteInventoryItemComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public item: Item,
    private itemManagementService: ItemManagementService) {}

  deleteItem() {
    this.itemManagementService.deleteData(this.item._id);
  }
}
