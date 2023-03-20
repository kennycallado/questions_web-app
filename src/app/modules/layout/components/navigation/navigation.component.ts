import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isAuth = true; // should be an observable

  constructor(
    private router: Router,
    private authSvc: AuthService) { }

  logout(): void {
    this.authSvc.logout();
    this.router.navigate(['/login']);

    return ;
  }
}
