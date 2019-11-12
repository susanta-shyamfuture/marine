import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BackdropService } from '../../../core/services';
import { Backdrop } from '../../../core/interfaces';
// RxJs
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IonBackdrop } from '@ionic/angular';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
})
export class BackdropComponent implements OnInit, OnDestroy {
  @ViewChild('offlineLoadingBackdrop', { static: false }) public offlineLoadingBackdrop: IonBackdrop;
  public show = false;
  private onDestroyUnSubscribe = new Subject<void>();
  constructor(
    public backdropService: BackdropService,
    private cd: ChangeDetectorRef
  ) {
    this.backdropService.backdropState
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe((state: Backdrop) => {
      this.show = state.show;
      this.cd.detectChanges();
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    // UnSubscribe Subscriptions
    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
  }
}
