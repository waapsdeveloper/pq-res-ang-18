import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrderPrintslipComponent } from './list-order-printslip.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    ListOrderPrintslipComponent,
    
  ],
  imports: [
    CommonModule,
    PipesModule
],
  exports:[ListOrderPrintslipComponent]
})
export class ListOrderPrintslipModule { }
