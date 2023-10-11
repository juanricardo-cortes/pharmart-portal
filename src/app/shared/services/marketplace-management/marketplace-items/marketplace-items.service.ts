import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/interfaces/Item';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceItemsService {

  private getUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getData(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.getUrl}/items`);
  }
}
