import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
// RxJs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IonBackdrop } from '@ionic/angular';
import { BackdropService } from '../../../core/services';

@Component({
  selector: 'app-check-network',
  templateUrl: './check-network.component.html',
  styleUrls: ['./check-network.component.scss'],
})
export class CheckNetworkComponent implements OnInit, OnDestroy {
  @ViewChild('isOnline', { static: true }) public onlineElem: ElementRef;
  @ViewChild('isOffline', { static: true }) public offlineElem: ElementRef;
  private onDestroyUnSubscribe = new Subject<void>();
  public networkType: any;
  constructor(private network: Network, private backdropService: BackdropService) { }

  ngOnInit() {
    console.log(this.network);
    // watch network for a disconnection
    this.network.onDisconnect()
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe(networkData => {
      console.log('network status =>', networkData);
      this.networkType = this.network;
      this.showOffline();
      console.log('network was disconnected :-(', networkData);
    });


    // watch network for a connection
    this.network.onConnect()
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe(networkData => {
      console.log('network status =>', networkData);
      console.log('network connected!', networkData);
      this.networkType = this.network;
      this.showOnline();
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
  }
  ngOnDestroy() {
    // UnSubscribe Subscriptions
    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
  }
  showOnline() {
    this.backdropService.hide();
    this.offlineElem.nativeElement.classList.remove('show');
    this.onlineElem.nativeElement.classList.add('show');
    setTimeout(() => {
      this.onlineElem.nativeElement.classList.remove('show');
    }, 2000);
  }
  showOffline() {
    this.backdropService.show();
    this.onlineElem.nativeElement.classList.remove('show');
    this.offlineElem.nativeElement.classList.add('show');
  }
}
