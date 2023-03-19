import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authSvc.isAuthenticated()) {
      this.router.navigate(['login']);

      return false;
    }
    return true;
  }
}
