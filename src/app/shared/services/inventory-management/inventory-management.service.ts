import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/interfaces/Item';
import { ItemRequest } from '../../interfaces/requests/itemRequest';

@Injectable({
  providedIn: 'root'
})
export class InventoryManagementService {

  private getUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getData(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.getUrl}/items`);
  }

  postData(item: ItemRequest) {
    return this.http.post(`${this.getUrl}/items`, item);
  }
}
