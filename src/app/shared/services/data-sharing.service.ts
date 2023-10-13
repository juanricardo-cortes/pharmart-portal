import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Item } from '../interfaces/Item';

@Injectable()
export class DataSharingService {

  private item = new Subject<Item>();

  item$ = this.item.asObservable();

  shareItem(data: Item) {
    this.item.next(data);
  }

  private dataArraySubject = new BehaviorSubject<Item[]>([]);
  dataArray$: Observable<Item[]> = this.dataArraySubject.asObservable();

  updateData(data: Item[]): void {
    this.dataArraySubject.next(data);
  }
}
