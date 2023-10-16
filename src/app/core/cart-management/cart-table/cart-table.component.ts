import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderItem } from 'src/app/shared/interfaces/item';
import { CartManagementService } from 'src/app/shared/services/cart-management/cart-management.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent {

  dataSource = new MatTableDataSource<OrderItem>();
  displayedColumns: string[];

  constructor(private cartManagementService: CartManagementService) {
    this.displayedColumns = this.getColumns().map(c => c.columnDef);
    this.displayedColumns.push('actions');
  }

  getColumns() {
    return [
      {
        columnDef: 'name',
        header: 'Name',
        cell: (orderItem: OrderItem) => `${orderItem.item.name}`
      },
      {
        columnDef: 'description',
        header: 'Description',
        cell: (orderItem: OrderItem) => `${orderItem.item.description}`
      },
      {
        columnDef: 'quantity',
        header: 'Quantity',
        cell: (orderItem: OrderItem) => `${orderItem.quantity}`
      },
      {
        columnDef: 'price',
        header: 'Price',
        cell: (orderItem: OrderItem) => `${orderItem.item.price * orderItem.quantity}`
      }
    ];
  }

  ngOnInit() {
    this.cartManagementService.orderItemList$.subscribe(orderItems => {
      this.dataSource.data = orderItems;
      this.dataSource.data = [...this.dataSource.data];
    });
  }
}
