import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item, OrderItem } from '../../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class CartManagementService {

  private orderItemListSubject = new BehaviorSubject<OrderItem[]>([]);
  orderItemList$: Observable<OrderItem[]> = this.orderItemListSubject.asObservable();

  constructor() { }

  deleteData(id: string) {
    const currentList = this.orderItemListSubject.value.slice();
    const index = currentList.findIndex(orderItem => orderItem.item._id === id);
    if (index >= 0) {
      currentList.splice(index, 1);
      this.orderItemListSubject.next(currentList);
    }
  }

  fetchData() {
    const storedString = localStorage.getItem('cart');
    if (storedString !== null && storedString.length > 0) {
      const currentList = this.parseOrderItems(storedString);
      this.orderItemListSubject.next(currentList);
    }
  }

  postData(orderItem: OrderItem) {
    const currentList = this.orderItemListSubject.value.slice();
    currentList.push(orderItem);
    this.orderItemListSubject.next(currentList);

    var orderItemList : OrderItem[] = [];
    const storedString = localStorage.getItem('cart');
    if (storedString !== null && storedString.length > 0) {
      orderItemList = this.parseOrderItems(storedString);
      orderItemList.push(orderItem);
    }
    else {
      orderItemList.push(orderItem);
    }

    localStorage.setItem('cart', JSON.stringify(orderItemList));
  }

  parseOrderItems(jsonString: string): OrderItem[] {
    const parsedData: OrderItem[] = JSON.parse(jsonString);
    return parsedData.map((itemData) => {
      const item = new Item(
        itemData.item._id,
        itemData.item.name,
        itemData.item.description,
        itemData.item.price,
        itemData.item.image,
        itemData.item.stock
      );

      return new OrderItem(item, itemData.quantity);
    });
  }
}
