import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavRightComponent } from './nav-right.component';
import { NgScrollbar } from 'ngx-scrollbar';



@NgModule({
  declarations: [NavRightComponent],
  imports: [
    CommonModule,
    NgScrollbar
  ],
  exports:[NavRightComponent]
})
export class NavRightModule { }
