import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouriteTableRoutingModule } from './favourite-table-routing.module';
import { FavouriteTableComponent } from './favourite-table.component';


@NgModule({
  declarations: [
    FavouriteTableComponent
  ],
  imports: [
    CommonModule,
    FavouriteTableRoutingModule
  ]
})
export class FavouriteTableModule { }
