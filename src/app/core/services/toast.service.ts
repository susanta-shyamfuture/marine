import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Toast } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }
  async createToast(options: Toast) {
    // const toast = await this.toastController.create({
    //   header: 'Toast header',
    //   message: 'Click to Close',
    //   position: 'top',
    //   buttons: [
    //     {
    //       side: 'start',
    //       icon: 'star',
    //       text: 'Favorite',
    //       handler: () => {
    //         console.log('Favorite clicked');
    //       }
    //     }, {
    //       text: 'Done',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     }
    //   ]
    // });
    const toast = await this.toastController.create(options as Toast);
    return toast;
  }
}
