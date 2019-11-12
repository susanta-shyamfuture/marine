import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Components
import {
  CheckNetworkComponent,
  BackdropComponent
} from '../../container/components';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
  declarations: [
    CheckNetworkComponent,
    BackdropComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    IonicStorageModule,
    FormsModule,
    ReactiveFormsModule,
    // Components
    CheckNetworkComponent,
    BackdropComponent
  ],
  providers: [
    Network
  ]
})
export class CoreModule { }
