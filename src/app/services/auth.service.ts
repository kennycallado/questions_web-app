import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

import jwt_decode, { JwtPayload } from 'jwt-decode'
import { Observable } from 'rxjs';

import { AuthUser } from '../providers/auth-user';
import { AUTH_API, DEV_AUTH_API } from '../providers/constants';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  status = new Observable<boolean>();
  auth_api = AUTH_API;

  constructor(
    private http: HttpClient,
    private storageSvc: StorageService) {
      if (isDevMode()) {
        this.auth_api = DEV_AUTH_API;
      }
  }

  isAuthenticated(): boolean {
    let token = this.storageSvc.getAccessToken();
    if (token) {
      let payload: JwtPayload = jwt_decode(token);
      let result = payload.exp! > Date.now() / 1000;

      if (!result) {
        this.autoLogin().subscribe(
          (auth_user: AuthUser) => {
            this.storageSvc.setUserData(auth_user.user);
            this.storageSvc.setAccessToken(auth_user.access_token);

            result = true;
          });
      }

      return result;
    }

    return false;
  }

  login(token: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(this.auth_api + '/login', token, { withCredentials: true });
  }

  autoLogin(): Observable<AuthUser> {
    return this.http.get<AuthUser>(this.auth_api + '/', { withCredentials: true });
  }

  logout(): void {
    // call logout api to invalidate token
    // Also call to remove the fcm token from the server
    this.http.get(this.auth_api + '/logout', { withCredentials: true }).subscribe();

    this.storageSvc.removeUserData();
    this.storageSvc.removeAccessToken();

    if (this.storageSvc.get('token') !== null) {
      this.storageSvc.remove('token');
    }

    // this.router.navigate(['/login']);
  }
}
