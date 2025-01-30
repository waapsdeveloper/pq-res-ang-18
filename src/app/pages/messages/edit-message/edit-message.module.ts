import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditMessageRoutingModule } from './edit-message-routing.module';
import { EditMessageComponent } from './edit-message.component';


@NgModule({
  declarations: [
    EditMessageComponent
  ],
  imports: [
    CommonModule,
    EditMessageRoutingModule
  ]
})
export class EditMessageModule { }
