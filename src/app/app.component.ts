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
          link: '/login',
        },
        {
          title: 'Register',
          link: '/register',
        },
        {
          title: 'Request Password',
          link: '/request-password',
        },
        {
          title: 'Reset Password',
          link: '/reset-password',
        },
      ],
    },
    {
      title: "Alerts",
      link: '/alerts '
    },
    {
      title: "Home",
      link: '/home'
    },


  ];

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

}
