import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheckNetwork } from '../interfaces';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class CheckNetworkService {
  private checkNetworkSubject = new Subject<CheckNetwork>();
  checkNetworkState = this.checkNetworkSubject.asObservable();

  constructor(
    private network: Network,
  ) {
    // this.onDisconnect();
    // this.onConnect();
  }

  onDisconnect() {
    // watch network for a disconnection
    return this.network.onDisconnect()
    .subscribe(() => {
      this.isOffline();
    });
  }

  onConnect() {
    // watch network for a connection
    return this.network.onConnect()
    .subscribe(() => {
      this.isOnline();
    });
  }

  onChange() {
    // watch network for a connection
    return this.network.onChange()
    // .subscribe(() => {
    .subscribe(net => {
      console.log(net);
    });
  }

  isOnline() {
    this.checkNetworkSubject.next({ showOnline: true, showOffline: false, isConnected: true, networkData: this.network } as CheckNetwork);
  }
  isOffline() {
    this.checkNetworkSubject.next({ showOnline: false, showOffline: true, isConnected: false, networkData: this.network } as CheckNetwork);
  }
}
