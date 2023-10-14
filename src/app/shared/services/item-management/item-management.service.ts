import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../../constants/constants';
import { UpdateItemRequest } from '../../interfaces/requests/itemRequest';
import { Item } from 'src/app/shared/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {

  private constants: Constants;

  constructor(private http: HttpClient) {
    this.constants = new Constants();

  }

  private itemListSubject = new BehaviorSubject<Item[]>([]);
  itemList$: Observable<Item[]> = this.itemListSubject.asObservable();

  fetchData() {
    this.http.get<Item[]>(`${this.constants.apiUrl}/items`).subscribe(data => {
      this.itemListSubject.next(data);
    });
  }

  postData(item: FormData) {
    this.http.post<Item>(`${this.constants.apiUrl}/items`, item).subscribe(
      (response) => {
        var newItem = response as Item;
        const currentList = this.itemListSubject.value.slice();
        currentList.push(newItem);
        this.itemListSubject.next(currentList);
      });
  }

  deleteData(id: string) {
    this.http.delete<Item>(`${this.constants.apiUrl}/items/${id}`).subscribe(
      () => {
        const currentList = this.itemListSubject.value.slice();
        const index = currentList.findIndex(item => item._id === id);
        if (index >= 0) {
          currentList.splice(index, 1);
          this.itemListSubject.next(currentList);
        }
    });
  }

  updateData(item: UpdateItemRequest) {
    this.http.put<Item>(`${this.constants.apiUrl}/items`, item).subscribe(
      (response) => {
        var newItem = response as Item;
        const currentList = this.itemListSubject.value.slice();
        const index = currentList.findIndex(item => item._id === newItem._id);
        if (index >= 0) {
          currentList[index] = newItem;
          this.itemListSubject.next(currentList);
        }
    })
  }
}
