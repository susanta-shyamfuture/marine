import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../../core/services';
import { LoaderState } from '../../../core/interfaces';
// RxJs
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  public show = false;
  public percentage = 0;
  private onDestroyUnSubscribe = new Subject<void>();

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loaderState
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe((state: LoaderState) => {
      this.show = state.show;
      this.percentage = state.percentage;
    });
  }
  ngOnDestroy() {
    // UnSubscribe Subscriptions
    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
  }

}
