import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Constants, Message } from 'src/app/shared/constants/constants';
import { UserRequest } from 'src/app/shared/interfaces/requests/userRequest';
import { User } from 'src/app/shared/interfaces/user';
import { AuthManagementService } from 'src/app/shared/services/auth-management/auth-management.service';
import { UserManagementService } from 'src/app/shared/services/user-management/user-management.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  constants: Constants;
  userRequest: UserRequest;
  message?: Message;

  constructor(private authManagementService: AuthManagementService,
    private userManagementService: UserManagementService,
    private router: Router) {
    this.userRequest = this.initUserRequest();
    this.constants = new Constants();
  }

  login() {
    this.authManagementService.authUser(this.userRequest).subscribe(
      (user) => {
        if(user) {
          this.authManagementService.cacheUser(user);
          this.router.navigateByUrl('/dashboard');
        } else {
          this.message = this.constants.invalidLogin;
        }
      });
  }

  register() {
    this.userManagementService.createUser(this.userRequest).subscribe(
      (user) => {
        console.log(user);
        if(user) {
          this.message = this.constants.succcessfulRegister;
        } else {
          this.message = this.constants.invalidRegister;
        }
      });
  }

  initUserRequest() {
    return {
      username: "",
      password: ""
    }
  }
}


