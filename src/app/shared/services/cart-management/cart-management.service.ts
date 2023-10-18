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

  deleteData(itemId: string, sellerName: string) {
    const currentList = this.orderItemListSubject.value.slice();
    const index = currentList.findIndex(orderItem => orderItem.itemId === itemId && orderItem.sellerName === sellerName);
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
    var orderItemList : OrderItem[] = [];
    const storedString = localStorage.getItem('cart');
    if (storedString !== null && storedString.length > 0) {
      orderItemList = this.updateOrAddOrderItem(this.parseOrderItems(storedString), orderItem);
    }
    else {
      orderItemList.push(orderItem);
    }
    this.orderItemListSubject.next(orderItemList);
    localStorage.setItem('cart', JSON.stringify(orderItemList));
  }

  updateData(orderItems: OrderItem[], newItem: OrderItem) {
    const existingItemIndex = orderItems.findIndex((item) => {
      return (item.itemId === newItem.itemId && item.sellerName === newItem.sellerName);
    });

    if (existingItemIndex !== -1) {
      orderItems[existingItemIndex] = newItem;
    }
    this.orderItemListSubject.next(orderItems);
    localStorage.setItem('cart', JSON.stringify(orderItems));
  }

  emptyData() {
    this.orderItemListSubject.next([]);
    localStorage.removeItem('cart');
  }

  private parseOrderItems(jsonString: string): OrderItem[] {
    const parsedData: any[] = JSON.parse(jsonString);

    return parsedData.map((itemData) => {
      return new OrderItem(itemData.itemId, itemData.quantity, itemData.sellerName, itemData.createdAt);
    });
  }

  private updateOrAddOrderItem(orderItems: OrderItem[], newItem: OrderItem): OrderItem[] {
    const existingItemIndex = orderItems.findIndex((item) => {
      return (item.itemId === newItem.itemId && item.sellerName === newItem.sellerName);
    });

    if (existingItemIndex !== -1) {
      orderItems[existingItemIndex].quantity += newItem.quantity;
    } else {
      orderItems.push(newItem);
    }

    return orderItems;
  }



}
