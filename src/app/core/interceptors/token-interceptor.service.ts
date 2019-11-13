import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../services';
// Server Link
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  constructor(
    public authService: AuthService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const reqModified = req.clone({
      // headers : req.headers.append(
      //   'ACCESSTOKEN', `${this.authService.getToken()}`
      // ),
      // reportProgress: true
    });
    // if (reqModified.body instanceof FormData) {
    //   reqModified.body.append('environment', environment.devEnv);
    // } else {
    //   reqModified.body['environment'] = environment.devEnv;
    // }
    return next.handle(reqModified)
    .pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Check Auth token if it is Valid else logout
          // if (!event.body.serverResponse.isSuccess && event.body.serverResponse.code === 601) {
          //   this.authService.logOut();
          // }
        }
        return event;
      }),
      // catchError((error: any) => {
      //   console.log(error);
      //   return throwError(error);
      // })
    );
  }
}
