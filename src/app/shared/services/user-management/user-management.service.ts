import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants/constants';
import { User } from '../../interfaces/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserRequest } from '../../interfaces/requests/userRequest';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constants: Constants;

  constructor(private http: HttpClient) {
    this.constants = new Constants();
  }



  private userListSubject = new BehaviorSubject<User[]>([]);
  userList$: Observable<User[]> = this.userListSubject.asObservable();



  createUser(userRequest: UserRequest) : Observable<User>  {
    return this.http.post<User>(`${this.constants.apiUrl}/users`, userRequest);
  }

  fetchUsers() {
    this.http.get<User[]>(`${this.constants.apiUrl}/users`).subscribe(data => {
      this.userListSubject.next(data);
    });
  }

  addUserList(user: User) {
    const currentList = this.userListSubject.value.slice();
    currentList.push(user);
    this.userListSubject.next(currentList);
  }
}
