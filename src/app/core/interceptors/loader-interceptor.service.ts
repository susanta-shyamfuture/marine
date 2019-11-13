import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService, BackdropService, CheckNetworkService } from '../services';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {
  constructor(private loaderService: LoaderService, private backdropService: BackdropService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqModified = req.clone({
      reportProgress: true
    });
    this.showLoader(0.05);
    return next.handle(reqModified)
    .pipe(
      tap(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.UploadProgress:
              const percentDone = (100 * event.loaded / event.total) / 100;
              this.showLoader(+percentDone.toFixed(2));
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.DownloadProgress:
              // const percentSDone = (100 * event.loaded / event.total) / 100;
              // this.showLoader(+percentSDone.toFixed(2));
              break;
            case HttpEventType.Response:
              this.hideLoader();
              break;
            case HttpEventType.User:
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
