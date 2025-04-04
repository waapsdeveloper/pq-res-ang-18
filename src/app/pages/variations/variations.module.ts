import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariationsRoutingModule } from './variations-routing.module';
import { VariationsComponent } from './variations.component';
import { SharedModule } from "../../shared/shared.module";
import { BtopHeaderModule } from "../../components/btop-header/btop-header.module";


@NgModule({
  declarations: [
    VariationsComponent
  ],
  imports: [
    CommonModule,
    VariationsRoutingModule,
    SharedModule,
    BtopHeaderModule
]
})
export class VariationsModule { }
