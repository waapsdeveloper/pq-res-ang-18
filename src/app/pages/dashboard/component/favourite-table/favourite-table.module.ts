import { FavouriteTableComponent } from './favourite-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouriteTableRoutingModule } from './favourite-table-routing.module';


@NgModule({
  declarations: [
    FavouriteTableComponent],
  imports: [
    CommonModule,
    FavouriteTableRoutingModule,
    
  ],
  exports: [FavouriteTableComponent]
})
export class FavouriteTableModule { }
