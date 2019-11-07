import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services';
// RxJs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  private onDestroyUnSubscribe = new Subject<void>();
  public datas: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    // UnSubscribe Subscriptions
    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
  }
  ionViewWillEnter() {
    this.getAllData();
  }
  getAllData() {
    this.authService.getData()
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe(
      result => {
        console.log('After Login', result);
        this.datas = result;
      },
      error => {
        console.log('Error');
      }
    );
  }

}
