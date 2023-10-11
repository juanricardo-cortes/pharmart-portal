import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/interfaces/Item';
import { ItemRequest } from 'src/app/shared/interfaces/requests/itemRequest';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { InventoryManagementService } from 'src/app/shared/services/inventory-management/inventory-management.service';

@Component({
  selector: 'app-add-inventory-item',
  templateUrl: './add-inventory-item.component.html',
  styleUrls: ['./add-inventory-item.component.css']
})
export class AddInventoryItemComponent {

  item?: Item;
  itemRequest: ItemRequest;

  constructor(private inventoryManagementService: InventoryManagementService,
    private dataSharingService: DataSharingService,
    public dialog: MatDialogRef<AddInventoryItemComponent>) {
    this.itemRequest = this.initItem();
  }

  initItem() {
    const emptyBlob = new Blob([], { type: 'application/octet-stream' });
    const emptyFile = new File([emptyBlob], 'empty.txt', { type: 'text/plain' });
    return {
      name: '',
      description: '',
      price: 0,
      image: emptyFile,
      quantity: 0
    };
  }

  addItem() {
    this.inventoryManagementService.postData(this.itemRequest).subscribe(
      (response) => {
        this.dataSharingService.shareItem(response as Item);
        this.dialog.close(response);
      }
    );
  }
}

