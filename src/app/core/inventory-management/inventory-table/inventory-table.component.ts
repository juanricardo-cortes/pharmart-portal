import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/shared/interfaces/Item';
import { AddInventoryItemComponent } from '../add-inventory-item/add-inventory-item.component';
import { DialogContentService } from 'src/app/shared/services/dialog-content/dialog-content.service';
import { InventoryManagementService } from 'src/app/shared/services/inventory-management/inventory-management.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})

export class InventoryTableComponent implements OnInit {

  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[];

  constructor(private inventoryManagementService: InventoryManagementService,
    private dialogService: DialogContentService,
    private dataSharingService: DataSharingService) {
    this.displayedColumns = this.getColumns().map(c => c.columnDef);
  }

  ngOnInit() {
    this.inventoryManagementService.getData().subscribe(
      (response) => {
        this.dataSource.data = response;
      }
    );

    this.dataSharingService.item$.subscribe((item) => {
      console.log(item);
      this.dataSource.data.push(item);
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
        columnDef: 'quantity',
        header: 'Quantity',
        cell: (item: Item) => `${item.quantity}`
      },
      {
        columnDef: 'price',
        header: 'Price',
        cell: (item: Item) => `${item.price}`
      }
    ];
  }

  openAddDataDialog() {
    this.dialogService.openDialog(AddInventoryItemComponent);
  }
}
