import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from 'src/app/services/push-notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pushSvc: PushNotificationsService) { }

  ngOnInit() {
    this.pushSvc.initPush();
  }
}
