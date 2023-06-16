import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BybitService {

  private BTCUSD_ORDERBOOK_URL = 'wss://stream.bybit.com/realtime_public?symbol=BTCUSD';
  private socket$: WebSocketSubject<any>;

  // constructor() {
  //   this.connect();
  // }
  // public getOrderBook(): WebSocketSubject<any> {
  //   return this.socket$;
  // }
  // private connect(): void {
  //   if (!this.socket$ || this.socket$.closed) {
  //     this.socket$ = this.getNewWebSocket();
  //     const messages = this.socket$.pipe(
  //       tap({
  //         error: error => console.log(error),
  //       }), catchError(_ => EMPTY));
  //     messages.subscribe(msg => console.log(msg));
  //   }
  // }

  // private getNewWebSocket() {
  //   return webSocket({
  //     url: this.BTCUSD_ORDERBOOK_URL,
  //     closeObserver: {
  //       next: () => {
  //         console.log('Connection closed');
  //         this.connect();
  //       }
  //     },
  //     openObserver: {
  //       next: () => {
  //         console.log('Connection opened');
  //         this.socket$.next({
  //           'op': 'subscribe',
  //           'args': ['orderBookL2_25.BTCUSD']
  //         });
  //       }
  //     }
  //   });
  // }
}
