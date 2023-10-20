import { Injectable } from '@angular/core';
import { Constants } from '../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderTracker } from '../../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class OrderTrackerService {

  private constants: Constants;

  constructor(private http: HttpClient) {
    this.constants = new Constants();
  }

  private orderTrackerListSubject = new BehaviorSubject<OrderTracker[]>([]);
  orderTrackerList$: Observable<OrderTracker[]> = this.orderTrackerListSubject.asObservable();

  fetchData() {
    this.http.get<OrderTracker[]>(`${this.constants.apiUrl}/track`).subscribe(data => {
      this.orderTrackerListSubject.next(data);
    });
  }
}
