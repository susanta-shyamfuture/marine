import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show(percentage, type?) {
    this.loaderSubject.next({ show: true, percentage, type } as LoaderState);
  }
  hide() {
    this.loaderSubject.next({ show: false, percentage: 0, type: 'normal' } as LoaderState);
  }
}
