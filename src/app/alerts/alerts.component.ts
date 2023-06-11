import { Component } from '@angular/core';
import {Alert} from "../../models/Alerts";
import {CoinPriceService} from "../services/CoinPriceService";
import {NbMenuItem} from "@nebular/theme";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  items: NbMenuItem[] = [
    {
      title: "Price Alerts",
      link: '/price'
    },
    {
      title: "Orderbook",
      link: '/orderbook',
      icon: "layers-outline"
    }
  ];
  orders: any;

  constructor(private orderbookService: CoinPriceService) {}

  ngOnInit() {
    this.orderbookService.getData(0.001).subscribe(order => {
      console.log(order);
      this.orders = order;
    });
  }

}
