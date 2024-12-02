import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtablesRoutingModule } from './rtables-routing.module';
import { RtablesComponent } from './rtables.component';
import { FormsModule } from '@angular/forms';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [
    RtablesComponent
  ],
  imports: [
    CommonModule,
    RtablesRoutingModule,
    SharedModule,
    BtopHeaderModule,
    FormsModule
  ]
})
export class RtablesModule { }
