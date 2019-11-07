import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// Handle error
import { HandleError, HandleErrorService } from './handle-error.service';
// Server Link
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

// Content Type
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private handleErrorService: HandleErrorService,
  ) {
    this.handleError = handleErrorService.createHandleError('AuthService');
  }
  // get data
  getData() {
    return this.http.get('https://jsonplaceholder.typicode.com/photos', httpOptions)
    .pipe(
        map(response => response),
        catchError(this.handleError('getData'))
    );
  }
  isUserLoggedIn() {
    return this.storage.get('userData');
  }
}
