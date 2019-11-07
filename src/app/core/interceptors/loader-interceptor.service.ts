import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {
  constructor(private loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader(5);
    return next.handle(req)
    .pipe(
      tap(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('s');
              break;
            case HttpEventType.UploadProgress:
              const percentDone = Math.round(100 * event.loaded / event.total / 100);
              console.log('p');
              this.showLoader(percentDone);
              break;
            case HttpEventType.Response:
              console.log('e');
              this.onEnd();
              break;
            default:
              // console.log('Error Happened');
          }
        },
        (err: any) => {
          this.onEnd();
        }
      )
    );
  }
  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(percentage): void {
    this.loaderService.show(percentage);
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}
