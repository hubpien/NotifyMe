import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {filter, map, Observable, Subject} from 'rxjs';
import { WebSocketConfig } from '../interfaces/WebSocketConfig.config';
import { Order } from 'src/models/Orders';
import { Data } from 'src/models/Data';

@Injectable({
  providedIn: 'root'
})
export class CoinPriceService {
  private ws: WebSocket;
  private subject: Subject<Data>;

  constructor() {
    this.initializeWebSocket('wss://stream-testnet.bybit.com/v5/public/spot', ['publicTrade.BTCUSDT']);
  }

  private initializeWebSocket(url: string, subscribeArgs: string[]): void {
    this.ws = new WebSocket(url);

    this.ws.onopen = (event) => {
      console.log("WebSocket is open now.");
      this.ws.send(JSON.stringify({
        "req_id": "test",
        "op": "subscribe",
        "args": subscribeArgs
      }));
      console.log("sended");
    }

    this.ws.onclose = (event) => {
      console.log("WebSocket is closed now.");
    };

    this.ws.onerror = (event) => {
      console.error("WebSocket error observed:", event);
    };

    this.subject = new Subject<Data>();
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.subject.next(data);
    };
  }

  public getData(amount: number, condition: string): Observable<any> {
    return this.subject.asObservable().pipe(
      map(data => this.processData(data, amount, condition))
    );
  }

  private processData(data: any, amount: number, condition: string): any {
    if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      const firstItem = data.data[0];
      if (firstItem && firstItem.hasOwnProperty('p')) {
        return this.compareAmount(firstItem.p, amount, condition);
      }
    }

    return null;
  }

  private compareAmount(order: any, amount: number, condition: string): any {
    if(condition === 'more'){
      const result = parseFloat(order[1]) >= amount ? order[1] : null;
      return result != null ? result : null;
    }
    else if(condition === 'less'){
      const result = parseFloat(order[1]) <= amount ? order[1] : null;
      return result != null ? result : null;
    }
  }
}
