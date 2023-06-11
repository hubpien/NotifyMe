import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {filter, map, Observable, Subject} from 'rxjs';
import { WebSocketConfig } from '../interfaces/WebSocketConfig.config';

type Order = [string, string];

class Data {
  s: string;
  b: Order[];
  a: Order[];
  u: number;
  seq: number;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class CoinPriceService {
  private ws: WebSocket;
  private subject: Subject<Data>;

  constructor() {
    this.ws = new WebSocket('wss://stream-testnet.bybit.com/v5/public/spot');

    this.ws.onopen = (event) => {
      console.log("WebSocket is open now.");
      this.ws.send(
        JSON.stringify(
                  {
                          "req_id": "test",
                          "op": "subscribe",
                          "args": ["orderbook.1.BTCUSDT"]
                          }
                        ));
    }


    this.ws.onclose = (event) => {
      console.log("WebSocket is closed now.");
    };

    this.ws.onerror = (event) => {
      console.error("WebSocket error observed:", event);
    };

    this.subject = new Subject();
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.subject.next(data);

    };
  }

  getData(amount: number = 0.001): Observable<any> {

    return this.subject.asObservable().pipe(
      map(data => {
        console.log("-------------");
        if(data.data != undefined) {
          if (data.data.a && data.data.a.length > 0 && data.data.b && data.data.b.length > 0) {
            const ask = data.data.a[0];
            const bid = data.data.b[0];
            const asks = parseFloat(ask[1]) >= amount ? ask[1] : null;
            const bids = parseFloat(bid[1]) >= amount ? bid[1] : null;
            if (asks != null || bids != null){
              console.log({a: asks, b: bids});
            }
            console.log("-------------");
          }
        }
      }),

    );
  }
}
