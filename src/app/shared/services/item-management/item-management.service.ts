import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator
import { Item } from 'src/app/shared/interfaces/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {

  private getUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // getData(): Observable<Item[]> {
  //   return this.http.get<Item[]>(`${this.getUrl}/items`).pipe(
  //     map(items => {
  //       return items.map(item => {
  //         const blob = new Blob([item.image], { type: 'image/png' });
  //         const blobUrl = URL.createObjectURL(blob);
  //         return {
  //           ...item,
  //           image: blobUrl
  //         };
  //       });
  //     })
  //   );
  // }
  
  getData(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.getUrl}/items`);
  }

  postData(item: FormData) {
    return this.http.post(`${this.getUrl}/items`, item);
  }
}
