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
      title: "Price alerts",
      link: 'price',
      icon: "layers-outline"
    },
    {
      title: "Orderbook alerts",
      link: 'orderbook',
      icon: "layers-outline"
    }
  ];
  orders: any;

  constructor(private orderbookService: CoinPriceService) {}

  ngOnInit() {
    /*this.orderbookService.getData(0.001).subscribe(order => {
      console.log(order);
      this.orders = order;
    });*/
  }

}
