import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLeftComponent } from './nav-left.component';



@NgModule({
  declarations: [NavLeftComponent],
  imports: [
    CommonModule
  ],
  exports:[NavLeftComponent]
})
export class NavLeftModule { }
