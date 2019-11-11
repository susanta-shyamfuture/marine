import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Backdrop } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BackdropService {
  private backdropSubject = new Subject<Backdrop>();
  backdropState = this.backdropSubject.asObservable();

  constructor() { }
  show(styles?) {
    console.log('show BD');
    this.backdropSubject.next({ show: true, styles } as Backdrop);
  }
  hide() {
    console.log('hide BD');
    this.backdropSubject.next({ show: false } as Backdrop);
  }
}