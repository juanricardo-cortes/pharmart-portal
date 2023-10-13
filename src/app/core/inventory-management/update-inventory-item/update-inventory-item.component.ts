import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/shared/interfaces/Item';
import { UpdateItemRequest } from 'src/app/shared/interfaces/requests/itemRequest';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';

@Component({
  selector: 'app-update-inventory-item',
  templateUrl: './update-inventory-item.component.html',
  styleUrls: ['./update-inventory-item.component.css']
})
export class UpdateInventoryItemComponent {

  updateItemRequest?: UpdateItemRequest;

  constructor(@Inject(MAT_DIALOG_DATA) public item: Item,
    private itemManagementService: ItemManagementService) {}

  updateItem() {
    const formData = new FormData();
    this.updateItemRequest = {
      id: this.item._id,
      description: this.item.description,
      price: this.item.price,
      quantity: this.item.quantity
    };

    this.itemManagementService.updateData(this.updateItemRequest);
  }
}
