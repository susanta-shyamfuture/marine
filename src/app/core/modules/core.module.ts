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

@NgModule({
  declarations: [
    CheckNetworkComponent,
    // BackdropComponent
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
    // BackdropComponent
  ],
  providers: [
  ]
})
export class CoreModule { }
