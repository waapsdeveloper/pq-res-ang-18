import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSelectedPipe } from './filter-selected.pipe';



@NgModule({
  declarations: [FilterSelectedPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterSelectedPipe]
})
export class FilterSelectedModule { }
