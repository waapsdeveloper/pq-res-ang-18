import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { NavRightModule } from './nav-right/nav-right.module';
import { NavLeftModule } from './nav-left/nav-left.module';
import { FormsModule } from '@angular/forms';
import { NavLogoModule } from "./nav-logo/nav-logo.module";
import { DashboardTopMenuModule } from 'src/app/components/dashboard-top-menu/dashboard-top-menu.module';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    NavRightModule,
    NavLeftModule,
    FormsModule,
    NavLogoModule,
    DashboardTopMenuModule
],
  exports:[NavBarComponent]
})
export class NavBarModule { }
