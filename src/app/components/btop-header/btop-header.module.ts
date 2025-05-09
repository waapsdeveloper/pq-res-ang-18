import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtopHeaderComponent } from './btop-header.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbDropdownModule, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    BtopHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgScrollbarModule,
    NgbDropdownModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ],
  exports: [
    BtopHeaderComponent
  ]
})
export class BtopHeaderModule { }
