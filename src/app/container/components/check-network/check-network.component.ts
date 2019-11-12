import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
// RxJs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BackdropService, CheckNetworkService } from '../../../core/services';
import { CheckNetwork } from '../../../core/interfaces';

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
  constructor(
    private network: Network,
    private backdropService: BackdropService,
    private checkNetworkService: CheckNetworkService,
    private cd: ChangeDetectorRef
  ) {
    this.checkNetworkService.checkNetworkState
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe((state: CheckNetwork) => {
      if (state.isConnected) {
        this.showOnline();
      } else {
        this.showOffline();
      }
      this.cd.detectChanges();
    });
    // // watch network for a disconnection
    // this.network.onDisconnect()
    // .pipe(takeUntil(this.onDestroyUnSubscribe))
    // .subscribe(networkData => {
    //   console.log('network disconnected!', this.network);
    //   this.networkType = this.network;
    //   this.showOffline();
    //   this.cd.detectChanges();
    //   // console.log('network was disconnected :-(', networkData);
    // });


    // // watch network for a connection
    // this.network.onConnect()
    // .pipe(takeUntil(this.onDestroyUnSubscribe))
    // .subscribe(networkData => {
    //   this.networkType = this.network;
    //   this.showOnline();
    //   this.cd.detectChanges();
    //   console.log('network connected!', this.network);
    //   setTimeout(() => {
    //     if (this.network.type === 'wifi') {
    //       console.log('we got a wifi connection, woohoo!');
    //     }
    //     this.cd.detectChanges();
    //   }, 3000);
    // });
  }

  ngOnInit() {
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
    }, 5000);
  }
  showOffline() {
    this.backdropService.show();
    this.onlineElem.nativeElement.classList.remove('show');
    this.offlineElem.nativeElement.classList.add('show');
  }
}
