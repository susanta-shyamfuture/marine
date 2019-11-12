import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../../../core/services';
import { LoaderState } from '../../../core/interfaces';
// RxJs
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  public show = false;
  public percentage = 0;
  private onDestroyUnSubscribe = new Subject<void>();

  constructor(
    private loaderService: LoaderService,
    public loadingController: LoadingController,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loaderService.loaderState
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe((state: LoaderState) => {
      this.show = state.show;
      this.percentage = state.percentage;
      this.cd.detectChanges();
    });
    // this.presentLoadingWithOptions();
  }
  ngOnDestroy() {
    // UnSubscribe Subscriptions
    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      // duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

}
