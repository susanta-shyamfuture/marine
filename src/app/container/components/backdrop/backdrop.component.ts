import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackdropService } from '../../../core/services';
import { Backdrop } from '../../../core/interfaces';
// RxJs
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
})
export class BackdropComponent implements OnInit, OnDestroy {
  public show = false;
  private onDestroyUnSubscribe = new Subject<void>();
  constructor(public backdropService: BackdropService) { }

  ngOnInit() {
    this.backdropService.backdropState
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe((state: Backdrop) => {
      console.log(state);
      this.show = state.show;
    });
  }

  ngOnDestroy() {
    // UnSubscribe Subscriptions
    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
  }
}
