import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll, map } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';
import {Injectable} from "@angular/core";
import { Order } from 'src/models/Orders';
import { Data } from 'src/models/Data';

@Injectable({
  providedIn: 'root'
})
export class OrderBookService {
  private ws: WebSocket;
  private subject: Subject<Data>;

  constructor() {
    this.initializeWebSocket('wss://stream-testnet.bybit.com/v5/public/spot', ['orderbook.1.BTCUSDT']);
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
    if (data && data.data) {
      const ask = data.data.a && data.data.a.length > 0 ? data.data.a[0] : null;
      const bid = data.data.b && data.data.b.length > 0 ? data.data.b[0] : null;

      if (ask && bid) {
        return this.compareAmounts(ask, bid, amount, condition);
      } else if (ask && !bid) {
        return this.compareAmount(ask, amount, 'a', condition);
      } else if (!ask && bid) {
        return this.compareAmount(bid, amount, 'b', condition);
      }
    }

    return null;
  }

  private compareAmounts(ask: Order, bid: Order, amount: number, condition: string): any {
    
    if(condition === 'more'){
      const asks = parseFloat(ask[1]) >= amount ? ask[1] : null;
      const bids = parseFloat(bid[1]) >= amount ? bid[1] : null;
      this.returnsAmounts(asks, bids);
    }
    else if(condition === 'less'){
      const asks = parseFloat(ask[1]) <= amount ? ask[1] : null;
      const bids = parseFloat(bid[1]) <= amount ? bid[1] : null;
      this.returnsAmounts(asks, bids);
    }
  }

  private compareAmount(order: any, amount: number, type: string, condition: string): any {
    if(condition === 'more'){
      const result = parseFloat(order[1]) >= amount ? order[1] : null;
      return result != null ? result : null;
    }
    else if(condition === 'less'){
      const result = parseFloat(order[1]) <= amount ? order[1] : null;
      return result != null ? result : null;
    }
  }

  private returnsAmounts(asks: any, bids: any): any {
    
    if (asks != null || bids != null){
      return {a: asks, b: bids};
    }
  }
}
