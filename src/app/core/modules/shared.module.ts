import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent, LoaderComponent, BackdropComponent } from '../../container/components';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    // Components
    HeaderComponent,
    LoaderComponent,
    BackdropComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    // Components
    HeaderComponent,
    LoaderComponent,
    BackdropComponent
  ]
})
export class SharedModule { }
