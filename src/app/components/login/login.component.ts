import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private storageSvc: StorageService) { }

  submit(user_token: HTMLInputElement) {
    this.authSvc.login(user_token.value).subscribe(
      (auth_user) => { 
        this.storageSvc.setUserData(auth_user.user);
        this.storageSvc.setAccessToken(auth_user.access_token);

        this.router.navigate(['home']);
      })
  }
}
