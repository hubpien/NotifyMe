import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AlertsComponent} from "./alerts.component";
import {NbLoginComponent} from "@nebular/auth";
import {NotFoundComponent} from "../not-found/not-found.component";
import {PriceAlertsComponent} from "../price-alerts/price-alerts.component";
import {OrderbookAlertsComponent} from "../orderbook-alerts/orderbook-alerts.component";


const routes: Routes = [
  {
      path: '',
      component: AlertsComponent,
      children: [
        {
          path: 'price',
          component: PriceAlertsComponent,
        },
        {
          path: 'orderbook',
          component: OrderbookAlertsComponent,
        },
      ],

  },
  { path:'**', component:NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AlertsModule { }
