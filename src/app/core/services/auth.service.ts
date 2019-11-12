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
const login = 'admin';
const password = '12345';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }).set('x-api-key', 'Shyam@12345').set('Authorization', `Basic ${btoa(login + ':' + password)}`)
};
// const httpOption = {
//   headers: new HttpHeaders({
//     'x-api-key': 'Shyam@12345',
//     'Content-Type':  'application/json',
//     Authorization: `Basic ${btoa(login + ':' + password)}`
//   })
// };

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
    const data = {
      product_id: '', user_id: '201', device_token: '', pro_search: ''
    };
    return this.http.post(
      'http://thedukanwala.com/grocery/api/discountproductslist/50/1', data,
      httpOptions
    )
    .pipe(
        map(response => response),
        catchError(this.handleError('getData'))
    );
  }
  isUserLoggedIn() {
    return this.storage.get('userData');
  }
}
