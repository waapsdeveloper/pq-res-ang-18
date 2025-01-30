import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListMessageRoutingModule } from './list-message-routing.module';
import { ListMessageComponent } from './list-message.component';


@NgModule({
  declarations: [
    ListMessageComponent
  ],
  imports: [
    CommonModule,
    ListMessageRoutingModule
  ]
})
export class ListMessageModule { }
