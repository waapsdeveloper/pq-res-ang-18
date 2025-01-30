import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewMessageRoutingModule } from './view-message-routing.module';
import { ViewMessageComponent } from './view-message.component';


@NgModule({
  declarations: [
    ViewMessageComponent
  ],
  imports: [
    CommonModule,
    ViewMessageRoutingModule
  ]
})
export class ViewMessageModule { }
