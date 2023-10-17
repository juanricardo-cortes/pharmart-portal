import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants/constants';
import { OrderItem } from '../../interfaces/item';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {

  private constants: Constants;

  constructor(private http: HttpClient) {
    this.constants = new Constants();
  }

  private orderListSubject = new BehaviorSubject<OrderItem[]>([]);
  orderList$: Observable<OrderItem[]> = this.orderListSubject.asObservable();

  postData(orderItems: OrderItem[]) {
    this.http.post<OrderItem[]>(`${this.constants.apiUrl}/orders`, orderItems).subscribe(
      (response) => {
        const currentList = this.orderListSubject.value.slice();
        currentList.concat(orderItems);
        this.orderListSubject.next(currentList);
      });
  }

  fetchData() {
    this.http.get<OrderItem[]>(`${this.constants.apiUrl}/orders`).subscribe(data => {
      this.orderListSubject.next(data);
    });
  }
}
