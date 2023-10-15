import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../../constants/constants';
import { UserRequest } from '../../interfaces/requests/userRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService {

  constants: Constants;

  constructor(private http: HttpClient,
    private router: Router) {
    this.constants = new Constants();
  }

  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  authUser(userRequest: UserRequest) : Observable<User> {
    const queryParams = new HttpParams()
      .set('username', userRequest.username.toString())
      .set('password', userRequest.password.toString());

    return this.http.get<User>(`${this.constants.apiUrl}/user`, { params: queryParams });
  }

  logOutUser() {
    this.userSubject.next(null);
    this.router.navigateByUrl('/login');
  }

  cacheUser(user: User) {
    this.userSubject.next(user);
  }
}
