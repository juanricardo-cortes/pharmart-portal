import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item, OrderItem } from 'src/app/shared/interfaces/item';
import { CartManagementService } from 'src/app/shared/services/cart-management/cart-management.service';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent {

  dataSource = new MatTableDataSource<OrderItem>();
  displayedColumns?: string[];
  items: Item[] = [];
  cartItems: OrderItem[] = [];

  constructor(private cartManagementService: CartManagementService,
    private itemManagementService: ItemManagementService ) {
  }

  getColumns() {
    return [
      {
        columnDef: 'name',
        header: 'Name',
        cell: (orderItem: OrderItem) => {
          const item = this.items.find(item => item._id === orderItem.itemId);
          if (item) {
            return item.name;
          }
          return '';
        }
      },
      {
        columnDef: 'sellerName',
        header: 'Seller',
        cell: (orderItem: OrderItem) => `${orderItem.sellerName}`
      },
      {
        columnDef: 'stock',
        header: 'Stock',
        cell: (orderItem: OrderItem) => {
          const item = this.items.find(item => item._id === orderItem.itemId);
          if (item) {
            return item.stock;
          }
          return '';
        }
      },
      {
        columnDef: 'quantity',
        header: 'Quantity',
        cell: (orderItem: OrderItem) => `${orderItem.quantity}`
      },
      {
        columnDef: 'price',
        header: 'Price',
        cell: (orderItem: OrderItem) => {
          const item = this.items.find(item => item._id === orderItem.itemId);
          if (item) {
            return item.price * orderItem.quantity;
          }
          return '';
        }
      }
    ];
  }

  ngOnInit() {
    this.cartManagementService.orderItemList$.subscribe(orderItems => {
      this.dataSource.data = orderItems;
      this.cartItems = orderItems;
      this.dataSource.data = [...this.dataSource.data];
    });

    this.itemManagementService.itemList$.subscribe(data => {
      this.items = data;
    });

    this.displayedColumns = this.getColumns().map(c => c.columnDef);
    this.displayedColumns.push('actions');
  }

  shouldHighlight(data: OrderItem): boolean {
    if (this.items.length > 0) {
      const item = this.items.find(item => item._id === data.itemId);
      if (item) {
        return item.stock < data.quantity;
      }
      return true;
    }
    return false;
  }

  addQuantity(orderItem: OrderItem) {
    const item = this.items.find(item => item._id === orderItem.itemId);
    if (item) {
      if (orderItem.quantity < item.stock)
        orderItem.quantity++;
        this.cartManagementService.updateData(this.cartItems, orderItem);
    }
  }

  subQuantity(orderItem: OrderItem) {
    if (orderItem.quantity > 1) {
      orderItem.quantity--;
      this.cartManagementService.updateData(this.cartItems, orderItem);
    }
  }

}
