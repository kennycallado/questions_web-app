import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';

import { StorageService } from './storage.service';
import { USER_API } from '../providers/constants'

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor(private http: HttpClient, private storeSvc: StorageService) { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      if (this.storeSvc.get('token') === null) {
        this.requestPermission();
      } 

      this.pushListener();
    }
  }

  private requestPermission() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
  }

  // private registerPushToken(token: string) {
  //   this.storeSvc.set('token', token);
  // }

  private pushListener() {
    type Token = {
      value: string;
    };

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        // alert('Push registration success, token: ' + token.value);
        console.log('Push registration success, token: ' + token.value);
        this.storeSvc.set('token', token.value);
        this.sendTokenToServer(token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        // alert('Error on registration: ' + JSON.stringify(error));
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );

  }

  private async sendTokenToServer(token: string) {
    let user = this.storeSvc.getUserData();

    let body = JSON.stringify( token );
    let headers = { 'content-type': 'application/json',
      'Accpet': 'application/json',
      'Authorization': 'Bearer ' + this.storeSvc.getAccessToken()
    };

    this.http.patch(USER_API + '/' + user.id + '/fcm', body, { 'headers': headers }).subscribe(
      (res: any) => {
        console.debug(res);
      }
    )
  }
}
