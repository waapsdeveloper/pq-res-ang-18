import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMessageRoutingModule } from './add-message-routing.module';
import { AddMessageComponent } from './add-message.component';


@NgModule({
  declarations: [
    AddMessageComponent
  ],
  imports: [
    CommonModule,
    AddMessageRoutingModule
  ]
})
export class AddMessageModule { }
