import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLogoComponent } from './nav-logo.component';



@NgModule({
  declarations: [NavLogoComponent],
  imports: [
    CommonModule
  ],
  exports:[NavLogoComponent]
})
export class NavLogoModule { }
