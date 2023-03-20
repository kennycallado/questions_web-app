import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import jwt_decode, { JwtPayload } from 'jwt-decode'
import { Observable } from 'rxjs';

import { AuthUser } from '../providers/auth-user';
import { AUTH_API } from '../providers/constants';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  status = new Observable<boolean>();

  constructor(
    private http: HttpClient,
    private storageSvc: StorageService) { }

  isAuthenticated(): boolean {
    let token = this.storageSvc.getAccessToken();
    if (token) {
      let payload: JwtPayload = jwt_decode(token);
      let result = payload.exp! > Date.now() / 1000;

      return result;
    }

    return false;
  }

  login(token: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(AUTH_API + '/login', token);
  }

  logout(): void {
    this.http.get(AUTH_API + '/logout', { withCredentials: true }).subscribe();

    this.storageSvc.removeUserData();
    this.storageSvc.removeAccessToken();

    // this.router.navigate(['/login']);
  }
}