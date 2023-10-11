import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../interfaces/Item';

@Injectable()
export class DataSharingService {

  private item = new Subject<Item>();

  item$ = this.item.asObservable();

  shareItem(data: Item) {
    this.item.next(data);
  }
}
