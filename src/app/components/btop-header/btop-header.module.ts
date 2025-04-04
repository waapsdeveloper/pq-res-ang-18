import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtopHeaderComponent } from './btop-header.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbDropdownModule, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BtopHeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgScrollbarModule,
    NgbDropdownModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    BtopHeaderComponent
  ]
})
export class BtopHeaderModule { }
