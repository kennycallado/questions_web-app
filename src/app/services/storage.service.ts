import { Injectable } from '@angular/core';
import { UserInClaims } from '../providers/auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  getUserData(): UserInClaims {
    return JSON.parse(localStorage.getItem('user')!);
  }

  setUserData(data: UserInClaims) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  removeUserData(): void {
    localStorage.removeItem('user');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  removeAccessToken(): void {
    localStorage.removeItem('access_token');
  }
}
