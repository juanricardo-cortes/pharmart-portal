import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/shared/interfaces/item';
import { DialogContentService } from 'src/app/shared/services/dialog-content/dialog-content.service';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';
import { DeleteInventoryItemComponent } from '../delete-inventory-item/delete-inventory-item.component';
import { UpdateInventoryItemComponent } from '../update-inventory-item/update-inventory-item.component';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})

export class InventoryTableComponent {

  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[];

  constructor(private itemManagementService: ItemManagementService,
    private dialogService: DialogContentService) {
    this.displayedColumns = this.getColumns().map(c => c.columnDef);
    this.displayedColumns.push('actions');
  }

  ngOnInit() {
    this.itemManagementService.itemList$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  getColumns() {
    return [
      {
        columnDef: 'name',
        header: 'Name',
        cell: (item: Item) => `${item.name}`
      },
      {
        columnDef: 'description',
        header: 'Description',
        cell: (item: Item) => `${item.description}`
      },
      {
        columnDef: 'stock',
        header: 'Stock',
        cell: (item: Item) => `${item.stock}`
      },
      {
        columnDef: 'price',
        header: 'Price',
        cell: (item: Item) => 'PHP' + `${item.price}`
      },
      {
        columnDef: 'commission',
        header: 'Commission',
        cell: (item: Item) => `${item.commission}` + '%'
      }
    ];
  }

  openDeleteItemDialog(data: any) {
    this.dialogService.openDialog(DeleteInventoryItemComponent, {
      data: data
    });
  }

  openUpdateItemDialog(data: any) {
    this.dialogService.openDialog(UpdateInventoryItemComponent, {
      data: data
    });
  }
}
