import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotificationsService } from 'src/app/services/push-notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pushSvc: PushNotificationsService) { }

  async initNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Title',
          body: 'Body',
          id: 1,
          // schedule: { at: new Date(Date.now() + 1000 * 5) },
          // schedule: { every: 'minute', count: 5 },
          schedule: { every: 'minute' },
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  ngOnInit() {
    this.pushSvc.initPush();
  }
}
