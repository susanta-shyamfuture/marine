import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService, BackdropService } from '../services';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {
  constructor(private loaderService: LoaderService, private backdropService: BackdropService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const reqModified = req.clone({
    //   reportProgress: true
    // });
    // console.log(reqModified);
    this.showLoader(0.05);
    return next.handle(req)
    .pipe(
      tap(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('-------Sent-------', event);
              break;
            case HttpEventType.UploadProgress:
              console.log('-------UploadProgress-------', event);
              const percentDone = (100 * event.loaded / event.total) / 100;
              this.showLoader(+percentDone.toFixed(2));
              break;
            case HttpEventType.ResponseHeader:
              console.log('-------ResponseHeader-------', event);
              break;
            case HttpEventType.DownloadProgress:
              console.log('-------DownloadProgress-------', event);
              const percentSDone = (100 * event.loaded / event.total) / 100;
              this.showLoader(+percentSDone.toFixed(2));
              break;
            case HttpEventType.Response:
              console.log('-------Response-------', event);
              this.hideLoader();
              break;
            case HttpEventType.User:
              console.log('-------User-------', event);
              break;
            default:
              console.log('Started');
          }
        },
        (err: any) => {
          this.hideLoader();
        }
      )
    );
  }
  private showLoader(percentage): void {
    this.backdropService.show();
    this.loaderService.show(percentage);
  }
  private hideLoader(): void {
    this.backdropService.hide();
    this.loaderService.hide();
  }
}
