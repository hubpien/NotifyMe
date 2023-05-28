import { Component } from '@angular/core';
import { RouterOutlet} from "@angular/router";
import {NbMenuItem} from "@nebular/theme";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NotifyMe';

  items: NbMenuItem[] = [
    {
      title: 'Auth',
      icon: 'lock-outline',
      children: [
        {
          title: 'Login',
          link: '/auth/login',
        },
        {
          title: 'Register',
          link: '/auth/register',
        },
        {
          title: 'Reset Password',
          link: '/auth/reset-password',
        },
      ],
    },
    {
      title: "Alerts",
      link: '/alerts',
      icon: 'activity-outline'
    },
    {
      title: "Home",
      link: '/home',
      icon: 'home-outline'
    },


  ];

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

}
