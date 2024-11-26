import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KtAppToolbarModule } from 'src/app/components/kt-app-toolbar/kt-app-toolbar.module';
import { AddUserRestaurantListModule } from './add-user-restaurant-list/add-user-restaurant-list.module';


@NgModule({
  declarations: [
    AddUserComponent
  ],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    ReactiveFormsModule,
    KtAppToolbarModule,
    AddUserRestaurantListModule

  ]
})
export class AddUserModule { }
